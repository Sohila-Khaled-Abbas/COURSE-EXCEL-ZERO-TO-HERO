#!/usr/bin/env python3
"""
scripts/sync_module_8_docs.py
=============================================================================
Automated Document Synchronizer for Module 8 Demo Workbook (Module_8_Demo.xlsx)
Dynamically inspects the Excel workbook and updates:
1. 07_Reference/Module 8 Dataset Documentation.md
2. 02_Notes/08_Power_Query_and_M/04_Introduction_to_M_Language_and_APIs.md
3. 02_Notes/08_Power_Query_and_M/01_Power_Query_Fundamentals_and_ETL.md
4. 11_Demos_and_Workbooks/README.md
=============================================================================
"""

import os
import sys
import datetime
import zipfile
import base64
import struct
import io
import re
import xml.etree.ElementTree as ET
import openpyxl

def extract_power_query_m(workbook_path):
    """Extracts Power Query M formulas from workbook customXml DataMashup package."""
    m_queries = {}
    try:
        with zipfile.ZipFile(workbook_path, 'r') as z:
            for item in z.namelist():
                if item.startswith('customXml/item') and not item.startswith('customXml/itemProps') and 'rels' not in item:
                    try:
                        raw = z.read(item)
                        root = ET.fromstring(raw.decode('utf-16', errors='ignore'))
                        if 'DataMashup' in root.tag and root.text:
                            bdata = base64.b64decode(root.text.strip())
                            offset = 4
                            pkg_len = struct.unpack('<I', bdata[offset:offset+4])[0]
                            pkg_bytes = bdata[offset+4 : offset+4+pkg_len]
                            with zipfile.ZipFile(io.BytesIO(pkg_bytes)) as pz:
                                if 'Formulas/Section1.m' in pz.namelist():
                                    m_content = pz.read('Formulas/Section1.m').decode('utf-8')
                                    queries = re.findall(r'shared\s+(?:#"([^"]+)"|([A-Za-z0-9_]+))\s*=\s*(let[\s\S]*?in\s+[^;]+);', m_content)
                                    for q1, q2, qcode in queries:
                                        qname = q1 if q1 else q2
                                        m_queries[qname] = qcode.strip()
                            break
                    except Exception:
                        continue
    except Exception as e:
        print(f"[WARN] Error extracting Power Query M: {e}")
    return m_queries

def parse_m_column_types(m_code):
    """Parses column names and types from Table.TransformColumnTypes expression in M."""
    col_types = []
    match = re.search(r'Table\.TransformColumnTypes\([^,]+,\s*\{([\s\S]*?)\}\)', m_code)
    if match:
        pairs = re.findall(r'\{"([^"]+)",\s*([^}]+)\}', match.group(1))
        for col, t in pairs:
            col_types.append((col.strip(), t.strip()))
    return col_types

def inspect_connections(workbook_path):
    """Inspects xl/connections.xml to detect Data Model and Mashup query bindings."""
    connections = []
    has_data_model = False
    try:
        with zipfile.ZipFile(workbook_path, 'r') as z:
            if 'xl/connections.xml' in z.namelist():
                raw = z.read('xl/connections.xml')
                root = ET.fromstring(raw)
                for conn in root.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}connection'):
                    cname = conn.attrib.get('name', '')
                    ctype = conn.attrib.get('type', '')
                    connections.append({'name': cname, 'type': ctype})
                    if 'DataModel' in cname or ctype == '5':
                        has_data_model = True
    except Exception as e:
        print(f"[WARN] Error inspecting connections: {e}")
    return connections, has_data_model

def sync_module_8():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    workbook_path = os.path.join(repo_root, "11_Demos_and_Workbooks", "08_Power_Query", "Module_8_Demo.xlsx")
    ref_doc_path = os.path.join(repo_root, "07_Reference", "Module 8 Dataset Documentation.md")
    note_4_path = os.path.join(repo_root, "02_Notes", "08_Power_Query_and_M", "04_Introduction_to_M_Language_and_APIs.md")
    note_1_path = os.path.join(repo_root, "02_Notes", "08_Power_Query_and_M", "01_Power_Query_Fundamentals_and_ETL.md")
    readme_path = os.path.join(repo_root, "11_Demos_and_Workbooks", "README.md")

    if not os.path.exists(workbook_path):
        print(f"[ERROR] Workbook not found: {workbook_path}")
        return False

    print(f"[SYNC] Inspecting {workbook_path}...")
    wb = openpyxl.load_workbook(workbook_path, data_only=True)
    sheetnames = wb.sheetnames
    print(f"[SYNC] Found {len(sheetnames)} sheets: {sheetnames}")

    # Extract Power Query M
    m_queries = extract_power_query_m(workbook_path)
    print(f"[SYNC] Extracted {len(m_queries)} Power Query M queries: {list(m_queries.keys())}")

    # Inspect Data Model Connections
    connections, has_data_model = inspect_connections(workbook_path)
    print(f"[SYNC] Found {len(connections)} connections (Data Model Present: {has_data_model})")

    today_str = datetime.date.today().strftime("%Y-%m-%d")

    # If Fact_Calls query exists, parse column types
    fact_calls_m = m_queries.get('Fact_Calls', '')
    col_types = parse_m_column_types(fact_calls_m) if fact_calls_m else []

    # 1. Update 07_Reference/Module 8 Dataset Documentation.md
    if os.path.exists(ref_doc_path):
        with open(ref_doc_path, "r", encoding="utf-8") as f:
            content = f.read()

        content = re.sub(r'total_sheets:\s*\d+', f'total_sheets: {len(sheetnames)}', content)
        content = re.sub(r'updated:\s*\d{4}-\d{2}-\d{2}', f'updated: {today_str}', content)

        if fact_calls_m:
            # Replace M code block
            m_block_pattern = r'(```powerquery\s*section Section1;\s*shared Fact_Calls = let[\s\S]*?in\s+[^;]+;\s*```)'
            new_m_block = f"```powerquery\nsection Section1;\n\nshared Fact_Calls = {fact_calls_m};\n```"
            if re.search(m_block_pattern, content):
                content = re.sub(m_block_pattern, lambda m: new_m_block, content)

        with open(ref_doc_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[SYNC] Updated {ref_doc_path}")

    # 2. Update 02_Notes/08_Power_Query_and_M/04_Introduction_to_M_Language_and_APIs.md
    if os.path.exists(note_4_path) and fact_calls_m:
        with open(note_4_path, "r", encoding="utf-8") as f:
            n4_content = f.read()

        m_block_pattern = r'(```powerquery\s*section Section1;\s*shared Fact_Calls = let[\s\S]*?in\s+[^;]+;\s*```)'
        new_m_block = f"```powerquery\nsection Section1;\n\nshared Fact_Calls = {fact_calls_m};\n```"
        if re.search(m_block_pattern, n4_content):
            n4_content = re.sub(m_block_pattern, lambda m: new_m_block, n4_content)
            n4_content = re.sub(r'updated:\s*\d{4}-\d{2}-\d{2}', f'updated: {today_str}', n4_content)
            with open(note_4_path, "w", encoding="utf-8") as f:
                f.write(n4_content)
            print(f"[SYNC] Updated {note_4_path}")

    # 3. Update 02_Notes/08_Power_Query_and_M/01_Power_Query_Fundamentals_and_ETL.md
    if os.path.exists(note_1_path) and col_types:
        with open(note_1_path, "r", encoding="utf-8") as f:
            n1_content = f.read()

        cols_summary = ", ".join([f"`{c}` (`{t}`)" for c, t in col_types])
        n1_pattern = r'(- \*\*Embedded Query `Fact_Calls`\*\*:[^\n]*\n\s*-\s*)[^\n]+'
        replacement = f"\\g<1>{cols_summary}."
        if re.search(n1_pattern, n1_content):
            n1_content = re.sub(n1_pattern, replacement, n1_content)
            n1_content = re.sub(r'updated:\s*\d{4}-\d{2}-\d{2}', f'updated: {today_str}', n1_content)
            with open(note_1_path, "w", encoding="utf-8") as f:
                f.write(n1_content)
            print(f"[SYNC] Updated {note_1_path}")

    # 4. Update 11_Demos_and_Workbooks/README.md
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            readme_text = f.read()

        m8_pattern = r'\| \*\*08: Power Query & M\*\* \|.*'
        replacement = f'| **08: Power Query & M** | [`Module_8_Demo.xlsx`](08_Power_Query/Module_8_Demo.xlsx) | Dedicated sheet `Intro` (bilingual 4 Questions framework & the Data Kitchen `المطبخ بتاعنا`), automated M ingestion query `Fact_Calls` streaming 5,000 PwC call records, strict type casting, and direct loading to `ThisWorkbookDataModel` | 🔥 Active Laboratory |'

        if re.search(m8_pattern, readme_text):
            readme_text = re.sub(m8_pattern, replacement, readme_text)
            with open(readme_path, "w", encoding="utf-8") as f:
                f.write(readme_text)
            print(f"[SYNC] Updated {readme_path}")

    print(f"[SUCCESS] Module 8 Demo synchronization complete.")
    return True

if __name__ == "__main__":
    sync_module_8()

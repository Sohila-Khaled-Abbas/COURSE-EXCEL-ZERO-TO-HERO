#!/usr/bin/env python3
"""
scripts/sync_module_7_docs.py
=============================================================================
Automated Document Synchronizer for Module 7 Demo Workbook (Module_7_Demo.xlsx)
Dynamically inspects the Excel workbook and updates:
1. 07_Reference/Module 7 Dataset Documentation.md
2. 11_Demos_and_Workbooks/README.md
3. 02_Notes/07_Data_Cleaning_and_Importing/ notes
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

def sync_module_7():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    workbook_path = os.path.join(repo_root, "11_Demos_and_Workbooks", "07_Data_Cleaning", "Module_7_Demo.xlsx")
    ref_doc_path = os.path.join(repo_root, "07_Reference", "Module 7 Dataset Documentation.md")
    readme_path = os.path.join(repo_root, "11_Demos_and_Workbooks", "README.md")

    if not os.path.exists(workbook_path):
        print(f"[ERROR] Workbook not found: {workbook_path}")
        return False

    print(f"[SYNC] Inspecting {workbook_path}...")
    wb = openpyxl.load_workbook(workbook_path, data_only=True)
    sheetnames = wb.sheetnames
    print(f"[SYNC] Found {len(sheetnames)} sheets: {sheetnames}")

    sheet_profiles = {}
    total_records = 0

    for s in sheetnames:
        ws = wb[s]
        headers = [ws.cell(1, c).value for c in range(1, ws.max_column + 1) if ws.cell(1, c).value is not None]
        table_names = list(ws.tables.keys()) if hasattr(ws, 'tables') else []
        row_count = ws.max_row - 1 if ws.max_row > 1 else 0
        total_records += row_count
        sheet_profiles[s] = {
            'max_row': ws.max_row,
            'max_column': ws.max_column,
            'headers': headers,
            'tables': table_names,
            'data_rows': row_count
        }

    # Extract Power Query M
    m_queries = extract_power_query_m(workbook_path)
    print(f"[SYNC] Extracted {len(m_queries)} Power Query M queries: {list(m_queries.keys())}")
    print(f"[SYNC] Total combined records: {total_records}")

    # Update 07_Reference/Module 7 Dataset Documentation.md frontmatter if changed
    if os.path.exists(ref_doc_path):
        with open(ref_doc_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Update frontmatter total_sheets & total_records
        content = re.sub(r'total_sheets:\s*\d+', f'total_sheets: {len(sheetnames)}', content)
        content = re.sub(r'total_records:\s*\d+', f'total_records: {total_records}', content)
        content = re.sub(r'updated:\s*\d{4}-\d{2}-\d{2}', f'updated: {datetime.date.today().strftime("%Y-%m-%d")}', content)

        with open(ref_doc_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"[SYNC] Updated {ref_doc_path}")

    # Update 11_Demos_and_Workbooks/README.md if needed
    if os.path.exists(readme_path):
        with open(readme_path, "r", encoding="utf-8") as f:
            readme_text = f.read()

        m7_pattern = r'\| \*\*07: Data Cleaning & Ingestion\*\* \|.*'
        replacement = f'| **07: Data Cleaning & Ingestion** | [`Module_7_Demo.xlsx`](07_Data_Cleaning/Module_7_Demo.xlsx) | {len(sheetnames)} dedicated sheets, {total_records:,} combined operational records across {", ".join([f"`{s}`" for s in sheetnames])}. Implements the complete **ETL (Extract -> Transform -> Load)** pipeline, type casting, ghost column isolation, and operational null auditing | 🔥 Active Laboratory |'
        
        if re.search(m7_pattern, readme_text):
            readme_text = re.sub(m7_pattern, replacement, readme_text)
            with open(readme_path, "w", encoding="utf-8") as f:
                f.write(readme_text)
            print(f"[SYNC] Updated {readme_path}")

    print(f"[SUCCESS] Module 7 Demo synchronization complete.")
    return True

if __name__ == "__main__":
    sync_module_7()

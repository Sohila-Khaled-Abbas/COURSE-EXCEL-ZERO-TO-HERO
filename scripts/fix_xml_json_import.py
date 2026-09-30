import os
import shutil
import xml.etree.ElementTree as ET
import json

base_dir = r"09_Source_Materials/Module 7/2-Importing Data"
xml_file = os.path.join(base_dir, "XML_F52E2B61-18A1-11d1-B105-00805F49916B1.xml")
json_xml_file = os.path.join(base_dir, "JSON_F52E2B61-18A1-11d1-B105-00805F49916B3.xml")
json_clean_file = os.path.join(base_dir, "JSON_F52E2B61-18A1-11d1-B105-00805F49916B3.json")

print("[1] Fixing XML multiple root elements...")
if os.path.exists(xml_file):
    # Backup original
    bak_xml = xml_file + ".bak"
    if not os.path.exists(bak_xml):
        shutil.copyfile(xml_file, bak_xml)
        print(f"Backed up to {bak_xml}")

    with open(xml_file, "r", encoding="utf-8-sig", errors="ignore") as f:
        lines = f.readlines()

    # Part 1 is lines 0 to 3026 (Products 1 to 999)
    clean_lines = lines[:3026]
    clean_xml_str = "".join(clean_lines).strip()
    if not clean_xml_str.startswith("<?xml"):
        clean_xml_str = '<?xml version="1.0" encoding="utf-8"?>\n' + clean_xml_str

    # Test parse with ElementTree
    try:
        root = ET.fromstring(clean_xml_str)
        print(f"XML Parse Success! Root tag: <{root.tag}>, Child count: {len(root)}")
        with open(xml_file, "w", encoding="utf-8") as f:
            f.write(clean_xml_str)
        print(f"Successfully repaired {xml_file} (Single root <Products>)")
    except Exception as e:
        print(f"XML Validation Failed: {e}")

print("\n[2] Fixing JSON format and file extension...")
if os.path.exists(json_xml_file):
    bak_json = json_xml_file + ".bak"
    if not os.path.exists(bak_json):
        shutil.copyfile(json_xml_file, bak_json)
        print(f"Backed up to {bak_json}")

    with open(json_xml_file, "r", encoding="utf-8-sig", errors="ignore") as f:
        content = f.read()

    try:
        data = json.loads(content)
        people_count = len(data.get("People", []))
        print(f"JSON Parse Success! 'People' records: {people_count}")

        # Create proper .json file (UTF-8 without BOM)
        with open(json_clean_file, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
        print(f"Created proper JSON file: {json_clean_file}")

        # Also rewrite the .xml version with valid clean UTF-8 text so even if opened as .xml it has valid JSON
        with open(json_xml_file, "w", encoding="utf-8") as f:
            json.dump(data, f)
        print(f"Sanitized UTF-8 content of {json_xml_file}")
    except Exception as e:
        print(f"JSON Validation Failed: {e}")

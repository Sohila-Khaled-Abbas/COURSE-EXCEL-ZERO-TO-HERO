import openpyxl
import json
import os

wb_path = os.path.join("11_Demos_and_Workbooks", "05_Pivot_Tables", "Module_5_Demo.xlsx")
wb = openpyxl.load_workbook(wb_path, data_only=False)

summary = {
    "sheets": wb.sheetnames,
    "details": {}
}

for name in wb.sheetnames:
    ws = wb[name]
    sheet_info = {
        "max_row": ws.max_row,
        "max_column": ws.max_column,
        "tables": [t.name for t in ws.tables.values()] if hasattr(ws, 'tables') else [],
        "first_5_rows": []
    }
    
    # Read first 10 rows and columns
    for r in range(1, min(12, ws.max_row + 1)):
        row_vals = [str(ws.cell(r, c).value) if ws.cell(r, c).value is not None else "" for c in range(1, min(15, ws.max_column + 1))]
        if any(row_vals):
            sheet_info["first_5_rows"].append(row_vals)
            
    summary["details"][name] = sheet_info

with open("scripts/module_5_inspect.json", "w", encoding="utf-8") as f:
    json.dump(summary, f, indent=2)

print("INSPECT_COMPLETE")

import openpyxl

wb = openpyxl.load_workbook(r'11_Demos_and_Workbooks\05_Pivot_Tables\Module_5_Demo.xlsx', read_only=True, data_only=True)
ws = wb['Sample Data']

rows = list(ws.iter_rows(values_only=True))
print(f"Total rows read: {len(rows)}")

header_row = rows[2] # row 3 is 0-indexed 2
print("Header row (row 3):", header_row)

amount_col_idx = None
for i, h in enumerate(header_row):
    if h == 'Amount':
        amount_col_idx = i
        break

print(f"Amount column index: {amount_col_idx}")

non_numeric = []
types = set()
for r_idx in range(3, len(rows)):
    row = rows[r_idx]
    if amount_col_idx < len(row):
        val = row[amount_col_idx]
        types.add(type(val))
        if val is None or not isinstance(val, (int, float)):
            non_numeric.append((r_idx + 1, type(val), repr(val)))

print("Types in Amount:", types)
print("Non-numeric count:", len(non_numeric))
if non_numeric:
    print("Non-numeric entries:", non_numeric[:20])

wb.close()

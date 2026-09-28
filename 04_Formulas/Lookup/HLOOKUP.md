---
type: excel-function
category: lookup
difficulty: intermediate
aliases: [HLOOKUP]
tags: [excel, function, lookup, horizontal]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[VLOOKUP]]", "[[XLOOKUP]]", "[[INDEX]]", "[[MATCH]]"]
---

# HLOOKUP Function

> [!abstract] Purpose
> Searches for a value in the **top row** of a table or array of values, and returns a value in the same column from a row you specify in the table. Use `HLOOKUP` when your comparison values are located in a horizontal row across the top of a data table.

## Syntax

```excel
=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `lookup_value` | **Required** | The value to be found in the first row of the table. |
| `table_array` | **Required** | A table of information in which data is looked up. Top row must contain search keys. |
| `row_index_num` | **Required** | The row number in `table_array` from which matching value will be returned (1-based index). |
| `range_lookup` | *Optional* | `FALSE` = Exact match (mandatory in 99% of business cases). `TRUE` = Approximate match. |

## Practical Examples

### 1. Client Code Lookup Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `HLookup`):
```excel
=HLOOKUP(B17, $A$3:$K$10, 2, FALSE)
```
Searches for client code in row 3 (`$A$3:$K$10`) and retrieves the Client Name from row 2 of the range.

### 2. Horizontal Tax/Tier Lookup
```excel
=HLOOKUP(EmployeeGrade, GradeTable, 3, FALSE)
```

## Critical Vulnerabilities
- **Row Insert Fragility**: Inserting a row inside `table_array` shifts row indices, returning erroneous data without warning.
- **Top Row Constraint**: Cannot look upwards (row above the lookup row).
- **Modern Solution**: Replace with `XLOOKUP` or `INDEX/MATCH`.

---
## Related Knowledge
- Notes: [[04_Lookup_and_Reference_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `HLookup`)

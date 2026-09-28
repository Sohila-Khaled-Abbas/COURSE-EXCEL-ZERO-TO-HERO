---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [COUNTIF]
tags: [excel, function, aggregation, counting, conditional]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[COUNTIFS]]", "[[COUNT]]", "[[SUMIF]]"]
---

# COUNTIF Function

> [!abstract] Purpose
> Counts the number of cells within a range that meet a single specified criterion.

## Syntax

```excel
=COUNTIF(range, criteria)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `range` | **Required** | The group of cells you want to count. |
| `criteria` | **Required** | The condition that defines which cells to count (e.g., `32`, `">32"`, `"B"`, `"Apple*"`). |

## Practical Examples

### 1. Count Specific Category Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=COUNTIF(C3:C7, "Mostafa")
```
Counts how many times "Mostafa" appears in column C.

### 2. Transaction Threshold Filter
```excel
=COUNTIF(Sales[Profit], ">0")
```
Counts total profitable transactions.

### 3. Check for Duplicates
Flagging duplicate customer IDs:
```excel
=COUNTIF($A$2:$A$1000, A2) > 1
```

## Criteria Formatting Rules
- If criteria includes logical operators (`>`, `<`, `<>`, `=`), wrap them in double quotes: `">=100"`.
- If concatenating with cell reference: `">=" & D1`.
- Wildcards: `?` matches any single character; `*` matches any sequence of characters.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Counting `)

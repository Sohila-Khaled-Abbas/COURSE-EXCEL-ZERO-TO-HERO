---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [SUMIF]
tags: [excel, function, aggregation, conditional]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SUM]]", "[[SUMIFS]]", "[[COUNTIF]]"]
---

# SUMIF Function

> [!abstract] Purpose
> Adds the cells specified by a given condition or criterion. Evaluates a single criteria range against a condition and sums corresponding values.

## Syntax

```excel
=SUMIF(criteria_range, criteria, [sum_range])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `criteria_range` | **Required** | The range of cells you want evaluated by the criteria. |
| `criteria` | **Required** | The condition that determines which cells will be added. Can be a number, text, cell reference, or logical expression (e.g., `">1000"`, `"Furniture"`, `C3`). |
| `sum_range` | *Optional* | The actual cells to add if different from `criteria_range`. If omitted, Excel sums the cells in `criteria_range`. |

## Practical Examples

### 1. Direct Matching from Workbook Demo
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=SUMIF(C3:C12, C3, B3:B12)
```
Sums values in `B3:B12` where category in `C3:C12` equals the value in `C3`.

### 2. Relational Comparison
```excel
=SUMIF(Sales[Amount], ">5000", Sales[Amount])
```

### 3. Wildcard Search
Sums total revenue for all product names starting with "Apple":
```excel
=SUMIF(Products[Name], "Apple*", Products[Revenue])
```

## Critical Trap: SUMIF vs SUMIFS Argument Order
> [!caution] Range Order Inversion
> - In `SUMIF`: The sum range is the **3rd (last)** argument: `=SUMIF(criteria_range, criteria, [sum_range])`.
> - In `SUMIFS`: The sum range is the **1st (first)** argument: `=SUMIFS(sum_range, criteria_range1, criteria1, ...)`.
> Always prefer `SUMIFS` in professional models to avoid confusion.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

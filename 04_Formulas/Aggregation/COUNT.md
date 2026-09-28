---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [COUNT]
tags: [excel, function, aggregation, counting]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[COUNTA]]", "[[COUNTBLANK]]", "[[COUNTIF]]", "[[COUNTIFS]]"]
---

# COUNT Function

> [!abstract] Purpose
> Counts the number of cells that contain numbers, and counts numbers within the list of arguments.

## Syntax

```excel
=COUNT(value1, [value2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `value1` | **Required** | The first item, cell reference, or range within which you want to count numbers. |
| `value2, ...` | *Optional* | Up to 255 additional items, cell references, or ranges to count. |

## Practical Examples

### 1. Count Numeric Transactions Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=COUNT(B3:B7)
```
Counts only cells with valid numbers or dates in column B.

### 2. Identifying Missing Data in Numeric Field
If `COUNTA(A2:A100)` is 100 but `COUNT(A2:A100)` is 94, exactly 6 rows contain text or errors instead of numbers.

## What COUNT Includes vs Excludes
- **Counts**: Numbers, dates/times, formulas resulting in numbers.
- **Ignores**: Text strings, empty cells, logical values (`TRUE`/`FALSE`), errors (`#N/A`, `#VALUE!`).
- **Gotcha**: If numbers were imported as text (e.g. `'1024` or leading zeros), `COUNT` will return `0`! Use `VALUE()` or Text to Columns to fix.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Counting `)

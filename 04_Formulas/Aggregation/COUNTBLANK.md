---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [COUNTBLANK, COUNT_BLANK]
tags: [excel, function, aggregation, counting, data-quality]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[COUNT]]", "[[COUNTA]]", "[[ISBLANK]]"]
---

# COUNTBLANK Function

> [!abstract] Purpose
> Counts empty cells in a specified range. Also counts cells with formulas that return an empty text string (`""`).

## Syntax

```excel
=COUNTBLANK(range)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `range` | **Required** | The range of cells from which you want to count empty cells. |

## Practical Examples

### 1. Count Blank Cells Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=COUNTBLANK(B3:B7)
```
Identifies cells missing numeric values in row 7.

### 2. Data Completeness Quality Audit
Calculating the percentage of missing postal codes:
```excel
=COUNTBLANK(Orders[Postal Code]) / ROWS(Orders)
```

## Behavior & Traps
- **Empty Strings**: Cells with formulas returning `""` are counted as blank.
- **Space Characters**: Cells containing spaces (`" "`) are **not** blank and will not be counted by `COUNTBLANK`. Use `TRIM()` in data preparation.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Counting `)

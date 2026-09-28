---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [COUNTA]
tags: [excel, function, aggregation, counting]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[COUNT]]", "[[COUNTBLANK]]", "[[COUNTIF]]", "[[COUNTIFS]]"]
---

# COUNTA Function

> [!abstract] Purpose
> Counts the number of cells in a range that are **not empty**. Counts cells containing any type of information, including text, numbers, dates, logical values, and error values.

## Syntax

```excel
=COUNTA(value1, [value2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `value1` | **Required** | The first argument representing the values or range you want to count. |
| `value2, ...` | *Optional* | Additional arguments representing values or ranges (up to 255 arguments). |

## Practical Examples

### 1. Count All Active Entries Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=COUNTA(C3:C7)
```
Counts all non-empty customer or agent names in column C.

### 2. Dynamic Table Row Indexer
```excel
=COUNTA(A:A) - 1
```
Calculates total records excluding the header row.

## Critical Trap: The Empty String Trap ("")
> [!warning] Hidden Non-Empty Cells
> If a cell contains an invisible space character (`" "`) or a formula that returned an empty string (`=""`), `COUNTA` **counts it as non-empty**!
> To count only cells with visible text, use:
> ```excel
> =COUNTIF(range, "?*")
> ```

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Counting `)

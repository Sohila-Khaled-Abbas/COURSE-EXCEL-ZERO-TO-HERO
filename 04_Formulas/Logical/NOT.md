---
type: excel-function
category: logical
difficulty: beginner
aliases: [NOT]
tags: [excel, function, logical, boolean]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[AND]]", "[[OR]]", "[[IF]]"]
---

# NOT Function

> [!abstract] Purpose
> Reverses the value of its argument. Use `NOT` when you want to make sure a value is not equal to a particular value. Returns `TRUE` if argument is `FALSE`; returns `FALSE` if argument is `TRUE`.

## Syntax

```excel
=NOT(logical)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `logical` | **Required** | A value or expression that can be evaluated to `TRUE` or `FALSE`. |

## Practical Examples

### 1. Inverting Boolean State Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Logical `):
```excel
=NOT(J27)
```
Where `J27` is `=OR(C27>80, C28>80)`. Inverts the outcome to flag non-qualifying cases.

### 2. Excluding Specific Status
```excel
=IF(NOT(Orders[Status] = "Cancelled"), Orders[Revenue], 0)
```

---
## Related Knowledge
- Notes: [[03_Conditional_Logic_and_Decision_Making]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Logical `)

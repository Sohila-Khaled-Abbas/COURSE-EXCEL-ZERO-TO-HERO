---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [ROUNDDOWN, Round_Down]
tags: [excel, function, math, rounding, precision]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[ROUND]]", "[[ROUNDUP]]", "[[INT]]", "[[TRUNC]]"]
---

# ROUNDDOWN Function

> [!abstract] Purpose
> Rounds a number **down, toward zero**. Behaves like `ROUND`, except that it always rounds a number down.

## Syntax

```excel
=ROUNDDOWN(number, num_digits)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number` | **Required** | Any real number that you want rounded down. |
| `num_digits` | **Required** | The number of digits to which you want to round `number`. |

## Practical Examples

### 1. Truncating Decimal Residue Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Rounding and Dynamic Filters `):
If cell `E2` contains `12.4445`:
```excel
=ROUNDDOWN(E2, 3)
```
*Result*: `12.444`.

### 2. Completed Milestones or Vesting Years
Calculating completed 5-year investment intervals without fractional credit:
```excel
=ROUNDDOWN(TenureYears / 5, 0) * 5
```

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Rounding and Dynamic Filters `)

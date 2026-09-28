---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [ROUNDUP, Round_up]
tags: [excel, function, math, rounding, precision]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[ROUND]]", "[[ROUNDDOWN]]", "[[CEILING]]"]
---

# ROUNDUP Function

> [!abstract] Purpose
> Rounds a number **up, away from zero**. Behaves like `ROUND`, except that it always rounds a number up.

## Syntax

```excel
=ROUNDUP(number, num_digits)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number` | **Required** | Any real number that you want rounded up. |
| `num_digits` | **Required** | The number of digits to which you want to round `number`. |

## Practical Examples

### 1. Decimal Ceiling Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Rounding and Dynamic Filters `):
If cell `E2` contains `12.4445`:
```excel
=ROUNDUP(E2, 1)
```
*Result*: `12.5`.

### 2. Required Shipping Container Calculation
If a shipment contains 105 units and each crate holds 10:
```excel
=ROUNDUP(105 / 10, 0)
```
*Result*: `11` crates required.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Rounding and Dynamic Filters `)

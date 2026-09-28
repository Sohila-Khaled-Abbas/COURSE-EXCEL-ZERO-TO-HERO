---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [ROUND]
tags: [excel, function, math, rounding, precision]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[ROUNDUP]]", "[[ROUNDDOWN]]", "[[INT]]", "[[TRUNC]]"]
---

# ROUND Function

> [!abstract] Purpose
> Rounds a number to a specified number of digits. Uses standard arithmetic rounding: digits $0$ to $4$ round down, while digits $5$ to $9$ round up.

## Syntax

```excel
=ROUND(number, num_digits)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number` | **Required** | The number that you want to round. |
| `num_digits` | **Required** | The number of digits to which you want to round `number`. |

### Precision Rules for `num_digits`:
- If `num_digits` $> 0$, `number` is rounded to the specified number of decimal places.
- If `num_digits` $= 0$, `number` is rounded to the nearest integer.
- If `num_digits` $< 0$, `number` is rounded to the left of the decimal point (tens, hundreds, etc.).

## Practical Examples

### 1. Two-Decimal Financial Rounding Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Rounding and Dynamic Filters `):
If cell `E2` contains `12.4445`:
```excel
=ROUND(E2, 2)
```
*Result*: `12.44`.

### 2. Large Scale Discretionary Rounding
Rounding sales to the nearest thousand:
```excel
=ROUND(158432, -3)
```
*Result*: `158000`.

## Cell Formatting vs ROUND() Function
> [!important] Crucial Modeling Difference
> Decreasing decimals via the Excel Home Ribbon **only alters visual display**—the underlying full precision number is retained and used in downstream calculations.
> Using `=ROUND()` **physically truncates the underlying mathematical value**, preventing discrepancies in financial statements.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Rounding and Dynamic Filters `)

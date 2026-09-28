---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [PRODUCT]
tags: [excel, function, arithmetic, math]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SUM]]", "[[QUOTIENT]]", "[[MOD]]"]
---

# PRODUCT Function

> [!abstract] Purpose
> Multiplies all the numbers given as arguments and returns the product ($\prod x = x_1 \times x_2 \times \dots \times x_n$).

## Syntax

```excel
=PRODUCT(number1, [number2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number1` | **Required** | The first number or range that you want to multiply. |
| `number2, ...` | *Optional* | Additional numbers or ranges to multiply (up to 255 arguments). |

## Practical Examples

### 1. Simple Two-Cell Multiplication
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=PRODUCT(B3, A3)
```

### 2. Multi-Tier Discount Factor Compounding
Calculating cumulative retention rate across quarters:
```excel
=PRODUCT(1 - ChurnRates)
```

## Why Use PRODUCT() Instead of Asterisk (*)?
- `=A1 * B1 * C1` returns `#VALUE!` if any cell contains text (e.g. `"N/A"` or blank spaces).
- `=PRODUCT(A1:C1)` **ignores text and blank cells**, preventing error cascades in financial and analytical models.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

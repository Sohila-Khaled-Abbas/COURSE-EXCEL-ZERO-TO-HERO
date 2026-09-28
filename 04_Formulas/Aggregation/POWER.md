---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [POWER]
tags: [excel, function, arithmetic, math]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[PRODUCT]]", "[[SQRT]]"]
---

# POWER Function

> [!abstract] Purpose
> Returns the result of a number raised to a given power ($x^y$). Equivalent to using the caret operator (`^`).

## Syntax

```excel
=POWER(number, power)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number` | **Required** | The base number. Can be any real number. |
| `power` | **Required** | The exponent to which the base number is raised. |

## Practical Examples

### 1. Basic Exponential Calculation
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=POWER(B12, 2)
```
Squares the number in `B12`.

### 2. Compound Annual Growth Rate (CAGR)
$$\text{CAGR} = \left(\frac{\text{Ending Value}}{\text{Beginning Value}}\right)^{\frac{1}{n}} - 1$$
In Excel formula:
```excel
=POWER(EndVal / BeginVal, 1 / Years) - 1
```

### 3. Roots and Fractional Exponents
To find the cube root of a number:
```excel
=POWER(Number, 1/3)
```

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [QUOTIENT]
tags: [excel, function, arithmetic, math]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MOD]]", "[[PRODUCT]]", "[[DIVIDE]]"]
---

# QUOTIENT Function

> [!abstract] Purpose
> Returns the integer portion of a division ($\lfloor \frac{\text{numerator}}{\text{denominator}} \rfloor$). Discards the fractional or decimal remainder.

## Syntax

```excel
=QUOTIENT(numerator, denominator)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `numerator` | **Required** | The dividend (the number to be divided). |
| `denominator` | **Required** | The divisor (the number by which to divide). |

## Practical Examples

### 1. Integer Packaging Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If you have 29 items and each carton holds 6 items:
```excel
=QUOTIENT(29, 6)
```
*Result*: `4` full cartons (since $4 \times 6 = 24$, leaving 5 items leftover).

### 2. Time Conversion (Seconds to Full Hours)
```excel
=QUOTIENT(CallDurationInSeconds, 3600)
```

## QUOTIENT vs Normal Division (/)
- `29 / 6` returns `4.833333333`.
- `QUOTIENT(29, 6)` returns `4`.
- Pair `QUOTIENT` with `MOD` to get the complete division breakdown:
  - Full units: `=QUOTIENT(29, 6)` $\rightarrow 4$
  - Remaining units: `=MOD(29, 6)` $\rightarrow 5$

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

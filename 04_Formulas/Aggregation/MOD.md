---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [MOD]
tags: [excel, function, arithmetic, math, logic]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[QUOTIENT]]", "[[PRODUCT]]", "[[ROUND]]"]
---

# MOD Function

> [!abstract] Purpose
> Returns the remainder after a number is divided by a divisor ($\text{number} \pmod{\text{divisor}}$).

## Syntax

```excel
=MOD(number, divisor)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number` | **Required** | The number for which you want to find the remainder (dividend). |
| `divisor` | **Required** | The number by which you want to divide (must be non-zero). |

## Practical Examples

### 1. Remainder Calculation Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=MOD(30, 4)
```
*Result*: `2` (since $4 \times 7 = 28$, and $30 - 28 = 2$).

### 2. Alternating Row Shading (Zebra Striping)
In Conditional Formatting rules, highlight every even row:
```excel
=MOD(ROW(), 2) = 0
```
Highlight every 5th row:
```excel
=MOD(ROW(), 5) = 0
```

### 3. Extracting Time from a Date-Time Serial
In Excel, dates are whole integers and times are fractional decimals. To extract just the time:
```excel
=MOD(DateTimeCell, 1)
```

## Gotchas & Behavior
- If `divisor` is `0`, `MOD` returns the `#DIV/0!` error.
- Sign behavior: The result of `MOD` takes the sign of the **divisor**, not the number (e.g., `=MOD(-3, 2)` returns `1`).

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [MAX]
tags: [excel, function, aggregation, statistics]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MIN]]", "[[AVERAGE]]", "[[LARGE]]"]
---

# MAX Function

> [!abstract] Purpose
> Returns the largest numeric value in a set of values or range.

## Syntax

```excel
=MAX(number1, [number2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number1` | **Required** | The first number, cell reference, or range from which to find the maximum. |
| `number2, ...` | *Optional* | Additional numbers, cell references, or ranges (up to 255 arguments). |

## Practical Examples

### 1. Range Maximum
```excel
=MAX(B3:B12)
```

### 2. Identifying Peak Operational Metric
```excel
=MAX(CallData[Duration in Seconds])
```

## Behavior & Gotchas
- Ignores empty cells, logical values, and text strings inside referenced arrays.
- If the range contains no numeric values, `=MAX()` returns `0`.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [MIN]
tags: [excel, function, aggregation, statistics]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MAX]]", "[[AVERAGE]]", "[[SMALL]]"]
---

# MIN Function

> [!abstract] Purpose
> Returns the smallest numeric value in a set of values or range.

## Syntax

```excel
=MIN(number1, [number2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number1` | **Required** | The first number, cell reference, or range from which to find the minimum. |
| `number2, ...` | *Optional* | Additional numbers, cell references, or ranges (up to 255 arguments). |

## Practical Examples

### 1. Range Minimum
```excel
=MIN(B3:B12)
```

### 2. Bounding Floor Calculation
Ensures a discounted price never drops below a minimum threshold:
```excel
=MAX(CalculatedPrice, MinimumPrice)
```

## Behavior & Gotchas
- Ignores empty cells, logical values (`TRUE`/`FALSE`), and text entries within range references.
- If the range contains no numeric values, `=MIN()` returns `0`.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

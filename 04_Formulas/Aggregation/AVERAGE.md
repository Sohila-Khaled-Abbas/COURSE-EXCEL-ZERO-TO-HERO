---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [AVERAGE]
tags: [excel, function, aggregation, statistics]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[AVERAGEIFS]]", "[[SUM]]", "[[COUNT]]", "[[MEDIAN]]"]
---

# AVERAGE Function

> [!abstract] Purpose
> Returns the arithmetic mean ($\bar{x} = \frac{\sum x}{n}$) of its arguments.

## Syntax

```excel
=AVERAGE(number1, [number2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number1` | **Required** | The first number, cell reference, or range for which you want the average. |
| `number2, ...` | *Optional* | Additional numbers, cell references, or ranges (up to 255 arguments). |

## Practical Examples

### 1. Column Average
```excel
=AVERAGE(B3:B12)
```

### 2. Capstone Call Center Metric: Average Speed of Answer
```excel
=AVERAGE(CallData[Speed of Answer in Seconds])
```

## Critical Rules & Behavior
- **Text & Blank Cells**: Cells containing text strings, boolean values, or completely blank cells are **ignored** (they do not count toward the numerator OR the denominator $n$).
- **Zero Cells**: Cells containing `0` **are included** in the average (reducing the resulting mean). If zero represents missing data rather than a true zero reading, use `=AVERAGEIF(range, ">0")`.
- **Division by Zero**: If all cells in the range are blank or contain non-numeric data, `=AVERAGE()` returns a `#DIV/0!` error.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

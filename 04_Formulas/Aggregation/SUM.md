---
type: excel-function
category: aggregation
difficulty: beginner
aliases: [SUM]
tags: [excel, function, aggregation, math]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SUMIF]]", "[[SUMIFS]]", "[[AVERAGE]]", "[[PRODUCT]]"]
---

# SUM Function

> [!abstract] Purpose
> Adds all numbers in a range of cells, individual numbers, cell references, or mathematical expressions.

## Syntax

```excel
=SUM(number1, [number2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `number1` | **Required** | The first number, cell reference, or cell range to sum (e.g., `A1:A10`). |
| `number2, ...` | *Optional* | Additional numbers, cell references, or ranges (up to 255 arguments). |

## Practical Examples

### 1. Simple Range Sum
```excel
=SUM(B2:B50)
```

### 2. Adjacent Cell Expression (Direct Arithmetic)
```excel
=SUM(B3+A3)
```

### 3. Multi-Range Sum
```excel
=SUM(Q1_Sales, Q2_Sales, Q3_Sales, Q4_Sales)
```

## Behavior & Gotchas
- **Text & Blanks**: Text strings, empty cells, and boolean values (`TRUE`/`FALSE`) in referenced ranges are **ignored**.
- **Hardcoded Text Arguments**: If you pass a text representation of a number directly as an argument like `=SUM("5", 10)`, Excel will coerce it to a number (`15`). But if cell `A1` contains `"5"` as text, `=SUM(A1, 10)` returns `10`.
- **Error Propagation**: Any error value (`#VALUE!`, `#N/A`, `#DIV/0!`) in the range causes `=SUM()` to return that error. Use `AGGREGATE` or `SUM(IFERROR(...))` to bypass errors.

---
## Related Knowledge
- Notes: [[02_Statistical_and_Aggregation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Arithmetic and statistical`)

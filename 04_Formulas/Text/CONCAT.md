---
type: excel-function
category: text
difficulty: beginner
aliases: [CONCAT]
tags: [excel, function, text, string]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[TEXTJOIN]]", "[[LEFT]]", "[[RIGHT]]"]
---

# CONCAT Function

> [!abstract] Purpose
> Combines the text from multiple ranges and/or strings, but it does not provide delimiter or IgnoreEmpty arguments. It is the modern replacement for `CONCATENATE`.

## Syntax

```excel
=CONCAT(text1, [text2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text1` | **Required** | Text item, cell reference, or range to be joined. |
| `text2, ...` | *Optional* | Additional text items or ranges to be joined (up to 254 arguments). |

## Practical Examples

### 1. Combining City & Country Drill
From `Formulas_&_Functions_Part_1.xlsx`:
```excel
=CONCAT(C1, D1)
```
Where `C1` is `"Cai"` and `D1` is `"ro "` $\rightarrow$ `"Cairo "`.

### 2. Full Name Assembly with Space
```excel
=CONCAT(Employees[First Name], " ", Employees[Last Name])
```

## CONCAT vs CONCATENATE vs TEXTJOIN
- `CONCATENATE`: Legacy function, cannot accept full ranges like `A1:A5` (must specify each cell individually).
- `CONCAT`: Modern function, accepts 2D ranges `=CONCAT(A1:C1)`.
- `TEXTJOIN`: Preferred when you need a delimiter (like a comma, slash, or space) or need to ignore empty cells.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

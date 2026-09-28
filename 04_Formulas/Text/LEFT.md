---
type: excel-function
category: text
difficulty: beginner
aliases: [LEFT]
tags: [excel, function, text, extraction]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[RIGHT]]", "[[MID]]", "[[LEN]]"]
---

# LEFT Function

> [!abstract] Purpose
> Returns the first character or characters in a text string, based on the number of characters you specify.

## Syntax

```excel
=LEFT(text, [num_chars])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text string that contains the characters you want to extract. |
| `num_chars` | *Optional* | The number of characters to extract from the left side (defaults to `1` if omitted). |

## Practical Examples

### 1. Extract Leading Initials Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa "`:
```excel
=LEFT(A1, 3)
```
*Result*: `"Mos"`.

### 2. Extract Category Prefix from SKU
In Superstore dataset: `Order ID = "CA-2016-152156"`
```excel
=LEFT([@[Order ID]], 2)
```
*Result*: `"CA"`.

### 3. Dynamic First Name Extraction
```excel
=LEFT(A2, SEARCH(" ", A2) - 1)
```

## Behavior Rules
- `num_chars` must be $\ge 0$. If negative, returns `#VALUE!`.
- If `num_chars` is greater than `LEN(text)`, `LEFT` returns the entire string.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

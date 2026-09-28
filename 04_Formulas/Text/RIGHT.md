---
type: excel-function
category: text
difficulty: beginner
aliases: [RIGHT]
tags: [excel, function, text, extraction]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[LEFT]]", "[[MID]]", "[[LEN]]"]
---

# RIGHT Function

> [!abstract] Purpose
> Returns the last character or characters in a text string, based on the number of characters you specify.

## Syntax

```excel
=RIGHT(text, [num_chars])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text string that contains the characters you want to extract. |
| `num_chars` | *Optional* | The number of characters to extract from the right side (defaults to `1` if omitted). |

## Practical Examples

### 1. Extract Trailing Characters Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa"`:
```excel
=RIGHT(TRIM(A1), 4)
```
*Result*: `"tafa"`.

### 2. Extract Numerical Serial from Superstore Order ID
In Superstore dataset: `Order ID = "CA-2016-152156"`
```excel
=RIGHT([@[Order ID]], 6)
```
*Result*: `"152156"`.

### 3. Dynamic Last Name Extraction
```excel
=RIGHT(A2, LEN(A2) - SEARCH(" ", A2))
```

## Behavior Rules
- `num_chars` must be $\ge 0$.
- If `num_chars` is greater than the total length of `text`, `RIGHT` returns all of `text`.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

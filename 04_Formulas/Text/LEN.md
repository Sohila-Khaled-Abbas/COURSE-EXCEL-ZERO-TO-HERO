---
type: excel-function
category: text
difficulty: beginner
aliases: [LEN]
tags: [excel, function, text, inspection]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[TRIM]]", "[[LEFT]]", "[[RIGHT]]", "[[MID]]"]
---

# LEN Function

> [!abstract] Purpose
> Returns the number of characters in a text string, including all spaces (leading, trailing, and internal) and punctuation.

## Syntax

```excel
=LEN(text)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text whose length you want to find. Spaces count as characters. |

## Practical Examples

### 1. Character Length Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa "` (7 letters + 1 trailing space):
```excel
=LEN(A1)
```
*Result*: `8`.
Whereas after trimming:
```excel
=LEN(TRIM(A1))
```
*Result*: `7`.

### 2. Detecting Dirty Leading/Trailing Spaces
```excel
=IF(LEN(A2) <> LEN(TRIM(A2)), "Dirty Spaces Detected", "Clean")
```

### 3. Data Validation Check
Enforcing national ID or phone number digit length:
```excel
=LEN(Customer[Phone]) = 11
```

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

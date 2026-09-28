---
type: excel-function
category: text
difficulty: beginner
aliases: [LOWER]
tags: [excel, function, text, case-conversion]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[UPPER]]", "[[PROPER]]", "[[TRIM]]"]
---

# LOWER Function

> [!abstract] Purpose
> Converts all uppercase letters in a text string to lowercase.

## Syntax

```excel
=LOWER(text)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text you want converted to lowercase. Does not affect non-alphabetic characters. |

## Practical Examples

### 1. Lowercase Conversion Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa"`:
```excel
=LOWER(A1)
```
*Result*: `"mostafa"`.

### 2. Email Normalization
```excel
=LOWER(TRIM(UserEmails))
```

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

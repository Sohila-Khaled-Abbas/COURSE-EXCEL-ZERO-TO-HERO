---
type: excel-function
category: text
difficulty: beginner
aliases: [UPPER]
tags: [excel, function, text, case-conversion]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[LOWER]]", "[[PROPER]]", "[[TRIM]]"]
---

# UPPER Function

> [!abstract] Purpose
> Converts all lowercase letters in a text string to uppercase.

## Syntax

```excel
=UPPER(text)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text you want converted to uppercase. Can be a reference or text string. |

## Practical Examples

### 1. Uppercase Conversion Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa"`:
```excel
=UPPER(A1)
```
*Result*: `"MOSTAFA"`.

### 2. Standardization for Key Joins
Ensuring foreign keys or state abbreviations are consistent before matching:
```excel
=UPPER(TRIM(Customer[State]))
```

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

---
type: excel-function
category: text
difficulty: beginner
aliases: [MID]
tags: [excel, function, text, extraction]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[LEFT]]", "[[RIGHT]]", "[[LEN]]", "[[FIND]]", "[[SEARCH]]"]
---

# MID Function

> [!abstract] Purpose
> Returns a specific number of characters from a text string, starting at the position you specify, based on the number of characters you specify.

## Syntax

```excel
=MID(text, start_num, num_chars)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text string containing the characters you want to extract. |
| `start_num` | **Required** | The position of the first character to extract (1-based index). |
| `num_chars` | **Required** | The number of characters to return from `text`. |

## Practical Examples

### 1. Substring Extraction Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `A1` contains `"Mostafa"`:
```excel
=MID(A1, 2, 4)
```
*Result*: `"osta"` (starts at character 2, extracts 4 characters).

### 2. Extracting Year from Superstore Order ID
In Superstore dataset: `Order ID = "CA-2016-152156"`
```excel
=MID([@[Order ID]], 4, 4)
```
*Result*: `"2016"`.

### 3. Extracting Middle Word Dynamically
Combining `MID` with `SEARCH` to extract text between delimiters:
```excel
=MID(A2, SEARCH("-", A2) + 1, SEARCH("-", A2, SEARCH("-", A2) + 1) - SEARCH("-", A2) - 1)
```

## Behavior Rules
- If `start_num` is greater than `LEN(text)`, `MID` returns `""` (empty text).
- If `start_num` is $< 1$, `MID` returns `#VALUE!`.
- If `num_chars` is negative, `MID` returns `#VALUE!`.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

---
type: excel-function
category: text
difficulty: intermediate
aliases: [REPLACE]
tags: [excel, function, text, replacement]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SUBSTITUTE]]", "[[MID]]", "[[LEFT]]"]
---

# REPLACE Function

> [!abstract] Purpose
> Replaces part of a text string, based on the number of characters you specify, with a different text string. Use `REPLACE` when you want to replace text based on **character position**.

## Syntax

```excel
=REPLACE(old_text, start_num, num_chars, new_text)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `old_text` | **Required** | The text in which you want to replace some characters. |
| `start_num` | **Required** | The position of the character in `old_text` that you want to replace with `new_text` (1-based index). |
| `num_chars` | **Required** | The number of characters in `old_text` that you want to replace. |
| `new_text` | **Required** | The text that will replace characters in `old_text`. |

## Practical Examples

### 1. Position-Based Replacement Drill
From `Formulas_&_Functions_Part_1.xlsx`:
To replace characters 2 through 4 of `"Mostafa"` with `"XYZ"`:
```excel
=REPLACE("Mostafa", 2, 3, "XYZ")
```
*Result*: `"MXYZafa"`.

### 2. PII Data Masking (Credit Cards or National IDs)
Mask all except the last 4 digits of a 16-digit card:
```excel
=REPLACE(CardNumber, 1, 12, "************")
```

### 3. Inserting Text Without Deleting Any
Set `num_chars = 0` to insert characters at a position:
```excel
=REPLACE("20260929", 5, 0, "-")
```
*Result*: `"2026-0929"`.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

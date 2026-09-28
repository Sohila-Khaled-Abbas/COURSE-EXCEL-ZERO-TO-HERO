---
type: excel-function
category: text
difficulty: intermediate
aliases: [SUBSTITUTE]
tags: [excel, function, text, data-cleaning, replacement]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[REPLACE]]", "[[TRIM]]", "[[FIND]]"]
---

# SUBSTITUTE Function

> [!abstract] Purpose
> Substitutes `new_text` for `old_text` in a text string. Use `SUBSTITUTE` when you want to replace specific text in a string based on what the text is (rather than where it is located).

## Syntax

```excel
=SUBSTITUTE(text, old_text, new_text, [instance_num])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text or reference to a cell containing text for which you want to substitute characters. |
| `old_text` | **Required** | The text you want to replace. |
| `new_text` | **Required** | The text you want to use to replace `old_text`. Use `""` to delete `old_text`. |
| `instance_num` | *Optional* | Specifies which occurrence of `old_text` you want to replace. If omitted, **every** instance is replaced. |

## Practical Examples

### 1. Specific Instance Replacement Drill
From `Formulas_&_Functions_Part_1.xlsx`:
If `B1` contains messy space padding:
To replace only the 1st instance of a space:
```excel
=SUBSTITUTE(B1, " ", "-", 1)
```

### 2. Standardizing Delimiters Across an SKU
Replacing all slashes with hyphens:
```excel
=SUBSTITUTE(A2, "/", "-")
```

### 3. Stripping Unwanted Symbols or Line Breaks
Removing commas from formatted currency text:
```excel
=SUBSTITUTE(A2, ",", "")
```
Removing line breaks (`CHAR(10)`):
```excel
=SUBSTITUTE(A2, CHAR(10), " ")
```

## Critical Rules
- **Case-Sensitive**: `SUBSTITUTE` is strictly case-sensitive. Replacing `"man"` will not replace `"MAN"`.
- **No Wildcards**: Treats `*` and `?` as literal characters.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

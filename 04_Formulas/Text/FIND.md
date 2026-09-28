---
type: excel-function
category: text
difficulty: intermediate
aliases: [FIND]
tags: [excel, function, text, search, locator]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SEARCH]]", "[[MID]]", "[[LEFT]]"]
---

# FIND Function

> [!abstract] Purpose
> Locates one text string inside a second text string, and returns the number of the starting position of `find_text` from the first character of `within_text`. **FIND is strictly case-sensitive and does not allow wildcard characters.**

## Syntax

```excel
=FIND(find_text, within_text, [start_num])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `find_text` | **Required** | The text you want to find. |
| `within_text` | **Required** | The text containing the text you want to find. |
| `start_num` | *Optional* | Specifies the character position at which to start searching (defaults to `1`). |

## Practical Examples

### 1. Case-Sensitive Match Drill
From `Formulas_&_Functions_Part_1.xlsx`:
In `"MAN United"`:
```excel
=FIND("MAN", B1)
```
*Result*: returns character position index of `"MAN"`.
```excel
=FIND("man", B1)
```
*Result*: `#VALUE!` error (because `"man"` is lowercase and `FIND` is case-sensitive).

### 2. Finding Delimiter Position for Parsing
```excel
=FIND("@", Customer[Email])
```

## Gotchas & Behavior
- If `find_text` is `""` (empty string), `FIND` matches the first character (returns `1` or `start_num`).
- If `find_text` is not found, `FIND` returns `#VALUE!`. Trap with `IFERROR` or `ISNUMBER`.

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

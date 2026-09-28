---
type: excel-function
category: text
difficulty: intermediate
aliases: [SEARCH]
tags: [excel, function, text, search, locator]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[FIND]]", "[[MID]]", "[[LEFT]]"]
---

# SEARCH Function

> [!abstract] Purpose
> Locates one text string inside a second text string, and returns the number of the starting position of `find_text` from the first character of `within_text`. **SEARCH is NOT case-sensitive and allows wildcard characters (`*`, `?`).**

## Syntax

```excel
=SEARCH(find_text, within_text, [start_num])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `find_text` | **Required** | The text that you want to find. Can include wildcards `?` and `*`. |
| `within_text` | **Required** | The text in which you want to search for `find_text`. |
| `start_num` | *Optional* | The character number in `within_text` at which you want to start searching (defaults to `1`). |

## Practical Examples

### 1. Case-Insensitive Match Drill
From `Formulas_&_Functions_Part_1.xlsx`:
In `"MAN United"`:
```excel
=SEARCH("man", B1)
```
*Result*: Matches successfully regardless of uppercase or lowercase!

### 2. Wildcard Keyword Filtering
```excel
=ISNUMBER(SEARCH("corp*", Customer[Company]))
```
Returns `TRUE` if the company name contains "corp", "corporation", "corp.", etc.

### 3. Dynamic Name Split (Space Locator)
```excel
=LEFT(FullName, SEARCH(" ", FullName) - 1)
```

## Comparison: SEARCH vs FIND
| Feature | `SEARCH` | `FIND` |
| :--- | :--- | :--- |
| **Case Sensitive** | No (`"a"` matches `"A"`) | Yes (`"a"` $\neq$ `"A"`) |
| **Wildcards** | Supported (`*`, `?`, `~`) | Not supported |
| **Error Handling** | Returns `#VALUE!` if not found | Returns `#VALUE!` if not found |

---
## Related Knowledge
- Notes: [[05_Text_Manipulation_Functions]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx` (Sheet: `Text`)

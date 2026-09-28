---
type: excel-function
category: lookup
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [XLOOKUP]
tags: [excel, function, lookup]
status: mastered
related_functions: ["[[VLOOKUP]]", "[[INDEX]]", "[[MATCH]]"]
created: 2026-09-28
updated: 2026-09-28
---
# XLOOKUP Function
> [!abstract] Purpose
> Searches a range or array for a match and returns the corresponding item from a second range or array. Defaults to an exact match and supports bidirectional searches.

## Syntax
```excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

## Arguments Breakdown
| Argument | Required? | Description |
| :--- | :--- | :--- |
| `lookup_value` | **Required** | The value to search for |
| `lookup_array` | **Required** | The 1D array/range to search within |
| `return_array` | **Required** | The array/range containing return values |
| `if_not_found` | *Optional* | Fallback text if no match is found (e.g. `"Not Found"`) |
| `match_mode` | *Optional* | `0` = Exact match (default), `-1` = Exact or next smaller, `1` = Exact or next larger, `2` = Wildcard match |
| `search_mode` | *Optional* | `1` = First-to-last (default), `-1` = Last-to-first (reverse) |

## Practical Examples

### 1. Left Lookup Drill (Code $\rightarrow$ Client Name)
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `XLookup`, cell `K22`):
```excel
=XLOOKUP(J22, $D$3:$D$28, $A$3:$A$28, "مش موجود", 0, 1)
```
- `lookup_value`: `J22` (Client Code).
- `lookup_array`: `$D$3:$D$28` (Codes column).
- `return_array`: `$A$3:$A$28` (Client Name column — located to the **left** of the lookup column!).
- `if_not_found`: `"مش موجود"` (Custom Arabic fallback message preventing `#N/A`).
- `match_mode`: `0` (Exact match).
- `search_mode`: `1` (First to last).

### 2. Industry Lookup with Fallback Validation
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `XLookup`, cell `K54`):
```excel
=XLOOKUP(J54, $A$35:$A$60, $G$35:$G$60, "مش موجود", 0, 1)
```
When searching for non-existent client `'جمعة'`, the formula gracefully returns `"مش موجود"`.

> [!tip] The Coordinate Anchor Rule (F4 Locking)
> Always press `F4` to absolute-lock both `lookup_array` (`$D$3:$D$28`) and `return_array` (`$A$3:$A$28`) when dragging the formula across multiple rows!

---

## Business Analytics Use Case
Enriching transactional call records with agent metadata (department, supervisor, hire date) without fear of column shift errors.

## Related Knowledge
- Notes: [[04_Lookup_and_Reference_Functions]]
- Concepts: [[VLOOKUP vs XLOOKUP]], [[Why Not Always Formulas]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `XLookup`)
- 📘 [[XLOOKUP and Modern Lookups|Gemini Notebook: XLOOKUP and Modern Lookups Deep-Dive]]
- 🌐 [Gemini Notebook External Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)


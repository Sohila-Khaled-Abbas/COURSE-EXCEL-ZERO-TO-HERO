---
type: excel-function
category: lookup
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [XMATCH]
tags: [excel, function, lookup, dynamic-array, index]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MATCH]]", "[[INDEX]]", "[[XLOOKUP]]"]
---

# XMATCH Function

> [!abstract] Purpose
> Searches for a specified item in an array or range of cells, and returns the item's relative position. It is the modern, robust replacement for legacy `MATCH`.

## Syntax

```excel
=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `lookup_value` | **Required** | The value you want to search for. |
| `lookup_array` | **Required** | The array or range of cells to search within. |
| `match_mode` | *Optional* | `0` = Exact match (**default**), `-1` = Exact or next smaller, `1` = Exact or next larger, `2` = Wildcard match (`*`, `?`). |
| `search_mode` | *Optional* | `1` = Search first-to-last (**default**), `-1` = Search last-to-first (reverse), `2` = Binary search (ascending), `-2` = Binary search (descending). |

## Practical Examples

### 1. Dynamic Column Index Locator for INDEX
```excel
=INDEX(MasterData, RowNum, XMATCH("Revenue", MasterData[#Headers]))
```
Returns the column position of `"Revenue"` dynamically without hardcoding column numbers.

### 2. Reverse Position Search (Last-to-First)
Finding the row position of the most recent transaction:
```excel
=XMATCH("Active", StatusColumn, 0, -1)
```

## XMATCH vs Legacy MATCH
- **Exact by Default**: Legacy `MATCH` defaults to `1` (approximate match), requiring the range to be sorted ascending and causing subtle errors if you forget `, 0`. `XMATCH` defaults to `0` (exact match).
- **Reverse Search**: `XMATCH` natively searches from bottom-to-top (`search_mode = -1`), which was previously impossible without complex array formulas.

---
## Related Knowledge
- Notes: [[04_Lookup_and_Reference_Functions]]
- Concepts: [[INDEX and MATCH]], [[VLOOKUP vs XLOOKUP]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `XLookup`)

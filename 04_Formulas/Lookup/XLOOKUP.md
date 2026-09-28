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

## Example
```excel
=XLOOKUP([@Agent], DimAgent[Name], DimAgent[Team], "Unassigned")
```

## Business Analytics Use Case
Enriching transactional call records with agent metadata (department, supervisor, hire date) without fear of column shift errors.

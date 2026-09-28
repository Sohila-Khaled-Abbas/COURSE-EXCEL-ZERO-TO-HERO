---
type: excel-function
category: lookup
difficulty: beginner
introduced_in: "Legacy Excel"
aliases: [VLOOKUP]
tags: [excel, function, lookup]
status: mastered
related_functions: ["[[XLOOKUP]]", "[[INDEX]]", "[[MATCH]]"]
created: 2026-09-28
updated: 2026-09-28
---
# VLOOKUP Function
> [!abstract] Purpose
> Searches vertically down the leftmost column of a table range and returns a value in the same row from a specified column index.

## Syntax
```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

## Arguments Breakdown
| Argument | Required? | Description |
| :--- | :--- | :--- |
| `lookup_value` | **Required** | The value to locate in the first column |
| `table_array` | **Required** | The entire table range (e.g. `$A$2:$E$100`) |
| `col_index_num`| **Required** | The 1-based column number to return |
| `range_lookup` | *Optional* | `FALSE` = Exact match (Mandatory for analytics), `TRUE` = Approximate |

> [!danger] Warning
> Always specify `FALSE` for exact match in business analytics!

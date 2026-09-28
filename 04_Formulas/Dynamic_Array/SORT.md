---
type: excel-function
category: dynamic-array
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [SORT]
tags: [excel, function, dynamic-array]
status: mastered
---
# SORT Function
> [!abstract] Purpose
> Sorts the contents of a range or array by one or more columns in ascending or descending order, automatically spilling the sorted results into neighboring cells.

## Syntax
```excel
=SORT(array, [sort_index], [sort_order], [by_col])
```

## Inputs
- `array` *(Required)*: The range or array to sort.
- `[sort_index]` *(Optional)*: A number indicating the row or column to sort by (defaults to `1`, the first column).
- `[sort_order]` *(Optional)*: A number indicating the desired sort order:
  - `1`: Ascending order (Default, A-to-Z / smallest to largest).
  - `-1`: Descending order (Z-to-A / largest to smallest).
- `[by_col]` *(Optional)*: A logical value indicating the sort direction:
  - `FALSE`: Sort by row (Default).
  - `TRUE`: Sort by column.

## Examples

### 1. Basic Single-Column Ascending Sort
Sort customer names alphabetically:
```excel
=SORT(Table_Customers[CustomerName])
```

### 2. Multi-Column Table Sort by Column Index
Sort call records by `Speed of answer in seconds` (Column 5) in ascending order:
```excel
=SORT(CallData, 5, 1)
```

### 3. Combining with `FILTER` and `UNIQUE`
Extract unique agents with answered calls and sort alphabetically:
```excel
=SORT(UNIQUE(FILTER(CallData[Agent], CallData[Answered (Y/N)] = "Y")))
```

## Notes & Best Practices
- **Dynamic Spill**: `SORT` returns a dynamic array. Ensure sufficient unobstructed empty cells below and to the right of the formula cell to prevent `#SPILL!` errors.
- **Pairing with SORTBY**: When you need to sort by a column that is not part of the returned array itself, use `SORTBY(array, by_array1, [order1])` instead.
- **Reference Operator**: To reference the entire spilled result from another formula, append the spill operator (`#`), e.g., `=INDEX(D2#, 1, 1)`.

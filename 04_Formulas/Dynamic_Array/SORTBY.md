---
type: excel-function
category: dynamic-array
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [SORTBY]
tags: [excel, function, dynamic-array]
status: mastered
---
# SORTBY Function
> [!abstract] Purpose
> Sorts the contents of a range or array based on the values in a corresponding range or array, allowing sorting by columns that are not included in the returned output.

## Syntax
```excel
=SORTBY(array, by_array1, [sort_order1], [by_array2, sort_order2], ...)
```

## Inputs
- `array` *(Required)*: The range or array to sort.
- `by_array1` *(Required)*: The range or array to sort by. Must have the same number of rows (or columns) as `array`.
- `[sort_order1]` *(Optional)*: `1` for Ascending (Default), `-1` for Descending.
- `[by_array2, sort_order2]` *(Optional)*: Additional sorting levels and criteria.

## Example
Sort Agent names based on their Average Satisfaction Rating descending (highest CSAT first):
```excel
=SORTBY(Table_Agents[AgentName], Table_Agents[AvgCSAT], -1)
```

## Difference Between `SORT` and `SORTBY`
- Use `SORT` when sorting a table by an index column *within* that table (e.g. column 2 of a 4-column range).
- Use `SORTBY` when returning only a single column (or subset) and sorting by an external independent column or measure.

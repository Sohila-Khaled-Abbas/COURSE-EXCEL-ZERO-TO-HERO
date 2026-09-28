---
type: excel-function
category: aggregation
difficulty: intermediate
aliases: [SUMIFS]
tags: [excel, function, aggregation]
status: mastered
---
# SUMIFS Function
> [!abstract] Purpose
> Adds all numbers in a range that meet multiple criteria across multiple conditions.

## Syntax
```excel
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

## Example
```excel
=SUMIFS(Sales[Total], Sales[City], "Yangon", Sales[Gender], "Female")
```

---
type: excel-function
category: dynamic-array
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [FILTER]
tags: [excel, function, dynamic-array]
status: mastered
---
# FILTER Function
> [!abstract] Purpose
> Filters an array or range based on a Boolean criteria array and spills the matching results into neighboring cells.

## Syntax
```excel
=FILTER(array, include, [if_empty])
```

## Example
```excel
=FILTER(CallData, CallData[Satisfaction rating] = 5, "No 5-star calls")
```

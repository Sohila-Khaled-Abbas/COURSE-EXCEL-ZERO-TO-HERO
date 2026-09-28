---
type: excel-function
category: aggregation
difficulty: intermediate
aliases: [COUNTIFS]
tags: [excel, function, counting]
status: mastered
---
# COUNTIFS Function
> [!abstract] Purpose
> Counts the number of cells that meet multiple criteria across specified ranges.

## Syntax
```excel
=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

## Example
```excel
=COUNTIFS(CallData[Agent], "Diane", CallData[Answered (Y/N)], "Y", CallData[Resolved], "Y")
```

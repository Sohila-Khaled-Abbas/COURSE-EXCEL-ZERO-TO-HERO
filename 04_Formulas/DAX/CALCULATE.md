---
type: dax-function
category: dax
difficulty: advanced
aliases: [CALCULATE]
tags: [dax, power-pivot, calculate]
status: mastered
---
# CALCULATE Function (DAX)
> [!abstract] Purpose
> Evaluates an expression in an altered or overridden filter context. The cornerstone function of DAX.

## Syntax
```dax
CALCULATE(<expression>, <filter1>, <filter2>, ...)
```

## Example
```dax
AnsweredCalls := CALCULATE(
    COUNTROWS(Fact_Calls),
    Fact_Calls[Answered (Y/N)] = "Y"
)
```

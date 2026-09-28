---
type: dax-function
category: dax
difficulty: intermediate
aliases: [DIVIDE]
tags: [dax, power-pivot, divide]
status: mastered
---
# DIVIDE Function (DAX)
> [!abstract] Purpose
> Safe division function in DAX that automatically handles division by zero, returning blank or an alternate result instead of `#ERROR`.

## Syntax
```dax
DIVIDE(<numerator>, <denominator>, [<alternate_result>])
```

## Example
```dax
Resolution_Rate := DIVIDE(
    [Resolved_Calls],
    [Answered_Calls],
    0
)
```

---
type: excel-function
category: logical
difficulty: beginner
aliases: [AND]
tags: [excel, function, logical, boolean]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[OR]]", "[[NOT]]", "[[IF]]", "[[IFS]]"]
---

# AND Function

> [!abstract] Purpose
> Determines whether all conditions in a test are `TRUE`. Returns `TRUE` if all arguments evaluate to `TRUE`; returns `FALSE` if one or more arguments evaluate to `FALSE`.

## Syntax

```excel
=AND(logical1, [logical2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `logical1` | **Required** | The first condition you want to test that can evaluate to either `TRUE` or `FALSE`. |
| `logical2, ...` | *Optional* | Additional conditions you want to test (up to 255 arguments). |

## Practical Examples

### 1. Dual Criteria Performance Bonus
```excel
=IF(AND(Sales[Amount] > 100000, Sales[CSAT] >= 4.5), "Bonus Eligible", "Standard")
```

### 2. Date Range Verification
```excel
=AND(OrderDate >= DATE(2026, 1, 1), OrderDate <= DATE(2026, 12, 31))
```

---
## Related Knowledge
- Notes: [[03_Conditional_Logic_and_Decision_Making]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Logical `)

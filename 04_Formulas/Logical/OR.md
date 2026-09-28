---
type: excel-function
category: logical
difficulty: beginner
aliases: [OR]
tags: [excel, function, logical, boolean]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[AND]]", "[[NOT]]", "[[IF]]", "[[IFS]]"]
---

# OR Function

> [!abstract] Purpose
> Determines whether any conditions in a test are `TRUE`. Returns `TRUE` if any argument is `TRUE`; returns `FALSE` only if all arguments evaluate to `FALSE`.

## Syntax

```excel
=OR(logical1, [logical2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `logical1` | **Required** | The first condition you want to test (evaluates to `TRUE` or `FALSE`). |
| `logical2, ...` | *Optional* | Additional conditions to test (up to 255 conditions). |

## Practical Examples

### 1. Multi-Row Threshold Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Logical `):
```excel
=OR(C27 > 80, C28 > 80)
```
Evaluates whether either employee achieved an KPI score greater than 80.

### 2. Multi-Branch Flagging
```excel
=IF(OR(Location="Cairo", Location="Alexandria", Location="Giza"), "Metropolitan", "Regional")
```

---
## Related Knowledge
- Notes: [[03_Conditional_Logic_and_Decision_Making]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Logical `)

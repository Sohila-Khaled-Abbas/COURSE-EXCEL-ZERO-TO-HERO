---
type: excel-function
category: logical
difficulty: intermediate
aliases: [SWITCH]
tags: [excel, function, logical, branching]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[IFS]]", "[[IF]]", "[[XLOOKUP]]"]
---

# SWITCH Function

> [!abstract] Purpose
> Evaluates one value (called the expression) against a list of values, and returns the result corresponding to the first matching value. If there is no match, an optional default value may be returned.

## Syntax

```excel
=SWITCH(expression, val1, result1, [val2, result2], ..., [default])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `expression` | **Required** | The value or reference to be compared against `val1`, `val2`, etc. |
| `val1` | **Required** | A value that is compared against `expression`. |
| `result1` | **Required** | The corresponding result to be returned when `val1` matches `expression`. |
| `default` | *Optional* | A value to return if no matches are found. If omitted and no match is found, `#N/A` is returned. |

## Practical Examples

### 1. Currency Code Expansion
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Logical `):
```excel
=SWITCH(A2,
    "USD", "US Dollar",
    "EUR", "Euro",
    "EGP", "Egyptian Pound",
    "SAR", "Saudi Riyal",
    "Other Currency"
)
```

### 2. Department ID Mapping
```excel
=SWITCH(DeptID, 1, "Sales", 2, "Marketing", 3, "Finance", "General")
```

## SWITCH vs IFS
- **`IFS`** tests multiple different boolean expressions: `=IFS(A1>100, "High", B1="Yes", "Approved")`.
- **`SWITCH`** evaluates a **single expression** against exact values: `=SWITCH(Status, "O", "Open", "C", "Closed")`. It avoids repeating the variable name in every condition.

---
## Related Knowledge
- Notes: [[03_Conditional_Logic_and_Decision_Making]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Logical `)

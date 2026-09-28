---
type: excel-function
category: date_and_time
difficulty: beginner
aliases: [DAY]
tags: [excel, function, date, parsing]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MONTH]]", "[[YEAR]]", "[[DATE]]", "[[TODAY]]"]
---

# DAY Function

> [!abstract] Purpose
> Returns the day of the month, a number from 1 to 31, given a date serial number.

## Syntax

```excel
=DAY(serial_number)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `serial_number` | **Required** | The date of the day you are trying to find. |

## Practical Examples

### 1. Extract Day Component Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
```excel
=DAY(TODAY())
```
Returns current day of month integer (e.g. `29`).

### 2. End-of-Month Billing Flag
```excel
=IF(DAY(A2) >= 28, "Billing Cycle 4", "Standard Cycle")
```

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

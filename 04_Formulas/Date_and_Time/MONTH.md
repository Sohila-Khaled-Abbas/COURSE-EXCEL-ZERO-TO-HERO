---
type: excel-function
category: date_and_time
difficulty: beginner
aliases: [MONTH]
tags: [excel, function, date, parsing]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[DAY]]", "[[YEAR]]", "[[DATE]]", "[[EOMONTH]]"]
---

# MONTH Function

> [!abstract] Purpose
> Returns the month of a date represented by a serial number. The month is given as an integer, ranging from 1 (January) to 12 (December).

## Syntax

```excel
=MONTH(serial_number)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `serial_number` | **Required** | The date of the month you are trying to find. |

## Practical Examples

### 1. Extract Month Component Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
```excel
=MONTH(TODAY())
```
Returns month integer (e.g. `9` for September).

### 2. Quarterly Partitioning
```excel
=ROUNDUP(MONTH(A2) / 3, 0)
```
Converts month index (1-12) to Quarter index (`Q1`, `Q2`, `Q3`, `Q4`).

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

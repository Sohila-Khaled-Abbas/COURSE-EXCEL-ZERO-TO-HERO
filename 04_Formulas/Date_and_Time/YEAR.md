---
type: excel-function
category: date_and_time
difficulty: beginner
aliases: [YEAR]
tags: [excel, function, date, parsing]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[MONTH]]", "[[DAY]]", "[[DATE]]", "[[DATEDIF]]"]
---

# YEAR Function

> [!abstract] Purpose
> Returns the year corresponding to a date. The year is returned as an integer in the range 1900–9999.

## Syntax

```excel
=YEAR(serial_number)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `serial_number` | **Required** | The date of the year you want to find. |

## Practical Examples

### 1. Extract Year Component Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
```excel
=YEAR(TODAY())
```
Returns 4-digit year (e.g. `2026`).

### 2. Superstore Dataset Calculated Column
From `11_Demos_and_Workbooks/02_Data_Management/Superstore_Dataset_Demo.xlsx`:
```excel
=YEAR([@[Order Date]])
```
Extracted calendar year for 9,994 retail transactions.

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

---
type: excel-function
category: date_and_time
difficulty: beginner
aliases: [TODAY]
tags: [excel, function, date, time]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[NOW]]", "[[DATEDIF]]", "[[YEAR]]", "[[MONTH]]", "[[DAY]]"]
---

# TODAY Function

> [!abstract] Purpose
> Returns the serial number of the current system date. The serial number is the date-time code used by Excel for date and time calculations.

## Syntax

```excel
=TODAY()
```

*(Takes no arguments).*

## Practical Examples

### 1. Dynamic Client Age Calculation Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheets `Vlookup`, `HLookup`, `XLookup`):
```excel
=DATEDIF(E22, TODAY(), "Y")
```
Calculates client age dynamically based on Date of Birth in `E22`.

### 2. Days Elapsed (Aging Invoices)
```excel
=TODAY() - Invoices[IssueDate]
```

## Behavior & Gotchas
- **Volatile Function**: Recalculates every time any cell in the workbook changes or when the workbook opens.
- **Static Timestamp Alternative**: To insert today's date as a fixed, permanent static value that does not change tomorrow, press **`Ctrl + ;`**.

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

---
type: excel-function
category: date_and_time
difficulty: intermediate
aliases: [NETWORKDAYS.INTL, NETWORKDAYS_INTL]
tags: [excel, function, date, business-days, calendar]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[NETWORKDAYS]]", "[[DATEDIF]]", "[[TODAY]]"]
---

# NETWORKDAYS.INTL Function

> [!abstract] Purpose
> Returns the number of whole workdays between two dates using parameters to indicate which and how many days are weekend days. Unlike standard `NETWORKDAYS`, it supports international weekend patterns (such as Friday/Saturday in the Middle East).

## Syntax

```excel
=NETWORKDAYS.INTL(start_date, end_date, [weekend], [holidays])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `start_date` | **Required** | The start date for which the difference is calculated. |
| `end_date` | **Required** | The end date for which the difference is calculated. |
| `weekend` | *Optional* | Indicates the days of the week that are weekend days. Can be a number code or a 7-character string mask. |
| `holidays` | *Optional* | A range or array of one or more dates to exclude from the working calendar. |

### Weekend Codes & String Masks
- String mask: 7 characters long, starting with **Monday** (`0` = workday, `1` = weekend).
  - `"0000011"`: **Friday & Saturday weekend** (Egypt & Arab world).
  - `"0000110"`: Thursday & Friday weekend.
  - `"0000001"`: Sunday-only weekend.
- Numeric codes:
  - `1`: Saturday, Sunday (Western default)
  - `7`: Friday, Saturday
  - `11`: Sunday only

## Practical Examples

### 1. Middle East Business Day Calculation Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
```excel
=NETWORKDAYS.INTL(H18, H17, "0000011")
```
Calculates working business days between March 24, 2024 and December 20, 2026, treating Friday and Saturday as weekends.

### 2. Service Level Agreement (SLA) with Holiday Calendar
```excel
=NETWORKDAYS.INTL(TicketOpen, TicketClose, 7, Dim_Holidays[Date])
```

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

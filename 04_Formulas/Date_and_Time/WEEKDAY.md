---
type: excel-function
category: date_and_time
difficulty: intermediate
aliases: [WEEKDAY]
tags: [excel, function, date, periodicity]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[WEEKNUM]]", "[[NETWORKDAYS]]", "[[DAY]]"]
---

# WEEKDAY Function

> [!abstract] Purpose
> Returns the day of the week corresponding to a date. The day is given as an integer, ranging from 1 to 7 by default, based on the specified return type.

## Syntax

```excel
=WEEKDAY(serial_number, [return_type])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `serial_number` | **Required** | The date of the day you are trying to find. |
| `return_type` | *Optional* | A number that determines the type of return value (defaults to `1`). |

### Common Return Types:
- `1` (or omitted): Numbers `1` (Sunday) through `7` (Saturday).
- `2`: Numbers `1` (Monday) through `7` (Sunday). (Standard ISO / European / analytical practice).
- `3`: Numbers `0` (Monday) through `6` (Sunday).

## Practical Examples

### 1. Current Date Day-of-Week Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `, cell `D22`):
```excel
=WEEKDAY(D8)
```
Where `D8` contains `=TODAY()`. Answers the business question: **"اليوم كام في الأسبوع؟"** (Which day of the week is it numerically?).

### 2. Identify Weekend Days in Middle East Schedules
Flagging orders placed on Friday or Saturday:
```excel
=IF(OR(WEEKDAY(A2, 2)=5, WEEKDAY(A2, 2)=6), "Weekend", "Workday")
```

### 3. Operational Volume Distribution
Aggregating call center volume by day of week index to optimize shift staffing and staffing rosters.

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

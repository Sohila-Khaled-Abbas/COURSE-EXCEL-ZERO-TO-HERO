---
type: excel-function
category: date_and_time
difficulty: intermediate
aliases: [WEEKNUM]
tags: [excel, function, date, periodicity]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[WEEKDAY]]", "[[YEAR]]", "[[MONTH]]"]
---

# WEEKNUM Function

> [!abstract] Purpose
> Returns the week number of a specific date in the year (an integer from 1 to 54), indicating where the week falls numerically within the year.

## Syntax

```excel
=WEEKNUM(serial_number, [return_type])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `serial_number` | **Required** | The date within the week you want to find. |
| `return_type` | *Optional* | A number that determines on which day the week begins (defaults to `1` = Sunday). |

### Return Types:
- `1` (default): Week begins on **Sunday**.
- `2`: Week begins on **Monday**.
- `21`: ISO 8601 week number system (week 1 is the first week with 4+ days in the new year).

## Practical Examples

### 1. Current Date Week Number Drill
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `, cell `D23`):
```excel
=WEEKNUM(D8)
```
Where `D8` contains `=TODAY()`. Answers the business question: **"الأسبوع كام في السنة؟"** (Which week of the year does this date belong to?).

### 2. Standard Business Week (Monday Start)
```excel
=WEEKNUM(OrderDate, 2)
```
Ensures weeks start on Monday (aligning with international production cycles).

### 3. Retail Weekly Sales Variance
Comparing Week `N` this year vs Week `N` last year for retail benchmarking.

---
## Return Type System Reference
- **System 1 (Traditional)**: The week containing January 1 is Week 1.
  - `1`: Sunday (Default)
  - `2`: Monday
  - `11`: Monday
  - `12`: Tuesday
  - `17`: Sunday
- **System 2 (ISO 8601 Standard)**:
  - `21`: The first week of the year containing at least four days (Thursday) is Week 1. Eliminates 1-day or 2-day partial week anomalies at year start.

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

---
type: excel-function
category: date_and_time
difficulty: beginner
aliases: [NOW]
tags: [excel, function, date, time]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[TODAY]]", "[[MOD]]"]
---

# NOW Function

> [!abstract] Purpose
> Returns the serial number of the current date and time. Use `NOW` when you need to display the current date and time on a worksheet or calculate a value based on the current date and time.

## Syntax

```excel
=NOW()
```

*(Takes no arguments).*

## Practical Examples

### 1. Real-Time Operational Clock
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
```excel
=NOW()
```
Displays current date and exact hour/minute/second timestamp.

### 2. Elapsed Hours in Production Queue
```excel
=(NOW() - TicketOpenTimestamp) * 24
```

## Behavior & Gotchas
- **Volatile Function**: Causes continuous sheet recalculation.
- **Static Timestamp Shortcut**: To insert current time as a fixed static value, press **`Ctrl + Shift + ;`**.

---
## Related Knowledge
- Notes: [[06_Date_and_Time_Intelligence]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `Date and Time `)

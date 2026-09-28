---
type: lesson
course: Excel Zero to Hero
module: "Module 3"
topic: "Date & Time Intelligence"
status: in-progress
difficulty: intermediate
tags: [excel, lesson, dates, time-series, datedif, networkdays, calendar]
prerequisites: ["[[01_Data_Types_and_Formatting]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-29
video_chapter: "Chapter 3 – Excel Formulas & Functions"
video_timestamp: "1:38:56"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s"
---

# Lesson 3.6: Date Mathematics & Time-Series Calculations

> [!abstract] Learning Objective
> Execute dynamic date calculations, decompose date serials (`DAY`, `MONTH`, `YEAR`), calculate calendar cycles (`WEEKDAY`, `WEEKNUM`), compute tenure (`DATEDIF`), and analyze business day ranges with international weekend schedules (`NETWORKDAYS`, `NETWORKDAYS.INTL`).

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

---

## 1. Core Date & Time Functions

| Function | Syntax | Technical Mechanics | Key Analytical Use Case |
| :--- | :--- | :--- | :--- |
| **`TODAY`** | `=TODAY()` | Volatile integer serial representing current date. | Dynamic age calculation (`=DATEDIF(DOB, TODAY(), "Y")`). |
| **`NOW`** | `=NOW()` | Volatile decimal serial (integer date + fractional time). | Real-time SLA timestamps, operational clocks. |
| **`DAY`** | `=DAY(serial_number)` | Returns integer day of the month (`1` to `31`). | Cohort analysis, monthly billing cycles. |
| **`MONTH`** | `=MONTH(serial_number)` | Returns integer month of the year (`1` to `12`). | Monthly trend aggregation, seasonal indices. |
| **`YEAR`** | `=YEAR(serial_number)` | Returns 4-digit integer year (`1900` to `9999`). | Annual sales reporting, multi-year slicing. |
| **`WEEKDAY`** | `=WEEKDAY(serial, [type])` | Returns day of the week index (`1` to `7`). Type `2` sets Monday = `1`, Sunday = `7`. | Staffing models, peak day-of-week volume analysis. |
| **`WEEKNUM`** | `=WEEKNUM(serial, [type])`| Returns week number of the year (`1` to `54`). | Weekly sprint tracking, retail 4-5-4 calendars. |

---

## 2. Elapsed Time & Tenure: DATEDIF

`DATEDIF` computes the exact difference between two dates according to a specified unit interval:

```excel
=DATEDIF(start_date, end_date, unit)
```

| Unit Code | Output Description | Business Example |
| :---: | :--- | :--- |
| **`"Y"`** | Complete elapsed years | Customer/Client Age: `=DATEDIF(B6, TODAY(), "Y")` |
| **`"M"`** | Complete elapsed months | Customer tenure, subscription duration |
| **`"D"`** | Complete elapsed days | Days to delivery, inventory holding duration |
| **`"YM"`** | Months remaining after full years are excluded | Formatted tenure strings (e.g., "5 Years, 3 Months") |
| **`"YD"`** | Days remaining after full years are excluded | Year-to-date anniversary tracking |
| **`"MD"`** | Days remaining after full months are excluded | Exact day residue in age calculation |

> [!warning] Start Date Before End Date Rule
> If `start_date` is later than `end_date`, `DATEDIF` immediately returns a `#NUM!` error.

---

## 3. Business Days: NETWORKDAYS vs NETWORKDAYS.INTL

Tracking working business days while excluding weekends and statutory holidays is fundamental for SLAs and financial turnarounds:

```mermaid
flowchart LR
    Start["Project Dates"] --> Engine{"Weekend Structure?"}
    Engine -->|Default Sat/Sun| NW["NETWORKDAYS(start, end, [holidays])"]
    Engine -->|Custom / Middle East / Fri-Sat| NWI["NETWORKDAYS.INTL(start, end, weekend, [holidays])"]
```

### Standard Western Schedule
```excel
=NETWORKDAYS(StartDate, EndDate, [Holidays])
```
Automatically excludes Saturdays and Sundays.

### Regional / Middle East Weekend Schedule
```excel
=NETWORKDAYS.INTL(StartDate, EndDate, "0000011", [Holidays])
```
From `Formulas_&_Functions_Part_2.xlsx` (Sheet `Date and Time `):
- `"0000011"`: String mask of 7 digits starting from Monday. `0` = working day, `1` = non-working day. Here, Friday (`6th`) and Saturday (`7th`) are designated as weekends (Egypt / Middle East business week).
- Alternatively, integer weekend code `7` (Fri/Sat) or `11` (Sunday only) can be specified.

---

## 4. Practical Implementation Patterns

### Pattern A: Dynamic Client Age
From `Formulas_&_Functions_Part_2.xlsx`:
```excel
=DATEDIF(E22, TODAY(), "Y")
```

### Pattern B: SLA Turnaround in Net Business Days
```excel
=NETWORKDAYS.INTL(Tickets[OpenDate], Tickets[CloseDate], 7, Holidays[Date])
```

---

## Related Knowledge
- **Formulas**: [[TODAY]], [[NOW]], [[DAY]], [[MONTH]], [[YEAR]], [[DATEDIF]], [[NETWORKDAYS]], [[NETWORKDAYS.INTL]], [[WEEKDAY]], [[WEEKNUM]]
- **Concepts**: [[Data Cleaning]], [[Excel File Formats]]
- 📂 **Personal Workbook Demo**: [`11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20%28Excel%29/11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx)
  - Tab **`Date and Time `**: Hands-on calculations for `TODAY`, `NOW`, `DAY`, `MONTH`, `YEAR`, `DATEDIF`, `NETWORKDAYS`, `NETWORKDAYS.INTL`, `WEEKDAY`, and `WEEKNUM`.

---
type: lesson
course: Excel Zero to Hero
module: "Module 3"
topic: "Date & Time Intelligence"
status: not-started
difficulty: intermediate
tags: [excel, lesson, dates, time-series]
prerequisites: ["[[01_Data_Types_and_Formatting]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 3 – Excel Formulas & Functions\"
video_timestamp: \"1:38:56\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s\"
---

# Lesson 3.6: Date Mathematics & Time-Series Calculations

> [!abstract] Learning Objective
> Execute date calculations, parse timestamps, compute tenure, and analyze business day ranges using `TODAY`, `DATE`, `DATEDIF`, `EDATE`, `EOMONTH`, and `NETWORKDAYS`.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

## Core Date Functions
- `=TODAY()`: Dynamic current date (updates on sheet recalculation).
- `=NOW()`: Dynamic current timestamp (date + time).
- `=DATE(year, month, day)`: Synthesizes a valid date serial from distinct components.
- `=DATEDIF(start_date, end_date, "D" | "M" | "Y")`: Computes elapsed days, months, or full years.
- `=EDATE(start_date, months)`: Returns the same day `n` months in past or future.
- `=EOMONTH(start_date, months)`: Returns the last day of the month `n` months away.
- `=NETWORKDAYS(start_date, end_date, [holidays])`: Computes working business days (excludes weekends and holidays).

## Practical Application
Computing customer call age or SLA turnaround:
```excel
=DATEDIF([@CallDate], TODAY(), "D")
```

## Related Knowledge
- Formulas: [[DATE]], [[DATEDIF]], [[TODAY]], [[NETWORKDAYS]]

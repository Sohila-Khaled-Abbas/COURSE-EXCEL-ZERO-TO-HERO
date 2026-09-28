---
type: lesson
course: Excel Zero to Hero
module: Module 3
topic: Statistical & Aggregation Functions
status: completed
difficulty: beginner
tags:
  - excel
  - lesson
  - aggregation
  - sumifs
  - countifs
prerequisites:
  - "[[01_Formula_Basics_and_Cell_Referencing]]"
related_project: "[[Call Center Performance Analysis]]"
source: https://youtu.be/uv1bxe2gdnU
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 3 – Excel Formulas & Functions\"
video_timestamp: \"1:38:56\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s\"
---

# Lesson 3.2: Aggregations, Counting & Multi-Condition Logic

> [!abstract] Learning Objective
> Implement fundamental aggregations (`SUM`, `AVERAGE`, `COUNT`, `COUNTA`) and execute multi-condition analytical queries using `SUMIFS`, `COUNTIFS`, and `AVERAGEIFS`.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

## Core Concepts & Syntax

### Basic Aggregations
- `=SUM(range)`: Adds all numeric values.
- `=AVERAGE(range)`: Arithmetic mean (ignores text and blanks).
- `=COUNT(range)`: Counts cells containing numbers.
- `=COUNTA(range)`: Counts non-empty cells (numbers, text, errors).
- `=COUNTBLANK(range)`: Counts empty cells.

### Multi-Condition Aggregations
```excel
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)
```

> [!important] SUMIFS vs SUMIF Syntax Trap
> In single-condition `SUMIF(criteria_range, criteria, [sum_range])`, the sum range comes **last**.  
> In multi-condition `SUMIFS(sum_range, criteria_range1, criteria1, ...)`, the sum range comes **first**! Always prefer `SUMIFS`.

## Practical Example: Call Center Answer Rate
To calculate total answered calls by Agent "Diane":
```excel
=COUNTIFS(CallData[Agent], "Diane", CallData[Answered (Y/N)], "Y")
```

## Related Knowledge
- Formulas: [[SUMIFS]], [[COUNTIFS]], [[AVERAGEIFS]]
- Concepts: [[Structured References]]
- Practice: [[Ex02_Formulas_and_Lookup_Logic]]

---
type: lesson
course: Excel Zero to Hero
module: "Module 9"
topic: "Essential DAX Functions"
status: not-started
difficulty: advanced
tags: [dax, calculate, divide, related]
prerequisites: ["[[03_DAX_Fundamentals_Calculated_Columns_vs_Measures]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 9 – Data Modeling, Power Pivot & DAX\"
video_timestamp: \"5:03:39\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s\"
---

# Lesson 9.4: Essential DAX Calculations: CALCULATE, DIVIDE & RELATED

> [!abstract] Learning Objective
> Write production-grade DAX measures to calculate rates, safely handle division by zero, fetch dimensional attributes, and alter filter context using `CALCULATE`.

> 🎥 **Video Chapter**: [Chapter 9 – Data Modeling, Power Pivot & DAX (5:03:39)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s)

## Essential DAX Syntax & Formulas

### 1. Safe Division with DIVIDE
Avoids `#DIV/0!` errors automatically:
```dax
Answer_Rate := DIVIDE(
    [Answered_Calls],
    [Total_Calls],
    0
)
```

### 2. Modifying Filter Context with CALCULATE
`CALCULATE` is the most powerful function in DAX; it evaluates an expression within an altered filter context:
```dax
Resolved_Calls := CALCULATE(
    COUNTROWS(Fact_Calls),
    Fact_Calls[Resolved] = "Y"
)
```

### 3. Fetching Dimension Values with RELATED
In a calculated column on the Fact table:
```dax
Agent_Manager = RELATED(Dim_Agent[Manager])
```

## Related Knowledge
- Concepts: [[Data Analysis Expressions (DAX)]], [[Calculated Columns vs DAX Measures]]
- Formulas: [[CALCULATE]], [[DIVIDE]], [[RELATED]]
- Projects: [[06_Projects/Call Center Performance Analysis/KPIs]]

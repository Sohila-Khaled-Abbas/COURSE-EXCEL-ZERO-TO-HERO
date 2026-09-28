---
type: lesson
course: Excel Zero to Hero
module: "Module 3"
topic: "Logical Functions"
status: not-started
difficulty: intermediate
tags: [excel, lesson, logical, if, ifs, iferror]
prerequisites: ["[[01_Formula_Basics_and_Cell_Referencing]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 3 – Excel Formulas & Functions\"
video_timestamp: \"1:38:56\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s\"
---

# Lesson 3.3: Conditional Logic, Boolean Evaluation & Error Handling

> [!abstract] Learning Objective
> Build robust decision trees and defensive calculations using `IF`, `AND`, `OR`, modern `IFS`, and error-trapping with `IFERROR`.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

## Syntax & Mechanics
```excel
=IF(logical_test, value_if_true, [value_if_false])
=IFS(test1, val1, [test2, val2], ..., [TRUE, fallback_val])
=IFERROR(value, value_if_error)
```

## Practical Application: Speed of Answer Category
Classifying call answer speed:
```excel
=IFS(
    [@Speed] <= 30, "Fast (<30s)",
    [@Speed] <= 60, "Acceptable (30-60s)",
    [@Speed] > 60, "Slow (>60s)",
    TRUE, "Unanswered"
)
```

## Defensive Error Handling
When computing averages that might encounter division by zero:
```excel
=IFERROR(CallData[ResolvedCalls] / CallData[AnsweredCalls], 0)
```

## Related Knowledge
- Formulas: [[IF]], [[IFS]], [[IFERROR]], [[AND]], [[OR]]

---
type: lesson
course: Excel Zero to Hero
module: "Module 4"
topic: "Structured References"
status: not-started
difficulty: intermediate
tags: [excel, lesson, structured-references, syntax]
prerequisites: ["[[01_Excel_Tables_Architecture]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 4 – Excel Tables\"
video_timestamp: \"2:35:55\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=9355s\"
---

# Lesson 4.2: Structured References Syntax & Formula Engineering

> [!abstract] Learning Objective
> Write clean, readable, and self-documenting formulas using Excel Table structured reference syntax.

> 🎥 **Video Chapter**: [Chapter 4 – Excel Tables (2:35:55)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=9355s)

## Structured Referencing Syntax Guide
- `[@ColumnName]`: Refers to the value in `ColumnName` in the **current row**.
- `TableName[ColumnName]`: Refers to the entire data range of `ColumnName` (excluding header and total).
- `TableName[[#All], [ColumnName]]`: Includes header, data, and totals.
- `TableName[#Headers]`: Refers to the table's header row.
- `TableName[#Totals]`: Refers to the table's summary total row.

## Example Formula
Calculating call duration in minutes from seconds within an Excel Table:
```excel
=[@[Speed of answer in seconds]] / 60
```

## Related Knowledge
- Concepts: [[Structured References]], [[Excel Tables]]

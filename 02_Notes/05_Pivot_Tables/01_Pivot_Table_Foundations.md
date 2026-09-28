---
type: lesson
course: Excel Zero to Hero
module: "Module 5"
topic: "Pivot Table Foundations"
status: not-started
difficulty: intermediate
tags: [excel, lesson, pivot-tables, summarization]
prerequisites: ["[[01_Excel_Tables_Architecture]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: "Chapter 5 – Pivot Tables"
video_timestamp: "2:58:28"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=10708s"
---

# Lesson 5.1: Pivot Table Architecture & Field Layouts

> [!abstract] Learning Objective
> Create dynamic Pivot Tables from structured tables, configure Row, Column, Value, and Filter drop zones, and execute instant aggregations without writing code.

> 🎥 **Video Chapter**: [Chapter 5 – Pivot Tables (2:58:28)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=10708s)

## The 4 Quadrants of a Pivot Table
```mermaid
graph TD
    subgraph Fields ["Pivot Table Field List"]
        F1[Fields: Agent, Topic, Answered, Speed, CSAT]
    end
    subgraph Quadrants ["Drop Zones"]
        FILT[Filters: Global Slicing]
        COL[Columns: Secondary Dimension]
        ROW[Rows: Primary Dimension]
        VAL[Values: Aggregations SUM/COUNT/AVG]
    end
    F1 --> FILT
    F1 --> COL
    F1 --> ROW
    F1 --> VAL
```

## Step-by-Step Creation
1. Select source table (`CallData`).
2. Go to **Insert > PivotTable** (`Alt + N + V + T`).
3. Choose *New Worksheet*.
4. Drag `Agent` to **Rows**.
5. Drag `Call Id` to **Values** (defaults to `Count of Call Id`).
6. Drag `Satisfaction rating` to **Values** -> change Summarize By to **Average**.

## Related Knowledge
- Concepts: [[Pivot Tables]]
- Projects: [[Hotel Reservation Analysis]], [[Call Center Performance Analysis]]

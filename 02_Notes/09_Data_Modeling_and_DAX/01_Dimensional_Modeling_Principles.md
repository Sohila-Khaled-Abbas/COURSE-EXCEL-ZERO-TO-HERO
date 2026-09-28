---
type: lesson
course: Excel Zero to Hero
module: "Module 9"
topic: "Dimensional Modeling"
status: not-started
difficulty: advanced
tags: [data-modeling, star-schema, power-pivot, bi]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 9 – Data Modeling, Power Pivot & DAX\"
video_timestamp: \"5:03:39\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s\"
---

# Lesson 9.1: Dimensional Modeling Principles: Star Schema vs Snowflake Schema

> [!abstract] Learning Objective
> Transition from flat spreadsheet thinking to dimensional modeling, designing Star Schemas that optimize performance, reduce redundancy, and simplify analytical reporting.

> 🎥 **Video Chapter**: [Chapter 9 – Data Modeling, Power Pivot & DAX (5:03:39)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s)

## Why Flat Tables Fail at Scale
Storing everything in a single massive flat table creates data anomalies, consumes huge memory, causes Cartesian product inflation, and makes multi-dimensional aggregation slow.

## Star Schema Architecture
```mermaid
erDiagram
    DIM_AGENT ||--o{ FACT_CALLS : handles
    DIM_TOPIC ||--o{ FACT_CALLS : categorizes
    DIM_DATE ||--o{ FACT_CALLS : logs

    FACT_CALLS {
        string Call_ID PK
        date Date FK
        string Agent_ID FK
        string Topic_ID FK
        int Speed_of_Answer
        int Talk_Duration
        int CSAT_Rating
    }
    DIM_AGENT {
        string Agent_ID PK
        string Agent_Name
        string Department
    }
    DIM_TOPIC {
        string Topic_ID PK
        string Topic_Name
        string Category
    }
    DIM_DATE {
        date Date PK
        int Year
        string Quarter
        string Month
    }
```

## Related Knowledge
- Concepts: [[Dimensional Modeling]], [[Star Schema vs Snowflake Schema]], [[Fact vs Dimension Tables]]

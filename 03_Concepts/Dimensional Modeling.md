---
type: concept
category: data-modeling
aliases: [Dimensional Modeling, Kimball Methodology, Star Schema]
tags: [data-modeling, star-schema, power-pivot, bi]
difficulty: advanced
status: mastered
related_lessons: ["[[01_Dimensional_Modeling_Principles]]"]
related_project: "[[Call Center Performance Analysis]]"
created: 2026-09-28
updated: 2026-09-28
---

# Concept: Dimensional Modeling

> [!summary] Definition & Mental Model
> Dimensional Modeling (Ralph Kimball methodology) is an analytical database design technique that organizes data into numeric measurement tables (**Fact Tables**) surrounded by context-providing attribute tables (**Dimension Tables**).

## 1. What Is It?
The foundation of modern Business Intelligence. It rejects single flat tables in favor of structured schemas that optimize query performance, simplify report authoring, and eliminate data redundancy.

## 2. Core Building Blocks
- **Fact Table**: Contains quantitative metrics, transactions, and foreign keys (e.g. `Fact_Calls`: call ID, speed of answer, duration, rating).
- **Dimension Table**: Contains descriptive business attributes, hierarchies, and primary keys (e.g. `Dim_Agent`: name, department, tenure; `Dim_Topic`: category).

```mermaid
erDiagram
    DIM_AGENT ||--o{ FACT_CALLS : handles
    DIM_TOPIC ||--o{ FACT_CALLS : categorizes
    DIM_DATE ||--o{ FACT_CALLS : occurs_on

    FACT_CALLS {
        string CallID PK
        string AgentKey FK
        string TopicKey FK
        date DateKey FK
        float SpeedOfAnswer
        float CSAT
    }
```

## 3. Related Concepts
- [[Star Schema vs Snowflake Schema]]
- [[Fact vs Dimension Tables]]
- [[Data Analysis Expressions (DAX)]]

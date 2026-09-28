---
type: lesson
course: Excel Zero to Hero
module: "Module 9"
topic: "Star Schema Relationships"
status: not-started
difficulty: advanced
tags: [data-modeling, relationships, power-pivot]
prerequisites: ["[[01_Dimensional_Modeling_Principles]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 9 – Data Modeling, Power Pivot & DAX\"
video_timestamp: \"5:03:39\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s\"
---

# Lesson 9.2: Establishing Relationships & Cardinality in Power Pivot

> [!abstract] Learning Objective
> Build and manage 1-to-Many relationships in Power Pivot Diagram View, enforce referential integrity, and understand filter propagation direction.

> 🎥 **Video Chapter**: [Chapter 9 – Data Modeling, Power Pivot & DAX (5:03:39)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s)

## Relationship Mechanics
- **Primary Key (PK)**: A column in the Dimension table where every value is unique (e.g. `AgentID` in `Dim_Agent`).
- **Foreign Key (FK)**: A column in the Fact table that references the PK (e.g. `AgentID` in `Fact_Calls`).
- **Cardinality**: `1-to-Many (1:*)`. Filters flow from the 1-side (Dimension) to the Many-side (Fact table).

## Related Knowledge
- Concepts: [[Fact vs Dimension Tables]], [[Star Schema vs Snowflake Schema]]

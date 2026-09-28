---
type: lesson
course: Excel Zero to Hero
module: "Module 8"
topic: "Combining Queries"
status: not-started
difficulty: advanced
tags: [excel, lesson, power-query, merge, append]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 8 – Power Query & M Language\"
video_timestamp: \"4:20:30\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s\"
---

# Lesson 8.3: Combining Queries: Append (Unions) vs Merge (Relational Joins)

> [!abstract] Learning Objective
> Combine multiple disparate tables using Append Queries (stacking rows vertically) and Merge Queries (joining attributes horizontally based on matching keys).

> 🎥 **Video Chapter**: [Chapter 8 – Power Query & M Language (4:20:30)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s)

## Append vs Merge Breakdown
```mermaid
flowchart TD
    subgraph Append ["Append Queries (SQL UNION ALL)"]
        A1["Table Q1 (1,000 Rows)"]
        A2["Table Q2 (1,500 Rows)"]
        A1 --- A2 --> AR["Appended Table (2,500 Rows)"]
    end
    subgraph Merge ["Merge Queries (SQL JOIN)"]
        M1["Orders Table [OrderID, CustID, Total]"]
        M2["Customers Table [CustID, Name, City]"]
        M1 -. Join on CustID .- M2 --> MR["Enriched Table [OrderID, Total, Name, City]"]
    end
```

## Merge Join Kinds
- **Left Outer**: All rows from first table, matching rows from second (most common).
- **Inner**: Only rows that match in both tables.
- **Full Outer**: All rows from both tables.
- **Left Anti**: Rows that exist ONLY in the first table (crucial for finding orphaned records!).

## Related Knowledge
- Concepts: [[Power Query]], [[ETL Process]]

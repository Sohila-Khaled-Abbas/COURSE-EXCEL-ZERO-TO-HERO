---
type: lesson
course: Excel Zero to Hero
module: "Module 8"
topic: "Core Data Transformations"
status: not-started
difficulty: intermediate
tags: [excel, lesson, power-query, unpivot, transformations]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 8 – Power Query & M Language\"
video_timestamp: \"4:20:30\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s\"
---

# Lesson 8.2: Core Power Query Transformations: Unpivoting, Splitting & Types

> [!abstract] Learning Objective
> Execute essential data shaping operations in Power Query including unpivoting cross-tabulated reports, splitting columns, replacing values, and enforcing strict data types.

> 🎥 **Video Chapter**: [Chapter 8 – Power Query & M Language (4:20:30)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s)

## The Magic of Unpivoting Columns
Human beings love wide tables with months across columns; databases and Pivot Tables require **tall, normalized tables**.
- **The Problem**: A table with columns `Jan, Feb, Mar, Apr...` cannot be easily sliced or summarized.
- **The Solution**: Select ID columns -> right-click -> **Unpivot Other Columns**.
- **The Result**: Produces three clean columns: `ID`, `Attribute (Month)`, and `Value (Sales)`.

## Essential Applied Steps
1. **Change Type**: Explicitly cast columns to Text, Whole Number, Currency, or Date.
2. **Split Column**: By Delimiter (Comma, Space, Custom) or By Number of Characters.
3. **Replace Values**: Replace `"N/A"` or `"null"` with standard values.
4. **Remove Blank Rows / Errors**: Purge corrupted records before loading.

## Related Knowledge
- Concepts: [[Power Query]], [[Data Cleaning]]

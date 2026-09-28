---
type: lesson
course: Excel Zero to Hero
module: "Module 5"
topic: "Grouping & Calculated Fields"
status: not-started
difficulty: advanced
tags: [excel, lesson, pivot-tables, grouping, calculated-fields]
prerequisites: ["[[01_Pivot_Table_Foundations]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: "Chapter 5 – Pivot Tables"
video_timestamp: "2:58:28"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=10708s"
---

# Lesson 5.3: Date/Number Grouping & Calculated Fields

> [!abstract] Learning Objective
> Group dates into calendar hierarchies (Years, Quarters, Months), bin continuous numbers into distribution buckets, and inject custom formulas via Calculated Fields.

> 🎥 **Video Chapter**: [Chapter 5 – Pivot Tables (2:58:28)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=10708s)

## Date & Numeric Grouping
- **Date Grouping**: Right-click any date in a Pivot Table -> select **Group** -> select *Months, Quarters, Years*.
- **Numeric Binning**: Right-click continuous metrics (e.g. Speed of Answer) -> select **Group** -> set *Starting at: 0*, *Ending at: 120*, *By: 20* (creates bins: `0-20`, `21-40`, etc.).

## Calculated Fields
- Go to **PivotTable Analyze > Fields, Items & Sets > Calculated Field**.
- Name: `Resolution_Rate`.
- Formula: `=Resolved / TotalAnswered`.

> [!warning] Calculated Field Caution
> Calculated fields in standard Pivot Tables always compute the sum of items first before evaluating expressions. For ratio metrics, Power Pivot DAX measures are superior.

## Related Knowledge
- Concepts: [[Pivot Tables]], [[Calculated Columns vs DAX Measures]]

---
type: lesson
course: Excel Zero to Hero
module: "Module 6"
topic: "Chart Selection & Visual Analytics"
status: not-started
difficulty: intermediate
tags: [excel, lesson, visualization, charts]
prerequisites: ["[[01_Excel_Tables_Architecture]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: "Chapter 6 – Data Analysis Charts"
video_timestamp: "3:26:58"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D"
---

# Lesson 6.1: Visual Analytics & Chart Selection Matrix

> [!abstract] Learning Objective
> Select the scientifically optimal chart type based on the underlying analytical question (Comparison, Composition, Distribution, Relationship, or Trend).

> 🎥 **Video Chapter**: [Chapter 6 – Data Analysis Charts (3:26:58)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D)

## Why This Matters
Data visualization is not decorative; it is cognitive compression. Choosing the wrong chart leads to visual confusion, misinterpretation, and cognitive overload for business executives.

## Chart Selection Decision Matrix
```mermaid
flowchart TD
    Q{What is your goal?}
    Q -->|Compare Categories| C[Column / Bar Chart]
    Q -->|Trend Over Time| T[Line / Area Chart]
    Q -->|Part-to-Whole| P[Donut / Treemap / 100% Stacked Bar]
    Q -->|Distribution| D[Histogram / Box Plot]
    Q -->|Correlation / Relationship| R[Scatter Plot / Bubble Chart]
```

## Detailed Breakdown
- **Column / Bar Charts**: Best for discrete category comparison (e.g. Total Calls by Agent). Use horizontal bar charts when category labels are long.
- **Line Charts**: Best for continuous temporal trends (e.g. Call volume by hour of day).
- **Donut / Treemap**: Composition. Avoid pie charts with >5 slices; prefer treemaps or horizontal bars.
- **Scatter Plots**: Bivariate correlation (e.g. Speed of Answer vs Customer Satisfaction).

## Related Knowledge
- Concepts: [[Dashboard Design Principles]]
- Projects: [[06_Projects/Call Center Performance Analysis/Findings]]

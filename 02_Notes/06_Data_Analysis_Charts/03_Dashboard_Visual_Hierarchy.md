---
type: lesson
course: Excel Zero to Hero
module: "Module 6"
topic: "Dashboard Visual Hierarchy"
status: not-started
difficulty: advanced
tags: [excel, lesson, dashboard, layout]
prerequisites: ["[[01_Visual_Analytics_and_Chart_Selection]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: "Chapter 6 – Data Analysis Charts"
video_timestamp: "3:26:58"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D"
---

# Lesson 6.3: Executive Dashboard Layout & Visual Hierarchy

> [!abstract] Learning Objective
> Design a cohesive, grid-aligned executive dashboard layout incorporating KPI summary cards, interactive filter panels, and intuitive information flow.

> 🎥 **Video Chapter**: [Chapter 6 – Data Analysis Charts (3:26:58)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D)

## The "F-Pattern" Dashboard Layout
Executives read dashboards in an F-pattern (top-to-bottom, left-to-right):
1. **Top Header**: Dashboard Title, Date Scope, and Slicer Controls.
2. **Upper Tier**: 4-5 High-Level KPI Summary Cards (Total Calls, Answer Rate %, Resolution Rate %, ASA, CSAT).
3. **Middle Tier**: Primary comparative and distribution charts (Agent Performance, Topic Breakdown).
4. **Bottom Tier**: Detailed time-series trends and granular tabular summaries.

```mermaid
flowchart TD
    subgraph Top ["Tier 1: KPI Cards"]
        K1["Total Calls: 5,000"]
        K2["Answer Rate: 81.1%"]
        K3["Resolution Rate: 89.9%"]
        K4["Avg Speed: 67.5s"]
        K5["Avg CSAT: 3.40 / 5.0"]
    end
    subgraph Mid ["Tier 2: Core Analytical Views"]
        C1["Agent Performance Bar Chart"]
        C2["Call Topics Breakdown (Donut)"]
    end
    subgraph Bot ["Tier 3: Time Dynamics"]
        T1["Hourly Call Volume & Abandonment Trend"]
    end
    Top --> Mid
    Mid --> Bot
```

## Related Knowledge
- Concepts: [[Dashboard Design Principles]]
- Projects: [[06_Projects/Call Center Performance Analysis/Project Overview]]

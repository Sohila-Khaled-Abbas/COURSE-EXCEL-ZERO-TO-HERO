---
type: lesson
course: Excel Zero to Hero
module: "Module 6"
topic: "Chart Formatting & De-Cluttering"
status: not-started
difficulty: intermediate
tags: [excel, lesson, visualization, chart-junk]
prerequisites: ["[[01_Visual_Analytics_and_Chart_Selection]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: "Chapter 6 – Data Analysis Charts"
video_timestamp: "3:26:58"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D"
---

# Lesson 6.2: Decluttering, Data-Ink Ratio & Palettes

> [!abstract] Learning Objective
> Remove visual noise, optimize the data-ink ratio (Edward Tufte principle), implement purposeful color palettes, and link dynamic formula titles to charts.

> 🎥 **Video Chapter**: [Chapter 6 – Data Analysis Charts (3:26:58)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D)

## Core Rules for Executive Charts
1. **Eliminate Chart Clutter**: Remove 3D effects, heavy gridlines, redundant axis lines, and dark backgrounds.
2. **Direct Data Labeling**: If data labels are used directly on bars, remove the vertical Y-axis to eliminate redundancy.
3. **Intentional Accent Color**: Use neutral grays for benchmark/baseline data, and reserve a single vibrant accent color (e.g. Navy or Emerald) for the primary insight.
4. **Dynamic Chart Titles**:
   - Create a title cell: `="Total Calls by Agent (Q1 2021) - Total: " & TEXT(SUM(CallData[Calls]), "#,##0")`
   - Click the chart title border -> type `=` in the Formula Bar -> click the title cell -> press `Enter`.

## Related Knowledge
- Concepts: [[Dashboard Design Principles]]

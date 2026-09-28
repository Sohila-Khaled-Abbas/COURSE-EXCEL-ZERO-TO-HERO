---
type: concept
category: visualization
aliases: [Slicers, Timelines, Report Connections]
tags: [excel, concept, slicers, interactivity]
difficulty: intermediate
status: mastered
related_lessons: ["[[04_Interactive_Filtering_with_Slicers_and_Timelines]]"]
related_project: "[[Call Center Performance Analysis]]"
created: 2026-09-28
updated: 2026-09-28
---

# Concept: Slicers & Timelines

> [!summary] Definition & Mental Model
> Slicers and Timelines are visual filtering controls that link to one or more Pivot Tables or Excel Tables, enabling one-click exploratory filtering with clear visual feedback on active subsets.

## 1. What Is It?
Interactive UI components that sit above worksheets:
- **Slicers**: Categorical filter buttons (e.g. `Agent`, `Topic`, `Status`).
- **Timelines**: Dedicated chronological date scrubber bars (Years, Quarters, Months, Days).

## 2. Why Is It Used?
Standard table dropdown filters hide what has been selected and require multiple clicks. Slicers display all available options, highlighting selected items in color and dimming filtered-out items.

## 3. Report Connections Architecture
A single Slicer can control 10 different Pivot Tables across multiple sheets:
```mermaid
flowchart TD
    Slicer[Agent Slicer: Diane, Becky, Jim...] -->|Report Connections| PT1[KPI Cards Pivot]
    Slicer -->|Report Connections| PT2[Topic Breakdown Pivot]
    Slicer -->|Report Connections| PT3[Hourly Volume Trend]
    Slicer -->|Report Connections| PT4[Agent Scorecard Pivot]
```

## 4. Resetting Filters via VBA
In complex executive dashboards with multiple slicers, a "Clear Filters" button powered by a macro restores default views:
```vba
Sub ClearAllSlicers()
    Dim sc As SlicerCache
    For Each sc In ThisWorkbook.SlicerCaches
        sc.ClearManualFilter
    Next sc
End Sub
```

## 5. Related Concepts
- [[Pivot Tables]]
- [[Dashboard Design Principles]]

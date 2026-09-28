---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Source
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Visualization & Dashboard Design
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - dashboard
  - visualization
  - design-principles
  - gemini-notebook
---

# Executive Dashboard Design Principles

## Why This Resource Matters
Data analysis is useless if stakeholders cannot easily interpret insights or make decisions. Cluttered worksheets with unaligned charts, high-saturation rainbow color schemes, and missing KPI cards fail executive communication standards. A structured UI/UX blueprint ensures dashboards are intuitive, responsive, and visually compelling.

---

## Source Summary
The Gemini Notebook curriculum specifies key visual analytics and interface design rules for enterprise dashboards:
- **Z-Pattern Layout**: The executive eye naturally scans from top-left (high-level KPI metrics), across to top-right (temporal trends), down to bottom-left (categorical breakdowns), and across to bottom-right (drill-down transaction tables).
- **KPI Card Hierarchy**: Big Numbers First (BANs). Cards should feature clear value callouts (e.g. `24pt+ bold`), descriptive micro-labels (`9pt uppercase`), and contextual trend indicators (vs Target or vs Prior Period).
- **Curated Color Palettes**: Limit dominant hues to 2 corporate tones (e.g., Deep Navy and Slate Gray), reserving a single vibrant accent color (e.g., Coral or Amber) strictly for alerts, anomalies, or selected slicer states.
- **Grid Discipline**: Align all cards, charts, and slicers to exact grid coordinates using Excel's "Snap to Grid" (`Page Layout -> Align -> Snap to Grid`).
- **One-Click Reset Mechanics**: Implement a clean UI button connected to a lightweight VBA macro (`ActiveWorkbook.SlicerCaches("...").ClearManualFilter`) to reset interactive slicers.

---

## My Understanding
A data dashboard in Excel is not a canvas for artistic experimentation; it is a software user interface built on a tabular engine. By hiding gridlines (`View -> Uncheck Gridlines`), standardizing card padding, and binding slicers across multiple Pivot Tables via Report Connections, the workbook transforms into an application-grade reporting tool.

---

## Key Takeaways
1. **Remove Cognitive Noise**: Eliminate 3D charts, heavy drop-shadows, dual vertical axis charts that confuse scales, and redundant data labels.
2. **Synchronize Slicers**: Ensure each Slicer controls all relevant Pivot Tables on hidden calculation tabs using `Slicer -> Report Connections`.
3. **Dedicated Architecture**: Always maintain three distinct worksheet layers:
   - `01_Data`: Clean structured Excel tables.
   - `02_Calc`: Pivot Tables, dynamic arrays, and intermediate math.
   - `03_Dashboard`: Presentation layer containing exclusively cards, charts, and slicers.

---

## Important Examples

### Grid Blueprint Structure
```text
+-------------------------------------------------------------------------+
| [LOGO]  EXECUTIVE CALL CENTER PERFORMANCE REPORT     [RESET SLICERS]    |
+-------------------------------------------------------------------------+
| [Total Calls: 5,000] [Answered: 81.1%] [Resolved: 89.9%] [CSAT: 3.4/5] |
+------------------------------------+------------------------------------+
| [Calls by Topic - Bar Chart]       | [Call Volume by Hour - Area Chart] |
|                                    |                                    |
+------------------------------------+------------------------------------+
| [Agent Performance Matrix Table]   | [Slicers: Agent, Topic, Month]     |
|                                    |                                    |
+------------------------------------+------------------------------------+
```

### VBA One-Click Reset Macro
```vba
Sub ResetAllDashboardSlicers()
    Dim sc As SlicerCache
    For Each sc In ActiveWorkbook.SlicerCaches
        sc.ClearManualFilter
    Next sc
End Sub
```

---

## Practical Application
This blueprint is implemented in both project deliverables:
1. The **Hotel Reservation Analysis** dashboard in Module 6.
2. The **PwC Call Center Performance** executive report in Module 9.

---

## Practice
**Task**: Take the Call Center raw Pivot Table summary. Build a dedicated `Dashboard` tab: hide row/column headers and gridlines, construct 4 KPI cards using rounded rectangle shapes linked to cell formulas, insert an Agent Slicer with 4 columns, and test responsiveness.

---

## Concepts Supported
- [[Dashboard Design Principles]]
- [[Slicers and Timelines]]
- [[Conditional Formatting]]

---

## Related Course Lessons
- [[01_Visual_Analytics_and_Chart_Selection]]
- [[01_Pivot_Table_Foundations]]

---

## Practice Opportunities
- [[Ex04_Pivot_Table_Summaries]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/Project Overview]]
- [[06_Projects/Hotel Reservation Analysis/Project Overview]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)

---

## Notes
Stakeholders consistently praise clean white or dark charcoal backgrounds over default Excel spreadsheet gray. Keep font choices consistent (e.g. `Segoe UI` or `Aptos`).

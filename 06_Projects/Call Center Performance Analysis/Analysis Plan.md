---
type: project-documentation
project_name: PwC Call Center Performance Analysis
section: Analysis Plan
created: 2026-09-28
---

# 5. Analysis Plan & Methodology

## Analytical Framework
Following the 6-Phase Data Analysis Life Cycle (DALC):
1. **Data Ingestion & Hygiene**: Load raw data into an Excel Table (`CallCenterData`), trim headers, enforce datatypes.
2. **Metric Definition & Engineering**: Construct explicit formulas and DAX measures for Answer Rate, Resolution Rate, and CSAT.
3. **Multidimensional Summarization**:
   - Agent Scorecards: Comparative performance ranking.
   - Topic Breakdown: Volume and resolution difficulty by inquiry type.
   - Temporal Heatmap: Call volume and abandonment rate by hour of day (9 AM - 6 PM).
4. **Interactive Dashboard Synthesis**: Assemble KPI cards, linked Slicers (`Agent`, `Topic`, `Answered`), and the VBA Reset Macro.
5. **Executive Narrative**: Synthesize evidence into strategic operational recommendations.

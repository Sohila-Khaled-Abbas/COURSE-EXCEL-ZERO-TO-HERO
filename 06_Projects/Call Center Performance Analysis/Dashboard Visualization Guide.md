---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
document: Dashboard Visualization Guide
version: 2.0
target_platform: Microsoft Excel (.xlsm)
date: 2026-10-01
author: Senior Excel Dashboard Architect & Data Visualization Specialist
tags:
- data-visualization
- visual-guide
- chart-selection
- visual-storytelling
- excel-charts
title: Dashboard Visualization Guide & Chart Rules
description: Chart selection matrix and data visualization rules
---

# 📊 Dashboard Visualization Guide: Visual Decision Framework

> [!abstract] Analytical Visualization Philosophy
> In accordance with advanced data visualization principles (Edward Tufte, Stephen Few), **visuals are never selected for decorative appeal**. Every chart, card, and indicator exists solely to resolve a specific operational question. This guide defines the exact analytical chain for every component in the suite:
> $$\textbf{Business Question} \longrightarrow \textbf{Data Structure} \longrightarrow \textbf{Optimal Visual Geometry} \longrightarrow \textbf{User Interaction} \longrightarrow \textbf{Actionable Insight}$$

---

## 1. Visual Selection Matrix across the 3 Domains

| # | Domain & Business Question | Underlying Data Entities | Chosen Visual Geometry | Why This Geometry Over Alternatives | Interaction Trigger |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **V1** | **Call Center: Are we hitting daily inbound SLAs?** | `Date` (90 days) × `Inbound Calls` & `Abandoned Calls` | **Line & Area Combo Chart** | Continuous temporal trends are best represented by lines; shaded area communicates abandonment volume. | Slicing by Topic or Agent recalibrates trajectory. |
| **V2** | **Call Center: Which agents need coaching?** | `Agent` (8) × `Volume Handled` × `AHT` × `CSAT` | **Agent Performance Quadrant (Scatter)** | Multi-dimensional correlation: X-axis = Volume, Y-axis = AHT, Bubble size = CSAT. Bar charts cannot display 3 metrics simultaneously. | Hover / Slicer isolates individual agent peer standing. |
| **V3** | **Call Center: What topics drive call volume?** | `Topic` (5) × `Call Volume` × `AHT` | **Horizontal Bar Chart** | Long category names ("Contract related") read naturally without awkward vertical slant. | Clicking topic filters the rest of the canvas. |
| **V4** | **Call Center: Is issue resolution on target?** | `Resolved` (Binary: Y/N) on Answered Calls | **Executive Donut Gauge** | Far superior to broken radar chart; center-embedded text highlights the 89.9% success metric cleanly. | Slicing shows agent-specific FCR. |
| **V5** | **Retention: What contracts have highest churn?** | `Contract` (3) × `Internet Service` (3) × `Churn %` | **100% Stacked Column Chart** | Directly compares churn proportions within each contract horizon, highlighting the 42.7% Month-to-Month crisis. | Filter by payment method or senior citizen. |
| **V6** | **Retention: When do subscribers churn?** | `Tenure (Months)` (1 to 72) × `Churn Count` | **Tenure Cohort Area Chart** | Clearly displays the steep decay curve in months 1–6 (the high-risk onboarding drop-off). | Cross-filter by internet service. |
| **V7** | **Retention: Do technical tickets drive churn?** | `numTechTickets` (0 to 9) × `Churn Rate %` | **Column Chart with Step Line** | Illustrates the non-linear "tipping point" at $\ge 2$ tech tickets where churn jumps from 21% to 48%. | Drill into fiber optic vs DSL. |
| **V8** | **D&I: Where does the glass ceiling exist?** | `Job Level` (6 Tiers) × `Gender` (Male vs Female) | **Bi-Directional Tornado Bar (Pyramid)** | Instantly reveals gender asymmetry as employees ascend the corporate ladder from Junior Officer to C-Suite. | Filter by department to find localized parity. |
| **V9** | **D&I: Are promotion opportunities equal?** | `Department` (6) × `Gender` × `Promotion Rate %` | **Grouped Clustered Column Chart** | Side-by-side comparison of female vs male promotion rates within each departmental silo. | Slicer isolates FY20 vs FY21 cycles. |
| **V10**| **D&I: Which employee tiers suffer turnover?** | `Job Level` × `Leavers FY20` × `Turnover %` | **Horizontal Ranked Bar Chart** | Highlights the 11.8% turnover in Junior Officers vs 7.5% in Directors. | Filter by age group and tenure. |

---

## 2. Deep Dive: The 5 Flagship Visual Implementations

### 2.1 Visual 1: The Inbound SLA Trajectory (Call Center)
- **Question**: *"On what days and weeks did call volume exceed staffing capacity, causing abandonment spikes?"*
- **Visual Design**:
  - Primary Axis: Line series plotting `[Total Calls]` (Dark Navy `#1E293B`).
  - Secondary Axis: Shaded light-coral area plotting `[Abandoned Calls]` (PwC Coral `#DC3545` with 30% alpha).
  - Target Reference Line: Horizontal dashed line representing maximum SLA tolerance ($10\%$ abandonment).
- **Cognitive Flow**: The user's eye immediately catches peaks where the red area breaks above the dashed threshold line (e.g. Mondays following holiday weekends), immediately prompting workforce schedule adjustments.

### 2.2 Visual 2: The Agent Performance Quadrant Scatter (Call Center)
- **Question**: *"Who are our benchmark performers, and who is struggling with call duration?"*
- **Visual Design**:
  - X-Axis: Volume of Calls Answered (Range: $400$ to $600$ calls).
  - Y-Axis: Average Handle Time in seconds (Range: $180\text{s}$ to $260\text{s}$).
  - Bubble Color: Green for CSAT $\ge 3.45$, Amber for $3.35 - 3.44$, Red for $< 3.35$.
  - Reference Lines: Intersecting dashed lines at Team Median Volume ($500$) and Team Median AHT ($225\text{s}$).
- **The 4 Quadrants**:
  1. *Top-Right (High Volume, High Handle Time)*: Diligent thorough resolvers (e.g. Martha).
  2. *Bottom-Right (High Volume, Low Handle Time)*: **Benchmark Stars** (fast, productive, high FCR).
  3. *Top-Left (Low Volume, High Handle Time)*: **Primary Coaching Candidates** (struggling with call flow, e.g. Stewart).
  4. *Bottom-Left (Low Volume, Low Handle Time)*: Rushed resolvers (risk of incomplete resolution).

```text
               AVERAGE HANDLE TIME (AHT)
                     ▲
     [Stewart]       │        [Martha]
  Low Volume, High AHT│  High Volume, High AHT
  (Coaching Candidate)│  (Thorough Resolvers)
─────────────────────┼─────────────────────► CALL VOLUME
  Low Volume, Low AHT │  High Volume, Low AHT
  (Rushed Incomplete) │  (Benchmark Stars)
     [Dan]           │        [Becky]
                     ▼
```

### 2.3 Visual 3: Tenure Cohort Churn Elasticity (Customer Retention)
- **Question**: *"At what stage in the customer lifecycle is attrition most severe?"*
- **Visual Design**:
  - X-Axis: Customer Tenure in Months ($0$ to $72$).
  - Y-Axis: Churn Rate % within each tenure cohort.
  - Geometry: Gradient Area chart transitioning from Alert Red (`#EF4444`) in months $1-6$ to Navy (`#1E293B`) in months $24+$.
- **Analytical Takeaway**: Reveals that over **$52\%$ of all churn occurs during the first 6 months** of onboarding. Interventions must focus on the first 90 days.

### 2.4 Visual 4: The Job Level Succession Pyramid (Diversity & Inclusion)
- **Question**: *"Does gender parity exist at the entry level, and where does female representation drop off?"*
- **Visual Design**:
  - Center Y-Axis: The 6 Job Levels (`6 - Junior Officer` up to `1 - Executive`).
  - Left Horizontal Bars: Female Headcount (PwC Purple `#7C3AED`).
  - Right Horizontal Bars: Male Headcount (PwC Teal `#0284C7`).
- **Visual Insight**: Junior Officers are near 50/50 balance ($88$ Female vs $116$ Male). As the eye ascends to Executive, the female bar contracts to just **$3$ individuals** while the male bar expands to **$13$ individuals**.

---

## 3. Visualization Anti-Patterns Purged from the Suite

| Anti-Pattern Discarded | Why It Was Purged | Enterprise Replacement |
| :--- | :--- | :--- |
| **The 2-Point Radar Chart** | Corrupted XML in `Tester.xlsx`; radar charts make zero geometric sense for binary data. | **Executive Donut Gauge with Center Value** |
| **Pie Charts with > 3 Slices** | Humans cannot accurately compare slice angles; wastes 60% of bounding box canvas. | **Horizontal Ranked Bar Chart** |
| **3D Cylinders / Shadowed Bars** | Distorts visual perception of data heights; adds decorative noise. | **Flat, Clean 2D Bars on 8pt Grid** |
| **Dual-Axis Charts with Unrelated Scales** | Causes misinterpretation when scales cross arbitrarily. | **Small Multiples or Normalized Indexes** |
| **Rainbow Color Palettes** | Creates cognitive overload and implies semantic meaning where none exists. | **Semantic Monochrome + Focus Color Palette** |

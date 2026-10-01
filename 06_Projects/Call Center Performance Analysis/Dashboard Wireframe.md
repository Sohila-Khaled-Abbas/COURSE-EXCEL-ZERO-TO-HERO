---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
document: Dashboard Wireframe
version: 2.0
target_platform: Microsoft Excel (.xlsm)
date: 2026-10-01
author: Senior Excel Dashboard Architect & Lead UI/UX Designer
tags:
- wireframing
- ascii-layout
- information-architecture
- excel-canvas
- ui-grid
title: Dashboard Wireframe & Layout Coordinates
description: Grid layout and cell-by-cell coordinate wireframes
---

# 📐 Dashboard Wireframe & Grid Blueprints

> [!abstract] Architectural Layout Specification
> This document details the exact structural layout, component coordinates, and spatial wireframes for **`PwC_Digital_Transformation_Suite.xlsm`**. It covers all four primary user-facing views:
> 1. 🏠 **View 0: Executive Portal Landing Screen** (`ws_Portal`)
> 2. 📞 **View 1: Call Center Operations Console** (`ws_CallCenter`)
> 3. 🔄 **View 2: Customer Retention & Churn Console** (`ws_Retention`)
> 4. 👥 **View 3: Diversity & Inclusion Leadership Console** (`ws_Diversity`)

---

## 1. Master Application Grid Coordinates

The dashboard canvas is strictly anchored to fixed column and row coordinates:

```text
CANVAS BOUNDS:
• Rows 1–3   : Master Application Bar (Header, Title, Global Controls)
• Rows 4     : Section Gutter (16px vertical spacing)
• Rows 5–7   : Executive KPI Card Row (3 rows high, formatted native cells)
• Rows 8     : Section Gutter (16px vertical spacing)
• Rows 9–23  : Upper Visual Row (15 rows high, primary charts)
• Rows 24    : Section Gutter (16px vertical spacing)
• Rows 25–34 : Lower Visual Row (10 rows high, secondary breakdown & diagnostics)
• Rows 35–37 : Executive Insights & Micro-Copy Action Footer
• Columns B–D: Global Left Navigation & Domain Slicers (190px total width)
• Column E   : Sidebar-to-Canvas Gutter (16px width)
• Columns F–Z: Main Analytical Canvas (1,220px total width)
```

---

## 2. Wireframe 0: Executive Portal Landing Screen (`ws_Portal`)

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| ROW 1-3: [LOGO] PwC DIGITAL ACCELERATOR | Enterprise Analytics Suite               [FY20-21 / Q1 2021]  [Sync Data]  [Export PDF]  |
+-------------------+-------------------------------------------------------------------------------------------------------------+
| COL B-D (SIDEBAR) | COL F-J (KPI 1)       | COL K-O (KPI 2)       | COL P-T (KPI 3)       | COL U-Y (KPI 4)       | COL Z (STATUS)  |
|                   | Total Inbound Calls   | Call Abandonment Rate | Total Subscribers     | Churn Rate %          | Exec Gender %   |
| [X] Home Portal   | 5,000                 | 18.9% (Alert)         | 7,043                 | 26.5%                 | 18.8% Female    |
| [ ] Call Center   | Inbound Volume Q1     | Target < 10%          | Active Accounts       | Annualized Loss $1.6M | Target 50%      |
| [ ] Retention     +-------------------------------------------------------------------------------------------------------------+
| [ ] Diversity     | ROW 9-23: CROSS-FUNCTIONAL MODULE LAUNCHERS                                                                 |
| [ ] Data Library  | +-----------------------------+ +-----------------------------+ +-----------------------------+             |
|                   | | 📞 CALL CENTER OPERATIONS   | | 🔄 CUSTOMER RETENTION       | | 👥 DIVERSITY & INCLUSION    |             |
| CONTEXT SLICERS   | | • Inbound Volume & SLAs     | | • 7,043 Subscriber Accounts | | • 500 Corporate Personnel   |             |
| [Date Window]     | | • 8 Dedicated Agents        | | • $139k Monthly Churn ARR   | | • 6 Hierarchical Job Tiers  |             |
|                   | | • 89.9% First Resolution    | | • Month-to-Month Contract   | | • Executive Parity Tracking |             |
| [RESET FILTERS]   | | [ Launch Console ➔ ]        | | [ Launch Console ➔ ]        | | [ Launch Console ➔ ]        |             |
|                   | +-----------------------------+ +-----------------------------+ +-----------------------------+             |
| Active Filters:   +-------------------------------------------------------------------------------------------------------------+
| [All Data Active] | ROW 25-34: EXECUTIVE STRATEGIC RISK RADAR                                                                   |
|                   | • Operations: Monday inbound surge accounts for 24% of abandonment; reallocate shift schedules.             |
|                   | • Retention: Fiber optic subscribers churn at 41.9%; ticket volume indicates service friction.               |
|                   | • D&I: Critical promotion drop-off identified between Senior Manager (44% F) and Director (29% F).           |
|                   +-------------------------------------------------------------------------------------------------------------+
|                   | ROW 35-37: FOOTER: PwC Switzerland Virtual Case Experience | Digital Accelerator Capstone | Version 2.0      |
+-------------------+-------------------------------------------------------------------------------------------------------------+
```

---

## 3. Wireframe 1: Call Center Operations Console (`ws_CallCenter`)

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| ROW 1-3: [LOGO] PwC ANALYTICS | Call Center Operations Console                    [Q1 2021: Jan-Mar]   [Sync Data]   [Export PDF]|
+-------------------+-------------------------------------------------------------------------------------------------------------+
| COL B-D (SIDEBAR) | COL F-J (KPI 1)       | COL K-N (KPI 2)       | COL O-R (KPI 3)       | COL S-V (KPI 4)       | COL W-Z (KPI 5) |
|                   | Total Calls Offered   | Abandonment Rate %    | Avg Speed of Answer   | Average Handle Time   | CSAT Score      |
| [ ] Home Portal   | 5,000                 | 18.9% (SLA Breach)    | 67.5 Seconds          | 3m 45s                | 3.40 / 5.0      |
| [X] Call Center   | Gross Inbound Demand  | Target <= 10.0%       | Target <= 45.0s       | Target 3m 30s-4m 00s  | Target >= 3.80  |
| [ ] Retention     +-------------------------------------------------------+-----------------------------------------------------+
| [ ] Diversity     | ROW 9-23: PRIMARY INBOUND TRAJECTORY                  | ROW 9-23: AGENT PERFORMANCE QUADRANT                |
|                   | (Line / Area Combo Chart)                             | (Scatter Plot: Calls Handled vs AHT vs Resolution)  |
| DOMAIN SLICERS    | • Daily Call Inflow (Volume)                          | • Top Right: High Volume, High Efficiency (Martha)  |
| Slicer: Agent     | • Answered Calls vs Abandoned Trend                   | • Top Left: Low Volume, High AHT (Stewart)          |
| [All Agents (8)]  | • Target SLA Threshold Line (10% Abandon)             | • Bottom: Coaching Candidates (Dan, Joe)            |
|                   |                                                       |                                                     |
| Slicer: Topic     +-------------------------------------------------------+-----------------------------------------------------+
| [All Topics (5)]  | ROW 25-34: INQUIRY TOPIC EFFICIENCY MATRIX            | ROW 25-34: FIRST-CONTACT RESOLUTION (FCR)           |
|                   | (Horizontal Bar Chart)                                | (Executive Donut / Bullet Gauge)                    |
| [RESET FILTERS]   | 1. Streaming          [==========] 1,022 Calls (8.4m) | • 89.9% Resolved (Answered Calls)                   |
|                   | 2. Tech Support       [========= ]   984 Calls (8.2m) | • 10.1% Escalated / Unresolved                      |
| Active Filters:   | 3. Payment Related    [========  ]   968 Calls (6.1m) |                                                     |
| [Agent: None]     | 4. Contract Related   [=======   ]   952 Calls (5.8m) | Center Callout: 3,646 Total Resolved                |
| [Topic: None]     | 5. Admin Support      [======    ]   934 Calls (5.2m) | Benchmark Status: PASSED (Target >= 85.0%)          |
+-------------------+-------------------------------------------------------+-----------------------------------------------------+
| ROW 35-37: 💡 OPERATIONAL INSIGHT: Streaming & Tech Support drive 40.1% of call volume and 58% of all talk duration.            |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

## 4. Wireframe 2: Customer Retention & Churn Console (`ws_Retention`)

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| ROW 1-3: [LOGO] PwC ANALYTICS | Customer Retention & Churn Risk Console           [7,043 Subscribers]  [Sync Data]   [Export PDF]|
+-------------------+-------------------------------------------------------------------------------------------------------------+
| COL B-D (SIDEBAR) | COL F-J (KPI 1)       | COL K-N (KPI 2)       | COL O-R (KPI 3)       | COL S-V (KPI 4)       | COL W-Z (KPI 5) |
|                   | Total Subscribers     | Churn Rate %          | Monthly Churn MRR     | Annual Revenue Risk   | Avg Tech Tickets|
| [ ] Home Portal   | 7,043                 | 26.5%                 | $139,131 / mo         | $1,669,570 / yr       | 0.42 / customer |
| [ ] Call Center   | Active Customer Base  | 1,869 Churned Accts   | Net Cash Flow Loss    | Churn ARR at Risk     | Churners: 1.48  |
| [X] Retention     +-------------------------------------------------------+-----------------------------------------------------+
| [ ] Diversity     | ROW 9-23: CHURN BY CONTRACT & INTERNET TIER           | ROW 9-23: TENURE COHORT CHURN ELASTICITY            |
|                   | (Grouped / Stacked Column Chart)                      | (Area Chart: Tenure Months vs Churn Rate)           |
| DOMAIN SLICERS    | • Month-to-Month Contract: 42.7% Churn (CRITICAL)     | • Months 1-6: Extreme Attrition Window (52% Churn)  |
| Slicer: Contract  | • One-Year Contract: 11.3% Churn                      | • Months 7-24: Stabilizing Cohort (28% Churn)       |
| [All Contracts]   | • Two-Year Contract:  2.8% Churn (Safe Harbor)        | • Months 25+: High Loyalty Lock-in (9% Churn)       |
|                   | • Fiber Optic Service: 41.9% Churn (Service Issue)    |                                                     |
| Slicer: Internet  +-------------------------------------------------------+-----------------------------------------------------+
| [All Services]    | ROW 25-34: TECH SUPPORT TICKETS VS CHURN              | ROW 25-34: PAYMENT METHOD RISK BREAKDOWN            |
|                   | (Scatter / Heatmap Matrix)                            | (Horizontal Bar Chart)                              |
| [RESET FILTERS]   | • 0 Tech Tickets:  9.8% Churn                         | 1. Electronic Check: 45.3% Churn (Highest Friction) |
|                   | • 1 Tech Ticket:  21.4% Churn                         | 2. Mailed Check:     19.1% Churn                    |
| Active Filters:   | • 2 Tech Tickets: 48.7% Churn (Tipping Point)         | 3. Bank Transfer:    16.7% Churn (Automated)       |
| [Contract: All]   | • 3+ Tech Tickets: 74.2% Churn (Definite Loss)        | 4. Credit Card:      15.2% Churn (Automated)       |
+-------------------+-------------------------------------------------------+-----------------------------------------------------+
| ROW 35-37: 💡 RETENTION ACTION: Incentivize Month-to-Month Fiber subscribers to migrate to 1-Yr contracts with auto-pay.       |
+---------------------------------------------------------------------------------------------------------------------------------+
```

---

## 5. Wireframe 3: Diversity & Inclusion Leadership Console (`ws_Diversity`)

```text
+---------------------------------------------------------------------------------------------------------------------------------+
| ROW 1-3: [LOGO] PwC ANALYTICS | Diversity, Equity & Inclusion Console (Pharma AG) [500 Personnel]     [Sync Data]   [Export PDF]|
+-------------------+-------------------------------------------------------------------------------------------------------------+
| COL B-D (SIDEBAR) | COL F-J (KPI 1)       | COL K-N (KPI 2)       | COL O-R (KPI 3)       | COL S-V (KPI 4)       | COL W-Z (KPI 5) |
|                   | Total Headcount       | Overall Female %      | Exec Gender Parity    | FY21 Promotion Rate   | Annual Turnover%|
| [ ] Home Portal   | 500                   | 41.0% (205 Female)    | 18.8% (3 of 16 Execs) | 10.2% (51 Promoted)   | 9.4% (47 Left)  |
| [ ] Call Center   | Active Workforce      | Target: 50.0%         | Glass Ceiling Alert   | Female: 10.7% / M: 9.8| Benchmark <= 8% |
| [ ] Retention     +-------------------------------------------------------+-----------------------------------------------------+
| [X] Diversity     | ROW 9-23: JOB LEVEL SUCCESSION PYRAMID                | ROW 9-23: PROMOTION VELOCITY BY DEPARTMENT          |
|                   | (Bi-directional Tornado Bar: Male vs Female)          | (Grouped Column: Female vs Male Promo Rate)         |
| DOMAIN SLICERS    | Tier 1 - Executive   : [== 13 M]  [= 3 F  ] (18.8% F) | • Operations: 203 Staff | 11% Promoted              |
| Slicer: Dept      | Tier 2 - Director    : [==== 26 M] [== 11 F] (29.7% F)| • Sales & Marketing: 168 Staff | 10% Promoted       |
| [All Departments] | Tier 3 - Sr Manager  : [=== 31 M]  [==== 25] (44.6% F)| • Internal Services: 72 Staff | 9% Promoted          |
|                   | Tier 4 - Manager     : [==== 44 M] [==== 38] (46.3% F)| • Strategy: 22 Staff | 14% Promoted                 |
| Slicer: JobLevel  | Tier 5 - Sr Officer  : [=== 52 M]  [==== 53] (50.5% F)| • Finance & HR: 35 Staff | 12% Promoted             |
| [All Job Levels]  | Tier 6 - Jr Officer  : [======116] [===== 88] (43.1% F|                                                     |
|                   +-------------------------------------------------------+-----------------------------------------------------+
| [RESET FILTERS]   | ROW 25-34: TURNOVER & LEAVERS BY JOB TIER             | ROW 25-34: AGE BRACKET & REGIONAL DIVERSITY         |
|                   | (Horizontal Stacked Bar)                              | (Treemap / Grouped Bar)                             |
| Active Filters:   | • Junior Officers: 24 Leavers (11.8% Turnover)        | • 20-29 Years: 18% of workforce (12% Turnover)      |
| [Dept: All]       | • Senior Officers:  9 Leavers ( 8.6% Turnover)        | • 30-39 Years: 42% of workforce ( 8% Turnover)      |
| [Level: All]      | • Managers:         7 Leavers ( 8.5% Turnover)        | • 40-49 Years: 28% of workforce ( 9% Turnover)      |
|                   | • Directors/Execs:  4 Leavers ( 7.5% Turnover)        | • 50+ Years:   12% of workforce ( 6% Turnover)      |
+-------------------+-------------------------------------------------------+-----------------------------------------------------+
| ROW 35-37: 💡 D&I INSIGHT: Female representation achieves parity through Senior Officer (50.5%), but drops to 18.8% in C-Suite.  |
+---------------------------------------------------------------------------------------------------------------------------------+
```

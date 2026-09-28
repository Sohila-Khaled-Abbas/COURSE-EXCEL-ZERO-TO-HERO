---
type: exercise
exercise_id: AI-EX-08
topic: Dashboard Architecture
level: 3
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - dashboard-design
  - visual-analytics
---

# 🧪 Exercise 08: Design an Executive Dashboard With AI Assistance

## Objective
Use AI to architect an executive spreadsheet dashboard wireframe, critique its visual hierarchy against professional design principles, and assemble the layout in Excel.

## Dataset
PwC Call Center Performance Dataset (5,000 records across 8 agents).

## Business Scenario
You must present Q1 2021 operational performance to senior executives. The dashboard must fit on a single screen without horizontal scrolling, use minimal ink, and clearly highlight the bottleneck driving high customer abandonment.

## Task
1. Prompt Claude or Twistly for a dashboard layout and visual chart selection.
2. Critique the AI's chart recommendations against preattentive visual attributes (e.g. rejecting pie charts or 3D gauges).
3. Draft a clean 12-column grid wireframe following [[Dashboard Design Principles]].

## AI Prompt
```text
Act as a BI Dashboard Architect.
We are designing an Executive Excel Dashboard for the PwC Call Center dataset (5,000 calls, 8 agents).
Primary Audience: VP of Customer Experience.
Core Challenge: High abandonment rate (18.92%) and 67.5s average wait time.
Provide:
1. Executive Visual Layout: A 12-column grid wireframe (Header, Summary Cards, Visuals, Detail Table).
2. Chart Recommendations: Exactly which visual charts to use and why.
3. Interactive Slicers: Which filters to provide without causing cognitive overload.
4. Clutter Defense: What visual elements must be strictly banned?
```

## Expected Reasoning
A well-trained AI will recommend:
- **Top Row**: 4 KPI Summary Cards (Total Inbound, Answer Rate %, Abandonment %, Avg CSAT).
- **Middle Left**: Horizontal Bar Chart for Agent CSAT and Resolution Rate (easier to read agent labels than vertical columns).
- **Middle Right**: Hourly Call Volume vs Abandonment Line/Column Chart (identifying peak staffing shortages between 10 AM and 2 PM).
- **Interactivity**: Slicers for `Department / Topic` and `Month` (Jan, Feb, Mar).
- **Clutter Elimination**: Ban 3D charts, dark saturated backgrounds, and redundant gridlines.

## Validation
- [ ] Did the AI reject pie charts with more than 3 slices?
- [ ] Does the proposed layout fit within a standard 1080p display (Rows 1 to 35)?
- [ ] Does the visual design highlight the root problem (staffing at peak hours)?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified Executive Layout Blueprint</summary>

### 12-Column Executive Layout Wireframe:
```text
+-----------------------------------------------------------------------------------------+
| [Header] PwC Call Center Performance Executive Cockpit | Slicers: [Month] [Department]  |
+-----------------------------------------------------------------------------------------+
| [KPI 1: 5,000 Calls] | [KPI 2: 81.1% Answer] | [KPI 3: 18.9% Abandon] | [KPI 4: 3.40 CSAT] |
+-----------------------------------------------------------------------------------------+
| [Chart 1: Inbound & Abandonment by Hour]    | [Chart 2: Agent Scorecard CSAT vs ASA]   |
| (Combo Line/Column: Highlights Peak at 1pm) | (Horizontal Bar: Dan & Martha Top CSAT)  |
+-----------------------------------------------------------------------------------------+
| [Table: Agent Operational Matrix - Inbound, Answer %, Resolved %, ASA, CSAT Rating]    |
+-----------------------------------------------------------------------------------------+
```
</details>

## Reflection
Did the AI suggest adding decorative clip art, heavy borders, or bright neon fills? Professional dashboards adhere to Stephen Few and Edward Tufte principles: maximum data-ink ratio, soft neutral grays (`#F8F9FA`, `#334155`), and single accent colors (`#0284C7`) for key metrics.

## Lessons Learned
- AI provides rapid conceptual wireframes and ensures all stakeholders' questions are visually addressed.
- The human designer enforces visual hygiene, accessibility, and whitespace balance.

---
type: exercise
exercise_id: AI-EX-07
topic: KPI Architecture
level: 3
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - kpi
  - analytics
  - business-intelligence
---

# 🧪 Exercise 07: Ask AI to Propose KPIs for Operational Analytics

## Objective
Use AI to brainstorm candidate Key Performance Indicators (KPIs) for an operational dataset, then critically evaluate and refine them against industry standards and mathematical rigor.

## Dataset
`Call_Center_Operations` (5,000 inbound records):
- Attributes: `Call_ID`, `Time_of_Call`, `Agent`, `Answered (Y/N)`, `Resolved (Y/N)`, `Speed_of_Answer_Sec`, `Duration_Sec`, `Satisfaction_Rating`.

## Business Scenario
You are building an Executive Performance Dashboard for the Head of Customer Operations. You need to establish the core operational and quality scorecard metrics.

## Task
1. Prompt AI to recommend 5 primary KPIs for call center performance.
2. Evaluate whether the AI correctly identifies the mathematical formulas and denominators.
3. Verify whether the AI accounts for the 80/20 Service Level Agreement (SLA) standard.

## AI Prompt
```text
Act as a Senior Operations Analytics Consultant.
Review this Call Center dataset schema:
Columns: Call_ID, Time_of_Call, Agent, Answered (Y/N), Resolved (Y/N), Speed_of_Answer_Sec, Duration_Sec, Satisfaction_Rating (1-5).
Propose:
1. Top 5 essential operational and quality KPIs.
2. Exact mathematical formulas for each (specifying numerator and denominator).
3. Industry benchmark targets.
4. Watch-outs: Potential calculation traps in this specific dataset.
```

## Expected Reasoning
The AI should identify:
1. **Answer Rate**: `Answered Calls / Total Inbound Calls` (Target: > 80%).
2. **Abandonment Rate**: `Abandoned Calls / Total Inbound Calls` (Target: < 5-8%).
3. **First Contact Resolution (FCR) / Resolution Rate**: `Resolved Calls / Answered Calls` (Target: 85-90%). *Crucial: Denominator must be Answered Calls, not Total Inbound!*
4. **Average Speed of Answer (ASA)**: `SUM(Speed of Answer) / Answered Calls` (Target: < 60-90s).
5. **Customer Satisfaction (CSAT)**: `SUM(Ratings) / Count of Surveyed Calls` (Target: > 3.5 - 4.0 / 5.0).

## Validation
- [ ] Did the AI use `Answered Calls` (not Total Inbound) in the denominator for Resolution Rate and ASA?
- [ ] Did it warn that abandoned calls have null durations and speeds?
- [ ] Are the suggested benchmarks realistic for enterprise contact centers?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified KPI Architecture</summary>

### Verified Operational Metric Set:
| KPI Name | Excel / DAX Formula | Benchmark | PwC Q1 2021 Actual |
| :--- | :--- | :---: | :---: |
| **Answer Rate** | `=COUNTIF(Answered, "Y") / COUNTA(Call_ID)` | > 80% | **81.08%** (4,054 / 5,000) |
| **Abandonment Rate** | `=COUNTIF(Answered, "N") / COUNTA(Call_ID)` | < 8% | **18.92%** (946 / 5,000) *(Critical Deficit)* |
| **Resolution Rate** | `=COUNTIF(Resolved, "Y") / COUNTIF(Answered, "Y")` | > 85% | **89.94%** (3,646 / 4,054) |
| **Avg Speed of Answer** | `=AVERAGE(Speed_of_Answer)` | < 60s | **67.52 seconds** |
| **Avg CSAT Score** | `=AVERAGE(Satisfaction_Rating)` | > 3.50 | **3.40 / 5.00** |
</details>

## Reflection
Did the AI suggest calculating Resolution Rate over total calls (5,000) or answered calls (4,054)? If an AI divides resolved calls by 5,000, it computes an overall resolution of `72.92%` instead of the true operational resolution rate of `89.94%`. You must always enforce the correct denominator!

## Lessons Learned
- AI is great at surfacing standard industry metric frameworks.
- The human analyst must define the exact numerator and denominator boundaries.

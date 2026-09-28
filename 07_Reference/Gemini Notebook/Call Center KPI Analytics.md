---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Source
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Capstone Project & KPI Architecture
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - kpi
  - call-center
  - operations-analytics
  - gemini-notebook
---

# Call Center KPI Analytics

## Why This Resource Matters
Evaluating contact center operations requires standardized, defensible business metrics. Naive computations (such as calculating average talk time across abandoned calls or computing CSAT as a simple average of uncleaned survey responses) distort operational performance and mislead executive leadership.

---

## Source Summary
The Gemini Notebook analytics curriculum defines the standardized operational metrics governing modern customer support operations:
- **First Contact Resolution (FCR)**: Proportion of inbound inquiries completely resolved during the initial contact, eliminating repeat calls. Global industry standard benchmark: 70% to 75%.
- **Service Level Agreement (SLA)**: Industry standard `80/20 Rule` (80% of inbound calls answered within 20 seconds).
- **Abandonment Rate**: Percentage of callers who disconnect before being connected to an agent. Healthy operational benchmark: < 5% to 8%.
- **Speed of Answer (ASA)**: Average queue wait time in seconds prior to agent connection.
- **Customer Satisfaction Score (CSAT)**: Typically measured on a 1-5 Likert scale, computed strictly over completed interactions where survey responses were submitted.

---

## My Understanding
In our [[Call Center Performance Analysis]] dataset (5,000 records from PwC), uncleaned data contains 946 abandoned calls. In these 946 records, `Speed of answer`, `AvgTalkDuration`, and `Satisfaction rating` are null. A critical data analysis rule is: **never impute 0 for missing durations or CSAT scores when calls were abandoned**. Doing so artificially drags down agent performance averages. Metrics must distinguish between Total Inbound Calls (5,000) and Answered Calls (4,054).

---

## Key Takeaways
1. **Denominator Discipline**:
   - Total Resolution Rate = `3,646 / 5,000 = 72.92%` (Executive view of all incoming demand).
   - Operational Resolution Rate = `3,646 / 4,054 = 89.94%` (Agent effectiveness on answered calls).
2. **Handle Abandonment Forensically**: Abandonment rate is `946 / 5,000 = 18.92%`, indicating severe queue bottlenecking during peak morning windows (9 AM – 11 AM).
3. **CSAT Reliability**: Net CSAT is `3.40 / 5.00` across answered surveys, revealing an opportunity to lift customer satisfaction by reducing queue times.

---

## Important Examples

### Example 1: Excel Formula for Operational Resolution Rate
```excel
=COUNTIFS(CallCenter[Answered (Y/N)], "Y", CallCenter[Resolved], "Y") / COUNTIF(CallCenter[Answered (Y/N)], "Y")
```

### Example 2: DAX Measure for Average Speed of Answer (Excluding Abandoned)
```dax
Average Speed of Answer (Sec) := 
AVERAGE(FactCalls[Speed of answer])
```
*(Note: VertiPaq engine automatically ignores BLANK cells in AVERAGE calculations, preserving metric integrity).*

### Example 3: SLA Compliance Check
```excel
=IF([@[Answered (Y/N)]]="Y", IF([@[Speed of answer]]<=60, "SLA Met", "SLA Breached"), "Abandoned")
```

---

## Practical Application
These metric definitions serve as the foundation for:
1. The KPI scorecards in the PwC Call Center interactive workbook.
2. The strategic recommendations presented in [[10_Portfolio/Call Center Analysis Portfolio Case Study]].

---

## Practice
**Task**: In the PwC workbook, calculate the Agent Ranking by CSAT score. Is the highest CSAT agent also the fastest at answering calls? Build a scatter plot comparing `Speed of answer` against `Satisfaction rating` to evaluate correlation.

---

## Concepts Supported
- [[Data Analysis Life Cycle]]
- [[Dimensional Modeling]]
- [[Dashboard Design Principles]]

---

## Related Course Lessons
- [[01_Visual_Analytics_and_Chart_Selection]]
- [[01_Dimensional_Modeling_Principles]]
- [[03_DAX_Fundamentals_Calculated_Columns_vs_Measures]]

---

## Practice Opportunities
- [[Ex04_Pivot_Table_Summaries]]
- [[Ex07_Supplementary_Dynamic_Lookups_and_KPIs]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/KPIs|KPI Architecture]]
- [[06_Projects/Call Center Performance Analysis/Findings|Analytical Findings]]
- [[06_Projects/Call Center Performance Analysis/Recommendations|Executive Recommendations]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)

---

## Notes
Observed during analysis: Call abandonment peaks simultaneously with ticket volume spikes, confirming that the primary driver of customer dissatisfaction is staffing mismatches rather than agent technical competence.

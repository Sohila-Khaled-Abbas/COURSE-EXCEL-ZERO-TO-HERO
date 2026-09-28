---
type: revision
category: interview
tags: [excel, interview, data-analyst]
created: 2026-09-28
updated: 2026-09-28
---

# 💼 Senior Data Analyst Excel Interview Questions & Model Answers

### Question 1: How do you handle and audit missing values in a 100,000-row dataset?
**Model Answer**:  
"I first audit missingness across the six dimensions of data quality using Power Query or Pivot Table count comparisons (`COUNT` vs `COUNTA`). I determine whether missing values are structural/random errors or valid operational nulls—such as in call center logs where abandoned calls naturally have no answer speed or talk duration. For erroneous nulls, I choose between statistical imputation (mean/median for skewed distributions), categorical placeholder tagging (`'Unassigned'`), or filtering out records if the primary key is corrupted."

---

### Question 2: Explain the difference between Row Context and Filter Context in DAX.
**Model Answer**:  
"**Row Context** exists during row-by-row iteration, such as inside a Calculated Column or iterator function like `SUMX`; it only knows about values in the current row. **Filter Context** is the set of active filters applied to the data model by Pivot Table row headers, column headers, slicers, and report filters. Measures evaluate exclusively under Filter Context. When we wrap an expression in `CALCULATE`, it performs *Context Transition*, transforming the current Row Context into an equivalent Filter Context."

---

### Question 3: Walk me through designing an executive dashboard in Excel.
**Model Answer**:  
"I begin in the 'Ask' phase of DALC, clarifying stakeholder questions and defining 4-5 core KPIs. Structurally, I ingest data via Power Query, model it into an Excel Table or Star Schema in Power Pivot, and build explicit DAX measures. For the UI, I follow an F-pattern layout: top-tier KPI cards with clear comparison targets, a middle tier for comparative category and distribution charts, and a bottom tier for temporal trends. I synchronize interactive Slicers across all pivot tables using Report Connections and eliminate chart clutter to maximize the data-ink ratio."

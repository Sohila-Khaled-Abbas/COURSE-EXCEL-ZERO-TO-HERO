---
type: prompt-library
track: ai-assisted-excel
status: verified
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai
  - prompts
  - prompt-engineering
  - templates
---

# 📚 AI Excel Prompt Engineering Library

> [!tip] Prompt Engineering Principle
> The quality of AI spreadsheet output is directly proportional to the structural constraints provided in the prompt. Vague prompts yield fragile, generic formulas. Structured prompts yield robust, auditable, production-grade logic.

---

## 🗂️ Categorized Prompt Templates

---

### 1. Formula Generation Template

Use this prompt to generate high-performance, maintainable Excel formulas:

```text
Task:
[State the exact business calculation or data transformation needed]

Workbook context:
- Table/Range Name: [e.g., Table_Calls or Sheet1!A1:H5000]
- Key Columns: [e.g., Column A: Call_ID (Text), Column D: Answered (Text Y/N), Column F: Speed_of_Answer (Integer Seconds)]
- Excel Version: [e.g., Microsoft 365 / Excel 2021]

Goal:
[Describe the exact desired result, e.g., Return the average speed of answer strictly for calls that were answered, ignoring blanks and abandoned calls]

Constraints:
- Use modern Excel formulas (prefer XLOOKUP, AVERAGEIFS, FILTER, LET over legacy VLOOKUP/nested IFs).
- Ensure range references are properly locked with absolute coordinates ($) or structured references ([@Column]).
- Avoid volatile functions (do NOT use INDIRECT or OFFSET).
- Handle zero or empty matches gracefully without displaying #DIV/0! or #N/A.

Expected output:
Provide:
1. The exact formula ready to copy.
2. A step-by-step breakdown of how each function operates.
3. Three test cases (typical row, blank/null row, zero-match condition).
```

---

### 2. Formula Debugging Template

Use this prompt when a formula produces an error code or an incorrect calculation:

```text
Analyze this Excel formula and diagnose why it is failing.

Goal:
[What the formula is intended to calculate]

Current formula:
[Paste exact formula, e.g., =VLOOKUP(A2, Agents!A:D, 4, FALSE)]

Workbook context:
- Input Cell A2 Value: [e.g., "0045" stored as text]
- Lookup Range Agents!A:D: [Column A contains Agent IDs stored as numbers: 45]

Expected result:
[e.g., "Martha"]

Actual result:
[e.g., #N/A error or wrong row returned]

Please provide:
1. Diagnosis: What specific technical or data-type mismatch is causing the failure?
2. Corrected Formula: Provide the robust, production-grade formula.
3. Explanation: Explain why the fix resolves the problem.
4. Edge Cases: How does this corrected formula behave if A2 is blank, not found, or contains duplicates?
5. Validation Tests: Give 2 tests I can perform in Excel to verify the fix.
```

---

### 3. Forensic Data Cleaning Assessment Template

Use this prompt before modifying messy raw data:

```text
Inspect this dataset description and sample records for data hygiene issues:

Dataset Description:
- Source: [e.g., CRM CSV export containing 5,000 customer call records]
- Fields: [List columns and sample rows]

Inspect the dataset strictly for:
- Missing values (distinguishing between true missing data vs valid operational nulls)
- Duplicate records (primary key duplication vs repeating dimensional attributes)
- Inconsistent text formatting (leading/trailing whitespace, non-breaking spaces, mixed casing)
- Invalid date formats (text dates vs numerical serial dates)
- Inconsistent categorical values (e.g., "NY", "New York", "new york", "N.Y.")
- Incorrect data types (numbers stored as text, dates stored as strings)
- Suspicious outlier values (e.g., negative duration, call satisfaction rating of 99 on a 1-5 scale)

CRITICAL INSTRUCTION:
Do NOT modify the data or write formulas yet.
First provide a forensic Data Quality Assessment matrix listing the dimension of quality, observed anomaly, root cause, and recommended remediation strategy.
```

---

### 4. Data Analysis & Exploration Template

Use this prompt to establish exploratory frameworks:

```text
Analyze this dataset description from the perspective of a Senior Business Intelligence Analyst.

Dataset Context:
[Paste table schema, column descriptions, and business background]

Before jumping to conclusions or running statistical summaries, first identify:
1. Data Grain: What does exactly one single row represent?
2. Dimensions: Categorical attributes used for slicing, filtering, and grouping.
3. Measures: Quantitative numeric fields suitable for aggregation.
4. Potential Core KPIs: Meaningful operational ratios, percentages, and metrics.
5. Inherent Data-Quality Risks: What potential biases or null patterns must we defend against?
6. Priority Business Questions: Top 5 strategic questions executive leadership will ask about this data.

Explain the reasoning behind each recommendation.
```

---

### 5. Executive Dashboard Design Template

Use this prompt to architect clear, clutter-free dashboard layouts:

```text
Based on the following dataset and business problem, create an Executive Dashboard Blueprint:

Business Context:
- Domain: [e.g., Telecommunications Customer Support Call Center]
- Key Objective: [e.g., Evaluate SLA 80/20 compliance, identify agent performance outliers, and understand customer satisfaction drivers]
- Target Stakeholder: [e.g., Head of Customer Operations and Call Center Team Leads]

Provide:
1. Core Stakeholders & Decisions: Who will view this dashboard, and what daily/monthly actions will they take?
2. Primary KPIs (Top Banner): 4–6 high-yield metrics with standard calculation definitions.
3. Analytical Visualizations: Recommended charts (e.g., Horizontal Bar for Agent CSAT, Line for Hourly Inbound Volume) justified by preattentive visual attributes.
4. Interactivity & Filters: Essential Slicers and Timelines needed for drill-down.
5. Layout Grid & Visual Hierarchy: 12-column layout wireframe (Header, Summary Cards, Trend Charts, Detail Table).
6. Clutter Defense: What visual noise, 3D elements, or redundant legends must be eliminated?
```

---

### 6. AI Output Critique & Self-Audit Template

Always run this prompt against previous AI-generated formulas or analysis:

```text
Critically review and stress-test the solution you provided in your previous response.

Act as an adversarial Senior Excel Auditor and identify:
1. Unstated Assumptions: What implicit assumptions did you make about the dataset, sorting, or calculation settings?
2. Boundary & Edge Case Failures: Under what specific conditions will this formula return an error (#VALUE!, #SPILL!, #DIV/0!, #N/A) or incorrect result?
3. Performance & Scaling Bottlenecks: Will this solution slow down a workbook with 100,000+ rows?
4. Calculation Risks: Are there risks of floating-point inaccuracies, date serial misunderstandings, or circular references?
5. Manual Validation Plan: Provide a concrete 4-step checklist for an analyst to manually prove the numbers are 100% correct in Excel.
```

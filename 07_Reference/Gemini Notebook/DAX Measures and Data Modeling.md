---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Source
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Data Modeling & DAX Formulas
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - dax
  - power-pivot
  - data-modeling
  - star-schema
  - gemini-notebook
---

# DAX Measures and Data Modeling

## Why This Resource Matters
Traditional Excel Pivot Tables hit severe scalability and functional limits when analyzing multi-table datasets: they require flattening everything into one massive worksheet table using fragile lookup formulas, which bloats file sizes and causes calculation lag. The Power Pivot Data Model and DAX (Data Analysis Expressions) provide an in-memory columnar engine (VertiPaq) capable of analyzing millions of rows across relational star schemas.

---

## Source Summary
The Gemini Notebook outlines the analytical principles governing Power Pivot and DAX:
- **Star Schema Relational Architecture**: Separating transactional fact tables (`FactCalls`, `FactSales`) from descriptive dimension tables (`DimAgent`, `DimDate`, `DimDepartment`) linked by 1-to-many (`1:*`) relationships.
- **Calculated Columns vs Explicit Measures**:
  - *Calculated Columns*: Evaluated row-by-row during data refresh; stored in memory; consumes RAM.
  - *Measures*: Evaluated on-demand at query time under dynamic filter context; zero memory footprint; required for ratios and dynamic aggregations.
- **Context Transition & `CALCULATE`**: `CALCULATE(<expression>, <filter1>, ...)` is the engine's most powerful function, altering active filter context before computing expressions.
- **Safe Division via `DIVIDE()`**: Protects against divide-by-zero errors without clunky `IFERROR` branches, returning blank or a specified alternate result.

---

## My Understanding
In DAX, you never write an explicit sum of columns in a raw table cell. You define explicit measures in the calculation area. For example, calculating Average CSAT or Resolution Rate across a Pivot Table with multiple slicers requires a dynamic measure because the denominator (Total Answered Calls) changes depending on which agent, date, or topic is selected in the UI.

---

## Key Takeaways
1. **Never Calculate Ratios in Calculated Columns**: A calculated column `= [Resolved] / [Answered]` computed row-by-row cannot be averaged across groups; ratios must always be computed as explicit measures: `= DIVIDE([Total Resolved], [Total Answered])`.
2. **Respect the Filter Flow**: Filters flow from the 1-side (Dimensions) to the *-side (Facts). Slicers should always be built on Dimension table columns, never on Fact table foreign keys.
3. **Filter Context Awareness**: A measure like `[Total Calls]` will return 5,000 in the Grand Total cell, but returns 518 when sliced by Agent "Diane", entirely driven by the active filter coordinates.

---

## Important Examples

### Example 1: Explicit Ratio Measure with Defensive Division
```dax
Resolution Rate (Answered) := 
DIVIDE(
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Resolved] = "Y"),
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Answered (Y/N)] = "Y"),
    BLANK()
)
```

### Example 2: Calculating Departmental Baseline with `ALL`
```dax
Calls All Agents := 
CALCULATE(
    COUNTROWS(FactCalls),
    ALL(DimAgent[AgentName])
)
```

### Example 3: Speed of Answer Compliance (< 60s Target)
```dax
Speed SLA Met % := 
DIVIDE(
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Speed of answer] <= 60 && FactCalls[Answered (Y/N)] = "Y"),
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Answered (Y/N)] = "Y"),
    0
)
```

---

## Practical Application
In Module 9 and the [[Call Center Performance Analysis]] dashboard, Power Pivot hosts the 5,000-record call fact table connected to an Agent dimension table and a Date dimension table. Explicit DAX measures drive the executive KPI cards, SLA gauges, and agent benchmarking matrix.

---

## Practice
**Task**: Open `09_Source_Materials/Module 9/13/PWC Dataset.xlsx`. Add the table to the Data Model. Create two explicit DAX measures:
1. `[Total Abandoned Calls]`
2. `[Abandonment Rate %]` using `DIVIDE()`.
Insert a Pivot Table using the Data Model connection and verify that the Grand Total Abandonment Rate matches the ground-truth benchmark of `18.92%`.

---

## Concepts Supported
- [[Calculated Columns vs DAX Measures]]
- [[Data Analysis Expressions (DAX)]]
- [[Dimensional Modeling]]
- [[Star Schema vs Snowflake Schema]]
- [[Fact vs Dimension Tables]]

---

## Related Course Lessons
- [[01_Dimensional_Modeling_Principles]]
- [[02_Star_Schema_and_Relationships]]
- [[03_DAX_Fundamentals_Calculated_Columns_vs_Measures]]
- [[04_Essential_DAX_Functions_and_Context]]

---

## Practice Opportunities
- [[Ex04_Pivot_Table_Summaries]]
- [[Ex07_Supplementary_Dynamic_Lookups_and_KPIs]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/KPIs]]
- [[06_Projects/Call Center Performance Analysis/Findings]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)

---

## Notes
When authoring DAX in Excel Power Pivot, always reference measures with square brackets alone (e.g. `[Total Calls]`) and column references with explicit table prefixes (e.g. `FactCalls[Speed of answer]`) to adhere to DAX style standards and avoid parser ambiguity.

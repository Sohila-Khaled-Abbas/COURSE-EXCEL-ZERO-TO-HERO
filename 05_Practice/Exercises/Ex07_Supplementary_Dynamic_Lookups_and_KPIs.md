---
type: exercise
module: "Supplementary Module"
topic: "Modern Lookups, Dynamic Arrays & DAX KPIs"
difficulty: advanced
status: not-started
tags: [excel, practice, gemini-notebook, xlookup, dynamic-arrays, dax, kpis]
source: Gemini Notebook
source_dataset: "09_Source_Materials/Module 9/13/PWC Dataset.xlsx"
created: 2026-09-28
updated: 2026-09-28
---

# Exercise 7: Modern Lookups, Dynamic Arrays & Analytical KPI Engineering

> [!abstract] Objective
> Practice modern Excel formula techniques, dynamic array manipulation, and explicit DAX measure construction inspired by the Gemini Notebook reference materials.

---

## Tasks & Challenges

### Level 1 (Recall & Syntax)
- [ ] Explain the difference between `VLOOKUP`'s fourth argument default and `XLOOKUP`'s matching mode default. Why does `XLOOKUP` protect against silent spreadsheet errors?

### Level 2 (Application: Defensive XLOOKUP)
- [ ] Using the `PWC Dataset.xlsx` call logs, assume an external table `DimTargets` maps `Topic` to `TargetResponseSec`. Write an `XLOOKUP` formula in a new column that retrieves `TargetResponseSec` for each call. If the topic is missing or invalid, return `60` as the default fallback.

### Level 3 (Dynamic Arrays: Spill Operators)
- [ ] On an empty analysis worksheet, use a single dynamic array formula (`=SORT(UNIQUE(...))`) to generate an alphabetical list of all unique call center agents.
- [ ] In the adjacent column, use dynamic array referencing (`#`) with `COUNTIFS` to compute total inbound calls handled by each agent without dragging formulas down.

### Level 4 (Data Modeling & Context: Safe Ratios)
- [ ] Explain why writing `=SUM(FactCalls[Resolved]) / SUM(FactCalls[Answered])` inside a calculated column produces incorrect results when aggregated in a Pivot Table. Write the equivalent explicit DAX measure using `DIVIDE()`.

### Level 5 (Synthesis: Complex SLA Compliance KPI)
- [ ] Construct an explicit DAX measure or Excel formula to calculate the **High-Urgency Resolution Rate**:
  $$\text{High-Urgency Resolution Rate} = \frac{\text{Resolved Calls where Speed of Answer} \le 45\text{s}}{\text{Total Answered Calls where Speed of Answer} \le 45\text{s}}$$
  Ensure that abandoned calls (`Answered == "N"`) do not distort the denominator.

---

*Solutions and detailed technical explanations are available in [[Ex07_Solutions]].*

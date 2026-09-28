---
type: exercise
module: Module 3
topic: Formulas & Lookups
difficulty: intermediate
status: mastered
tags:
  - excel
  - practice
  - formulas
  - xlookup
  - sumifs
source_dataset: 09_Source_Materials/Module 3/3-Module_3 Test Sheet.xlsx
created: 2026-09-28
updated: 2026-09-28
---
# Exercise 2: Analytical Formulas, Conditional Aggregations & Lookups

> [!abstract] Objective
> Build multi-condition summaries using `SUMIFS` and `COUNTIFS`, construct defensive lookups with `XLOOKUP`, and clean messy text inputs.

## Tasks & Challenges
- [x] **Level 1 (Recall)**: Explain why absolute cell referencing (`$`) is necessary when copying formula `=SUM(B$2:B2)` down a running total column. ✅ 2026-09-29
- [x] **Level 2 (Application)**: Write a single `SUMIFS` formula to calculate total sales for `Product == "Laptop"` sold in `Region == "East"`. ✅ 2026-09-29
- [x] **Level 3 (Lookup)**: Using `XLOOKUP`, retrieve the `Employee Bonus %` from an external lookup table. Provide a fallback of `0.0%` if not found. ✅ 2026-09-29
- [x] **Level 4 (Text Cleaning)**: Clean customer names in column A containing irregular spacing and mixed casing using `=PROPER(TRIM(A2))`. ✅ 2026-09-29
- [x] **Level 5 (Date Math)**: Calculate employee tenure in completed years using `=DATEDIF(HireDate, TODAY(), "Y")`. ✅ 2026-09-29

---
*Solutions available in [[Ex02_Solutions]].*

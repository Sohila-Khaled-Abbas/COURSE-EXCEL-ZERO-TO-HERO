---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Source
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Modern Calculation Engine & Dynamic Arrays
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - dynamic-arrays
  - formulas
  - calculation-engine
  - gemini-notebook
---

# Dynamic Arrays and Modern Calculation

## Why This Resource Matters
Excel's legacy calculation engine evaluated one formula per cell. Legacy multi-cell array formulas required the cumbersome `Ctrl + Shift + Enter` (CSE) syntax, were difficult to debug, and could not dynamically expand when new rows arrived. Modern Dynamic Arrays (Excel 365 / 2021+) fundamentally transform spreadsheet computation through automatic range spilling and the spill operator (`#`).

---

## Source Summary
The Gemini Notebook documentation outlines the core principles of Excel's dynamic array calculation engine:
- **Spill Behavior**: A single formula written in one cell outputs a variable-length 1D or 2D array that automatically overflows into adjacent empty cells.
- **The Spill Range Operator (`#`)**: Placing `#` after a cell reference (e.g. `H2#`) dynamically references the entire spilled array, adapting automatically as the underlying result expands or contracts.
- **`#SPILL!` Error Handling**: Occurs when the calculated spill pathway is blocked by non-empty cells, merged cells, or table boundary restrictions.
- **Core Dynamic Functions**:
  - `FILTER(array, include, [if_empty])`: Dynamic declarative subsetting without Pivot Tables or VBA.
  - `UNIQUE(array, [by_col], [exactly_once])`: De-duplicating dimensions in memory.
  - `SORT(array, [sort_index], [sort_order], [by_col])`: Dynamic ordering of calculated arrays.
  - `SORTBY(array, by_array1, [order1], ...)`: Sorting an array by external criteria.

---

## My Understanding
Dynamic arrays eliminate the need to manually drag formulas down thousands of rows or write VBA macros to generate distinct dropdown lists. For data analysts, writing `=SORT(UNIQUE(CallCenter[Agent]))` creates an instantly reactive, deduplicated dimension vector that automatically updates when new records are appended to the raw data table.

---

## Key Takeaways
1. **Dynamic Spill Ranges**: Formulas are authored in top-left cells only. Formula replication down columns is now handled natively by the engine.
2. **Formula Cascading with `#`**: Subsequent aggregations and lookups can point directly to `H2#` without guessing the row boundary or writing volatile `OFFSET()` formulas.
3. **Table Incompatibility Rule**: Spilled array formulas *cannot* live inside structured Excel Tables (`ListObject`), because Excel tables already have rigid row-expansion mechanics. Dynamic arrays must be placed on worksheet grids adjacent to tables.

---

## Important Examples

### Example 1: Distinct Agent List Extraction
```excel
=SORT(UNIQUE(CallCenter[Agent]))
```

### Example 2: Dynamic Subset Filter (Unresolved Calls Only)
```excel
=FILTER(CallCenter[[Call Id]:[Speed of answer]], CallCenter[Resolved] = "N", "All Calls Resolved")
```

### Example 3: Filtered Sort for Low CSAT Alerts
```excel
=SORT(FILTER(CallCenter, (CallCenter[Satisfaction rating] < 2) * (CallCenter[Answered (Y/N)] = "Y")), 6, 1)
```

---

## Practical Application
In the [[Call Center Performance Analysis]] dashboard, dynamic arrays provide reactive backend feeds for dashboard slicers, dynamic agent league tables, and exception reporting queues for abandoned calls, completely bypassing static manual refreshes.

---

## Practice
**Task**: In an empty worksheet, reference the `PwC Dataset.xlsx` call logs. Write a single formula using `FILTER` and `SORT` that extracts all calls handled by agent `Diane` where `Satisfaction rating <= 2`, sorted ascending by `Speed of answer`. Reference the output using `#` to calculate the average speed of answer for this subset.

---

## Concepts Supported
- [[Excel Tables]]
- [[Relative vs Absolute References]]
- [[Dashboard Design Principles]]

---

## Related Course Lessons
- [[07_Dynamic_Arrays_and_Modern_Formulas]]
- [[04_Lookup_and_Reference_Functions]]

---

## Practice Opportunities
- [[Ex02_Formulas_and_Lookup_Logic]]
- [[Ex07_Supplementary_Dynamic_Lookups_and_KPIs]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/KPIs|Call Center KPIs]]
- [[10_Portfolio/Call Center Analysis Portfolio Case Study]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)

---

## Notes
When deploying workbooks to enterprise stakeholders, verify that their Excel version supports dynamic arrays; legacy clients (Excel 2016/2019 standalone without M365 subscription) will wrap these formulas in `@` (implicit intersection operator) and fail to spill.

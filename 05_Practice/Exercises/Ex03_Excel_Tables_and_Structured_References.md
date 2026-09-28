---
type: exercise
module: "Module 4"
topic: "Excel Tables"
difficulty: intermediate
status: not-started
tags: [excel, practice, tables, structured-references]
source_dataset: "09_Source_Materials/Module 4/Module 4 Data_Set.xlsx"
created: 2026-09-28
updated: 2026-09-28
---
# Exercise 3: Excel Tables & Structured Referencing

> [!abstract] Objective
> Convert raw data ranges into official `ListObjects`, write structured calculation columns, and attach interactive table slicers.

## Tasks & Challenges
- [ ] **Level 1 (Conversion)**: Convert range `A1:G500` into an Excel Table (`Ctrl + T`) and rename it `SalesOrders`.
- [ ] **Level 2 (Calculated Column)**: Create a new column `GrossProfit` using structured syntax: `=[@UnitPrice] * [@Quantity] - [@Cost]`.
- [ ] **Level 3 (Total Row)**: Enable the Table Total Row (`Ctrl + Shift + T`) and set `GrossProfit` to `SUM` and `UnitPrice` to `AVERAGE`.
- [ ] **Level 4 (Slicer Interactivity)**: Insert Slicers for `Department` and `SalesChannel`. Test filter responsiveness.

---
*Solutions available in [[Ex03_Solutions]].*

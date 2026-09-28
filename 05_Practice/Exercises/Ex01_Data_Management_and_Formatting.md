---
type: exercise
module: "Module 2"
topic: "Data Management"
difficulty: beginner
status: not-started
tags: [excel, practice, formatting, validation]
source_dataset: "09_Source_Materials/Module 2/2-Module_2 Test Data.xlsx"
created: 2026-09-28
updated: 2026-09-28
---
# Exercise 1: Data Management, Validation & Custom Formatting

> [!abstract] Objective
> Master data hygiene, custom number formatting, list validation, and sorting on transactional retail records.

## Source Data
- **Path**: `09_Source_Materials/Module 2/2-Module_2 Test Data.xlsx`
- **Sheet**: `Dataset`

## Tasks & Challenges
- [ ] **Level 1 (Recall)**: Identify the 4 primitive data types present in the dataset and format the `Revenue` column as Accounting currency (`$#,##0.00`).
- [ ] **Level 2 (Application)**: Apply custom number formatting to the `Phone Number` column so that 10 raw digits display as `(###) ###-####`.
- [ ] **Level 3 (Governance)**: Create a Data Validation dropdown list for the `Region` column restricting entry strictly to: `North, South, East, West`. Set error style to **Stop**.
- [ ] **Level 4 (Sorting)**: Perform a multi-level sort: Primary by `Region` (Ascending), Secondary by `Revenue` (Descending).
- [ ] **Level 5 (Deduplication)**: Identify and remove any duplicate customer transactions based on composite key `[Customer ID] + [Transaction Date]`.

---
*Solutions available in [[Ex01_Solutions]].*

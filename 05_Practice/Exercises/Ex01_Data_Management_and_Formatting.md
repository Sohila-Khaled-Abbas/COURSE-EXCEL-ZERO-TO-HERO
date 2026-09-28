---
type: exercise
module: Module 2
topic: Data Management
difficulty: beginner
status: mastered
tags:
  - excel
  - practice
  - formatting
  - validation
source_dataset: 09_Source_Materials/Module 2/2-Module_2 Test Data.xlsx
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
- [x] **Level 1 (Recall)**: Identify the 4 primitive data types present in the dataset and format the `Revenue` column as Accounting currency (`$#,##0.00`). ✅ 2026-09-29
- [x] **Level 2 (Application)**: Apply custom number formatting to the `Phone Number` column so that 10 raw digits display as `(###) ###-####`. ✅ 2026-09-29
- [x] **Level 3 (Governance)**: Create a Data Validation dropdown list for the `Region` column restricting entry strictly to: `North, South, East, West`. Set error style to **Stop**. ✅ 2026-09-29
- [x] **Level 4 (Sorting)**: Perform a multi-level sort: Primary by `Region` (Ascending), Secondary by `Revenue` (Descending). ✅ 2026-09-29
- [x] **Level 5 (Deduplication)**: Identify and remove any duplicate customer transactions based on composite key `[Customer ID] + [Transaction Date]`. ✅ 2026-09-29

---
*Solutions available in [[Ex01_Solutions]].*

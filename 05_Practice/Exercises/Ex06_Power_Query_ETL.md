---
type: exercise
module: "Module 8"
topic: "Power Query ETL"
difficulty: advanced
status: not-started
tags: [power-query, etl, m-language]
source_dataset: "09_Source_Materials/Module 8/1-Power Query.xlsx"
created: 2026-09-28
updated: 2026-09-28
---
# Exercise 6: Power Query Automated ETL Pipeline

> [!abstract] Objective
> Build an automated ETL query in Power Query to ingest multiple CSVs, unpivot reporting matrices, and enforce clean dimensional schemas.

## Tasks & Challenges
- [ ] **Level 1 (Extract)**: Ingest `1.csv` and `2.csv` from Module 8 into Power Query.
- [ ] **Level 2 (Append)**: Append the two queries into a single unified `AllEmployees` query.
- [ ] **Level 3 (Transform)**: Unpivot wide monthly compensation columns into a tall normalized table (`EmployeeID`, `Month`, `Compensation`).
- [ ] **Level 4 (Load)**: Load the cleaned output directly into the Excel Data Model (Power Pivot).

---
*Solutions available in [[Ex06_Solutions]].*

---
title: "SQL Database Ingestion MOC"
date_created: "2026-10-01"
status: "Active"
tags:
  - "moc"
  - "sql"
  - "database"
  - "power-query"
  - "analytics-engineering"
---

# SQL Database Ingestion Map of Content (MOC)

Welcome to the **SQL Database Ingestion & Relational Analytics** hub. This curriculum track bridges relational database engineering and modern Excel analytics, training you to discover, query, ingest, model, visualize, and automate data pipelines sourcing from **Microsoft SQL Server**.

```text
Microsoft SQL Server Sample Database
                ↓
Database Schema Discovery
                ↓
Tables / Relationships / Keys
                ↓
SQL Exploration
                ↓
Data Profiling
                ↓
SQL Transformation
                ↓
Power Query / SQL Ingestion
                ↓
Data Cleaning
                ↓
Analytical Data Model
                ↓
Excel / Power Pivot
                ↓
KPI Layer
                ↓
Dashboard
                ↓
Automation
                ↓
Business Insights
                ↓
Portfolio Case Study
```

---

## 1. Core Architectural & Conceptual Notes

- [[SQL Server Architecture]] — Relational engine, storage engine, instances, databases, and system catalogs.
- [[Relational Database Concepts]] — Tables, records, columns, data types, constraints, schemas, and ACID properties.
- [[OLTP vs OLAP]] — Normalized transactional processing vs dimensional analytical modeling.
- [[Primary and Foreign Keys]] — Entity integrity, referential integrity, surrogate vs natural keys.
- [[Database Grain]] — Defining the atomic measurement unit of facts and operational transactions.
- [[SQL Joins]] — Inner, Left, Right, Full, and Self joins, and avoiding Cartesian explosive products.
- [[Many-to-Many Relationships]] — Junction/bridge tables, composite keys, and preventing double-counting.
- [[SQL Views]] — Decoupling physical storage from presentation, security, and query reusability.
- [[CTEs]] — Common Table Expressions, query modularity, readability, and recursion.
- [[Window Functions]] — `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `LAG`, `LEAD`, and running aggregates.
- [[Query Folding]] — Translating Power Query M transformations into native T-SQL server-side pushdown.
- [[SQL vs Power Query]] — Responsibility demarcation matrix: what belongs in SQL vs Power Query.
- [[SQL to Excel Architecture]] — Direct tables, raw SQL statements, views, and semantic models.
- [[Production Analytics Pipeline]] — Decoupled, parameterized, automated, and governed data pipelines.
- [[SQL Project Skill Matrix]] — Competency map across the 5 curriculum projects.

---

## 2. Interactive Discovery Labs (`11_Database_Labs/`)

1. [[Lab_01_Database_Discovery|Lab 01: Database Discovery]] — Querying `INFORMATION_SCHEMA` and system catalogs.
2. [[Lab_02_Schema_Exploration|Lab 02: Schema Exploration]] — Column definitions, nullability, and primary constraints.
3. [[Lab_03_Relationship_Analysis|Lab 03: Relationship Analysis]] — Programmatic foreign key mapping and bridge table detection.
4. [[Lab_04_Data_Profiling|Lab 04: Data Profiling]] — Volume metrics, null ratios, boundary checks, and orphan audits.
5. [[Lab_05_SQL_Querying|Lab 05: SQL Querying Fundamentals]] — Aggregations, joins, filtering, and group-level summaries.
6. [[Lab_06_Analytical_SQL|Lab 06: Analytical SQL]] — Windowing functions, ranking, period-over-period lags, and CTEs.
7. [[Lab_07_SQL_to_Excel_Ingestion|Lab 07: SQL to Excel Ingestion]] — Connector setup, native M recipes, and query folding verification.
8. [[Lab_08_Model_Validation|Lab 08: Model Validation & Reconciliation]] — 4-tier financial reconciliation between SQL, Power Query, and Excel.

---

## 3. Progressive Project Ladder (`12_SQL_Projects/`)

- [[12_SQL_Projects/Project Roadmap|SQL Project Roadmap]] — Competency ladder and difficulty matrix.
- **Project 01**: [[12_SQL_Projects/01_Northwind_SQL_to_Excel/README|Northwind SQL to Excel Sales Analytics]] (Foundation)
- **Project 02**: [[12_SQL_Projects/02_Pubs_Publishing_Analytics/README|Pubs Publishing Sales Intelligence]] (Intermediate — Many-to-Many Bridge)
- **Project 03**: [[12_SQL_Projects/03_AdventureWorks_Sales_Analytics/README|AdventureWorks Enterprise Sales Analytics]] (Advanced — Multi-Schema OLTP)
- **Project 04**: [[12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/README|AdventureWorksDW Dimensional Analytics]] (Advanced — Kimball Star Schema & DAX)
- **Project 05**: [[12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/README|Production SQL to Excel Analytics Pipeline]] (Expert — End-to-End Orchestration & VBA)

---

## 4. Source Guides & Reference Documentation

- [[Microsoft SQL Server Samples]] — Official Microsoft source hierarchy and sample database governance.
- [[SQL Server Installation References]] — Step-by-step T-SQL restoration and setup scripts.
- [[SQL Server Learning Environment]] — Full developer environment architecture.
- [[Northwind Documentation]] — 13 tables, physical schema, grain, and extraction views.
- [[pubs Documentation]] — 11 tables, royalty allocation, bridge tables, and queries.
- [[AdventureWorks Documentation]] — 71 tables across 6 schemas, B2B wholesale vs B2C retail.
- [[AdventureWorksDW Documentation]] — Fact and dimension separation, surrogate keys, star schema.

---

## 5. AI-Assisted SQL Analytics & Interview Prep

- [[AI-Assisted SQL Exploration]] — Responsible human-in-the-loop workflows for AI query generation.
- [[AI SQL Prompt Library]] — Battle-tested prompts for schema discovery, query optimization, and DAX modeling.
- [[AI SQL Verification]] — Validation framework preventing AI hallucinations and query logic flaws.
- [[SQL Database Interview Questions]] — Comprehensive technical questions spanning SQL, ETL, modeling, and project defense.

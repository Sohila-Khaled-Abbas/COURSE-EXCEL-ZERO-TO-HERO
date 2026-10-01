---
title: "SQL vs Power Query: Responsibility Matrix"
date_created: "2026-10-01"
status: "Active"
tags:
  - "sql-vs-power-query"
  - "architecture"
  - "etl"
---

# SQL vs Power Query: Responsibility Demarcation

A common architectural dilemma for analytics engineers is deciding **where** a specific transformation should take place: in the upstream **SQL Server Database** or within the client-side **Power Query (M) Mashup Engine**?

---

## 1. Architectural Responsibility Framework

| Transformation Task | Preferred Layer | Core Engineering Rationale |
| :--- | :---: | :--- |
| **Row Filtering (WHERE)** | **SQL Server** | Filter early at source to minimize network bandwidth and local memory consumption. |
| **Relational Joins (JOIN)** | **SQL Server** | SQL Server's cost-based optimizer leverages B-Tree indexes and hash algorithms with superior speed. |
| **Aggregation (GROUP BY)** | **Context Dependent** | In SQL if reporting pre-aggregated facts; in Power Pivot / DAX if drill-down grain is required. |
| **Column Projection (SELECT)** | **SQL Server** | Eliminate unused columns at the database engine before network transmission. |
| **Business Semantic Views** | **SQL Server** | Standardize single-source-of-truth logic reusable across Excel, Power BI, and Python. |
| **Data Type Enforcement** | **Both** | SQL guarantees relational types; Power Query ensures Excel-compatible schemas. |
| **Unpivoting / Pivoting** | **Power Query** | Power Query's `Table.UnpivotOtherColumns` is vastly simpler and more dynamic than SQL `PIVOT`. |
| **File / Web Ingestion** | **Power Query** | Ingesting external CSVs, SharePoint folders, or web tables into the model. |
| **Workbook-Specific Parameters** | **Power Query** | Dynamic configuration driven by named Excel cells (e.g. `cfg_ServerName`). |
| **Final Display Formatting** | **Excel** | Currency symbols, decimal places, and number formatting belong in the presentation layer. |

---

## 2. Guiding Rule: "Transform As Upstream As Possible, As Downstream As Necessary"

Roche's Maxim of Data Transformation states:
> *"Data should be transformed as far upstream as possible, and as far downstream as necessary."*

1. If it can be done in an enterprise SQL View with indexes, do it in SQL.
2. If it requires desktop-specific interactivity, parameterization, or Excel-native shaping, do it in Power Query.
3. If it requires dynamic runtime aggregation sensitive to dashboard slicers, do it in DAX.

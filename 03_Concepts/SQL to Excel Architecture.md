---
title: "SQL to Excel Ingestion Architectures"
date_created: "2026-10-01"
status: "Active"
tags:
  - "sql-to-excel"
  - "ingestion-patterns"
  - "enterprise-bi"
---

# SQL to Excel Ingestion Architectures

When sourcing analytical models from Microsoft SQL Server into Microsoft Excel, there are four standard ingestion architectures. Choosing the right pattern determines pipeline resilience, query folding, and maintenance overhead.

---

## 1. Architectural Patterns

```text
┌────────────────────────────────────────────────────────────────────────┐
│ Pattern A: Direct Table Ingestion                                      │
│ SQL Table ──► Power Query ──► Excel Table                              │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Pattern B: Native SQL Query Ingestion                                  │
│ SQL Tables ──► Custom SQL Statement ──► Power Query ──► Excel          │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Pattern C: SQL View Ingestion (Recommended Enterprise Pattern)         │
│ SQL Tables ──► Stored View (vw_Sales) ──► Power Query ──► Excel        │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ Pattern D: Dimensional Semantic Model (High-End BI)                    │
│ SQL DW ──► Views/Tables ──► Power Query ──► Power Pivot ──► Dashboard  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ingestion Pattern Trade-off Matrix

| Criterion | Pattern A (Direct Table) | Pattern B (Custom SQL) | Pattern C (SQL View) | Pattern D (Semantic Model) |
| :--- | :--- | :--- | :--- | :--- |
| **Maintainability** | Poor (tight coupling) | Medium (hardcoded SQL) | High (centralized) | Highest (governed model) |
| **Query Folding** | Full | Breaks on outer steps | Full | Full |
| **Performance** | Sluggish if large tables | High | High | Maximum (VertiPaq) |
| **Reusability** | None | None | Reusable across tools | Reusable across models |
| **Best Used For** | Quick exploration | Ad-hoc one-off query | Standard reporting | Enterprise Dashboards |

---

## 3. Recommended Best Practice
For production Excel pipelines, use **Pattern C or D**:
1. Encapsulate business logic inside a version-controlled SQL View (`dbo.vw_ExecutiveSalesPipeline`).
2. Point Power Query to the View without entering custom SQL statements, ensuring the M engine retains native query folding.
3. Load the data directly into the **Data Model** (Power Pivot) rather than spilling raw rows onto a worksheet grid.

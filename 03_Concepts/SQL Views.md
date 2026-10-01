---
title: "SQL Views in Analytics Engineering"
date_created: "2026-10-01"
status: "Active"
tags:
  - "sql-views"
  - "data-architecture"
  - "abstractions"
---

# SQL Views in Analytics Engineering

A **View** is a saved, named T-SQL `SELECT` statement stored in the database catalog. Often referred to as a "virtual table," a standard view does not store data on disk; rather, it dynamically evaluates the underlying query whenever referenced.

---

## 1. Why Views are Crucial for Excel Ingestion

Directly connecting Excel to raw database tables creates tight coupling and fragility. If a DBA renames a column or refactors normalization tables, downstream Excel workbooks break.

### The Semantic View Abstraction:
```text
Raw Tables (3NF Schema) ──► SQL View (Semantic Layer) ──► Power Query ──► Excel Model
```

### Architectural Benefits:
1. **Separation of Concerns**: Encapsulates complex joins, business calculation logic, and filter criteria on the SQL server.
2. **Column Projection**: Excludes unnecessary high-cardinality metadata (binary columns, system IDs, timestamps) before network transfer.
3. **Query Folding Transparency**: Power Query treats SQL Views identically to base tables, enabling seamless folding for downstream filters.
4. **Security & Governance**: Restricts Excel analysts from accessing sensitive columns (e.g. employee SSNs or raw passwords) without duplicating data.

---

## 2. Syntax Standard: `CREATE OR ALTER VIEW`

Modern SQL Server (2016 SP1+) supports idempotent view authoring:

```sql
CREATE OR ALTER VIEW dbo.vw_CustomerOrderSummary AS
SELECT 
    c.CustomerID,
    c.CompanyName,
    c.Country,
    COUNT(DISTINCT o.OrderID) AS TotalOrders,
    ROUND(SUM(od.UnitPrice * od.Quantity * (1.0 - od.Discount)), 2) AS NetSales
FROM dbo.Customers c
INNER JOIN dbo.Orders o ON c.CustomerID = o.CustomerID
INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID
GROUP BY c.CustomerID, c.CompanyName, c.Country;
GO
```

---

## 3. Indexed (Materialized) Views

For intensive aggregation queries across millions of rows, SQL Server supports **Indexed Views** (materialized views):
- Created with `WITH SCHEMABINDING`.
- A unique clustered index is created on the view, physically persisting the aggregation results on disk.
- Automatically maintained by the storage engine during underlying table writes.

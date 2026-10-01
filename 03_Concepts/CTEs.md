---
title: "Common Table Expressions (CTEs)"
date_created: "2026-10-01"
status: "Active"
tags:
  - "cte"
  - "sql-modularization"
  - "analytical-sql"
---

# Common Table Expressions (CTEs)

A **Common Table Expression (CTE)** is a temporary, named result set defined within the execution scope of a single `SELECT`, `INSERT`, `UPDATE`, `DELETE`, or `MERGE` statement.

---

## 1. Why CTEs Replace Deeply Nested Subqueries

Deeply nested subqueries (derived tables) are notoriously difficult to read, debug, and maintain. CTEs enable a top-to-bottom, step-by-step modular pipeline similar to Power Query applied directly in T-SQL.

### Nested Subquery Anti-Pattern:
```sql
SELECT CustomerID, NetSales
FROM (
    SELECT CustomerID, SUM(Total) AS NetSales
    FROM (
        SELECT o.CustomerID, (od.UnitPrice * od.Quantity) AS Total
        FROM Orders o JOIN [Order Details] od ON o.OrderID = od.OrderID
    ) AS RawSales
    GROUP BY CustomerID
) AS AggSales
WHERE NetSales > 10000;
```

### Clean CTE Implementation:
```sql
WITH LineItems AS (
    SELECT 
        o.CustomerID,
        (od.UnitPrice * od.Quantity * (1.0 - od.Discount)) AS LineAmount
    FROM dbo.Orders o
    INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID
),
CustomerSales AS (
    SELECT 
        CustomerID,
        ROUND(SUM(LineAmount), 2) AS NetSales
    FROM LineItems
    GROUP BY CustomerID
)
SELECT CustomerID, NetSales
FROM CustomerSales
WHERE NetSales > 10000
ORDER BY NetSales DESC;
```

---

## 2. Recursive CTEs

CTEs possess a unique capability that subqueries do not: **Recursion**. This is ideal for traversing organizational hierarchies (e.g., employee manager chains) or bills of materials:

```sql
WITH EmployeeHierarchy AS (
    -- Anchor Member: Top-level executives (ReportsTo IS NULL)
    SELECT EmployeeID, LastName, ReportsTo, 1 AS OrgLevel
    FROM dbo.Employees
    WHERE ReportsTo IS NULL

    UNION ALL

    -- Recursive Member: Subordinates reporting to previous level
    SELECT e.EmployeeID, e.LastName, e.ReportsTo, eh.OrgLevel + 1
    FROM dbo.Employees e
    INNER JOIN EmployeeHierarchy eh ON e.ReportsTo = eh.EmployeeID
)
SELECT * FROM EmployeeHierarchy ORDER BY OrgLevel, LastName;
```

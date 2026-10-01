---
title: "SQL Window Functions"
date_created: "2026-10-01"
status: "Active"
tags:
  - "window-functions"
  - "ranking"
  - "analytical-sql"
---

# SQL Window Functions

**Window Functions** perform calculations across a specified set of table rows that are related to the current row, without collapsing the individual rows into a single summary output like traditional `GROUP BY` aggregations.

---

## 1. Syntax Anatomy

```sql
FUNCTION() OVER (
    [PARTITION BY partition_column]
    [ORDER BY sort_column]
    [ROWS|RANGE frame_specification]
)
```

- **`PARTITION BY`**: Divides the query result set into independent partitions/groups.
- **`ORDER BY`**: Specifies the logical sorting sequence within each partition.
- **`ROWS BETWEEN`**: Defines the rolling window boundary (e.g. `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` for running totals).

---

## 2. Core Window Function Families

### 1. Ranking Functions
- `ROW_NUMBER()`: Assigns a strictly unique, sequential integer to each row within a partition.
- `RANK()`: Assigns sequential rank; identical values share the same rank, and subsequent ranks skip numbers (e.g. 1, 2, 2, 4).
- `DENSE_RANK()`: Assigns sequential rank without gaps (e.g. 1, 2, 2, 3).
- `NTILE(n)`: Divides the partition into $n$ equal quantiles/buckets (e.g. quartiles, deciles).

### 2. Value / Offset Functions
- `LAG(col, offset)`: Accesses data from a preceding row in the same partition (crucial for Month-over-Month growth calculations).
- `LEAD(col, offset)`: Accesses data from a subsequent row.
- `FIRST_VALUE(col)` / `LAST_VALUE(col)`: Fetches boundary values within the window frame.

### 3. Aggregation Over Windows
- `SUM(col) OVER (PARTITION BY ... ORDER BY ...)`: Computes progressive running totals.
- `AVG(col) OVER (...)`: Computes moving rolling averages.

---

## 3. Practical Analytics Example: Period-over-Period Growth

```sql
WITH MonthlySales AS (
    SELECT 
        YEAR(OrderDate) AS OrderYear,
        MONTH(OrderDate) AS OrderMonth,
        ROUND(SUM(SalesAmount), 2) AS MonthlyRevenue
    FROM dbo.FactInternetSales
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT 
    OrderYear,
    OrderMonth,
    MonthlyRevenue,
    LAG(MonthlyRevenue, 1) OVER (ORDER BY OrderYear, OrderMonth) AS PriorMonthRevenue,
    ROUND(MonthlyRevenue - LAG(MonthlyRevenue, 1) OVER (ORDER BY OrderYear, OrderMonth), 2) AS MoM_Change,
    ROUND(((MonthlyRevenue - LAG(MonthlyRevenue, 1) OVER (ORDER BY OrderYear, OrderMonth)) / 
           NULLIF(LAG(MonthlyRevenue, 1) OVER (ORDER BY OrderYear, OrderMonth), 0)) * 100.0, 2) AS MoM_GrowthPct
FROM MonthlySales;
```

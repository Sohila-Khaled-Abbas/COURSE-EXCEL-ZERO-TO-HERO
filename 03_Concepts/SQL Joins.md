---
title: "SQL Joins: Mechanics & Best Practices"
date_created: "2026-10-01"
status: "Active"
tags:
  - "sql-joins"
  - "ansi-sql"
  - "query-optimization"
---

# SQL Joins: Mechanics & Best Practices

SQL Joins combine columns from one or more tables based on logical relationships between matching keys. Understanding join behavior is essential to avoid missing data, Cartesian products, or duplicated measures.

---

## 1. Join Types

```text
Table A (Left)               Table B (Right)
┌───────────┐                ┌───────────┐
│     1     │ ── INNER ──    │     1     │  Only matching keys in both tables
│     2     │                │     2     │
│     3     │ ── LEFT ───►   │   NULL    │  All from Table A + matched from Table B
│   NULL    │ ◄── RIGHT ───  │     4     │  All from Table B + matched from Table A
│     3     │ ◄── FULL ────► │     4     │  All rows from both tables, NULLs where no match
└───────────┘                └───────────┘
```

1. **INNER JOIN**: Returns rows only when the join condition evaluates to TRUE in both tables. Excludes unmatched parent or child rows.
2. **LEFT (OUTER) JOIN**: Preserves all rows from the left table. If no match exists in the right table, columns return `NULL`. Essential for preserving dimensions that have zero current sales.
3. **RIGHT (OUTER) JOIN**: Preserves all rows from the right table. (In practice, standardizing on LEFT JOINs improves query readability).
4. **FULL (OUTER) JOIN**: Retains all rows from both tables, filling missing matches with `NULL`. Used primarily for data reconciliation audits.
5. **CROSS JOIN**: Produces a Cartesian product ($Rows_A \times Rows_B$). Never use without intentional aggregation (e.g. generating date/store matrices).
6. **SELF JOIN**: A table joined to itself, commonly used to traverse hierarchical structures (e.g. `Employees.ReportsTo -> Employees.EmployeeID`).

---

## 2. Join Execution Physical Algorithms

SQL Server chooses one of three physical join algorithms based on data distribution:
1. **Nested Loops Join**: Efficient when one table is small and the other table is indexed on the join column.
2. **Merge Join**: Extremely fast when both input sets are pre-sorted on the join key (common with clustered indexes).
3. **Hash Match Join**: Used for large, unsorted datasets. Builds an in-memory hash table of the smaller input and probes it with the larger input. High memory grant consumer.

---

## 3. Join Traps in Analytics
- **Joining on NULL**: In SQL, `NULL = NULL` evaluates to `UNKNOWN`, not TRUE. Standard equality joins drop `NULL` keys unless handled via `ISNULL(a.Key, -1) = ISNULL(b.Key, -1)`.
- **Many-to-Many Fan-Out**: If join keys are not unique on at least one side of the join, rows multiply rapidly, distorting sums and averages.

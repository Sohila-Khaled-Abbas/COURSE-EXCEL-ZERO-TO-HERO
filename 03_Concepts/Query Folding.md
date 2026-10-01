---
title: "Power Query SQL Query Folding"
date_created: "2026-10-01"
status: "Active"
tags:
  - "query-folding"
  - "power-query"
  - "performance"
  - "sql-pushdown"
---

# Power Query SQL Query Folding

**Query Folding** is the built-in capability of the Power Query (Mashup) engine to convert graphical transformation steps authored in M into a single, native SQL `SELECT` statement and push that computation directly to the remote database engine (Source-Side Pushdown).

---

## 1. Why Query Folding is Critical

Without query folding, Excel must pull entire unfiltered tables across the network into local RAM before applying filters or grouping.

```text
WITH QUERY FOLDING (OPTIMAL):
Power Query: Filter Country = 'USA' ──► Generated SQL: WHERE Country = 'USA' ──► SQL Server executes filter
Network transfer: 1,000 rows (only USA data)

WITHOUT QUERY FOLDING (PERFORMANCE DISASTER):
Power Query fails to fold ──► Generated SQL: SELECT * FROM LargeTable
Network transfer: 10,000,000 rows transferred across network!
Local Machine: Power Query strains CPU/RAM filtering rows locally in Excel!
```

---

## 2. Transformations That Typically Fold

When connected to Microsoft SQL Server, Power Query folds:
- **Filtering**: `Table.SelectRows` $\to$ SQL `WHERE` clause.
- **Column Selection**: `Table.SelectColumns` $\to$ SQL `SELECT col1, col2`.
- **Sorting**: `Table.Sort` $\to$ SQL `ORDER BY`.
- **Grouping & Aggregation**: `Table.Group` $\to$ SQL `GROUP BY`, `SUM()`, `COUNT()`.
- **Merging / Joins**: `Table.NestedJoin` on database tables $\to$ SQL `INNER JOIN` / `LEFT OUTER JOIN`.
- **Appends**: `Table.Combine` $\to$ SQL `UNION ALL`.
- **Adding Custom Columns (Simple Math)**: Basic arithmetic and standard string logic $\to$ SQL calculated expressions.

---

## 3. Operations That Break Query Folding

Any operation that lacks a direct 1-to-1 equivalent in T-SQL stops query folding permanently. All subsequent steps will execute locally:
1. **Custom M Functions**: Invoking external M functions or non-standard library calls.
2. **Buffer Operations**: `Table.Buffer` explicitly forces local caching.
3. **Advanced Text Splitting**: Regex or delimiter splitting by complex multi-character rules.
4. **Changing Types to Unmapped Types**: Complex locale-dependent transformations.
5. **Non-Folding Preceding Step**: Once a single step breaks folding, no subsequent downstream step can fold!

---

## 4. How to Inspect Query Folding in Excel

In Power Query Editor:
1. Right-click any applied step in the **Applied Steps** pane.
2. If **View Native Query** is enabled (clickable), the step is folding. Clicking it opens the exact T-SQL script sent to SQL Server.
3. If **View Native Query** is disabled (grayed out), folding stopped at or before this step.

---
title: "AI-Assisted Query Debugging & Optimization"
date_created: "2026-10-01"
status: "Active"
tags:
  - "ai-debugging"
  - "query-optimization"
  - "troubleshooting"
---

# AI-Assisted Query Debugging & Optimization

When T-SQL queries fail, run slowly, or produce unexpected output, AI can help diagnose syntax errors, explain execution plan bottlenecks, and recommend indexing strategies.

---

## 1. Diagnostic Prompt Template

```text
Act as a SQL Server Performance Tuning Specialist.
I have a T-SQL query running against Microsoft SQL Server 2022 that is experiencing [ISSUE: slow execution / incorrect row count / syntax error].

Here is the query:
[PASTE QUERY]

Here is the error message or symptom:
[PASTE ERROR MESSAGE OR OBSERVED VS EXPECTED RESULT]

Here are the table definitions and indexes:
[PASTE DDL / INDEXES]

Please:
1. Identify the root cause of the issue.
2. Provide the corrected query.
3. Explain why the correction resolves the problem.
4. Recommend any missing indexes on foreign keys or filter columns.
```

---

## 2. Common Optimization Recommendations to Watch For

1. **SARGability**: Look for functions wrapping indexed columns in `WHERE` clauses (e.g., `WHERE YEAR(OrderDate) = 2023`). AI should refactor this to a range query (`WHERE OrderDate >= '2023-01-01' AND OrderDate < '2024-01-01'`) to enable Index Seeks.
2. **Eliminating Correlated Subqueries**: AI should replace row-by-row subqueries with set-based joins or window functions.
3. **Column Projection**: AI should eliminate `SELECT *` and specify only required columns to reduce I/O and enable covering indexes.

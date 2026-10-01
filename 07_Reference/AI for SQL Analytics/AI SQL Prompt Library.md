---
title: "AI SQL Prompt Library"
date_created: "2026-10-01"
status: "Active"
tags:
  - "ai-prompts"
  - "sql"
  - "t-sql"
  - "templates"
---

# AI SQL Prompt Library

This prompt library provides structured, battle-tested prompt templates for querying, modeling, and debugging Microsoft SQL Server databases.

---

## 1. Schema Discovery & Relationship Mapping Prompt

```text
Act as a Senior SQL Server Architect.
I am investigating a new SQL Server database named [DATABASE_NAME].
Write an ANSI-standard T-SQL script using sys.tables, sys.foreign_keys, and sys.indexes that:
1. Returns all base tables with their current row counts.
2. Identifies all parent-child foreign key relationships.
3. Detects any composite primary keys and junction tables.
Format the output as clean tables suitable for documentation in Markdown.
Target Environment: Microsoft SQL Server 2022 (T-SQL).
```

---

## 2. Multi-Table Analytical Join & CTE Prompt

```text
Act as an Analytics Engineer.
I need to calculate [BUSINESS_METRIC, e.g., Net Sales and Margin %] from the following tables:
- Parent Fact/Header: [TABLE_A] (Grain: [GRAIN_A], Keys: [PK_A])
- Child Line-Item: [TABLE_B] (Grain: [GRAIN_B], Keys: [PK_B, FK_A])
- Dimension: [TABLE_C] (Keys: [PK_C])

Requirements:
1. Target Dialect: Microsoft SQL Server 2022 (T-SQL).
2. Use Common Table Expressions (CTEs) to separate line-item arithmetic from group-level aggregation.
3. Handle potential division by zero using NULLIF.
4. Ensure no double-counting occurs due to grain mismatches.
5. Provide a corresponding reconciliation query to audit the total sum against raw tables.
```

---

## 3. Query Folding Validation Prompt

```text
Act as a Power Query and SQL Optimization Specialist.
Review this M code query connected to a SQL Server view:
[PASTE M CODE HERE]

Questions:
1. Will this M code preserve native Query Folding back to SQL Server?
2. Which step, if any, will force the Mashup Engine to pull unfiltered data into Excel RAM?
3. How can I refactor this transformation to push the filtering and joining into the source SQL Server view?
```

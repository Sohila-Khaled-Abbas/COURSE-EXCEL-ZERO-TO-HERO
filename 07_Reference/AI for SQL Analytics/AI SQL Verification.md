---
title: "AI SQL Verification & Hallucination Prevention"
date_created: "2026-10-01"
status: "Active"
tags:
  - "ai-verification"
  - "hallucination-prevention"
  - "data-quality"
---

# AI SQL Verification & Hallucination Prevention

Large Language Models (LLMs) frequently hallucinate database objects: inventing non-existent columns, assuming relationships that do not exist, or using deprecated syntax. This guide outlines the rigorous verification process to ensure zero hallucinations in production SQL.

---

## 1. Top 5 AI SQL Failure Modes

1. **Fabricated Column Names**: AI often guesses column names based on common conventions (e.g. inventing `CustomerName` when the actual schema splits it into `FirstName` and `LastName`).
2. **Grain Confusion**: Joining headers to line items and calculating averages directly across joined rows, resulting in inflated denominators.
3. **Dialect Pollution**: Injecting MySQL functions (`IFNULL`, `LIMIT`) or PostgreSQL functions (`DATE_TRUNC`) into Microsoft SQL Server queries.
4. **Implicit Type Conversions**: Assuming string dates can be subtracted directly without `DATEDIFF`.
5. **Double-Counting in M:N Joins**: Naively joining bridge tables without weighting or distinct aggregations.

---

## 2. Verification Checklist

Before accepting any AI-generated query into your project:

- [ ] **Catalog Existence**: Does every table and column exist in `INFORMATION_SCHEMA.COLUMNS`?
- [ ] **Parse Check**: Does the query parse without errors (`SET NOEXEC ON; [Query]; SET NOEXEC OFF;`)?
- [ ] **Row Count Audit**: Does the row count match expected fact counts, or did an unconstrained join cause row explosion?
- [ ] **Null Handling**: Does the query account for `NULL` in outer joins or arithmetic operations?
- [ ] **Performance Review**: Does the Execution Plan reveal unindexed Table Scans or expensive Sort operations?

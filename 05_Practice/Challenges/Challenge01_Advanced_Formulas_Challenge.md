---
type: challenge
difficulty: advanced
tags: [excel, challenge, formulas, dynamic-arrays]
created: 2026-09-28
updated: 2026-09-28
---
# Capstone Formula Challenge: Dynamic Top-5 Agent Extraction

> [!abstract] The Challenge
> Write a single dynamic array formula in Excel 365 that inspects the 5,000-row Call Center table and outputs the Top 3 Agents by Total Resolved Calls without using Pivot Tables or helper columns.

### Required Output
A spilled 3-row, 2-column table showing `[Agent Name, Resolved Calls]`.

### Hint
Combine `UNIQUE`, `SORTBY`, and `COUNTIFS`.

---
type: revision
title: Quick Review Cram Sheet
tags: [excel, revision, cram-sheet]
created: 2026-09-28
updated: 2026-09-28
---

# ⚡ High-Yield 15-Minute Technical Cram Sheet

## 1. Top 5 Formula Syntaxes to Remember
1. `XLOOKUP`: `=XLOOKUP(val, lookup_vec, return_vec, "Fallback")`
2. `SUMIFS`: `=SUMIFS(sum_vec, crit_vec1, crit1, crit_vec2, crit2)`
3. `COUNTIFS`: `=COUNTIFS(crit_vec1, crit1, crit_vec2, crit2)`
4. `IFS`: `=IFS(cond1, res1, cond2, res2, TRUE, fallback)`
5. `TEXTJOIN`: `=TEXTJOIN(", ", TRUE, text_array)`

## 2. Table Syntax
- `[@Column]`: Active row
- `Table[Column]`: Whole column

## 3. Pivot Tables
- Refresh shortcut: `Alt + F5` (active table) or `Ctrl + Alt + F5` (all tables).
- Always use `Show Values As` for percentage compositions.

## 4. Power Query
- Always check column datatypes after promoting headers.
- Use **Unpivot Other Columns** to normalize wide reports.

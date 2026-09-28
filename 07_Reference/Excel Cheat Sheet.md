---
type: reference
title: Excel Cheat Sheet
tags: [excel, reference, cheat-sheet]
created: 2026-09-28
updated: 2026-09-28
---

# ⚡ Excel Data Analyst Cheat Sheet

## 1. Essential Formulas At A Glance
| Analytical Need | Modern Formula | Syntax |
| :--- | :--- | :--- |
| **Bidirectional Lookup** | `XLOOKUP` | `=XLOOKUP(val, lookup_col, return_col, "Not Found")` |
| **Multi-Condition Sum** | `SUMIFS` | `=SUMIFS(sum_range, crit_range1, crit1, crit_range2, crit2)` |
| **Multi-Condition Count**| `COUNTIFS` | `=COUNTIFS(crit_range1, crit1, crit_range2, crit2)` |
| **Multi-Condition Average**| `AVERAGEIFS` | `=AVERAGEIFS(avg_range, crit_range1, crit1)` |
| **Safe Error Handling** | `IFERROR` | `=IFERROR(formula, fallback_value)` |
| **Multi-Condition Logic**| `IFS` | `=IFS(cond1, val1, cond2, val2, TRUE, fallback)` |
| **Text Cleansing** | `TRIM` + `PROPER` | `=PROPER(TRIM(text_cell))` |
| **Delimiter Joining** | `TEXTJOIN` | `=TEXTJOIN(", ", TRUE, text_range)` |
| **Dynamic Distinct List**| `UNIQUE` | `=UNIQUE(range_or_column)` |
| **In-Memory Filtering** | `FILTER` | `=FILTER(table, table[Status] = "Active", "None")` |

---

## 2. Table & Structured Reference Shorthand
- `[@ColumnName]`: Value on the active row.
- `TableName[ColumnName]`: Data column (excludes header and total).
- `TableName[#All]`: Entire table including headers and totals.
- `TableName[#Totals]`: Bottom summary row.

---

## 3. Power Pivot DAX Patterns
- Safe Division: `=DIVIDE([Numerator], [Denominator], 0)`
- Filter Context Modification: `=CALCULATE(COUNTROWS(FactTable), FactTable[Status] = "Y")`
- Dimension Traversal: `=RELATED(DimTable[Attribute])`

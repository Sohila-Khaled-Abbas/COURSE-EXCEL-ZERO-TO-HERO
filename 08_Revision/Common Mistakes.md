---
type: revision
title: Common Mistakes Log
tags: [excel, debugging, mistakes, error-log]
created: 2026-09-28
updated: 2026-09-28
---

# ⚠️ Top 15 Excel Pitfalls & Diagnostic Error Log

| Error Code / Pitfall | Root Cause | Proven Diagnostic Solution |
| :--- | :--- | :--- |
| **`#SPILL!`** | A non-empty cell is blocking a dynamic array (`UNIQUE`, `FILTER`) from expanding. | Clear all cells below and to the right of the formula cell. |
| **`#N/A` in VLOOKUP** | Lookup value does not exist, or data type mismatch (e.g. Number stored as Text). | Convert ID column to clean numbers, or use `XLOOKUP` with fallback `[if_not_found]`. |
| **`#DIV/0!`** | Dividing by zero or an empty cell in ratio calculations. | Wrap formula in `=IFERROR(A/B, 0)` or use DAX `=DIVIDE(A, B, 0)`. |
| **`#VALUE!`** | Performing math operations on text strings (e.g. `="100" + "Text"`). | Inspect cell format; ensure clean numeric input using `VALUE()` or `NUMBERVALUE()`. |
| **`#REF!`** | A cell referenced by the formula was deleted. | Undo deletion (`Ctrl + Z`) or reconstruct formula reference. |
| **VLOOKUP Column Shift** | User inserted a column, causing `col_index_num` to point to wrong attribute. | Migrate from `VLOOKUP` to `XLOOKUP` or `INDEX & MATCH`. |
| **Pivot Table Out-of-Date** | Source table edited, but Pivot Table does not auto-refresh. | Right-click -> **Refresh** (`Alt + F5`) or automate via Workbook open macro. |
| **Summing Text Numbers as 0** | Exported numbers have leading apostrophes or text format. | Select column -> Data > Text to Columns -> Finish to coerce to numbers. |
| **Unanchored Lookup Ranges** | Dragging formula down causes lookup table `$A$1:$B$10` to drift. | Press `F4` to lock table reference with dollar signs (`$A$1:$B$10`). |
| **Imputing Valid Operational Nulls** | Replacing abandoned call speed nulls with 0, distorting ASA. | Maintain nulls or flag as `"Abandoned"` to avoid corrupting average metrics. |

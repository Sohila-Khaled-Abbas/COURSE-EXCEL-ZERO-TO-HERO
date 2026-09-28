---
type: lesson
course: Excel Zero to Hero
module: Module 3
topic: Dynamic Arrays
status: completed
difficulty: advanced
tags:
  - excel
  - lesson
  - dynamic-arrays
  - spill-formulas
prerequisites:
  - "[[01_Formula_Basics_and_Cell_Referencing]]"
related_project: "[[Call Center Performance Analysis]]"
source: https://youtu.be/uv1bxe2gdnU
created: 2026-09-28
updated: 2026-09-29
video_chapter: Chapter 3 – Excel Formulas & Functions
video_timestamp: 1:38:56
video_url: https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s
---

# Lesson 3.7: Modern Dynamic Arrays & Spill Ranges

> [!abstract] Learning Objective
> Leverage Excel 365's Dynamic Array calculation engine to filter, deduplicate, sort, and parse tabular data in memory without VBA, manual copying, or legacy Ctrl+Shift+Enter arrays.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

## Core Dynamic Array Functions
- `=UNIQUE(array, [by_col], [exactly_once])`: Extracts distinct values from a column or range.
- `=FILTER(array, include_boolean_array, [if_empty])`: Returns rows matching criteria.
- `=SORT(array, [sort_index], [sort_order])`: Sorts range dynamically.
- `=SORTBY(array, by_array1, [order1], ...)`: Sorts based on an external column.
- `=TEXTSPLIT(text, col_delim, [row_delim])`: Dynamically splits text strings across columns/rows.
- `=XMATCH(lookup_value, lookup_array)`: Dynamic position finder with exact match by default.

## Understanding the Spill Range (`#`)
When a formula returns multiple values, it "spills" into neighboring cells. 
To reference the entire dynamic spilled output of cell `G2`:
```excel
=G2#
```

> [!danger] The #SPILL! Error
> Occurs when a non-empty cell blocks the expansion path of a dynamic array. Clearing the blocking cells immediately resolves the error.

## Related Knowledge
- **Formulas**: [[UNIQUE]], [[FILTER]], [[SORT]], [[SORTBY]], [[TEXTSPLIT]], [[XMATCH]]
- **Concepts**: [[VLOOKUP vs XLOOKUP]], [[Why Not Always Formulas]]
- **Practice**: [[Ex02_Formulas_and_Lookup_Logic]]

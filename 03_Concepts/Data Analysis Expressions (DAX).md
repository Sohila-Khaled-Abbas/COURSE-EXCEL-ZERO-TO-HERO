---
type: concept
category: dax
aliases: [DAX, Data Analysis Expressions]
tags: [dax, power-pivot, bi, expressions]
difficulty: advanced
status: mastered
related_functions: ["[[CALCULATE]]", "[[DIVIDE]]", "[[RELATED]]"]
related_lessons: ["[[03_DAX_Fundamentals_Calculated_Columns_vs_Measures]]"]
related_project: "[[Call Center Performance Analysis]]"
created: 2026-09-28
updated: 2026-09-28
---

# Concept: Data Analysis Expressions (DAX)

> [!summary] Definition & Mental Model
> DAX is Microsoft's functional expression language for Power Pivot, Power BI, and SSAS Tabular models designed to perform dynamic aggregation calculations across relational data models under varying filter contexts.

## 1. What Is It?
While Excel formulas calculate cell-by-cell coordinates, DAX calculates dynamically over tables, columns, and filter contexts.

## 2. Calculated Columns vs DAX Measures
- **Calculated Column**: Evaluated during model refresh; stored in memory on every row.
- **DAX Measure**: Evaluated on-the-fly at query runtime based on active Pivot Table slicers, row coordinates, and visual filters.

## 3. The Power of CALCULATE
`CALCULATE` is the engine of DAX: it alters, overrides, or expands the active filter context:
```dax
Total_Resolved := CALCULATE(
    COUNTROWS(Fact_Calls),
    Fact_Calls[Resolved] = "Y"
)
```

## 4. Related Concepts
- [[Calculated Columns vs DAX Measures]]
- [[Dimensional Modeling]]
- [[CALCULATE]]
- [[DIVIDE]]

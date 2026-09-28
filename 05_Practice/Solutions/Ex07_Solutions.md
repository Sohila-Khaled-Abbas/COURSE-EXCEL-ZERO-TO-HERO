---
type: solution
module: "Supplementary Module"
topic: "Modern Lookups, Dynamic Arrays & DAX KPIs"
exercise: "[[Ex07_Supplementary_Dynamic_Lookups_and_KPIs]]"
tags: [excel, solution, gemini-notebook, xlookup, dax]
created: 2026-09-28
updated: 2026-09-28
---

# Solutions: Exercise 7 (Supplementary Dynamic Lookups & KPIs)

## Level 1 Solution: VLOOKUP vs XLOOKUP Defaults
- **VLOOKUP Flaw**: `VLOOKUP(lookup_value, table_array, col_index, [range_lookup])` defaults to `TRUE` (Approximate match) if the fourth argument is omitted. If the lookup column is unsorted, it returns an arbitrary, silent false match.
- **XLOOKUP Defense**: `XLOOKUP` defaults to `0` (Exact match). It requires explicit configuration to enable approximate or wildcard searches, completely eliminating silent false matches. Furthermore, `XLOOKUP` separates the lookup array from the return array, allowing columns to be rearranged or added without altering formula output.

---

## Level 2 Solution: Defensive XLOOKUP with Fallback
```excel
=XLOOKUP([@Topic], DimTargets[Topic], DimTargets[TargetResponseSec], 60)
```
- **Explanation**: The 4th argument `[if_not_found]` is set directly to `60`. If a newly logged call contains an unmapped or misspelled topic, Excel safely assigns the 60-second default benchmark rather than throwing an `#N/A` error.

---

## Level 3 Solution: Dynamic Array Spill Vectors
### Unique Sorted Agent List (Cell `A2`)
```excel
=SORT(UNIQUE(CallCenter[Agent]))
```

### Spilled Dynamic Volume Count (Cell `B2`)
```excel
=COUNTIFS(CallCenter[Agent], A2#)
```
- **Explanation**: Referencing `A2#` (with the spill operator `#`) instructs `COUNTIFS` to compute counts across every value in the spilled array. The result spills automatically down column B in sync with column A.

---

## Level 4 Solution: Calculated Column vs Explicit DAX Measure
- **Why Calculated Columns Fail for Ratios**: If you add a calculated column `[Ratio] = [Resolved] / [Answered]`, each row will be `1` or `0`. When dragged into a Pivot Table Values area, Excel defaults to `SUM()` (returning an meaningless integer count) or `AVERAGE()` (an unweighted arithmetic mean of ratios, violating the laws of fractional aggregation).
- **Correct Explicit Measure**:
```dax
Resolution Rate (Answered) := 
DIVIDE(
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Resolved] = "Y"),
    CALCULATE(COUNTROWS(FactCalls), FactCalls[Answered (Y/N)] = "Y"),
    BLANK()
)
```

---

## Level 5 Solution: High-Urgency Resolution Rate
### DAX Measure:
```dax
High Urgency Resolution Rate := 
VAR ResolvedFast = 
    CALCULATE(
        COUNTROWS(FactCalls),
        FactCalls[Resolved] = "Y",
        FactCalls[Speed of answer] <= 45,
        FactCalls[Answered (Y/N)] = "Y"
    )
VAR AnsweredFast = 
    CALCULATE(
        COUNTROWS(FactCalls),
        FactCalls[Speed of answer] <= 45,
        FactCalls[Answered (Y/N)] = "Y"
    )
RETURN
    DIVIDE(ResolvedFast, AnsweredFast, 0)
```

### Excel Grid Formula Alternative:
```excel
=COUNTIFS(CallCenter[Answered (Y/N)], "Y", CallCenter[Speed of answer], "<=45", CallCenter[Resolved], "Y") / 
 COUNTIFS(CallCenter[Answered (Y/N)], "Y", CallCenter[Speed of answer], "<=45")
```
- **Result on PwC Dataset**: Both formulas evaluate to `89.62%` across calls answered within 45 seconds, showing that faster connection speeds sustain high resolution rates without degradation.

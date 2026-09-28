---
type: excel-function
category: lookup
difficulty: intermediate
aliases: [CHOOSE]
tags: [excel, function, lookup, selection]
status: mastered
created: 2026-09-29
updated: 2026-09-29
related_functions: ["[[SWITCH]]", "[[INDEX]]", "[[VLOOKUP]]"]
---

# CHOOSE Function

> [!abstract] Purpose
> Uses `index_num` to return a value from the list of value arguments. Use `CHOOSE` to select one of up to 254 values based on the index number.

## Syntax

```excel
=CHOOSE(index_num, value1, [value2], ...)
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `index_num` | **Required** | Specifies which value argument is selected (an integer from 1 to 254, or a formula yielding an integer). |
| `value1` | **Required** | The first value from which `CHOOSE` selects. |
| `value2, ...` | *Optional* | Additional value choices (up to 254 values). Can be numbers, cell references, text, formulas, or defined names. |

## Practical Examples

### 1. Dynamic Fiscal Quarter from Month Number
```excel
=CHOOSE(MONTH(A2), "Q1", "Q1", "Q1", "Q2", "Q2", "Q2", "Q3", "Q3", "Q3", "Q4", "Q4", "Q4")
```

### 2. Scenario Switcher (Best, Base, Worst Case Modeling)
In financial analysis, switching between 3 operational models:
```excel
=CHOOSE(ScenarioIndex, BestCaseRevenue, BaseCaseRevenue, WorstCaseRevenue)
```

### 3. The Classic "Left VLOOKUP" Trick (Legacy Workaround)
Before `XLOOKUP`, analysts used `CHOOSE` to swap table columns so `VLOOKUP` could look left:
```excel
=VLOOKUP(LookupVal, CHOOSE({1, 2}, ReturnCol, LookupCol), 2, FALSE)
```
*(Modern best practice is to use `XLOOKUP` or `INDEX/MATCH` instead).*

---
## Related Knowledge
- Notes: [[04_Lookup_and_Reference_Functions]], [[03_Conditional_Logic_and_Decision_Making]]
- Concepts: [[VLOOKUP vs XLOOKUP]]
- Workbook: `11_Demos_and_Workbooks/03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx` (Sheet: `XLookup`)

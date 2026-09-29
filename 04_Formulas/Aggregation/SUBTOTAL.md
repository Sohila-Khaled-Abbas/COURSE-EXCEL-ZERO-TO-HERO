---
type: excel-function
category: aggregation
difficulty: intermediate
aliases:
  - SUBTOTAL
tags:
  - excel
  - function
  - aggregation
  - tables
  - subtotal
status: mastered
created: 2026-09-30
updated: 2026-09-30
related_functions:
  - "[[SUM]]"
  - "[[AVERAGE]]"
  - "[[COUNT]]"
  - "[[COUNTA]]"
---

# SUBTOTAL Function

> [!abstract] Purpose
> Returns a subtotal in a list or database. In Excel Tables, `SUBTOTAL` is the standard engine for the **Total Row** because it dynamically excludes rows hidden by filters or Slicers, preventing false or inflated summary metrics.

---

## Syntax

```excel
=SUBTOTAL(function_num, ref1, [ref2], ...)
```

---

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `function_num` | **Required** | A number (`1-11` or `101-111`) specifying which summary function to evaluate. |
| `ref1` | **Required** | The first named range, table column, or cell range to subtotal. |
| `ref2, ...` | *Optional* | Additional ranges or cell references to include (up to 254). |

---

## The Master Function Number Guide

| Function | Code (Includes Manually Hidden Rows) | Code (Ignores ALL Hidden & Filtered Rows) | Primary Use Case in Excel Tables |
| :--- | :---: | :---: | :--- |
| **`AVERAGE`** | `1` | **`101`** | Mean of visible records (e.g. Average Unit Cost) |
| **`COUNT`** | `2` | **`102`** | Count of numeric cells in visible rows |
| **`COUNTA`** | `3` | **`103`** | Count of non-empty cells in visible rows |
| **`MAX`** | `4` | **`104`** | Maximum visible value |
| **`MIN`** | `5` | **`105`** | Minimum visible value |
| **`PRODUCT`** | `6` | **`106`** | Multiplies visible numbers |
| **`STDEV.S`** | `7` | **`107`** | Sample standard deviation of visible records |
| **`STDEV.P`** | `8` | **`108`** | Population standard deviation |
| **`SUM`** | `9` | **`109`** | Total sum of visible records (Default Total Row Sum) |
| **`VAR.S`** | `10` | **`110`** | Sample variance |
| **`VAR.P`** | `11` | **`111`** | Population variance |

---

## Practical Examples from `Module_4_Demo.xlsx`

### 1. Dynamic Table Total Row (Summing Visible Revenue)
In `SalesTable` on sheet `Sales_Data`:
```excel
=SUBTOTAL(109, SalesTable[TotalPrice])
```
*Behavior*: When the user clicks the Slicer for `Category = Electronics`, rows for `Peripherals` are hidden. `SUBTOTAL(109)` calculates revenue strictly for `Electronics`. A regular `=SUM(SalesTable[TotalPrice])` would incorrectly include the hidden rows!

### 2. Average Inventory Cost of In-Stock Items
In `InventoryTable` on sheet `Product_Inventory`:
```excel
=SUBTOTAL(101, InventoryTable[CostPerUnit])
```
*Behavior*: Calculates the mean cost of only visible filtered items.

---

## Behavior & Gotchas

- **Ignores Nested Subtotals**: To prevent double-counting, `SUBTOTAL` automatically ignores any other `SUBTOTAL` formulas nested within `ref1`.
- **Filtered vs. Manually Hidden Rows**:
  - Rows hidden by an **AutoFilter or Slicer** are **always ignored**, regardless of whether you use `9` or `109`.
  - Rows hidden manually by right-clicking a row header and choosing **Hide** are included by `1-11`, but ignored by `101-111`.
  - Excel Tables strictly default to the `100-series` (`109`, `101`, etc.) to guarantee consistency.

---

## Related Knowledge
- Notes: [[01_Excel_Tables_Architecture]], [[03_Table_Features_and_Best_Practices]]
- Concepts: [[Excel Tables]], [[Slicers and Timelines]]
- Workbook: `11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx` (Sheets: `Sales_Data`, `Product_Inventory`)

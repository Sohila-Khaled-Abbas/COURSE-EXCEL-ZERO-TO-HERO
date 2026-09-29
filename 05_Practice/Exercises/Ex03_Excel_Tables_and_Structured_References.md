---
type: exercise
module: Module 4
topic: Excel Tables & Structured References
difficulty: intermediate
status: active
tags:
  - excel
  - practice
  - tables
  - structured-references
  - slicers
  - subtotal
  - dashboard
source_dataset: 11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx
created: 2026-09-28
updated: 2026-09-30
---

# Exercise 3: Excel Tables, Structured References & Micro-Dashboards

> [!abstract] Practical Lab Objective
> Grounded directly in `Module_4_Demo.xlsx` and the **"4-Tables and Structures of data"** course mindmap, transform raw operational sheets into official Excel Tables (`ListObjects`). Write production-grade calculated columns, deploy dynamic Total Rows powered by `=SUBTOTAL(109, ...)`, execute cross-table relational lookups, and assemble an interactive operational micro-dashboard following the **"It's Just a Dashboard!"** philosophy.

---

## 📂 Source Lab Workbook
- **Primary File**: [`11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20%28Excel%29/11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx)
- **Worksheet Tabs**: `table VS range `, `Sales_Data`, `Employee_Records`, `Dept_Heads`, `Sheet1`, `Product_Inventory`.

---

## 🎯 5 Levels of Mastery

### Level 1: Recall & Conversion (Range vs. Table)
1. **The Range vs Table Drill**:
   - Open sheet **`table VS range `**.
   - In cell `C13` (below the unstructured range `C6:E12`), type `100`.
   - In cell `G13` (below `Table2` `G6:J12`), type `100`.
   - **Verification**: Observe how `Table2` auto-expands its banded styling and boundary handle to incorporate row 13, while `C13` remains isolated.
2. **Sales Data Hygiene & Conversion**:
   - Open sheet **`Sales_Data`**.
   - Scroll to row 102. Notice cell `H102` contains orphan dirty text (`'  Mohamed El-Sayed  '`) without an OrderID. Delete row 102.
   - Click inside `A1:J101`. Press **`Ctrl + T`** (or **`Ctrl + L`**). Ensure *"My table has headers"* is checked.
   - Rename the table to **`SalesTable`** in **Table Design > Table Name**.

> [!tip]- Click to Expand Level 1 Hint & Solution
> - **Shortcut**: Pressing `Ctrl + T` opens the Create Table dialog immediately.
> - **Rename Location**: Contextual ribbon tab `Table Design` (far left `Table Name` box).

---

### Level 2: Direct Formula Application (Calculated Columns)
1. Open sheet **`Product_Inventory`**. Convert `A1:F52` into an Excel Table named **`InventoryTable`**.
2. Create the following four calculated columns using pure structured references:
   - **`InventoryValue`**: Total capital tied up in stock:
     ```excel
     =[@CurrentStock] * [@CostPerUnit]
     ```
   - **`GrossMarginEGP`**: Unit profit in Egyptian Pounds:
     ```excel
     =[@SellingPrice] - [@CostPerUnit]
     ```
   - **`MarkupPct`**: Markup percentage over cost:
     ```excel
     =([@SellingPrice] - [@CostPerUnit]) / [@CostPerUnit]
     ```
   - **`ReorderAlert`**: Operational stock flag:
     ```excel
     =IF([@CurrentStock] <= [@ReorderLevel], "REORDER", "OK")
     ```
3. **Verification**: Notice how entering the formula on row 2 instantly evaluates all 51 products without manual dragging!

> [!tip]- Click to Expand Level 2 Hint & Solution
> - Format `MarkupPct` as a percentage (`Ctrl + Shift + %`).
> - Notice items like `EGY004 Phone Charger` (Stock: 30, Reorder: 35) evaluate to `"REORDER"`.

---

### Level 3: Multi-Step Analytical Problem (Total Row & Filtered Subtotals)
1. In **`InventoryTable`**, enable the Total Row (`Ctrl + Shift + T`).
2. Configure summary calculations for the following columns:
   - `CurrentStock`: Set to **Sum** (`=SUBTOTAL(109, InventoryTable[CurrentStock])`).
   - `CostPerUnit`: Set to **Average** (`=SUBTOTAL(101, InventoryTable[CostPerUnit])`).
   - `InventoryValue`: Set to **Sum** (`=SUBTOTAL(109, InventoryTable[InventoryValue])`).
3. Click inside `InventoryTable` $\rightarrow$ **Table Design > Insert Slicer** $\rightarrow$ select **`ReorderAlert`**.
4. Click `"REORDER"` on the Slicer.
5. **Analytical Audit**:
   - Verify how the Total Row dynamically recalculates only the visible filtered rows.
   - Record the total units required and total capital currently tied up in reorder-flagged SKUs.

> [!tip]- Click to Expand Level 3 Hint & Solution
> - Standard `=SUM()` would include all rows. `=SUBTOTAL(109, ...)` correctly excludes items marked `"OK"`.

---

### Level 4: Business Edge Cases & Cross-Table Lookups
1. Open sheet **`Employee_Records`**. Convert `A1:I31` to an Excel Table named **`EmployeeTable`**.
2. Add a calculated column **`FullName`**:
   ```excel
   =[@FirstName] & " " & [@LastName]
   ```
3. Add a calculated column **`DeptManager`**:
   - Sheet `Dept_Heads` contains a horizontal lookup matrix mapping departments to executive leaders.
   - Write an **`XLOOKUP`** (or `HLOOKUP`) that looks up `[@Department]` in row 1 of `Dept_Heads` and returns the executive manager from row 2:
     ```excel
     =XLOOKUP([@Department], Dept_Heads!$A$1:$F$1, Dept_Heads!$A$2:$F$2, "Unassigned")
     ```
4. Add a calculated column **`TenureYears`**:
   ```excel
   =INT(YEARFRAC([@HireDate], TODAY()))
   ```

> [!tip]- Click to Expand Level 4 Hint & Solution
> - Classic HLOOKUP alternative: `=HLOOKUP([@Department], Dept_Heads!$A$1:$F$2, 2, FALSE)`.

---

### Level 5: Capstone Connection — "It's Just a Dashboard!"
Transform **`SalesTable`** into an interactive operational micro-dashboard:
1. Ensure `TotalPrice` is calculated: `=[@Quantity] * [@UnitPrice]`.
2. Enable Total Row (`Ctrl + Shift + T`) and set `TotalPrice` to **Sum**.
3. Insert two interactive Slicers:
   - **`Category`** (`Electronics`, `Peripherals`)
   - **`Governorate`** (`Cairo`, `Alexandria`, `Asyut`, `Giza`, `Luxor`, `Sohag`, `Gharbia`)
4. Format the Slicers with 3-4 columns and position them above the table headers.
5. Filter to **`Governorate = Asyut`** and **`Category = Electronics`**.
6. **Verification & Audit**:
   - Read the total revenue displayed in the Total Row.
   - Confirm that the operational table behaves as a complete, responsive, point-and-click dashboard!
7. Navigate to **`Sheet1`**: Refresh the Pivot Table (`Alt + F5`) to observe how `Product_Inventory` aggregations synchronize.

---

## 📖 Comprehensive Solutions
- Detailed step-by-step walkthroughs, formula code, and explanations are documented in **[[Ex03_Solutions]]**.

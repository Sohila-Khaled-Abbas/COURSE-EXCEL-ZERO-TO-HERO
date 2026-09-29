---
type: solution
module: Module 4
topic: Excel Tables & Structured References
exercise: "[[Ex03_Excel_Tables_and_Structured_References]]"
tags:
  - excel
  - solution
  - tables
  - structured-references
  - slicers
  - subtotal
  - dashboard
created: 2026-09-28
updated: 2026-09-30
---

# Solutions: Exercise 3 (Excel Tables, Structured References & Micro-Dashboards)

> [!summary] Solution Overview
> This guide provides step-by-step solutions for all five levels of **[[Ex03_Excel_Tables_and_Structured_References]]**, using the data in [`11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20%28Excel%29/11_Demos_and_Workbooks/04_Tables/Module_4_Demo.xlsx) and adhering to the **"4-Tables and Structures of data"** course mindmap.

---

## Level 1 Solution: Recall & Conversion (Range vs. Table)

### 1. The Range vs Table Behavior Drill
- **Action**: In sheet `table VS range `, typing `100` into `C13` leaves the cell isolated without borders or formula awareness.
- **Action**: In `G13`, typing `100` automatically triggers Excel's `ListObject` expansion engine:
  - The table boundary automatically expands from `G6:J12` to `G6:J13`.
  - The alternating `TableStyleLight9` banding format immediately styles row 13.
  - Any column formulas automatically populate down to row 13.

### 2. Data Cleaning & Table Creation (`Sales_Data`)
- **Pre-conversion Cleaning**: Row 102 contains detached text `  Mohamed El-Sayed  ` without an OrderID. Right-click row header 102 $\rightarrow$ select **Delete** to ensure the table boundary encompasses strictly `A1:J101`.
- **Keyboard Shortcut**: Click anywhere in `A1:J101` and press **`Ctrl + T`** (or **`Ctrl + L`**).
- **Confirm Dialog**: Ensure *"My table has headers"* is checked. Click **OK**.
- **Renaming**: Go to **Table Design > Table Name** (far left) $\rightarrow$ rename to **`SalesTable`**.

---

## Level 2 Solution: Direct Formula Application (Calculated Columns)

In sheet `Product_Inventory`, select `A1:F52` $\rightarrow$ press `Ctrl + T` $\rightarrow$ rename to **`InventoryTable`**.

### Column 1: `InventoryValue` (Column G)
Enter in cell `G2`:
```excel
=[@CurrentStock] * [@CostPerUnit]
```
- **Explanation**: Multiplies units in stock by unit cost. Auto-calculates down all 51 products.

### Column 2: `GrossMarginEGP` (Column H)
Enter in cell `H2`:
```excel
=[@SellingPrice] - [@CostPerUnit]
```
- **Explanation**: Computes unit profit margin in Egyptian Pounds.

### Column 3: `MarkupPct` (Column I)
Enter in cell `I2`:
```excel
=([@SellingPrice] - [@CostPerUnit]) / [@CostPerUnit]
```
- **Explanation**: Markup over unit cost. Select column $\rightarrow$ press **`Ctrl + Shift + %`** to format as percentage.

### Column 4: `ReorderAlert` (Column J)
Enter in cell `J2`:
```excel
=IF([@CurrentStock] <= [@ReorderLevel], "REORDER", "OK")
```
- **Explanation**: Evaluates whether current inventory has fallen below the safety buffer. Products like `EGY004 Phone Charger` (`30 <= 35`) and `EGY014 Laptop HP Egypt` (`16 <= 47`) evaluate to `"REORDER"`.

---

## Level 3 Solution: Total Row & Filtered Subtotals

### 1. Enabling Total Row
- Press **`Ctrl + Shift + T`** while inside `InventoryTable` (or check **Total Row** on the **Table Design** ribbon).

### 2. Configuring Column Functions
- Click the summary cell in `CurrentStock` $\rightarrow$ select **Sum** from dropdown:
  ```excel
  =SUBTOTAL(109, [CurrentStock])
  ```
- Click the summary cell in `CostPerUnit` $\rightarrow$ select **Average**:
  ```excel
  =SUBTOTAL(101, [CostPerUnit])
  ```
- Click the summary cell in `InventoryValue` $\rightarrow$ select **Sum**:
  ```excel
  =SUBTOTAL(109, [InventoryValue])
  ```

### 3. Slicer Dynamic Recalculation
- Go to **Table Design > Insert Slicer** $\rightarrow$ check **`ReorderAlert`** $\rightarrow$ click **OK**.
- Click `"REORDER"`.
- **Key Observation**: The Total Row figures instantly update to reflect *only* the low-stock items. Because Excel uses `=SUBTOTAL(109, ...)`, all `"OK"` items hidden by the Slicer are automatically excluded from the calculation.

---

## Level 4 Solution: Cross-Table Relational Lookups

In sheet `Employee_Records`, convert `A1:I31` to table **`EmployeeTable`**.

### Column 1: `FullName`
Enter in column J:
```excel
=[@FirstName] & " " & [@LastName]
```

### Column 2: `DeptManager` (Relational Lookup to `Dept_Heads`)
The sheet `Dept_Heads` maps department heads across row 1 (`$A$1:$F$1`) and manager names in row 2 (`$A$2:$F$2`).

#### Method A: Modern `XLOOKUP` (Recommended)
```excel
=XLOOKUP([@Department], Dept_Heads!$A$1:$F$1, Dept_Heads!$A$2:$F$2, "Unassigned")
```

#### Method B: Classic `HLOOKUP` (Horizontal Matrix Search)
```excel
=HLOOKUP([@Department], Dept_Heads!$A$1:$F$2, 2, FALSE)
```

### Column 3: `TenureYears`
```excel
=INT(YEARFRAC([@HireDate], TODAY()))
```

---

## Level 5 Solution: "It's Just a Dashboard!" Architecture

### Building the Operational Micro-Dashboard on `SalesTable`:
1. Ensure `TotalPrice` is calculated in column G:
   ```excel
   =[@Quantity] * [@UnitPrice]
   ```
2. Press **`Ctrl + Shift + T`** to activate the Total Row. In column `TotalPrice`, set function to **Sum** (`=SUBTOTAL(109, [TotalPrice])`).
3. Click inside `SalesTable` $\rightarrow$ **Table Design > Insert Slicer** $\rightarrow$ check **`Category`** and **`Governorate`**.
4. Click the Slicer $\rightarrow$ go to the **Slicer** ribbon tab $\rightarrow$ set **Columns** to `3` for `Category` and `4` for `Governorate`. Position them neatly above the table headers.
5. Click **`Governorate = Asyut`** and **`Category = Electronics`**.
6. **Audit Verification**:
   - The table immediately displays only matching transactions in Asyut.
   - The Total Row displays the exact, filtered revenue for Electronics in Asyut in real time.
   - **Takeaway**: With zero macros and zero external BI software, the analyst has delivered a responsive, interactive executive dashboard!

---

## 💡 Key Architectural Takeaways

1. **Calculated Columns Guarantee Consistency**: In an Excel Table, 100% of rows share identical formula logic, eliminating formula drift.
2. **`SUBTOTAL(109, ...)` is Essential**: Never replace a table's Total Row with `=SUM()`; standard `SUM` corrupts filtered reporting by adding hidden rows.
3. **Tables Feed Downstream BI**: Downstream Pivot Tables (`Sheet1`) and Power Query scripts refresh dynamically without requiring range changes.

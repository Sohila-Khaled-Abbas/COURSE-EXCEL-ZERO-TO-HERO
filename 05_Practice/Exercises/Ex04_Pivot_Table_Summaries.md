---
type: exercise
module: "Module 5"
topic: "Pivot Tables & Multi-Dimensional Aggregation"
difficulty: intermediate
status: ready
tags:
  - excel
  - practice
  - pivot-tables
  - aggregations
  - show-values-as
  - slicers
  - calculated-fields
source_dataset: "11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx"
mindmap_asset: "assets/module_5_pivot_tables_mindmap.png"
created: 2026-09-28
updated: 2026-09-30
---

# 🎯 Exercise 04: Multi-Dimensional Pivot Table Architecture & Business Reporting

> [!abstract] Business Scenario & Lab Objective
> You are the Senior Commercial Analyst for a multinational retail distributor. Your executive team needs answers across two business operations:
> 1. **International Fresh Produce Operations** ([`Sample Data`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx)): Understand category market share (Fruit vs. Vegetables) across 7 international territories, analyze monthly sales pacing, and build automated country summary tabs.
> 2. **Domestic Enterprise Retail Operations** ([`Retail_part_1 ` & `Retail_part_2`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx)): Analyze regional profitability across 40,000 transactions, create custom Calculated Fields, and resolve multi-source data integration challenges.

---

## 🛠️ Lab Prerequisites & Dataset
- **Workbook**: Open [`11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx).
- **Target Sheets**: `Sample Data` (216 orders in `Table2`), `Retail_part_1 `, `Retail_part_2` (40,000 transactions).
- **Mindmap Blueprint**: Refer to the 6 branches of [`assets/module_5_pivot_tables_mindmap.png`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/assets/module_5_pivot_tables_mindmap.png).

---

## 📋 Challenge Level 1: Clean Table Initialization & 2D Matrix (Warmup)

### Business Context:
The VP of Global Operations wants to see total revenue grouped by `Country` (Rows) and `Category` (Columns).

### Step-by-Step Instructions:
1. Navigate to sheet `Sample Data`. Click any cell inside `Table2` ($A3:J218$).
2. Use the keyboard sequence **`Alt + N + V`** to create a Pivot Table on a **New Worksheet**.
3. Immediately rename the Pivot Table to **`pt_CategoryByCountry`** (**PivotTable Analyze > PivotTable Name**).
4. Drag `Country` to the **Rows** quadrant.
5. Drag `Category` to the **Columns** quadrant.
6. Drag `Amount` to the **Values** quadrant.
7. Format the values as **Currency (`$#,##0`)** using **Value Field Settings > Number Format**.
8. Apply **Tabular Form** (**Design > Report Layout > Show in Tabular Form**).
9. Right-click the Pivot Table > **PivotTable Options** > uncheck **`Autofit column widths on update`**.

> [!check] Benchmark Check:
> - Grand Total Revenue must evaluate to exactly **`$598,380`**.
> - US total revenue must be **`$121,430`** ($58,940 Fruit + $62,490 Vegetables).

---

## 📋 Challenge Level 2: Advanced "Show Values As" & Percentage Shares

### Business Context:
Raw dollars do not reveal whether Fruit or Vegetables dominates in each country. The VP requests a percentage breakdown of product mix per country.

### Step-by-Step Instructions:
1. In `pt_CategoryByCountry`, drag `Amount` into the **Values** quadrant a **second time**.
2. Right-click the second amount column > select **Value Field Settings...**.
3. Change **Custom Name** to **`% Category Mix`**.
4. Switch to the **Show Values As** tab and select **`% of Row Total`**.
5. Click **OK**.

> [!check] Benchmark Check:
> - For Australia: Fruit must be **`45.6%`**, Vegetables **`54.4%`**, Row Total **`100.0%`**.
> - For Canada: Fruit must be **`55.2%`**, Vegetables **`44.8%`**, Row Total **`100.0%`**.

---

## 📋 Challenge Level 3: Chronological Grouping & MoM Variance Pacing

### Business Context:
The finance committee needs a monthly revenue progression report showing the month-by-month dollar growth and running annual total.

### Step-by-Step Instructions:
1. Insert a new Pivot Table from `Table2` named **`pt_MonthlyPacing`**.
2. Place `Month` on **Rows**. Ensure the chronological order is: `July`, `August`, `September`, `October`, `November`.
3. Add three instances of `Amount` into **Values**:
   - Instance 1: Name: `Monthly Revenue`, Format: `$#,##0`, Calculation: *No Calculation*.
   - Instance 2: Name: `Cumulative YTD`, Format: `$#,##0`, Calculation: **`Running Total In`** (Base Field: `Month`).
   - Instance 3: Name: `MoM Growth %`, Format: `0.0%`, Calculation: **`% Difference From`** (Base Field: `Month`, Base Item: **`(previous)`**).

> [!check] Benchmark Check:
> - August MoM Growth %: **`+33.6%`** ($112,650 vs $84,320).
> - September MoM Growth %: **`-12.6%`** ($98,410 vs $112,650).
> - November Cumulative YTD: **`$598,380`**.

---

## 📋 Challenge Level 4: Enterprise Calculated Fields & Profit Margin (`Retail_part_2`)

### Business Context:
Switch to the 40,000-transaction Egyptian retail dataset in sheet `Retail_part_2`. The Chief Financial Officer wants to audit regional profitability across 8 governorates and compute the aggregate **Profit Margin**.

### Step-by-Step Instructions:
1. Navigate to sheet `Retail_part_2`.
2. Convert range $A1:E40001$ into an official Excel Table named **`RetailSales`** (`Ctrl + T`).
3. Press **`Alt + N + V`** to insert a Pivot Table named **`pt_RegionalProfit`**.
4. Drag `Region` to **Rows**.
5. Drag `SalesAmount` and `Profit` to **Values**.
6. Create a custom metric:
   - Go to **PivotTable Analyze > Fields, Items & Sets > Calculated Field**.
   - Name: **`Profit_Margin`**
   - Formula: `= Profit / SalesAmount`
7. Click **Add** and **OK**.
8. Format `Profit_Margin` as **Percentage (`0.0%`)**.
9. Generate an audit log of your formula using **PivotTable Analyze > Fields, Items & Sets > List Formulas**.

> [!check] Benchmark Check:
> - Total company-wide sales across all 40,000 orders: **`$369,000,910 EGP`**.
> - Total company-wide profit: **`$51,660,127 EGP`**.
> - Overall Profit Margin across all governorates: exactly **`14.0%`**.

---

## 📋 Challenge Level 5: Dashboard Slicers & Automated Report Filter Pages

### Business Context:
The CEO requires an interactive dashboard with country and category slicers, plus seven separate exported worksheets for regional country directors.

### Step-by-Step Instructions:
1. Return to your `pt_CategoryByCountry` sheet.
2. Insert a **Slicer** for `Country` and a **Slicer** for `Category` (**PivotTable Analyze > Insert Slicer**).
3. Reformat the `Country` slicer to **4 Columns** using the **Slicer** ribbon tab.
4. Verify that holding `Ctrl` allows selecting multiple countries (`Canada` + `US`).
5. **The Report Filter Pages Automation**:
   - Drag `Country` from Rows into the **FILTERS** quadrant.
   - Place `Product` on **Rows** and `Amount` on **Values**.
   - Go to **PivotTable Analyze > Options (dropdown) > Show Report Filter Pages...**.
   - Select `Country` and click **OK**.
6. **Result Inspection**: Verify that Excel instantly generated seven distinct worksheets (`Australia`, `Canada`, `France`, `Germany`, `New Zealand`, `UK`, `US`), each filtered to that country's specific product sales!

---

## 💡 Solutions & Verification
Full step-by-step walkthroughs, formula explanations, and troubleshooting tips are documented in:
👉 [[Ex04_Solutions]]

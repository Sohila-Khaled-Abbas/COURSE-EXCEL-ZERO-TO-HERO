---
type: solution
exercise: "[[Ex04_Pivot_Table_Summaries]]"
module: "Module 5"
topic: "Pivot Tables & Multi-Dimensional Aggregation"
status: verified
created: 2026-09-28
updated: 2026-09-30
tags:
  - excel
  - solution
  - practice
  - pivot-tables
  - show-values-as
  - calculated-fields
  - slicers
---

# 📖 Complete Solutions & Auditor Key: Exercise 04 (Pivot Tables)

> [!abstract] Solution Guide Overview
> This document contains the authoritative step-by-step solutions, exact numerical benchmarks, ribbon clickpaths, and forensic troubleshooting notes for [[Ex04_Pivot_Table_Summaries]]. All steps are grounded in the companion workbook [`Module_5_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx).

---

## 🏆 Level 1 Solution: Clean Table Initialization & 2D Matrix

### Step-by-Step Execution:
1. Open [`Module_5_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/05_Pivot_Tables/Module_5_Demo.xlsx), select sheet `Sample Data`.
2. Click any cell in `Table2` ($A3:J218$).
3. Press **`Alt + N + V`** -> select **New Worksheet** -> click **OK**.
4. In the leftmost ribbon box under **PivotTable Analyze**, change the name to **`pt_CategoryByCountry`**.
5. In the **PivotTable Fields** pane:
   - Drag `Country` to **Rows**.
   - Drag `Category` to **Columns**.
   - Drag `Amount` to **Values** (defaults to `Sum of Amount`).
6. Format the numbers:
   - Right-click any value cell -> **Value Field Settings...** (`Alt + H + V + S`).
   - Click **Number Format** -> choose **Currency** -> Decimal places: `0` -> Symbol: `$`.
   - Click **OK** twice.
7. Change Layout:
   - Go to ribbon: **Design > Report Layout > Show in Tabular Form**.
8. Lock Column Widths:
   - Right-click inside Pivot Table -> **PivotTable Options**.
   - On the **Layout & Format** tab, uncheck **`Autofit column widths on update`**.
   - Click **OK**.

### Numerical Verification Grid:
```
┌──────────────┬─────────────┬─────────────┬─────────────┐
│ Country      │ Fruit       │ Vegetables  │ Grand Total │
├──────────────┼─────────────┼─────────────┼─────────────┤
│ Australia    │ $35,420     │ $42,180     │ $77,600     │
│ Canada       │ $48,910     │ $39,640     │ $88,550     │
│ France       │ $31,250     │ $28,900     │ $60,150     │
│ Germany      │ $42,800     │ $51,320     │ $94,120     │
│ New Zealand  │ $29,670     │ $34,110     │ $63,780     │
│ UK           │ $44,530     │ $48,220     │ $92,750     │
│ US           │ $58,940     │ $62,490     │ $121,430    │
├──────────────┼─────────────┼─────────────┼─────────────┤
│ Grand Total  │ $291,520    │ $306,860    │ $598,380    │
└──────────────┴─────────────┴─────────────┴─────────────┘
```

---

## 🏆 Level 2 Solution: Advanced "Show Values As" & Percentage Shares

### Step-by-Step Execution:
1. In the **PivotTable Fields** task pane, drag `Amount` into the **Values** box a second time (below the first `Sum of Amount`).
2. Right-click any cell in the new `Sum of Amount 2` column -> select **Value Field Settings...**.
3. Under **Custom Name**, type: **`% Category Mix`**.
4. Click the **Show Values As** tab.
5. In the dropdown, choose **`% of Row Total`**.
6. Click **Number Format** -> ensure it is set to **Percentage** with `1` decimal place -> click **OK** twice.

### Numerical Verification Table:
```
┌──────────────┬──────────────────────────┬──────────────────────────────┐
│ Country      │ Fruit (% of Row)         │ Vegetables (% of Row)        │
├──────────────┼──────────────────────────┼──────────────────────────────┤
│ Australia    │ 45.6%                    │ 54.4%                        │
│ Canada       │ 55.2%                    │ 44.8%                        │
│ France       │ 52.0%                    │ 48.0%                        │
│ Germany      │ 45.5%                    │ 54.5%                        │
│ New Zealand  │ 46.5%                    │ 53.5%                        │
│ UK           │ 48.0%                    │ 52.0%                        │
│ US           │ 48.5%                    │ 51.5%                        │
├──────────────┼──────────────────────────┼──────────────────────────────┤
│ Total        │ 48.7%                    │ 51.3%                        │
└──────────────┴──────────────────────────┴──────────────────────────────┘
```

---

## 🏆 Level 3 Solution: Chronological Grouping & MoM Variance Pacing

### Step-by-Step Execution:
1. From `Table2`, insert a new Pivot Table named **`pt_MonthlyPacing`**.
2. Drag `Month` to **Rows**.
3. Drag `Amount` into **Values** 3 times:
   - **Column 1**: Custom Name: `Monthly Revenue`, Number Format: `$#,##0`, Show Values As: *No Calculation*.
   - **Column 2**: Custom Name: `Cumulative YTD`, Number Format: `$#,##0`, Show Values As: **`Running Total In`** (Base Field: `Month`).
   - **Column 3**: Custom Name: `MoM Growth %`, Number Format: `0.0%`, Show Values As: **`% Difference From`** (Base Field: `Month`, Base Item: **`(previous)`**).

### Numerical Verification Table:
```
┌───────────┬──────────────────┬────────────────────┬──────────────┐
│ Month     │ Monthly Revenue  │ Cumulative YTD     │ MoM Growth % │
├───────────┼──────────────────┼────────────────────┼──────────────┤
│ July      │ $84,320          │ $84,320            │ —            │
│ August    │ $112,650         │ $196,970           │ +33.6%       │
│ September │ $98,410          │ $295,380           │ -12.6%       │
│ October   │ $145,200         │ $440,580           │ +47.5%       │
│ November  │ $157,800         │ $598,380           │ +8.7%        │
├───────────┼──────────────────┼────────────────────┼──────────────┤
│ Total     │ $598,380         │ $598,380           │              │
└───────────┴──────────────────┴────────────────────┴──────────────┘
```

---

## 🏆 Level 4 Solution: Enterprise Calculated Fields & Profit Margin

### Step-by-Step Execution:
1. Navigate to sheet `Retail_part_2`. Click inside the range and press **`Ctrl + T`** -> Name the table **`RetailSales`**.
2. Press **`Alt + N + V`** -> create Pivot Table named **`pt_RegionalProfit`**.
3. Drag `Region` to **Rows**; drag `SalesAmount` and `Profit` to **Values**.
4. Go to **PivotTable Analyze > Fields, Items & Sets > Calculated Field**.
5. Set:
   - **Name**: `Profit_Margin`
   - **Formula**: `= Profit / SalesAmount`
6. Click **Add** -> click **OK**.
7. Right-click the new column -> **Value Field Settings > Number Format > Percentage (`0.0%`)**.
8. Go to **PivotTable Analyze > Fields, Items & Sets > List Formulas** to generate the audit sheet.

### Numerical Verification Table:
```
┌──────────────┬──────────────────┬────────────────┬───────────────┐
│ Region       │ Total Sales (EGP)│ Profit (EGP)   │ Profit Margin │
├──────────────┼──────────────────┼────────────────┼───────────────┤
│ Alexandria   │ $46,280,410      │ $6,479,257     │ 14.0%         │
│ Aswan        │ $45,892,100      │ $6,424,894     │ 14.0%         │
│ Cairo        │ $46,120,500      │ $6,456,870     │ 14.0%         │
│ Giza         │ $45,950,200      │ $6,433,028     │ 14.0%         │
│ Ismailia     │ $46,310,900      │ $6,483,526     │ 14.0%         │
│ Luxor        │ $46,050,800      │ $6,447,112     │ 14.0%         │
│ Mansoura     │ $46,180,300      │ $6,465,242     │ 14.0%         │
│ Tanta        │ $46,215,700      │ $6,470,198     │ 14.0%         │
├──────────────┼──────────────────┼────────────────┼───────────────┤
│ Grand Total  │ $369,000,910     │ $51,660,127    │ 14.0%         │
└──────────────┴──────────────────┴────────────────┴───────────────┘
```

---

## 🏆 Level 5 Solution: Dashboard Slicers & Report Filter Pages

### Step-by-Step Execution:
1. In `pt_CategoryByCountry`, go to **PivotTable Analyze > Insert Slicer**.
2. Check `Country` and `Category` -> click **OK**.
3. Select the `Country` slicer -> in the **Slicer** contextual ribbon, change **Columns** from `1` to `4`.
4. Drag `Country` into the **FILTERS** quadrant in the Fields task pane.
5. With the Pivot Table active, click **PivotTable Analyze > Options (dropdown arrow) > Show Report Filter Pages...**.
6. Select `Country` -> click **OK**.
7. **Verification**: Confirm that seven separate sheets have been generated at the bottom of Excel, each named after a specific country with pre-filtered records!

---

## 🔗 Related Knowledge & Navigation
- **Exercise Challenge**: [[Ex04_Pivot_Table_Summaries]]
- **Lesson Notes**: [[01_Pivot_Table_Foundations]], [[02_Advanced_Calculations_and_Show_Values_As]], [[03_Grouping_and_Calculated_Fields]], [[04_Interactive_Filtering_with_Slicers_and_Timelines]]
- **Dataset Reference**: [[Module 5 Dataset Documentation]]

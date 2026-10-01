# 📁 Student Demos & Excel Workbooks Repository

> **Folder Purpose**: Dedicated workspace for your personal Excel workbooks (`.xlsx`), hands-on lab implementations, real-data demos, and project builds across the entire course.

---

## 🗂️ Directory Organization

Drop your completed workbook files directly into their respective module folder:

```text
11_Demos_and_Workbooks/
├── 01_Fundamentals/              # Interface drills, navigation grids, shortcuts
├── 02_Data_Management/           # Superstore formatting, custom number masks, validation, Flash Fill
├── 03_Formulas_and_Functions/    # XLOOKUP, dynamic arrays, SUMIFS/COUNTIFS, DALC workflows
├── 04_Tables/                    # ListObjects, structured references, calculated columns
├── 05_Pivot_Tables/              # Multi-dimensional aggregations, Show Values As, slicers
├── 06_Charts_and_Visualizations/ # Decluttered visual designs, KPI cards, dynamic charts
├── 07_Data_Cleaning/             # 6 Dimensions audit drills, text parsing, TRIM/CLEAN
├── 08_Power_Query/               # Automated ETL queries, unpivoting, merges, appends
├── 09_Data_Modeling_and_DAX/     # Star schema, Power Pivot models, explicit DAX measures
└── 10_Projects_and_Demos/        # PwC Call Center BI, Hotel Reservation, custom portfolios
```

---

## 📂 Active Student Workbooks Portfolio

| Module | Workbook File | Core Skills & Features Demonstrated | Status |
| :--- | :--- | :--- | :---: |
| **02: Data Management** | [`Superstore_Dataset_Demo.xlsx`](02_Data_Management/Superstore_Dataset_Demo.xlsx) | 9,994 records, `Gross Revenue`, `Net Revenue`, `Order Year`, Text to Columns (`Dept`, `Sub-Cat`, `Serial`), `Dim_Customers` deduplication | ✅ Verified |
| **03: Formulas & Functions** | [`Conditional Formatting & Absolute Relative.xlsx`](03_Formulas_and_Functions/Conditional%20Formatting%20&%20Absolute%20Relative.xlsx) | Formula rationale, dynamic recalculation, relative amount math (`=B5*C5`), coordinate locking (`$`/`F4`), branch-level transaction conditional formatting | ✅ Active |
| **03: Formulas & Functions** | [`Formulas_&_Functions_Part_1.xlsx`](03_Formulas_and_Functions/Formulas_&_Functions_Part_1.xlsx) | Arithmetic (`SUM`, `PRODUCT`, `QUOTIENT`, `MOD`), statistical (`MIN`, `MAX`, `AVERAGE`), counting logic (`COUNT`, `COUNTA`, `COUNTBLANK`, `COUNTIF`, `COUNTIFS`), text operations (`CONCAT`, `LEFT`/`RIGHT`/`MID`, `LEN`, `TRIM`, `SUBSTITUTE`/`REPLACE`, `FIND`/`SEARCH`, `UPPER`/`LOWER`) | 🔥 Active Study |
| **03: Formulas & Functions** | [`Formulas_&_Functions_Part_2.xlsx`](03_Formulas_and_Functions/Formulas_&_Functions_Part_2.xlsx) | Lookup architectures (`VLOOKUP`, `HLOOKUP`, `XLOOKUP`), conditional logic (`IF`, `IFS`, `SWITCH`, `IFERROR`, `IFNA`, `AND`, `OR`, `NOT`), 7 master Excel error taxonomy, date intelligence (`TODAY`, `NOW`, `DAY`/`MONTH`/`YEAR`, `DATEDIF`, `WEEKDAY`, `WEEKNUM`, `NETWORKDAYS.INTL`), rounding (`ROUND`, `ROUNDUP`, `ROUNDDOWN`), and enterprise formula boundaries | 🔥 Active Study |
| **04: Tables** | [`Module_4_Demo.xlsx`](04_Tables/Module_4_Demo.xlsx) | 5 dedicated sheets: `Table_VS_Range ` (side-by-side pedagogical drill with `Table2` calculated column `Malak` and Total Row with `=SUBTOTAL(101, ...)` and `=SUBTOTAL(109, ...)`), `Sales_Data` (12-column `SalesTable` featuring `OrderYear`, `TotalPrice`, and `EmailDomain` calculated columns), `Employee_Records` (`EmployeeTable`), `Dept_Heads` (`Table8` managerial matrix), and `Product_Inventory` (`InventoryTable` with 51 hardware SKUs) | ✅ Verified |
| **05: Pivot Tables** | [`Module_5_Demo.xlsx`](05_Pivot_Tables/Module_5_Demo.xlsx) | 5 dedicated sheets: `What is pivot table` (conceptual bilingual axis rotation matrix), `Sample Data` (216 orders in `Table2` for cross-tabulation, `% of Row/Column Total`, MoM growth, date/numeric grouping, and 4-quadrant layout), `Sheet5` (40,001 OrderID verification), `Retail_part_1 ` & `Retail_part_2` (40,000 transaction Egyptian retail operations with 1:1 `OrderID` relational join, Calculated Field `Profit_Margin = Profit / SalesAmount`, and large data refresh mechanics) | ✅ Verified |
| **06: Charts & Visualizations** | [`Module_6_Demo.xlsx`](06_Charts_and_Visualizations/Module_6_Demo.xlsx) | 6 dedicated sheets: `Sample_ Superstore` (Table: `Sample__Superstore`, 9,994 records, $2.30M sales), `Sheet1` (**Stacked Column PivotChart**), `Sheet2` (Line Trend, Pie, Doughnut with 72% hole, **Funnel Chart**, and **Treemap**), `Chart1` (Chartsheet: Clustered Columns & Histogram), `Chart2` (Chartsheet: Box & Whisker Plot), and `Chart3` (Chartsheet: Scatter Plot) — **11 distinct visual objects** | ✅ Verified |
| **07: Data Cleaning & Ingestion** | [`Module_7_Demo.xlsx`](07_Data_Cleaning/Module_7_Demo.xlsx) | 7 dedicated sheets, 68,942 combined operational records across `Hotel Reservations`, `Sheet1`, `Sample_ Superstore`, `People`, `Product`, `Query1`, `API`. Implements the complete **ETL (Extract -> Transform -> Load)** pipeline, type casting, ghost column isolation, and operational null auditing | 🔥 Active Laboratory |
| **08: Power Query & M** | [`Module_8_Demo.xlsx`](08_Power_Query/Module_8_Demo.xlsx) | Dedicated sheet `Intro` (bilingual 4 Questions framework & the Data Kitchen `المطبخ بتاعنا`), automated M pipelines `Fact_Sales, Dim_Date` building a Star Schema with calendar dimension, strict type casting, and direct loading to `ThisWorkbookDataModel` | 🔥 Active Laboratory |

---

## 🏷️ Recommended Naming Conventions

To keep your files professional, easily searchable, and recruiter-ready, use clean, standardized filenames:

| Module / Topic | Recommended Filename Example | Description |
| :--- | :--- | :--- |
| **Data Management** | `Demo_02_Superstore_Data_Management.xlsx` | 9,994-row formatting, custom masks, validation lists |
| **Formulas** | `Demo_03_Lookup_and_Aggregation_Engine.xlsx` | XLOOKUP, INDEX/MATCH, SUMIFS multi-condition models |
| **Tables** | `Demo_04_Structured_Reference_Ledger.xlsx` | Excel Table (`ListObject`) dynamic calculations |
| **Pivot Tables** | `Demo_05_Executive_Sales_Pivot_Matrix.xlsx` | Slicer-connected multi-table summary reports |
| **Power Query** | `Demo_08_Automated_ETL_Pipeline.xlsx` | Power Query applied steps, unpivoting, web/CSV queries |
| **Data Modeling** | `Demo_09_Star_Schema_PowerPivot_DAX.xlsx` | Dimension/fact model with explicit DAX measures |
| **Capstone Project** | `Capstone_PwC_Call_Center_Analysis.xlsx` | Final 5,000-call operational analysis and scorecards |

---

## 💡 Best Practices for Adding Workbooks

1. **Clean Your Sheet Before Saving**:
   - Set cursor to `A1` on all tabs before saving (so the file opens at the top).
   - Set zoom level consistently across tabs (e.g., `100%`).
   - Remove unnecessary scratch calculation cells outside your tables.
2. **Formula Integrity**:
   - Keep Excel Calculation Options set to **Automatic** (`Formulas > Calculation Options > Automatic`).
   - Use Excel Tables (`Ctrl + T`) wherever possible to preserve dynamic formula expansion.
3. **Avoid File Bloat**:
   - Check `Ctrl + End` on each sheet to confirm the used range matches your actual data boundary. If blank rows balloon the file size, delete empty rows and save.
4. **Git Tracking & Dynamic Publishing**:
   - Microsoft Excel `.xlsx` files in this directory are tracked by Git.
   - Temporary Excel lock files starting with `~$` are automatically ignored by `.gitignore`.

---

## 🚀 Dynamic GitHub Auto-Publishing

To automatically push your `.xlsx` workbooks to GitHub every time you save in Excel:

### Option 1: Live Background Auto-Publisher (Hands-Free)
Double-click:
📂 **`scripts/watch_workbooks.bat`**  
*(Or run `powershell -File scripts/watch_workbooks.ps1` in your terminal)*

- The watcher monitors `11_Demos_and_Workbooks/` in real time.
- When you press `Ctrl + S` in Excel on any `.xlsx` file, the watcher waits 4 seconds (allowing Excel to finish releasing its lock), stages your workbook, commits it with a timestamp, and immediately pushes it to GitHub!

### Option 2: Instant One-Click Manual Sync
Whenever you want to trigger a manual push after a session:
Double-click:
📂 **`scripts/sync_workbooks.bat`**  
*(Or run `powershell -File scripts/sync_workbooks.ps1` in your terminal)*
- Immediately stages all modified `.xlsx` files, commits them, and pushes to `origin main`.


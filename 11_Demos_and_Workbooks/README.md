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
4. **Git Tracking**:
   - Microsoft Excel `.xlsx` files in this directory are tracked by Git.
   - Temporary Excel lock files starting with `~$` are automatically ignored by `.gitignore`.

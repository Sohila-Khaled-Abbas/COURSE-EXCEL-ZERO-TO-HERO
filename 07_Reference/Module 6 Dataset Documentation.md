---
type: dataset-documentation
dataset_name: Module 6 Charts & Executive Visual Analytics
source_type: course-workbook
source_ecosystem: Excel Zero to Hero Curriculum
primary_file: 11_Demos_and_Workbooks/06_Charts_and_Visualizations/Module_6_Demo.xlsx
total_sheets: 2
total_transactions: 9994
total_sales: 2297200.86
total_profit: 286397.02
total_units_sold: 37873
status: verified
created: 2026-09-30
updated: 2026-09-30
tags:
  - excel
  - dataset
  - charts
  - visualization
  - pivot-charts
  - stacked-columns
  - superstore
  - visual-analytics
  - reference
---

# 📦 Module 6 Dataset Documentation: Charts & Executive Visual Analytics

> [!abstract] Dataset & Workbook Overview
> The **Module 6 Demo Workbook** (`Module_6_Demo.xlsx`) serves as the official practice and visual modeling laboratory for **Module 6: Data Analysis Charts**. It combines an enterprise retail dataset (**`Sample_ Superstore`**, Table: `Sample__Superstore`, 9,994 records across 19 fields) with production multi-dimensional analytical views (**`Sheet1`** featuring a synchronized PivotTable and Stacked Column PivotChart). This environment allows students to bridge data management, pivot table summarization, and cognitive visual design into publication-grade executive charts.

---

## 🗂️ Workbook Tab Directory

| Tab Name | Dimensions (Rows $\times$ Cols) | Primary Object | Key Educational Purpose & Analytical Schema |
| :--- | :---: | :---: | :--- |
| **`Sample_ Superstore`** | $9,995 \times 19$ | `Sample__Superstore` (Table) | 9,994 retail transaction line items spanning 2014–2017 across 4 geographic regions. Provides raw data for comparison bars, trend lines, donut composition, scatter plots, and filled maps. |
| **`Sheet1`** | $20 \times 7$ | PivotTable & Stacked Column PivotChart | Multi-dimensional cross-tabulation and PivotChart comparing **17 Sub-Categories across 4 Geographic Regions** (`Central`, `East`, `South`, `West`). Primary drill for stacked column geometry, gap width, and regional contribution analysis. |

---

## 📊 Visual Analytics Architecture

```mermaid
flowchart TD
    subgraph DataArchitecture ["Module 6 Demo Architecture: Data to Executive Visuals"]
        direction TB
        RawTable["<b>Sample_ Superstore (Table: Sample__Superstore)</b><br/>• 9,994 Transactions | 19 Fields<br/>• Measures: Sales ($2.30M), Profit ($286.4K), Quantity (37,873)<br/>• Dimensions: Category, Sub-Category, Region, Segment, Order Date"]

        subgraph AggregationLayer ["Analytical Summarization (Sheet1)"]
            direction LR
            PT["<b>Multi-Dimensional PivotTable</b><br/>• Rows: Category & Sub-Category (17 SKUs)<br/>• Columns: Region (Central, East, South, West)<br/>• Values: Total Sales ($)"]
        end

        subgraph VisualLayer ["Executive Presentation Encodings"]
            direction LR
            PC["<b>Stacked Column PivotChart</b><br/>• 4 Regional Series Stacks<br/>• Baseline: Common Zero Baseline<br/>• Visual Encodings: Coastal Dominance & Category Scale"]
        end

        RawTable ==> PT ==> PC
    end
```

---

## 📋 Tab 1: `Sample_ Superstore` Data Dictionary (9,994 Records)

Located in `Sample_ Superstore` (Table: `Sample__Superstore`, coordinates `A1:S9995`):

| Column Name | Excel Data Type | Business Description | Sample Values / Distinct Range |
| :--- | :--- | :--- | :--- |
| **`Row ID`** | Whole Number (`Integer`) | Sequential unique row counter | `1, 2, 3, ..., 9994` |
| **`Order ID`** | Text (`String`) | Transaction order code (Country-Year-ID) | `CA-2016-152156`, `US-2015-108966` |
| **`Order Date`** | Date (`YYYY-MM-DD`) | Date customer placed order | `2014-01-03` to `2017-12-30` |
| **`Ship Date`** | Date (`YYYY-MM-DD`) | Date product was dispatched | `2014-01-07` to `2018-01-05` |
| **`Ship Mode`** | Text (`String`) | Logistics delivery class (4 options) | `Standard Class`, `Second Class`, `First Class`, `Same Day` |
| **`Customer ID`** | Text (`String`) | Unique customer identifier code | `CG-12520`, `DV-13045`, `SO-20335` (793 distinct) |
| **`Segment`** | Text (`String`) | Customer classification (3 tiers) | `Consumer` (50.6%), `Corporate` (30.7%), `Home Office` (18.7%) |
| **`Country`** | Text (`String`) | Country of commercial operation | `United States` |
| **`City`** | Text (`String`) | Destination delivery city | `New York City`, `Los Angeles`, `Seattle`, `San Francisco` (531 cities) |
| **`State`** | Text (`String`) | Destination US state (49 states) | `California` (2,001), `New York` (1,128), `Texas` (985), `Pennsylvania` (587) |
| **`Region`** | Text (`String`) | Geographic sales district | `West` (3,203), `East` (2,848), `Central` (2,323), `South` (1,620) |
| **`Product ID`** | Text (`String`) | Unique SKU identifier | `FUR-BO-10001798`, `TEC-PH-10002275` (1,862 SKUs) |
| **`Category`** | Text (`String`) | High-level product department | `Technology`, `Furniture`, `Office Supplies` |
| **`Sub-Category`** | Text (`String`) | Detailed product grouping (17 items) | `Phones`, `Chairs`, `Storage`, `Tables`, `Binders`, `Copiers`, etc. |
| **`Product Name`** | Text (`String`) | Full commercial item description | `Global Troy Executive Leather Low-Back Tilter` |
| **`Sales`** | Currency (`Numeric`) | Gross transactional sales amount (USD) | `$0.44` to `$22,638.48` (Sum: `$2,297,200.86`) |
| **`Quantity`** | Whole Number (`Integer`) | Units purchased in order line | `1` to `14` (Sum: `37,873` units) |
| **`Discount`** | Percentage (`Decimal`) | Promotional markdown applied | `0.00` to `0.80` (Mean: `15.6%`) |
| **`Profit`** | Currency (`Numeric`) | Net financial margin realized (USD) | `-$6,599.98` to `+$8,399.98` (Sum: `$286,397.02`) |

---

## 📋 Tab 2: `Sheet1` PivotTable & Stacked Column PivotChart

`Sheet1` synthesizes product hierarchy with regional sales distribution, powering an interactive **Stacked Column PivotChart**:

### Multi-Dimensional Regional Sales Matrix (Audited Ground Truth)

| Category | Sub-Category | Central ($) | East ($) | South ($) | West ($) | Total Sales ($) | Regional Dominance |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Technology** | **Phones** | \$72,403.28 | \$100,614.98 | \$58,304.44 | \$98,684.35 | **\$330,007.05** | Coastal (East & West = 60.4%) |
| **Furniture** | **Chairs** | \$85,230.65 | \$96,260.68 | \$45,176.45 | \$101,781.33 | **\$328,449.10** | West Leads ($101.8K) |
| **Office Supplies**| **Storage** | \$45,930.11 | \$71,612.58 | \$35,768.06 | \$70,532.85 | **\$223,843.61** | East & West Tie (~$71K each) |
| **Furniture** | **Tables** | \$39,154.97 | \$39,139.81 | \$43,916.19 | \$84,754.56 | **\$206,965.53** | West Accounts for 41.0% |
| **Office Supplies**| **Binders** | \$56,923.28 | \$53,498.00 | \$37,030.34 | \$55,961.11 | **\$203,412.73** | Balanced across 4 Regions |
| **Technology** | **Machines** | \$26,797.38 | \$66,106.17 | \$53,890.96 | \$42,444.12 | **\$189,238.63** | East Leads ($66.1K) |
| **Technology** | **Accessories** | \$33,956.08 | \$45,033.37 | \$27,276.75 | \$61,114.12 | **\$167,380.32** | West Dominates ($61.1K) |
| **Technology** | **Copiers** | \$37,259.57 | \$53,219.46 | \$9,299.76 | \$49,749.24 | **\$149,528.03** | South Lowest ($9.3K) |
| **Furniture** | **Bookcases** | \$24,157.18 | \$43,819.33 | \$10,899.36 | \$36,004.12 | **\$114,880.00** | East Highest ($43.8K) |
| **Office Supplies**| **Appliances** | \$23,582.03 | \$34,188.47 | \$19,525.33 | \$30,236.34 | **\$107,532.16** | East Highest ($34.2K) |
| **Furniture** | **Furnishings** | \$15,254.37 | \$29,071.38 | \$17,306.68 | \$30,072.73 | **\$91,705.16** | West & East Strong |
| **Office Supplies**| **Paper** | \$17,491.90 | \$20,172.60 | \$14,150.98 | \$26,663.72 | **\$78,479.21** | West Highest ($26.7K) |
| **Office Supplies**| **Supplies** | \$9,467.37 | \$10,760.12 | \$8,318.93 | \$18,127.12 | **\$46,673.54** | West Accounts for 38.8% |
| **Office Supplies**| **Art** | \$5,765.34 | \$7,485.76 | \$4,655.62 | \$9,212.07 | **\$27,118.79** | Low Volume, High Margin |
| **Office Supplies**| **Envelopes** | \$4,636.87 | \$4,375.87 | \$3,345.56 | \$4,118.10 | **\$16,476.40** | Stable Uniform Demand |
| **Office Supplies**| **Labels** | \$2,451.47 | \$2,602.93 | \$2,353.18 | \$5,078.73 | **\$12,486.31** | West Leads ($5.1K) |
| **Office Supplies**| **Fasteners** | \$778.03 | \$819.72 | \$503.32 | \$923.22 | **\$3,024.28** | Micro-SKU ($3.0K Total) |
| **Summary Total** | **All Categories** | **\$501,239.89** | **\$678,781.43** | **\$391,722.90** | **\$725,456.64** | **\$2,297,200.86** | **West (31.6%) > East (29.5%)** |

---

## 🎨 PivotChart Technical Specifications

```mermaid
flowchart LR
    subgraph ChartSpecs ["Stacked Column PivotChart Geometry"]
        direction LR
        S1["<b>Series Stacking</b><br/>Series Overlap = 100%<br/>4 Colored Layers"]
        --> S2["<b>Column Width</b><br/>Gap Width = 65%<br/>Solid visual weight"]
        --> S3["<b>Baseline Grounding</b><br/>Y-Axis starts at $0<br/>No truncated baseline"]
        --> S4["<b>Labeling Discipline</b><br/>Category Labels Horizontal<br/>No tilted text"]
    end
```

### Key Chart Configuration Parameters:
1. **Chart Type**: Stacked Column (`openpyxl.chart.bar_chart.BarChart`, `grouping="stacked"`, `type="col"`).
2. **Category Axis (X)**: Multi-level hierarchy showing `Category` (Furniture, Office Supplies, Technology) and `Sub-Category` (17 items).
3. **Values Axis (Y)**: Formatted currency scale starting strictly at `$0` up to `$350,000`.
4. **Series Stacking (Bottom to Top)**:
   - Layer 1: **Central** (`Sheet1!$D$2:$D$3`)
   - Layer 2: **East** (`Sheet1!$E$2:$E$3`)
   - Layer 3: **South** (`Sheet1!$F$2:$F$3`)
   - Layer 4: **West** (`Sheet1!$G$2:$G$3`)
5. **Pre-Attentive Palette Recommendation**:
   - `West` (Top Volume): Vibrant Navy `#1E3A8A`
   - `East` (Secondary Volume): Royal Blue `#2563EB`
   - `Central` (Mid Volume): Sky Blue `#0284C7`
   - `South` (Lowest Volume): Cool Slate `#94A3B8`

---

## 💡 Practical Applications & Course Connections

- **Lesson 6.1**: [[01_Visual_Analytics_and_Chart_Selection]] — Master Chart Selection Matrix and taxonomy of Comparison Charts.
- **Lesson 6.2**: [[02_Formatting_and_Chart_Design_Rules]] — Gap Width tightening (50%–80%), Series Overlap (100%), and Tufte decluttering.
- **Lesson 6.3**: [[03_Dashboard_Visual_Hierarchy]] — Connecting `Sheet1` Stacked Column PivotChart to Tier 2 Executive Dashboards and multi-Pivot Slicers.
- **Student Workbook Repository**: [`11_Demos_and_Workbooks/README.md`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/README.md)

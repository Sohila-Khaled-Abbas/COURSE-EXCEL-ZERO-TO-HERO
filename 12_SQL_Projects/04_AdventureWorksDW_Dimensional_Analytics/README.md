# Project 04: AdventureWorksDW Dimensional Analytics

## Business Domain
**Enterprise B2C Retail & Dimensional Analytics** (E-commerce Customer Demographics, Product Profitability & Geographic Distribution).

## Database
- **Database**: `AdventureWorksDW2022`
- **Engine**: Microsoft SQL Server 2022
- **Source**: Official Microsoft SQL Server Samples backup (`AdventureWorksDW2022.bak`)
- **Compatibility Level**: 160

---

## Objective
Transition from operational relational querying (3NF) to **Dimensional Modeling and Analytics Engineering** using a Kimball Star Schema. Ingest pre-aggregated facts and conformed dimensions into Excel's Power Pivot engine to author high-performance DAX measures and an executive dashboard.

---

## Architecture

```text
Microsoft SQL Server (AdventureWorksDW2022)
                 │
  [Kimball Star Schema: FactInternetSales + Conformed Dims]
                 │
                 ▼
  [SQL Analytical View: dbo.vw_InternetSalesStar]
                 │
                 ▼ (Power Query Database Connector / Query Folding)
  [Power Query M Staging Engine]
                 │
                 ▼ (Load to Data Model / Do Not Load to Sheet)
  [Power Pivot VertiPaq Analytical Model]
                 │
                 ▼ (Explicit DAX Measures: Sales, Margin %, AOV)
  [Executive Excel Dashboard + Slicers + KPI Cards]
```

---

## Technologies
- **SQL Server 2022** (Dimensional modeling, star schema views, surrogate keys)
- **Power Query / M** (Database connector, data type preservation, query folding)
- **Power Pivot** (VertiPaq columnar engine, 1-to-many dimensional relationships)
- **DAX** (`DIVIDE`, `DISTINCTCOUNT`, `SUM`, margin calculations)
- **Excel UI/UX** (Card metrics, dynamic category slicers, geographic hierarchy)

---

## Key Questions
1. **Product Profitability**: Which product categories and subcategories drive the highest gross margins versus sheer sales volume?
2. **Customer Demographics**: How do customer income brackets and family size correlate with average order value (AOV)?
3. **Geographic Distribution**: Which international markets represent the highest return on marketing spend?
4. **Time Intelligence**: What is the historical trajectory of monthly Internet sales across calendar years 2011–2013?

---

## Data Model
- **Fact Table**: `FactInternetSales` (60,398 rows, grain = line item).
- **Dimension Tables**: `DimDate`, `DimCustomer`, `DimProduct`, `DimGeography`.
- Detailed documentation: [AdventureWorksDW Data Model.md](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/AdventureWorksDW%20Data%20Model.md).

---

## SQL Layer
- Schema & Grain Exploration: [`01_dw_tables_and_grain.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/sql/01_schema_exploration/01_dw_tables_and_grain.sql)
- Product & Geography Queries: [`04_star_schema_internet_sales.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/sql/04_analysis/04_star_schema_internet_sales.sql)
- Production View: [`05_create_analytical_views.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/sql/05_views/05_create_analytical_views.sql)

---

## Power Query Layer
Import options:
1. **Single Star View Ingestion**: Ingest `dbo.vw_InternetSalesStar` directly for lightweight PivotTable reporting.
2. **Multi-Table Star Ingestion**: Ingest `FactInternetSales`, `DimDate`, `DimCustomer`, and `DimProduct` into Power Pivot with relationship diagrams preserved.

```powerquery
let
    Source = Sql.Database("localhost", "AdventureWorksDW2022"),
    View = Source{[Schema="dbo",Item="vw_InternetSalesStar"]}[Data]
in
    View
```

---

## Excel Layer & DAX
Load directly to the **Data Model** (VertiPaq storage) rather than a flat worksheet table:

```dax
[Internet Sales] := SUM(FactInternetSales[SalesAmount])
[Internet Cost] := SUM(FactInternetSales[TotalProductCost])
[Gross Profit] := [Internet Sales] - [Internet Cost]
[Margin %] := DIVIDE([Gross Profit], [Internet Sales], 0)
[AOV] := DIVIDE([Internet Sales], DISTINCTCOUNT(FactInternetSales[SalesOrderNumber]), 0)
```

---

## Dashboard Architecture
- **Header**: Dynamic KPI Cards (Total Internet Sales `$29.36M`, Gross Profit `$12.08M`, Margin `41.15%`, Orders `27,659`).
- **Interactive Slicers**: Calendar Year, Product Category, Country.
- **Charts**: Margin % by Product Category (Bar), Monthly Sales Trend (Line), Sales by Country (Treemap/Column).

---

## Validation
- Reconciled against [`06_reconciliation_checks.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/04_AdventureWorksDW_Dimensional_Analytics/sql/06_validation/06_reconciliation_checks.sql).
- Row Count Match: 60,398 rows.
- Financial Measure Match: `$29,358,677.22` Total Sales, `$12,080,883.65` Gross Profit.

---

## Key Learning Outcomes
1. Mastered Kimball Star Schema concepts: Facts, Dimensions, Surrogate Keys.
2. Understood why OLAP models outperform 3NF models for analytical queries.
3. Created explicit DAX measures in Power Pivot avoiding implicit aggregations.
4. Architected an enterprise-grade dimensional data pipeline.

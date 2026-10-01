---
type: curriculum-roadmap
project_track: SQL Database Ingestion & Excel Analytics
status: completed
version: 2.0
date: 2026-10-01
tags: [sql-projects, project-roadmap, difficulty-matrix, analytics-engineering, progressive-ladder]
---

# 🗺️ SQL Database Ingestion & Excel Analytics: Project Roadmap

> [!abstract] The Progressive Analytical Engineering Ladder
> This curriculum bridges relational database engineering and executive Excel business intelligence. Each project introduces a higher tier of analytical complexity, moving from basic relational queries and ingestion to multi-schema OLTP navigation, dimensional star schema modeling, and production automated pipelines.
>
> $$\begin{array}{ccccc}
> \textbf{Project 01: Northwind} & \longrightarrow & \textbf{Project 02: pubs} & \longrightarrow & \textbf{Project 03: AdventureWorks} \\
> \text{Relational Joins & Ingestion} & & \text{Many-to-Many & CTEs} & & \text{Enterprise Multi-Schema OLTP} \\
> \downarrow & & & & \downarrow \\
> \textbf{Project 05: Production Pipeline} & \longleftarrow & \multicolumn{3}{c}{\textbf{Project 04: AdventureWorksDW}} \\
> \text{End-to-End Automation & VBA} & & \multicolumn{3}{c}{\text{Dimensional Star Schema & DAX}}
> \end{array}$$

---

## 1. Project Difficulty & Competency Matrix

| Project | Database | Level | Primary Competency | SQL Engineering Layer | Excel / BI Presentation Layer | Portfolio Artifact |
| :--- | :--- | :---: | :--- | :--- | :--- | :--- |
| **01. Northwind Sales Analytics** | `Northwind` | **Foundation $\to$ Intermediate** | Relational Joins & Ingestion Lifecycle | `SELECT`, `INNER JOIN`, `GROUP BY`, Aggregate Views | Power Query SQL Connector, Excel Tables, PivotCharts, Slicers | Operational Sales Dashboard (`.xlsx`) |
| **02. Pubs Publishing Intelligence** | `pubs` | **Intermediate** | Many-to-Many Bridge Tables & Royalties | Composite Keys, Associative Joins, CTEs, Window Ranking | Power Query Shaping, Dynamic Arrays, Royalty Matrix | Publishing Executive Scorecard (`.xlsx`) |
| **03. AdventureWorks Sales Analytics** | `AdventureWorks2022`| **Intermediate $\to$ Advanced** | Enterprise Multi-Schema Relational Analysis | Multi-Schema Joins (`Sales`, `Production`, `Person`), Subqueries | Power Pivot Data Model, Normalized Relationships, DAX | Enterprise Commercial Console (`.xlsx`) |
| **04. AdventureWorksDW Dimensional** | `AdventureWorksDW2022`| **Advanced** | Dimensional Modeling & Star Schemas | Fact/Dimension separation, Surrogate Keys, Date Dimension | Power Pivot Tabular Star Schema, 20+ Explicit DAX Measures | Executive Strategy Dashboard (`.xlsx`) |
| **05. Production SQL-to-Excel Pipeline** | Multi-Source | **Expert / Capstone** | End-to-End Analytics Engineering Pipeline | Parameterized Queries, SQL Views, Query Folding Optimization | Power Query, Data Model, Native Grid Cards, Modular VBA | Automated Application Shell (`.xlsm`) |

---

## 2. Detailed Project Specifications

### 01. Northwind SQL-to-Excel Sales Analytics
- **Business Domain**: Wholesale Food & Beverage Import/Export.
- **Key Questions**:
  - What are total gross and net sales over time?
  - Which product categories generate the highest revenue and margins?
  - Who are the top 10 commercial customers by order volume?
  - Which sales representatives handle the highest order density?
- **Core Technical Challenge**: Connecting Power Query to SQL Server for the first time, ensuring primary/foreign key relationships in `Orders` $\to$ `Order Details` $\to$ `Products` are preserved without duplicated line items.

### 02. Pubs Publishing Sales Intelligence
- **Business Domain**: Commercial Book Publishing & Author Royalty Management.
- **Key Questions**:
  - What are total sales volume and royalty payouts by author?
  - Which book genres (business, psychology, popular computing) yield highest advances?
  - How are royalties divided between co-authors on multi-authored titles?
- **Core Technical Challenge**: Mastering the **Many-to-Many ($M:N$) associative bridge table** (`titleauthor`) and authoring CTEs that prevent Cartesian duplication of book sales.

### 03. AdventureWorks Enterprise Sales Analytics
- **Business Domain**: Global Bicycle Manufacturing & Direct/Reseller Sales.
- **Key Questions**:
  - How do direct consumer web sales (B2C) compare against retail reseller partner sales (B2B)?
  - What are gross profit margins across product hierarchies (Bikes vs Components)?
  - How does sales performance vary across global territories (North America, Europe, Pacific)?
- **Core Technical Challenge**: Navigating a **normalized 3NF enterprise schema** spanning 6 separate schemas (`Sales`, `Production`, `Person`, etc.) and designing an analytical extraction query that denormalizes data efficiently.

### 04. AdventureWorksDW Dimensional Analytics
- **Business Domain**: Enterprise Data Warehouse & Dimensional Business Intelligence.
- **Key Questions**:
  - What are year-over-year (YoY) sales growth rates by calendar month and quarter?
  - How do customer demographics (education, income, marital status) correlate with purchasing volume?
  - What is the variance between gross revenue and total standard product cost?
- **Core Technical Challenge**: Implementing a true **Star Schema** in Excel Power Pivot, utilizing integer surrogate keys (`ProductKey`, `DateKey`), and authoring advanced time-intelligence DAX expressions.

### 05. Production SQL Server to Excel Pipeline
- **Business Domain**: Integrated Multi-Source Enterprise Reporting.
- **Key Questions**:
  - How do we build an automated, self-healing reporting pipeline that refreshes on demand?
  - How do we ensure query folding pushes filtering back to the database engine?
  - How do we package the solution with modular VBA for zero-flicker UI navigation and 1-click PDF publishing?
- **Core Technical Challenge**: Integrating SQL Views, Power Query folding, Power Pivot DAX, an 8pt spatial grid application shell, and modular VBA controllers (`modNavigation`, `modFilterController`, `modDataRefresh`, `modExportPDF`).

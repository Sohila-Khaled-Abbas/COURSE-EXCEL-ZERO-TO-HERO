# Project 05: Production-Style SQL to Excel Analytics Pipeline

## Business Domain
**Enterprise Multichannel Retail & Analytics Engineering** (Unified B2B Reseller & B2C Internet Revenue Pipeline).

## Database
- **Primary Source**: `AdventureWorksDW2022` (with comparative validation against `AdventureWorks2022`)
- **Engine**: Microsoft SQL Server 2022
- **Compatibility Level**: 160
- **View Target**: `dbo.vw_ExecutiveSalesPipeline`

---

## Objective
Design and implement an end-to-end, enterprise-grade production analytics pipeline bridging Microsoft SQL Server and Microsoft Excel. This portfolio capstone project demonstrates strict separation of concerns:
1. **Server-Side**: Reusable, indexed SQL Views handling filtering, relational joins, and column projection.
2. **Staging Engine**: Power Query with query folding preservation and dynamic parameterization.
3. **Semantic Modeling**: Power Pivot VertiPaq columnar model with explicit DAX business measures.
4. **Presentation**: Interactive executive dashboard adhering to modern UI/UX design tokens.
5. **Orchestration**: Modular, fail-safe VBA automation governing synchronous refreshes, navigation, and PDF report distribution.

---

## Architecture

```text
┌────────────────────────────────────────────────────────┐
│               Microsoft SQL Server 2022                │
│    FactInternetSales (60,398) + FactResellerSales (60,855)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│            Server-Side Transformation Layer            │
│         dbo.vw_ExecutiveSalesPipeline (121,253 rows)    │
│            $109,809,274.20 Total Gross Revenue         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼ (Power Query M Database Connector)
┌────────────────────────────────────────────────────────┐
│             Power Query Ingestion & Staging            │
│       Preserves Query Folding / Enforces Strong Types  │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼ (Load to Data Model Only)
┌────────────────────────────────────────────────────────┐
│               Power Pivot Semantic Model               │
│       DAX Measure Layer: Revenue, Margin %, AOV        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Executive Excel Dashboard                │
│       KPI Cards + Slicers + Charts + Web-App UX        │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│           VBA Automation & Governance Layer            │
│    modRefresh + modNavigation + modDashboard + modExport│
└────────────────────────────────────────────────────────┘
```

---

## Technologies
- **Database Engine**: Microsoft SQL Server 2022
- **Query Optimization**: Reusable Views, ANSI-SQL joins, partition pruning
- **Data Ingestion**: Power Query (M Language) with server-side query folding
- **Modeling**: Power Pivot (xVelocity/VertiPaq engine)
- **Calculation Layer**: DAX measures (`DIVIDE`, `SUM`, `CALCULATE`, `DISTINCTCOUNT`)
- **Automation**: Modular Visual Basic for Applications (VBA with `Option Explicit`)
- **Presentation**: Microsoft Excel Application UI with custom design system

---

## Key Questions
1. **Multichannel Performance**: How do B2B Wholesale Reseller margins compare against B2C Direct Internet margins?
2. **Channel Contribution**: What percentage of gross revenue ($109.81M total) is driven by wholesale resellers vs retail consumers?
3. **Pipeline Health**: How can business stakeholders execute a zero-friction, synchronous pipeline refresh with automated error logging?
4. **Automated Governance**: How do we ensure that executive reports are published as timestamped PDFs without manual copy-pasting?

---

## Data Model & Ground Truth Metrics
- **Total Combined Transaction Lines**: `121,253`
- **Internet Channel Lines**: `60,398` | Sales: `$29,358,677.22` | Gross Profit: `$12,080,883.65` (Margin: `41.15%`)
- **Reseller Channel Lines**: `60,855` | Sales: `$80,450,596.98` | Gross Profit: `$470,482.60` (Margin: `0.58%`)
- **Total Enterprise Sales**: `$109,809,274.20` | Total Margin: `$12,551,366.25`

---

## SQL Layer
- Production Pipeline View: [`05_production_pipeline_views.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/sql/05_views/05_production_pipeline_views.sql)
- Financial Reconciliation Script: [`06_reconciliation_checks.sql`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/sql/06_validation/06_reconciliation_checks.sql)

---

## Power Query Layer
Configured via native SQL Server connector with parameter-driven server name:

```powerquery
let
    ServerName = Excel.CurrentWorkbook(){[Name="cfg_ServerName"]}[Content]{0}[Column1],
    DatabaseName = "AdventureWorksDW2022",
    Source = Sql.Database(ServerName, DatabaseName),
    vwPipeline = Source{[Schema="dbo",Item="vw_ExecutiveSalesPipeline"]}[Data],
    TypedTable = Table.TransformColumnTypes(vwPipeline,{
        {"SalesAmount", Currency.Type},
        {"TotalProductCost", Currency.Type},
        {"GrossProfit", Currency.Type},
        {"OrderDate", type date},
        {"CalendarYear", Int64.Type}
    })
in
    TypedTable
```

---

## Excel & DAX Layer
Explicit measures defined in the Power Pivot model:

```dax
-- Total Enterprise Sales
Total Revenue := SUM(vw_ExecutiveSalesPipeline[SalesAmount])

-- Total Enterprise Cost
Total Cost := SUM(vw_ExecutiveSalesPipeline[TotalProductCost])

-- Gross Profit
Enterprise Gross Profit := [Total Revenue] - [Total Cost]

-- Gross Margin Percentage
Gross Margin % := DIVIDE([Enterprise Gross Profit], [Total Revenue], 0)

-- Internet Revenue Share %
Internet Share % := DIVIDE(
    CALCULATE([Total Revenue], vw_ExecutiveSalesPipeline[SalesChannel] = "Internet"),
    [Total Revenue],
    0
)
```

---

## Automation Layer (VBA)
Architecture fully documented in [VBA Automation Architecture.md](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/VBA%20Automation%20Architecture.md).

- [`modRefresh.bas`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/vba/modRefresh.bas): Synchronous background refresh of OLEDB/Power Query connections and Pivot Caches.
- [`modNavigation.bas`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/vba/modNavigation.bas): Tab-switching handlers for Dashboard, Details, and Parameters.
- [`modDashboard.bas`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/vba/modDashboard.bas): Slicer cache reset macro and metadata writer.
- [`modExport.bas`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/vba/modExport.bas): One-click PDF report publishing.
- [`modUtilities.bas`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/12_SQL_Projects/05_Production_SQL_to_Excel_Pipeline/vba/modUtilities.bas): Excel environment optimization (`ScreenUpdating`, `Calculation`) and persistent error logger.

---

## Validation & Audit Matrix
| Tier | Description | Source Query Target | Model Target | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Line Item Count | `COUNT(*)` = 121,253 | Power Pivot Row Count = 121,253 | Reconciled (100%) |
| **Tier 2** | Total Enterprise Revenue | `SUM(SalesAmount)` = $109,809,274.20 | DAX `[Total Revenue]` = $109,809,274.20 | Reconciled (100%) |
| **Tier 3** | Total Gross Profit | `SUM(GrossProfit)` = $12,551,366.25 | DAX `[Enterprise Gross Profit]` = $12,551,366.25 | Reconciled (100%) |
| **Tier 4** | Channel Split | Internet: $29.36M / Reseller: $80.45M | Pivot Channel Breakdown Matches | Reconciled (100%) |

---

## Key Learning Outcomes
1. Designed and deployed a resilient, decoupled data pipeline separating SQL extraction from presentation.
2. Leveraged Power Query query folding to offload heavy filtering to the SQL Server engine.
3. Constructed an enterprise semantic data model in Power Pivot with explicit DAX measures.
4. Orchestrated a fail-safe, modular VBA automation suite with comprehensive error recovery.
5. Reconciled every dollar of revenue across 121,253 rows of transactional data.

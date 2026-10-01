---
type: reference-guide
reference_name: AdventureWorksDW Dimensional Data Warehouse Official Documentation
source_type: official-backup
publisher: Microsoft Corporation
database: AdventureWorksDW2022
database_type: Dimensional Data Warehouse (OLAP Star Schema)
version: SQL Server 2022 (v160)
source_file: "D:/SQL Server/MSSQL16.MSSQLSERVER/MSSQL/Backup/AdventureWorksDW2022.bak"
official_url: "https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure"
last_verified: 2026-10-01
tags: [adventureworksdw, star-schema, dimensional-modeling, fact-tables, dimension-tables, surrogate-keys, dax]
---

# ⭐ AdventureWorksDW2022: Dimensional Data Warehouse & Star Schema Reference

> [!abstract] Educational Paradigm: OLTP vs Dimensional OLAP
> **AdventureWorksDW2022** is the analytical counterpart to the transactional `AdventureWorks2022` database. While OLTP databases are normalized (3NF) to optimize high-concurrency writes and eliminate redundancy, **Data Warehouses are denormalized into Star Schemas to optimize query speed, reporting aggregation, and business intelligence modeling**.
>
> $$\begin{array}{ccc}
> \textbf{AdventureWorks OLTP} & \xrightarrow{\textbf{ETL Transformation}} & \textbf{AdventureWorksDW} \\
> \text{Normalized 3NF Tables} & & \text{Dimensional Star Schema} \\
> \text{Natural / Business Keys} & & \text{Integer Surrogate Keys} \\
> \text{Row-by-Row Operations} & & \text{Massive Analytical Aggregation}
> \end{array}$$

---

## 1. Dimensional Architecture: The Internet Sales Star Schema

```mermaid
erDiagram
    FACT_INTERNET_SALES }o--|| DIM_DATE : "OrderDateKey"
    FACT_INTERNET_SALES }o--|| DIM_CUSTOMER : "CustomerKey"
    FACT_INTERNET_SALES }o--|| DIM_PRODUCT : "ProductKey"
    FACT_INTERNET_SALES }o--|| DIM_SALES_TERRITORY : "SalesTerritoryKey"
    FACT_INTERNET_SALES }o--|| DIM_PROMOTION : "PromotionKey"

    FACT_INTERNET_SALES {
        int ProductKey FK
        int OrderDateKey FK
        int DueDateKey FK
        int ShipDateKey FK
        int CustomerKey FK
        int PromotionKey FK
        int SalesTerritoryKey FK
        string SalesOrderNumber PK
        tinyint SalesOrderLineNumber PK
        smallint OrderQuantity
        decimal UnitPrice
        decimal TotalProductCost
        decimal SalesAmount
        decimal TaxAmt
    }
    DIM_DATE {
        int DateKey PK
        date FullDateAlternateKey
        string EnglishDayNameOfWeek
        string EnglishMonthName
        tinyint MonthNumberOfYear
        smallint CalendarYear
    }
    DIM_PRODUCT {
        int ProductKey PK
        string ProductAlternateKey
        string EnglishProductName
        string Color
        decimal StandardCost
        string EnglishProductSubcategoryName
        string EnglishProductCategoryName
    }
    DIM_CUSTOMER {
        int CustomerKey PK
        string CustomerAlternateKey
        string FirstName
        string LastName
        string EnglishEducation
        string EnglishOccupation
        decimal YearlyIncome
    }
    DIM_SALES_TERRITORY {
        int SalesTerritoryKey PK
        string SalesTerritoryRegion
        string SalesTerritoryCountry
        string SalesTerritoryGroup
    }
```

---

## 2. Table Inventory & Dimensional Classification

| Entity Name | Entity Type | Primary / Surrogate Key | Natural / Business Key | Fact Grain / Dimensions Covered |
| :--- | :---: | :--- | :--- | :--- |
| **`FactInternetSales`** | **Fact Table** | `SalesOrderNumber`, `LineNumber` | None | Individual line item sold through B2C e-commerce. |
| **`FactResellerSales`** | **Fact Table** | `SalesOrderNumber`, `LineNumber` | None | Individual line item sold through B2B wholesale partners. |
| **`DimDate`** | **Dimension** | `DateKey` (e.g. `20210515`) | `FullDateAlternateKey` | 1 row per calendar day; covers fiscal, calendar, and seasonal hierarchies. |
| **`DimProduct`** | **Dimension** | `ProductKey` (Integer) | `ProductAlternateKey` (`BK-M68B-42`) | Denormalized hierarchy (Category $\to$ Subcategory $\to$ Product). |
| **`DimCustomer`** | **Dimension** | `CustomerKey` (Integer) | `CustomerAlternateKey` (`AW00011000`) | Customer demographics, marital status, income, education. |
| **`DimSalesTerritory`** | **Dimension** | `SalesTerritoryKey` (Integer)| `TerritoryID` | Geographic hierarchy (Region $\to$ Country $\to$ Group). |
| **`DimPromotion`** | **Dimension** | `PromotionKey` (Integer) | `PromotionAlternateKey` | Marketing discounts and seasonal promotions. |

---

## 3. Why Surrogate Keys Matter in Excel & Power Pivot
1. **Integer Efficiency in VertiPaq**: Integer surrogate keys (`int32` / `int64`) compress at over **$10\times$ the efficiency** of string business keys (`"BK-M68B-42"`), drastically reducing Excel workbook size.
2. **Handling History (Slowly Changing Dimensions - SCD)**: If a product's price or description changes, a new surrogate key is assigned, preserving historical reporting integrity.
3. **Integer Date Keys (`DateKey`)**: Representing dates as integers (`20210101`) enables ultra-fast numerical joins and native sorting without string conversion latency.

---

## 4. Production Star Schema Query for Direct Power Pivot Modeling

```sql
SELECT 
    fis.SalesOrderNumber,
    fis.SalesOrderLineNumber,
    fis.OrderDateKey,
    fis.CustomerKey,
    fis.ProductKey,
    fis.SalesTerritoryKey,
    fis.OrderQuantity,
    fis.UnitPrice,
    fis.TotalProductCost,
    fis.SalesAmount,
    fis.SalesAmount - fis.TotalProductCost AS GrossProfit
FROM dbo.FactInternetSales fis;
```

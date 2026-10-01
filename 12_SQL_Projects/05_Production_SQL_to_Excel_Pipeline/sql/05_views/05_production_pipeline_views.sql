-- ============================================================================
-- Production SQL to Excel Pipeline: Enterprise Analytical Reporting View
-- Database: AdventureWorksDW2022
-- Target View: dbo.vw_ExecutiveSalesPipeline
-- Purpose: Unified B2B & B2C Multichannel Pipeline for Power Query Ingestion
-- ============================================================================

USE AdventureWorksDW2022;
GO

CREATE OR ALTER VIEW dbo.vw_ExecutiveSalesPipeline AS
SELECT 
    'Internet' AS SalesChannel,
    f.SalesOrderNumber,
    d.FullDateAlternateKey AS OrderDate,
    d.CalendarYear,
    d.CalendarQuarter,
    d.EnglishMonthName AS MonthName,
    g.EnglishCountryRegionName AS Country,
    ISNULL(pc.EnglishProductCategoryName, 'Other') AS Category,
    f.SalesAmount,
    f.TotalProductCost,
    (f.SalesAmount - f.TotalProductCost) AS GrossProfit
FROM dbo.FactInternetSales f
INNER JOIN dbo.DimDate d ON f.OrderDateKey = d.DateKey
INNER JOIN dbo.DimCustomer c ON f.CustomerKey = c.CustomerKey
LEFT JOIN dbo.DimGeography g ON c.GeographyKey = g.GeographyKey
INNER JOIN dbo.DimProduct p ON f.ProductKey = p.ProductKey
LEFT JOIN dbo.DimProductSubcategory psc ON p.ProductSubcategoryKey = psc.ProductSubcategoryKey
LEFT JOIN dbo.DimProductCategory pc ON psc.ProductCategoryKey = pc.ProductCategoryKey

UNION ALL

SELECT 
    'Reseller' AS SalesChannel,
    f.SalesOrderNumber,
    d.FullDateAlternateKey AS OrderDate,
    d.CalendarYear,
    d.CalendarQuarter,
    d.EnglishMonthName AS MonthName,
    g.EnglishCountryRegionName AS Country,
    ISNULL(pc.EnglishProductCategoryName, 'Other') AS Category,
    f.SalesAmount,
    f.TotalProductCost,
    (f.SalesAmount - f.TotalProductCost) AS GrossProfit
FROM dbo.FactResellerSales f
INNER JOIN dbo.DimDate d ON f.OrderDateKey = d.DateKey
INNER JOIN dbo.DimReseller r ON f.ResellerKey = r.ResellerKey
LEFT JOIN dbo.DimGeography g ON r.GeographyKey = g.GeographyKey
INNER JOIN dbo.DimProduct p ON f.ProductKey = p.ProductKey
LEFT JOIN dbo.DimProductSubcategory psc ON p.ProductSubcategoryKey = psc.ProductSubcategoryKey
LEFT JOIN dbo.DimProductCategory pc ON psc.ProductCategoryKey = pc.ProductCategoryKey;
GO

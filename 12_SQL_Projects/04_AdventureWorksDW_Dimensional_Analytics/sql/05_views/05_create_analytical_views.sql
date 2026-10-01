-- ============================================================================
-- AdventureWorksDW2022: Production Star Schema Extraction View
-- Database: AdventureWorksDW2022
-- Target View: dbo.vw_InternetSalesStar
-- Grain: One record per Sales Order Line Item (Fact Grain)
-- ============================================================================

USE AdventureWorksDW2022;
GO

CREATE OR ALTER VIEW dbo.vw_InternetSalesStar AS
SELECT 
    f.SalesOrderNumber,
    f.SalesOrderLineNumber,
    f.OrderDateKey,
    d.FullDateAlternateKey AS OrderDate,
    d.CalendarYear,
    d.CalendarQuarter,
    d.EnglishMonthName AS MonthName,
    d.MonthNumberOfYear,
    c.CustomerKey,
    c.FirstName + ' ' + ISNULL(c.LastName, '') AS CustomerName,
    c.Gender,
    c.YearlyIncome,
    c.TotalChildren,
    g.City,
    g.StateProvinceName,
    g.EnglishCountryRegionName AS Country,
    p.ProductKey,
    p.EnglishProductName AS ProductName,
    pc.EnglishProductCategoryName AS ProductCategory,
    psc.EnglishProductSubcategoryName AS ProductSubcategory,
    p.Color,
    p.StandardCost,
    f.OrderQuantity,
    f.UnitPrice,
    f.ExtendedAmount,
    f.UnitPriceDiscountPct,
    f.DiscountAmount,
    f.ProductStandardCost,
    f.TotalProductCost,
    f.SalesAmount,
    f.TaxAmt,
    f.Freight,
    (f.SalesAmount - f.TotalProductCost) AS GrossProfit
FROM dbo.FactInternetSales f
INNER JOIN dbo.DimDate d ON f.OrderDateKey = d.DateKey
INNER JOIN dbo.DimCustomer c ON f.CustomerKey = c.CustomerKey
LEFT JOIN dbo.DimGeography g ON c.GeographyKey = g.GeographyKey
INNER JOIN dbo.DimProduct p ON f.ProductKey = p.ProductKey
LEFT JOIN dbo.DimProductSubcategory psc ON p.ProductSubcategoryKey = psc.ProductSubcategoryKey
LEFT JOIN dbo.DimProductCategory pc ON psc.ProductCategoryKey = pc.ProductCategoryKey;
GO

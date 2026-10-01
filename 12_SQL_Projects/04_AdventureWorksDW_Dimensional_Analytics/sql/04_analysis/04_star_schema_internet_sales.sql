-- ============================================================================
-- AdventureWorksDW2022: Analytical Star Schema Queries
-- Purpose: Extract Dimensional Aggregates for Product, Customer & Regional Performance
-- ============================================================================

USE AdventureWorksDW2022;
GO

-- 1. Revenue, Cost, and Margin by Product Category & Subcategory
SELECT 
    ISNULL(pc.EnglishProductCategoryName, 'Uncategorized') AS Category,
    ISNULL(psc.EnglishProductSubcategoryName, 'General') AS Subcategory,
    COUNT(DISTINCT f.SalesOrderNumber) AS TotalOrders,
    SUM(f.OrderQuantity) AS UnitsSold,
    ROUND(SUM(f.SalesAmount), 2) AS InternetSales,
    ROUND(SUM(f.TotalProductCost), 2) AS ProductCost,
    ROUND(SUM(f.SalesAmount - f.TotalProductCost), 2) AS GrossProfit,
    ROUND((SUM(f.SalesAmount - f.TotalProductCost) / NULLIF(SUM(f.SalesAmount), 0)) * 100.0, 2) AS MarginPct
FROM dbo.FactInternetSales f
INNER JOIN dbo.DimProduct p ON f.ProductKey = p.ProductKey
LEFT JOIN dbo.DimProductSubcategory psc ON p.ProductSubcategoryKey = psc.ProductSubcategoryKey
LEFT JOIN dbo.DimProductCategory pc ON psc.ProductCategoryKey = pc.ProductCategoryKey
GROUP BY pc.EnglishProductCategoryName, psc.EnglishProductSubcategoryName
ORDER BY InternetSales DESC;
GO

-- 2. Geographic Sales Distribution with Territory Slicers
SELECT 
    g.EnglishCountryRegionName AS Country,
    g.StateProvinceName,
    g.City,
    COUNT(DISTINCT f.CustomerKey) AS ActiveCustomers,
    COUNT(DISTINCT f.SalesOrderNumber) AS TotalOrders,
    ROUND(SUM(f.SalesAmount), 2) AS TotalSales,
    ROUND(AVG(f.SalesAmount), 2) AS AvgLineItemValue
FROM dbo.FactInternetSales f
INNER JOIN dbo.DimCustomer c ON f.CustomerKey = c.CustomerKey
INNER JOIN dbo.DimGeography g ON c.GeographyKey = g.GeographyKey
GROUP BY g.EnglishCountryRegionName, g.StateProvinceName, g.City
ORDER BY TotalSales DESC;
GO

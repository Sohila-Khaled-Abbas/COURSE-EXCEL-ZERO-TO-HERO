-- =========================================================================
-- Project 03: AdventureWorks Enterprise Sales Analytics
-- Script: 05_create_reseller_b2c_views.sql
-- Purpose: Creates the governed multi-channel enterprise sales reporting view
-- Target: AdventureWorks2022 database on SQL Server
-- =========================================================================

USE AdventureWorks2022;
GO

CREATE OR ALTER VIEW Sales.vw_EnterpriseSalesAnalytics
AS
SELECT 
    soh.SalesOrderID,
    soh.OrderDate,
    YEAR(soh.OrderDate) AS OrderYear,
    MONTH(soh.OrderDate) AS OrderMonth,
    DATENAME(MONTH, soh.OrderDate) AS OrderMonthName,
    soh.OnlineOrderFlag,
    CASE WHEN soh.OnlineOrderFlag = 1 THEN 'B2C Direct Web' ELSE 'B2B Wholesale Reseller' END AS SalesChannel,
    st.TerritoryID,
    st.Name AS TerritoryName,
    st.CountryRegionCode,
    st.[Group] AS GlobalRegion,
    cat.ProductCategoryID,
    cat.Name AS CategoryName,
    subcat.ProductSubcategoryID,
    subcat.Name AS SubcategoryName,
    p.ProductID,
    p.Name AS ProductName,
    p.Color AS ProductColor,
    sod.OrderQty,
    sod.UnitPrice,
    sod.UnitPriceDiscount,
    sod.LineTotal AS GrossRevenue,
    ROUND(p.StandardCost * sod.OrderQty, 2) AS TotalStandardCost,
    ROUND(sod.LineTotal - (p.StandardCost * sod.OrderQty), 2) AS GrossProfitMargin
FROM Sales.SalesOrderHeader soh
INNER JOIN Sales.SalesOrderDetail sod ON soh.SalesOrderID = sod.SalesOrderID
INNER JOIN Sales.SalesTerritory st ON soh.TerritoryID = st.TerritoryID
INNER JOIN Production.Product p ON sod.ProductID = p.ProductID
INNER JOIN Production.ProductSubcategory subcat ON p.ProductSubcategoryID = subcat.ProductSubcategoryID
INNER JOIN Production.ProductCategory cat ON subcat.ProductCategoryID = cat.ProductCategoryID;
GO

-- Verification select
SELECT TOP 10 * FROM Sales.vw_EnterpriseSalesAnalytics;
GO

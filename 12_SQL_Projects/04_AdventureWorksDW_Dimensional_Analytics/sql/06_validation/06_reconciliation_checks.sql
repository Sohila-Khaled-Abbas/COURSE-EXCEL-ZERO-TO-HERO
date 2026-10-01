-- ============================================================================
-- AdventureWorksDW2022: Four-Tier Audit & Reconciliation
-- Purpose: Verify View Output against Raw Fact Tables before Power Query Ingestion
-- ============================================================================

USE AdventureWorksDW2022;
GO

-- 1. Tier 1: Row Count & Key Completeness
SELECT 
    'FactInternetSales Table' AS SourceLayer,
    COUNT(*) AS TotalRowCount,
    COUNT(DISTINCT SalesOrderNumber) AS DistinctOrders,
    COUNT(DISTINCT CustomerKey) AS DistinctCustomers
FROM dbo.FactInternetSales
UNION ALL
SELECT 
    'vw_InternetSalesStar View' AS SourceLayer,
    COUNT(*) AS TotalRowCount,
    COUNT(DISTINCT SalesOrderNumber) AS DistinctOrders,
    COUNT(DISTINCT CustomerKey) AS DistinctCustomers
FROM dbo.vw_InternetSalesStar;
GO

-- 2. Tier 2: Financial Measure Reconciliation
SELECT 
    'FactInternetSales Table' AS SourceLayer,
    ROUND(SUM(SalesAmount), 2) AS TotalRevenue,
    ROUND(SUM(TotalProductCost), 2) AS TotalProductCost,
    ROUND(SUM(SalesAmount - TotalProductCost), 2) AS TotalGrossProfit
FROM dbo.FactInternetSales
UNION ALL
SELECT 
    'vw_InternetSalesStar View' AS SourceLayer,
    ROUND(SUM(SalesAmount), 2) AS TotalRevenue,
    ROUND(SUM(TotalProductCost), 2) AS TotalProductCost,
    ROUND(SUM(GrossProfit), 2) AS TotalGrossProfit
FROM dbo.vw_InternetSalesStar;
GO

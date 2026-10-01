-- ============================================================================
-- Production SQL Pipeline: Reconciliation & Audit Verification
-- Database: AdventureWorksDW2022
-- Purpose: Verify View Outputs vs Underlying Facts
-- ============================================================================

USE AdventureWorksDW2022;
GO

SELECT 
    SalesChannel,
    COUNT(*) AS RowCountLines,
    ROUND(SUM(SalesAmount), 2) AS TotalRevenue,
    ROUND(SUM(GrossProfit), 2) AS TotalGrossProfit
FROM dbo.vw_ExecutiveSalesPipeline
GROUP BY SalesChannel
UNION ALL
SELECT 
    'TOTAL AUDIT',
    COUNT(*),
    ROUND(SUM(SalesAmount), 2),
    ROUND(SUM(GrossProfit), 2)
FROM dbo.vw_ExecutiveSalesPipeline;
GO

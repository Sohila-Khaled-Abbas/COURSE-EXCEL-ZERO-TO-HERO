-- =========================================================================
-- Project 01: Northwind SQL-to-Excel Sales Analytics
-- Script: 06_reconciliation_checks.sql
-- Purpose: Financial reconciliation checks to cross-validate Excel against SQL
-- =========================================================================

USE Northwind;
GO

SELECT 
    'Tier 1 SQL Benchmark' AS ReconciliationStage,
    COUNT(DISTINCT OrderID) AS TotalOrders,
    COUNT(*) AS TotalLineItems,
    SUM(Quantity) AS TotalUnitsSold,
    ROUND(SUM(UnitPrice * Quantity * (1 - Discount)), 2) AS NetSalesRevenue,
    ROUND(AVG(UnitPrice * Quantity * (1 - Discount)), 2) AS AvgLineItemRevenue
FROM dbo.[Order Details];
GO

-- Reconcile Customer Count
SELECT 
    COUNT(*) AS TotalCustomersInMaster,
    COUNT(DISTINCT o.CustomerID) AS CustomersWithActiveOrders
FROM dbo.Customers c
LEFT JOIN dbo.Orders o ON c.CustomerID = o.CustomerID;
GO

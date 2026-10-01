-- =========================================================================
-- Project 01: Northwind SQL-to-Excel Sales Analytics
-- Script: 05_create_sales_view.sql
-- Purpose: Creates the governed executive sales reporting view
-- Target: Northwind database on SQL Server
-- =========================================================================

USE Northwind;
GO

CREATE OR ALTER VIEW dbo.vw_ExecutiveSalesSummary
AS
SELECT 
    o.OrderID,
    o.OrderDate,
    o.ShippedDate,
    YEAR(o.OrderDate) AS OrderYear,
    MONTH(o.OrderDate) AS OrderMonth,
    DATENAME(MONTH, o.OrderDate) AS OrderMonthName,
    c.CustomerID,
    c.CompanyName AS CustomerName,
    c.City AS CustomerCity,
    c.Country AS CustomerCountry,
    e.EmployeeID,
    CONCAT(e.FirstName, ' ', e.LastName) AS SalesRepName,
    e.Title AS SalesRepTitle,
    cat.CategoryID,
    cat.CategoryName,
    p.ProductID,
    p.ProductName,
    od.Quantity,
    od.UnitPrice,
    od.Discount,
    ROUND(od.UnitPrice * od.Quantity * (1 - od.Discount), 2) AS LineTotalRevenue,
    ROUND(o.Freight, 2) AS OrderFreight
FROM dbo.Orders o
INNER JOIN dbo.Customers c ON o.CustomerID = c.CustomerID
INNER JOIN dbo.Employees e ON o.EmployeeID = e.EmployeeID
INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID
INNER JOIN dbo.Products p ON od.ProductID = p.ProductID
INNER JOIN dbo.Categories cat ON p.CategoryID = cat.CategoryID;
GO

-- Verification select
SELECT TOP 10 * FROM dbo.vw_ExecutiveSalesSummary;
GO

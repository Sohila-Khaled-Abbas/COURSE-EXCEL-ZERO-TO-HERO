---
type: reference-guide
reference_name: Northwind Sample Database Official Documentation
source_type: official-script
publisher: Microsoft Corporation
database: Northwind
database_type: Relational OLTP
version: SQL Server 2000-2022
source_script: "D:/courses/Data Analysis 26-27/instnwnd.sql"
official_url: "https://github.com/microsoft/sql-server-samples/tree/master/samples/databases/northwind-pubs"
last_verified: 2026-10-01
tags: [northwind, sql-server, schema-documentation, relational-model, orders-customers-products]
---

# 📦 Northwind Sample Database: Schema & Ingestion Reference

> [!abstract] Business Domain & Educational Role
> **Northwind Traders** is an iconic relational database representing a specialty foods wholesale and export business. In this curriculum, Northwind serves as the **Foundation-to-Intermediate gateway** for learning the complete data lifecycle:
> $$\text{SQL Server Relational Tables} \longrightarrow \text{Analytical SQL Queries} \longrightarrow \text{Power Query Ingestion} \longrightarrow \text{Excel Pivot / Dashboard}$$

---

## 1. Relational Schema Architecture (13 Tables)

```mermaid
erDiagram
    CUSTOMERS ||--o{ ORDERS : places
    EMPLOYEES ||--o{ ORDERS : manages
    SHIPPERS ||--o{ ORDERS : ships
    ORDERS ||--|{ ORDER_DETAILS : contains
    PRODUCTS ||--|{ ORDER_DETAILS : "ordered in"
    CATEGORIES ||--o{ PRODUCTS : categorizes
    SUPPLIERS ||--o{ PRODUCTS : supplies
    EMPLOYEES ||--o{ EMPLOYEE_TERRITORIES : assigned
    TERRITORIES ||--o{ EMPLOYEE_TERRITORIES : encompasses
    REGION ||--o{ TERRITORIES : locates
    CUSTOMERS ||--o{ CUSTOMER_CUSTOMER_DEMO : describes
    CUSTOMER_DEMOGRAPHICS ||--o{ CUSTOMER_CUSTOMER_DEMO : classifies

    CUSTOMERS {
        string CustomerID PK
        string CompanyName
        string ContactName
        string City
        string Country
    }
    ORDERS {
        int OrderID PK
        string CustomerID FK
        int EmployeeID FK
        datetime OrderDate
        datetime ShippedDate
        decimal Freight
    }
    ORDER_DETAILS {
        int OrderID PK,FK
        int ProductID PK,FK
        decimal UnitPrice
        smallint Quantity
        real Discount
    }
    PRODUCTS {
        int ProductID PK
        string ProductName
        int SupplierID FK
        int CategoryID FK
        decimal UnitPrice
        smallint UnitsInStock
        bit Discontinued
    }
```

---

## 2. Table Inventory & Business Grain

| Table Name | Schema | Primary Key | Foreign Keys | Row Count | Business Grain & Meaning |
| :--- | :---: | :--- | :--- | :---: | :--- |
| **`Orders`** | `dbo` | `OrderID` | `CustomerID`, `EmployeeID`, `ShipVia` | **830** | One row per sales order transaction. |
| **`Order Details`** | `dbo` | `OrderID`, `ProductID` | `OrderID`, `ProductID` | **2,155** | One row per line item within an order (Grain: Order × Product). |
| **`Products`** | `dbo` | `ProductID` | `SupplierID`, `CategoryID` | **77** | One row per inventory item sold by Northwind. |
| **`Customers`** | `dbo` | `CustomerID` | None | **91** | One row per commercial business purchasing from Northwind. |
| **`Employees`** | `dbo` | `EmployeeID` | `ReportsTo` (Self-referencing) | **9** | One row per sales representative / manager. |
| **`Categories`** | `dbo` | `CategoryID` | None | **8** | Product classification (Beverages, Condiments, Confections, etc.). |
| **`Suppliers`** | `dbo` | `SupplierID` | None | **29** | Vendors supplying raw food inventory to Northwind. |
| **`Shippers`** | `dbo` | `ShipperID` | None | **3** | Third-party logistics carriers (Speedy, United, Federal). |
| **`Territories`** | `dbo` | `TerritoryID` | `RegionID` | **53** | Geographic sales areas. |
| **`Region`** | `dbo` | `RegionID` | None | **4** | Macro regions (Eastern, Western, Northern, Southern). |

---

## 3. Core Analytical Queries for Excel Ingestion

### Query 1: Customer Sales Summary (Power Query Feed)
```sql
SELECT 
    c.CustomerID,
    c.CompanyName,
    c.Country,
    c.City,
    COUNT(DISTINCT o.OrderID) AS TotalOrders,
    ROUND(SUM(od.UnitPrice * od.Quantity * (1 - od.Discount)), 2) AS TotalRevenue,
    ROUND(AVG(od.UnitPrice * od.Quantity * (1 - od.Discount)), 2) AS AvgLineValue
FROM dbo.Customers c
INNER JOIN dbo.Orders o ON c.CustomerID = o.CustomerID
INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID
GROUP BY c.CustomerID, c.CompanyName, c.Country, c.City;
```

### Query 2: Product Performance & Profitability View
```sql
SELECT 
    p.ProductID,
    p.ProductName,
    cat.CategoryName,
    s.CompanyName AS SupplierName,
    p.UnitPrice,
    p.UnitsInStock,
    p.UnitsOnOrder,
    COALESCE(SUM(od.Quantity), 0) AS TotalQuantitySold,
    ROUND(COALESCE(SUM(od.UnitPrice * od.Quantity * (1 - od.Discount)), 0), 2) AS TotalGrossSales
FROM dbo.Products p
INNER JOIN dbo.Categories cat ON p.CategoryID = cat.CategoryID
INNER JOIN dbo.Suppliers s ON p.SupplierID = s.SupplierID
LEFT JOIN dbo.[Order Details] od ON p.ProductID = od.ProductID
GROUP BY p.ProductID, p.ProductName, cat.CategoryName, s.CompanyName, p.UnitPrice, p.UnitsInStock, p.UnitsOnOrder;
```

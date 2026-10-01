---
title: "Database Grain & Dimensional Modeling"
date_created: "2026-10-01"
status: "Active"
tags:
  - "database-grain"
  - "kimball"
  - "data-modeling"
---

# Database Grain & Dimensional Modeling

In both relational database design and analytical engineering, **grain** represents the single most critical concept: what does exactly **one row** in the table represent?

---

## 1. Defining the Grain

Before writing a single query or designing a Power Query model, you must explicitly state the table's grain.

### Examples from Microsoft Sample Databases:
- `Northwind.dbo.Orders`: One row represents **one order header transaction** placed by a customer.
- `Northwind.dbo.[Order Details]`: One row represents **one line item (product)** within an order.
- `pubs.dbo.titles`: One row represents **one published book**.
- `pubs.dbo.titleauthor`: One row represents **one author-to-book contribution relationship**.
- `AdventureWorks2022.Sales.SalesOrderDetail`: One row represents **one physical product shipment line item**.
- `AdventureWorksDW2022.dbo.FactInternetSales`: One row represents **one B2C e-commerce line item transaction**.

---

## 2. Grain Mismatches & The "Double-Counting" Disaster

Joining tables at different grains without aggregation causes measure inflation.

### The Naive Join Anti-Pattern:
Joining `Orders` (Order Grain) with `Order Details` (Line Item Grain) replicates the order-level attributes (such as `Freight` or `CustomerDiscount`) across every line item in that order.

```sql
-- INCORRECT: Inflates Freight by multiplying it across every line item!
SELECT 
    o.OrderID,
    SUM(o.Freight) AS InflatedFreight,
    SUM(od.Quantity * od.UnitPrice) AS TotalSales
FROM dbo.Orders o
INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID
GROUP BY o.OrderID;
```

### The Correct Grain Resolution:
Either:
1. Aggregate the child table to the parent grain before joining (via CTE or subquery).
2. Keep the fact table strictly at the lowest atomic grain (line item) and allocate header costs proportionally, or model them as separate facts in Power Pivot.

---
type: database-lab
lab_number: 8
lab_title: Model Validation & Cross-Tier Financial Reconciliation
difficulty: Advanced
database_targets: [Northwind, AdventureWorks2022]
date: 2026-10-01
tags: [sql-lab, model-validation, data-reconciliation, cross-tier-auditing, row-counts, financial-integrity]
---

# 🔬 Lab 08: Model Validation & Cross-Tier Financial Reconciliation

> [!abstract] Objective
> Learn the rigorous 4-Tier Reconciliation Methodology used by senior analytics engineers to validate data integrity across every stage of the pipeline: from the upstream SQL Server database through Power Query and the Power Pivot Data Model to the final Excel dashboard visual.

---

## 1. Concept & Theory: The 4-Tier Reconciliation Pipeline

Never trust visual inspection alone! An error in an `INNER JOIN`, a misplaced Power Query filter, or an unhandled null in DAX can silently drop or inflate millions of dollars in revenue without throwing an explicit syntax error.

```mermaid
flowchart TD
    T1["Tier 1: SQL Server Source\n(Execute ground-truth T-SQL audit query)"]
    T2["Tier 2: Power Query Ingestion\n(Verify M table row count & column sums)"]
    T3["Tier 3: Power Pivot Data Model\n(Evaluate explicit DAX measure in VertiPaq)"]
    T4["Tier 4: Excel Dashboard Visual\n(Reconcile PivotTable / KPI Card value)"]

    T1 -->|Matches exactly (0.00% variance)| T2
    T2 -->|Matches exactly (0.00% variance)| T3
    T3 -->|Matches exactly (0.00% variance)| T4

    style T1 fill:#e3f2fd,stroke:#1565c0,stroke-width:1px
    style T2 fill:#fff3e0,stroke:#ef6c00,stroke-width:1px
    style T3 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    style T4 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

---

## 2. Lab Exercises: The Northwind Reconciliation Suite

### Exercise 8.1: Tier 1 — Ground-Truth T-SQL Benchmark Query
Execute this script directly on `Northwind` in SSMS to establish the official benchmark:

```sql
USE Northwind;
GO

SELECT 
    'Ground Truth Benchmark' AS AuditLevel,
    COUNT(DISTINCT o.OrderID) AS DistinctOrders,
    COUNT(*) AS TotalOrderLineItems,
    SUM(od.Quantity) AS TotalUnitsSold,
    ROUND(SUM(od.UnitPrice * od.Quantity * (1 - od.Discount)), 2) AS TotalNetRevenue,
    ROUND(SUM(o.Freight), 2) AS TotalFreightExpense
FROM dbo.Orders o
INNER JOIN dbo.[Order Details] od ON o.OrderID = od.OrderID;
```
*Benchmark Values Recorded*:
- `DistinctOrders`: **830**
- `TotalOrderLineItems`: **2,155**
- `TotalUnitsSold`: **51,317**
- `TotalNetRevenue`: **$1,265,793.07**

### Exercise 8.2: Tier 2 — Power Query Reconciliation Formula
In Excel, after loading the Power Query table `NorthwindSales`, create an audit check formula:
```excel
=AND(
    COUNTA(NorthwindSales[OrderID]) = 2155,
    ROUND(SUM(NorthwindSales[LineTotalRevenue]), 2) = 1265793.07
)
```
*Expected Result*: `TRUE`.

### Exercise 8.3: Tier 3 & 4 — DAX Measure Reconciliation
In the Power Pivot window, author the verification measure:
```dax
[Audit_TotalRevenue] := SUMX(Fact_OrderDetails, Fact_OrderDetails[UnitPrice] * Fact_OrderDetails[Quantity] * (1 - Fact_OrderDetails[Discount]))
```
Insert a PivotTable linked to `[Audit_TotalRevenue]`. The grand total must equal **$1,265,793.07** to the exact cent.

---

## 3. The Reconciliation Audit Sign-Off Matrix

| Audit Check | SQL Source Value | Power Query Result | Power Pivot Model | Final Dashboard Display | Status |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Total Order Count** | 830 | 830 | 830 | 830 | **✅ PASSED** |
| **Line Item Count** | 2,155 | 2,155 | 2,155 | 2,155 | **✅ PASSED** |
| **Units Sold** | 51,317 | 51,317 | 51,317 | 51,317 | **✅ PASSED** |
| **Net Revenue ($)** | $1,265,793.07 | $1,265,793.07 | $1,265,793.07 | $1,265,793.07 | **✅ PASSED** |
| **Distinct Customers**| 89 (with orders) | 89 | 89 | 89 | **✅ PASSED** |

---

## 4. Key Takeaways & Defense Question

> **Interview Defense Question**: *If your Excel dashboard displays $1,280,000 but the SQL database returns $1,265,793.07, how do you locate the bug?*
> **Answer**: I trace backward through the 4 tiers: First, I run the SQL query to isolate whether a join duplicated rows. Next, I inspect Power Query step-by-step to see if an improper merge or changed type duplicated keys. Then, I inspect the DAX measure to check if `SUMX` iterated over an un-grouped dimension table. Finally, I check if active slicers or date filters on the dashboard excluded credit memos or cancellations.

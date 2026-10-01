---
title: "Many-to-Many Relationships & Bridge Tables"
date_created: "2026-10-01"
status: "Active"
tags:
  - "many-to-many"
  - "bridge-table"
  - "junction-table"
  - "data-modeling"
---

# Many-to-Many Relationships & Bridge Tables

A **Many-to-Many (M:N)** relationship occurs when multiple records in Table A correlate to multiple records in Table B. In relational database engines, M:N relationships cannot be modeled directly with a single foreign key; they require an intermediary **Bridge (Junction) Table**.

---

## 1. Relational Bridge Table Structure

Consider the `pubs` database:
- An author can write multiple books.
- A book can have multiple co-authors.

```text
┌─────────────┐            ┌─────────────────┐            ┌─────────────┐
│   authors   │ 1        N │   titleauthor   │ N        1 │   titles    │
│  (au_id PK) │───────────<│ (au_id, title_id│>───────────│(title_id PK)│
└─────────────┘            └─────────────────┘            └─────────────┘
```

The bridge table `titleauthor` resolves the relationship into two 1-to-Many relationships:
1. `authors (1)` to `titleauthor (N)` via `au_id`
2. `titles (1)` to `titleauthor (N)` via `title_id`
3. Composite Primary Key: `(au_id, title_id)`

---

## 2. The Multi-Counting Trap in Financial Reporting

If an analyst naively joins `titles`, `titleauthor`, and `sales`, books with multiple authors multiply the sales line items!

### Example:
Book `BU1032` (*The Busy Executive's Database Guide*) has **2 co-authors**:
- Bennet, Abraham (`royaltyper = 60%`)
- Green, Marjorie (`royaltyper = 40%`)

Total actual sales for `BU1032`: **4,095 units ($81,859.05)**.

If you run a naive join:
```sql
SELECT SUM(s.qty * t.price) AS TotalRevenue
FROM dbo.titles t
INNER JOIN dbo.titleauthor ta ON t.title_id = ta.title_id
INNER JOIN dbo.sales s ON t.title_id = s.title_id;
```
The query reports **$163,718.10** (exactly double!), because each sales record is joined once for Bennet and once for Green!

---

## 3. Resolving Many-to-Many in Analytics

1. **In SQL (Weighting via CTE)**:
   Multiply the metric by the bridge table's allocation factor (`ta.royaltyper / 100.0`) before aggregating:
   ```sql
   SELECT 
       ta.au_id,
       SUM(s.qty * t.price * (ta.royaltyper / 100.0)) AS AuthorWeightedRevenue
   FROM dbo.titles t
   INNER JOIN dbo.titleauthor ta ON t.title_id = ta.title_id
   INNER JOIN dbo.sales s ON t.title_id = s.title_id
   GROUP BY ta.au_id;
   ```
2. **In Power Pivot (Data Model)**:
   In modern Excel Data Models, relate the bridge table between `DimAuthor` and `FactTitleSales`, setting cross-filter direction appropriately or writing DAX measures using `CALCULATE(..., CROSSFILTER(...))`.

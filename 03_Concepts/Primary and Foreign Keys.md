---
title: "Primary and Foreign Keys"
date_created: "2026-10-01"
status: "Active"
tags:
  - "database-keys"
  - "referential-integrity"
  - "sql"
---

# Primary and Foreign Keys

Keys are fundamental relational database constraints that enforce identity, uniqueness, and referential integrity between tables.

---

## 1. Key Classifications

- **Primary Key (PK)**: A column or combination of columns that uniquely identifies each row in a table. Primary keys cannot contain `NULL` values. In SQL Server, a primary key automatically creates a unique index (typically clustered).
- **Foreign Key (FK)**: A column or set of columns in a child table that references the primary key (or unique constraint) of a parent table. Foreign keys enforce referential integrity by preventing orphan rows.
- **Natural Key (Business Key)**: An identifier that exists inherently in the business domain (e.g. Social Security Number, ISBN, VIN, Tax ID, ISO Currency Code).
- **Surrogate Key**: An artificial, system-generated integer or GUID (e.g. `IDENTITY(1,1)` in SQL Server, `CustomerKey` in DW) introduced to decouple relational schemas from business key volatility.
- **Composite Key**: A primary key made of two or more columns combined together to achieve uniqueness (common in bridge tables like `Order Details (OrderID, ProductID)`).

---

## 2. Referential Actions

When parent records are deleted or updated, foreign keys define referential actions:
1. `NO ACTION` (Default): Rejects the parent deletion/update if child records exist.
2. `CASCADE`: Automatically deletes or updates corresponding child rows.
3. `SET NULL`: Sets child foreign key columns to `NULL`.
4. `SET DEFAULT`: Sets child columns to their declared default values.

---

## 3. Best Practices in Analytical Modeling

1. **Avoid Natural Keys in Star Schemas**: Natural keys (e.g., alphanumeric customer IDs) increase index footprint and slow down joins. Use integer surrogate keys.
2. **Always Index Foreign Keys**: SQL Server does **not** automatically create an index on foreign key columns. Indexing foreign keys prevents table scans during joins.
3. **Verify Integrity Before Ingestion**: In data lakes or legacy databases where foreign keys were omitted for performance, run orphan audits in SQL before ingesting into Excel.

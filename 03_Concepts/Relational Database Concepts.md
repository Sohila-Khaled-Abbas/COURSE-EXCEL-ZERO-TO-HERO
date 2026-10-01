---
title: "Relational Database Concepts"
date_created: "2026-10-01"
status: "Active"
tags:
  - "rdbms"
  - "database-theory"
  - "acid"
---

# Relational Database Concepts

Relational databases organize structured data based on the relational model established by E.F. Codd. Unlike spreadsheet grids where formatting, layout, and values are intertwined, relational databases separate logical schema from physical storage.

---

## 1. Core Relational Building Blocks

- **Relation (Table)**: A two-dimensional structure composed of rows (tuples) and columns (attributes).
- **Attribute (Column)**: A named domain of values adhering strictly to a declared data type (e.g., `INT`, `DECIMAL(18,2)`, `VARCHAR(50)`, `DATE`).
- **Tuple (Row / Record)**: An individual instance representing an entity or transaction. Order of rows is mathematically irrelevant unless sorted by an explicit `ORDER BY`.
- **Domain (Data Type)**: The set of permitted values for a column, enforcing domain integrity.
- **Constraints**: Declarative rules enforced by the database engine:
  - `PRIMARY KEY`: Unique identification, non-nullable.
  - `FOREIGN KEY`: Referential linkage ensuring valid parent references.
  - `UNIQUE`: Uniqueness enforcement across non-primary keys.
  - `CHECK`: Domain range restrictions (e.g., `UnitPrice >= 0`).
  - `NOT NULL`: Disallowing unknown or missing data values.

---

## 2. ACID Guarantees

Relational database engines guarantee data integrity across transactional mutations:
- **Atomicity**: An operation succeeds completely or rolls back entirely (All-or-Nothing).
- **Consistency**: The database transitions only between valid states conforming to all defined constraints.
- **Isolation**: Concurrent transactions execute without cross-transaction dirty reads or race conditions.
- **Durability**: Once a transaction is committed, its data persists across hardware power failures via the Write-Ahead Transaction Log.

---

## 3. Database Normalization (1NF to 3NF)

Normalization is the process of structuring relational tables to eliminate data redundancy and prevent insert, update, and delete anomalies:
- **1NF (First Normal Form)**: Atomic column values (no repeated groups or multi-value delimiters) and a defined primary key.
- **2NF (Second Normal Form)**: Must be in 1NF, and all non-key columns must be fully functionally dependent on the *entire* primary key (eliminating partial key dependencies in composite keys).
- **3NF (Third Normal Form)**: Must be in 2NF, and all non-key columns must depend *only* on the primary key (no transitive dependencies like `ZipCode -> City`).

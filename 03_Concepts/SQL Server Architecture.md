---
title: "SQL Server Architecture"
date_created: "2026-10-01"
status: "Active"
tags:
  - "sql-server"
  - "database-architecture"
  - "rdbms"
---

# SQL Server Architecture

Understanding the physical and logical architecture of **Microsoft SQL Server** enables analytics engineers to write high-performance queries, optimize data movement, and diagnose ingestion bottlenecks.

---

## 1. Engine Architecture

Microsoft SQL Server is divided into two primary sub-systems:

```text
┌────────────────────────────────────────────────────────┐
│                   Relational Engine                    │
│   (Query Parser -> Query Optimizer -> Execution Plan)  │
└──────────────────────────┬─────────────────────────────┘
                           │ (Executes Plan via Buffer Pool)
                           ▼
┌────────────────────────────────────────────────────────┐
│                     Storage Engine                     │
│    (Buffer Manager -> Transaction Log -> Data Pages)   │
└────────────────────────────────────────────────────────┘
```

1. **Relational Engine (Query Processor)**:
   - **Parser**: Syntactically validates incoming T-SQL commands.
   - **Algebrizer / Normalizer**: Resolves object names (tables, columns) against the system catalog.
   - **Cost-Based Query Optimizer (CBO)**: Evaluates index statistics, data distribution, and join algorithms (Hash Join, Merge Join, Nested Loops) to choose the lowest estimated cost plan.
   - **Execution Engine**: Directs the storage engine to fetch data pages based on the compiled execution plan.

2. **Storage Engine**:
   - **Data Pages**: Fundamental storage unit (8 KB per page, 64 KB per extent).
   - **Buffer Pool**: In-memory cache holding data and index pages to minimize disk I/O.
   - **Transaction Log (LDF)**: Write-Ahead Logging (WAL) ensuring ACID compliance and crash recovery.
   - **Data Files (MDF/NDF)**: Physical disk files storing database tables and indexes.

---

## 2. Logical Hierarchy

```text
SQL Server Instance (e.g. localhost, MSSQLSERVER)
    │
    ├── System Databases (master, msdb, tempdb, model)
    │
    └── User Databases (Northwind, pubs, AdventureWorks2022)
            │
            └── Schemas (dbo, Sales, Production, Person)
                    │
                    ├── Tables (Base physical relations)
                    ├── Views (Virtual tables / stored queries)
                    ├── Stored Procedures (Precompiled code modules)
                    └── Indexes (Clustered & Nonclustered B-Trees)
```

---

## 3. Metadata Catalogs

SQL Server maintains internal system catalogs accessible via standard ANSI-SQL views:
- `INFORMATION_SCHEMA.TABLES`, `INFORMATION_SCHEMA.COLUMNS`: Portable ANSI metadata.
- `sys.tables`, `sys.columns`, `sys.foreign_keys`, `sys.indexes`: Deep SQL Server-specific engine telemetry.
- Dynamic Management Views (`sys.dm_exec_*`, `sys.dm_db_*`): Real-time query performance and index usage.

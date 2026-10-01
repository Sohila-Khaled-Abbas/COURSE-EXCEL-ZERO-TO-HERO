---
type: reference-guide
reference_name: Microsoft SQL Server Sample Databases Official Guide
source_type: official-documentation
publisher: Microsoft Corporation
repository: "https://github.com/microsoft/sql-server-samples"
compatibility: SQL Server 2016 through SQL Server 2022
date: 2026-10-01
tags: [sql-server, sample-databases, northwind, pubs, adventureworks, adventureworksdw, official-microsoft]
---

# 🗄️ Microsoft SQL Server Sample Databases: Official Hierarchy & Source Documentation

> [!abstract] Source of Truth & Provenance Hierarchy
> This reference guide establishes the official Microsoft provenance for all relational and dimensional sample databases utilized across the **Excel Zero to Hero** database curriculum. In accordance with strict data engineering standards, all database assets originate from official Microsoft repositories and official installation scripts—not third-party mirrors.
>
> $$\text{Microsoft Learn} \longrightarrow \text{Microsoft GitHub (sql-server-samples)} \longrightarrow \text{Official SQL Scripts / .BAK Backups} \longrightarrow \text{Project Implementation}$$

---

## 1. The Official Microsoft Sample Database Suite

| Database Name | Model Type | Official Distribution Method | Primary Analytical Domain | Schema Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Northwind** | Relational OLTP (Normalized 3NF) | Official T-SQL Script (`instnwnd.sql`) | Wholesale & Distribution (Orders, Customers, Products, Suppliers) | 13 Tables, 1 Schema (`dbo`) |
| **pubs** | Relational OLTP (Normalized 3NF) | Official T-SQL Script (`instpubs.sql`) | Publishing Industry (Authors, Titles, Publishers, Royalties) | 11 Tables, Bridge Tables (`titleauthor`) |
| **AdventureWorks2022** | Enterprise Relational OLTP | Official Database Backup (`AdventureWorks2022.bak`) | Manufacturing & Multi-Channel Retail Sales | 71 Tables, 6 Schemas (`Sales`, `Production`, etc.) |
| **AdventureWorksDW2022**| Dimensional OLAP / Data Warehouse | Official Database Backup (`AdventureWorksDW2022.bak`) | Enterprise Analytics, Fact/Dimension Star Schema | 31 Tables, Conformed Dimensions, Fact Grain |

---

## 2. Source Repositories & Microsoft Provenance

### 2.1 Northwind & pubs (Relational Classics)
- **Official Repository**: [microsoft/sql-server-samples/samples/databases/northwind-pubs](https://github.com/microsoft/sql-server-samples/tree/master/samples/databases/northwind-pubs)
- **Official Script URLs**:
  - `instnwnd.sql`: Raw T-SQL installation script that creates database `Northwind` and populates all 13 tables.
  - `instpubs.sql`: Raw T-SQL installation script that creates database `pubs` and populates all 11 tables.
- **Local Workspace Source**:
  - `D:\courses\Data Analysis 26-27\instnwnd.sql`
  - `D:\courses\Data Analysis 26-27\instpubs.sql`

### 2.2 AdventureWorks OLTP & DW (Enterprise Suite)
- **Official Repository**: [microsoft/sql-server-samples/releases/tag/adventureworks](https://github.com/Microsoft/sql-server-samples/releases/tag/adventureworks)
- **Microsoft Learn Documentation**: [AdventureWorks Sample Databases Documentation](https://learn.microsoft.com/en-us/sql/samples/adventureworks-install-configure)
- **Official Direct Download URLs**:
  - `AdventureWorks2022.bak`: [Download from Microsoft GitHub](https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorks2022.bak) (204 MB)
  - `AdventureWorksDW2022.bak`: [Download from Microsoft GitHub](https://github.com/Microsoft/sql-server-samples/releases/download/adventureworks/AdventureWorksDW2022.bak) (97 MB)
- **Local Workspace Source**:
  - `D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\AdventureWorks2022.bak`
  - `D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\AdventureWorksDW2022.bak`

---

## 3. Database Version Governance & Compatibility

```yaml
sql_server_environment:
  engine_version: "Microsoft SQL Server 2022 (RTM) - 16.0.1000.6"
  instance_name: "MSSQLSERVER"
  server_endpoint: "localhost (or .)"
  authentication: "Windows Authentication (Integrated Security = SSPI)"
  compatibility_level: 160
```

### Version Variance Matrix (AdventureWorks):
- **AdventureWorks2022 vs AdventureWorks2019**:
  - `AdventureWorks2022` includes updated ledger table support, normalized date intervals into 2022, and compatibility with modern SQL Server 2022 query store and dynamic management views.
  - *Curriculum Standard*: We standardize on **2022** across all labs to align with the active SQL Server 2022 runtime.

---

## 4. Verification Protocol via T-SQL

To verify the active installation of all four sample databases on your local SQL Server instance, execute:

```sql
SELECT 
    name AS DatabaseName,
    database_id,
    compatibility_level,
    collation_name,
    create_date
FROM sys.databases
WHERE name IN ('Northwind', 'pubs', 'AdventureWorks2022', 'AdventureWorksDW2022')
ORDER BY name;
```

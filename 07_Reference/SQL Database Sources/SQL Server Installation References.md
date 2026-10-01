---
type: reference-guide
reference_name: SQL Server Sample Database Installation & Restoration Guide
source_type: installation-manual
publisher: Microsoft Corporation & Curriculum Architecture
target_environment: Microsoft SQL Server 2016-2022 / SSMS / sqlcmd
date: 2026-10-01
tags: [sql-server-installation, database-restore, sqlcmd, ssms, northwind, pubs, adventureworks]
---

# 🛠️ SQL Server Sample Database Installation & Restoration Reference

> [!abstract] Standard Operating Procedures
> This manual provides verified, reproducible commands and scripts for installing and restoring all four official Microsoft sample databases on a local Microsoft SQL Server instance.
>
> **Security Mandate**: Never commit real database credentials or production connection strings to version control. All documentation uses standardized development placeholders (`Server: localhost`, `Database: Northwind`, `Authentication: Windows Authentication`).

---

## 1. Prerequisites & Environment Architecture

```text
DEVELOPMENT ENVIRONMENT:
• RDBMS          : Microsoft SQL Server 2022 (RTM) Developer or Express Edition
• Client Tool 1  : SQL Server Management Studio (SSMS 19 or 20)
• Client Tool 2  : Microsoft sqlcmd CLI Utility (Version 16.0+)
• Analytics Host : Microsoft Excel (Office 365 / Excel 2021+) with Power Query & Power Pivot
• Local Server   : localhost (or .)
• Auth Mode      : Windows Integrated Security (Windows Authentication)
```

---

## 2. Installing Northwind & pubs (T-SQL Scripts)

Both `Northwind` and `pubs` are distributed as complete T-SQL creation scripts.

### Method A: Using the `sqlcmd` Command-Line Utility
Open Windows PowerShell or Command Prompt and execute:

```powershell
# 1. Install Northwind
sqlcmd -S localhost -E -i "D:\courses\Data Analysis 26-27\instnwnd.sql"

# 2. Install pubs
sqlcmd -S localhost -E -i "D:\courses\Data Analysis 26-27\instpubs.sql"
```
*Parameters explained*:
- `-S localhost`: Targets the default local SQL Server instance.
- `-E`: Uses trusted Windows Authentication (no plaintext passwords required).
- `-i <filepath>`: Executes the input T-SQL script batch.

### Method B: Using SQL Server Management Studio (SSMS)
1. Open SSMS and connect to Server Name: `localhost` (Authentication: Windows Authentication).
2. Go to **File $\to$ Open $\to$ File...** and select `instnwnd.sql`.
3. Click **Execute** (or press `F5`).
4. Repeat for `instpubs.sql`.

---

## 3. Restoring AdventureWorks & AdventureWorksDW (.BAK Backups)

Both `AdventureWorks2022` and `AdventureWorksDW2022` are distributed as official full database backup files (`.bak`).

### Step 1: Inspect Logical File Names
Before restoring a `.bak` file, inspect the internal logical names of the data (`.mdf`) and log (`.ldf`) files:

```sql
RESTORE FILELISTONLY 
FROM DISK = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\AdventureWorks2022.bak';
```

### Step 2: Execute RESTORE DATABASE with MOVE
Run the following T-SQL script in SSMS or `sqlcmd`:

```sql
-- 1. Restore AdventureWorks2022 OLTP
RESTORE DATABASE [AdventureWorks2022]
FROM DISK = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\AdventureWorks2022.bak'
WITH 
    MOVE N'AdventureWorks2022' TO N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AdventureWorks2022.mdf',
    MOVE N'AdventureWorks2022_log' TO N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AdventureWorks2022_log.ldf',
    REPLACE,
    STATS = 10;
GO

-- 2. Restore AdventureWorksDW2022 Data Warehouse
RESTORE DATABASE [AdventureWorksDW2022]
FROM DISK = N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\Backup\AdventureWorksDW2022.bak'
WITH 
    MOVE N'AdventureWorksDW2022' TO N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AdventureWorksDW2022.mdf',
    MOVE N'AdventureWorksDW2022_log' TO N'D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AdventureWorksDW2022_log.ldf',
    REPLACE,
    STATS = 10;
GO
```

---

## 4. Verification & Health Check

Execute this verification script to confirm all databases are online and accessible:

```sql
SELECT 
    d.name AS DatabaseName,
    d.state_desc AS OperationalState,
    d.recovery_model_desc AS RecoveryModel,
    d.compatibility_level AS CompatibilityLevel,
    COUNT(t.TABLE_NAME) AS TotalBaseTables
FROM sys.databases d
LEFT JOIN INFORMATION_SCHEMA.TABLES t ON 1=1
WHERE d.name IN ('Northwind', 'pubs', 'AdventureWorks2022', 'AdventureWorksDW2022')
GROUP BY d.name, d.state_desc, d.recovery_model_desc, d.compatibility_level;
```

Expected output:
- `Northwind`: State = `ONLINE`, 13 base tables.
- `pubs`: State = `ONLINE`, 11 base tables.
- `AdventureWorks2022`: State = `ONLINE`, 71 base tables.
- `AdventureWorksDW2022`: State = `ONLINE`, 31 base tables.

---

## 5. Troubleshooting & Common Installation Hazards

| Issue Encountered | Root Cause | Verified Resolution |
| :--- | :--- | :--- |
| **`Msg 5133: File activation failure`** | Destination directory does not exist or lacks write permissions. | Verify physical folder exists: `D:\SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\`. |
| **`Msg 3102: Database in use`** | Active user or connection currently connected to database. | Add `ALTER DATABASE [DB] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;` prior to restore. |
| **`Cannot open database requested by login`** | Excel user account lacks `db_datareader` permissions. | Grant read permissions in SSMS: `ALTER ROLE [db_datareader] ADD MEMBER [DOMAIN\User];` |

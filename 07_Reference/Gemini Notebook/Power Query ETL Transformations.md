---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Source
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Power Query & ETL Architecture
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - power-query
  - etl
  - m-language
  - data-cleaning
  - gemini-notebook
---

# Power Query ETL Transformations

## Why This Resource Matters
Manual data preparation (copy-pasting, deleting blank rows by hand, text-to-columns wizards) consumes up to 80% of an analyst's time and creates irreversible human errors. Power Query (Get & Transform) provides a fully declarative, auditable, and idempotent ETL (Extract, Transform, Load) engine built directly into Excel.

---

## Source Summary
The Gemini Notebook curriculum highlights core Power Query best practices:
- **Idempotent Step Sequences**: Transformations are stored as linear recipe steps in M code (`Applied Steps`), ensuring that refreshing the query against updated source files reproduces identical clean results.
- **Strict Data Type Casting**: Every column must be assigned an explicit type (`type text`, `Int64.Type`, `type number`, `type date`, `type logical`) at the end of the query to prevent computational corruption in downstream Pivot Tables and DAX models.
- **Unpivoting Columns**: Converting wide cross-tabular reports (months spread across columns) into narrow normalized relational tables (`Attribute`, `Value`).
- **Combining Data Streams**:
  - *Append*: Stacking identical table schemas vertically (e.g., combining monthly call logs).
  - *Merge*: Relational joining horizontally (Left Outer, Inner, Full Outer, Anti-Join) based on composite or single surrogate keys.
- **M Code Function Structure**: Understanding `let ... in ...` constructs and avoiding step order corruption.

---

## My Understanding
Power Query operates like a data pipeline compiler inside Excel. Rather than modifying raw CSV or database exports directly on disk, Power Query maintains a non-destructive transformation layer. When monthly data arrives, the analyst clicks "Refresh All" and the entire ingestion pipeline executes in seconds.

---

## Key Takeaways
1. **Never Edit Raw Source Data**: Raw files in `09_Source_Materials/` must remain immutable. Power Query handles all cleansing in-memory.
2. **Normalize Wide Tables Immediately**: Pivot Tables and DAX cannot effectively aggregate wide data matrices where dates or categories are column headers; always use "Unpivot Other Columns".
3. **Audit Missing Values Upstream**: Differentiate between true nulls and blank text strings (`""`) during the transformation step before pushing to the Data Model.

---

## Important Examples

### Example 1: Robust M Code for Ingestion & Unpivoting
```powerquery
let
    Source = Excel.Workbook(File.Contents("D:\Data\RegionalSales.xlsx"), null, true),
    SalesSheet = Source{[Item="RawSales",Kind="Sheet"]}[Data],
    PromotedHeaders = Table.PromoteHeaders(SalesSheet, [PromoteAllScalars=true]),
    UnpivotedMonths = Table.UnpivotOtherColumns(PromotedHeaders, {"Region", "RepID", "Product"}, "Month", "Revenue"),
    TypedTable = Table.TransformColumnTypes(UnpivotedMonths,{
        {"Region", type text},
        {"RepID", Int64.Type},
        {"Product", type text},
        {"Month", type date},
        {"Revenue", Currency.Type}
    })
in
    TypedTable
```

### Example 2: Anti-Join for Data Quality Auditing
```powerquery
// Finding Call IDs present in Audit log that do not exist in Master Ledger
let
    Source = Table.NestedJoin(AuditLog, {"CallId"}, MasterLedger, {"CallId"}, "MasterMatch", JoinKind.LeftAnti),
    RemovedColumns = Table.SelectColumns(Source, {"CallId", "Timestamp", "Agent"})
in
    RemovedColumns
```

---

## Practical Application
In Module 8 and the [[Call Center Performance Analysis]] pipeline, Power Query cleanses raw call duration stamps, cleans whitespace from agent names, handles null satisfaction ratings, and outputs a normalized star schema directly into the Power Pivot Data Model.

---

## Practice
**Task**: In Module 8 (`8-Module_8.xlsx`), open Power Query Editor. Ingest the uncleaned CRM export. Remove top 3 metadata rows, promote headers, unpivot quarterly revenue columns into `Quarter` and `Amount`, filter out cancelled accounts, and load strictly as a "Connection Only" table into the Data Model.

---

## Concepts Supported
- [[ETL Process]]
- [[Data Cleaning]]
- [[Six Dimensions of Data Quality]]
- [[M Language]]

---

## Related Course Lessons
- [[01_Power_Query_Fundamentals_and_ETL]]
- [[02_Core_Data_Transformations]]
- [[03_Combining_Data_Append_and_Merge]]
- [[04_Introduction_to_M_Language_and_APIs]]

---

## Practice Opportunities
- [[Ex05_Data_Cleaning_and_Transformation]]
- [[Ex06_Power_Query_ETL]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/Data Quality Assessment]]
- [[06_Projects/Call Center Performance Analysis/Analysis Plan]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)

---

## Notes
Always enable "Fast Data Load" in Power Query Options when processing datasets exceeding 100,000 rows to bypass background preview cache delays.

---
type: lesson
course: Excel Zero to Hero
module: "Module 8"
topic: "Combining Datasets: Append vs Merge"
status: completed
difficulty: advanced
tags: [excel, lesson, power-query, merge, append, relational-joins, unions]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]", "[[02_Core_Data_Transformations]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-10-01
video_chapter: "Chapter 8 – Power Query & M Language"
video_timestamp: "4:20:30"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s"
---

# Lesson 8.3: Combining Queries: Append (Unions) vs Merge (Relational Joins)

> [!abstract] Learning Objective
> Master the two fundamental mechanisms for combining multi-source data inside Power Query: **Append Queries** (stacking rows vertically like SQL `UNION ALL`) and **Merge Queries** (enriching rows horizontally across relational keys like SQL `JOIN`). Understand all 6 join kinds—including Left Anti-joins for forensic auditing—and configure fuzzy matching.

> 🎥 **Video Chapter**: [Chapter 8 – Power Query & M Language (4:20:30)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s)

---

## 🔀 1. Append vs Merge: Conceptual Comparison

When combining two or more tables in Power Query, analysts must choose between vertical union stacking or horizontal relational enrichment:

```mermaid
flowchart TD
    subgraph APPEND ["1. APPEND QUERIES (Vertical Row Stacking / SQL UNION ALL)"]
        direction TB
        A1["Table Q1 (1,000 Rows | 5 Cols)"]
        A2["Table Q2 (1,500 Rows | 5 Cols)"]
        A1 === A2
        A2 ==> A_OUT["Combined Table (2,500 Rows | 5 Cols)\n• Increases Row Count\n• Preserves Column Structure"]
    end

    subgraph MERGE ["2. MERGE QUERIES (Horizontal Column Joining / SQL JOIN)"]
        direction TB
        M1["Orders Table\n[OrderID, CustomerID, Total]"]
        M2["Customers Table\n[CustomerID, Name, City]"]
        M1 -. Relational Match on CustomerID .- M2
        M2 ==> M_OUT["Enriched Orders Table\n[OrderID, CustomerID, Total, Name, City]\n• Preserves Row Count\n• Expands Column Width"]
    end

    style APPEND fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style MERGE fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style A_OUT fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style M_OUT fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

| Operational Dimension | Append Queries (Vertical) | Merge Queries (Horizontal) |
| :--- | :--- | :--- |
| **SQL Relational Analog** | `UNION ALL` | `INNER JOIN`, `LEFT JOIN`, `FULL JOIN` |
| **Data Flow Direction** | Stacks rows top-to-bottom. | Appends columns side-by-side. |
| **Prerequisite Condition** | Tables share identical or similar column names. | Tables share a common key column (Primary Key / Foreign Key). |
| **Primary Use Cases** | Combining monthly sales dumps (Jan + Feb + Mar), consolidating multi-branch files. | Enriching orders with customer addresses, matching SKU codes with product catalog prices. |

---

## 📥 2. Append Queries: Vertical Stacking

### Mechanics:
- When you click **Home > Append Queries** (or **Append Queries as New**), Power Query maps columns across tables by **Exact Name Match** (case-sensitive!).
- If Column Name matches exactly, rows stack cleanly into a single column.
- If Column Name differs (e.g. `Client` in Table A vs `Customer` in Table B), Power Query creates two separate columns, placing nulls where data is absent.

```powerquery
// Combining two tables via Table.Combine
AppendedResult = Table.Combine({Table_January, Table_February, Table_March})
```

### Enterprise Folder Ingestion (`Folder.Files`):
Rather than appending 50 branch files manually, analysts use the **From Folder** connector:
1. **Data > Get Data > From File > From Folder** $\to$ select directory.
2. Click **Combine & Transform Data**.
3. Power Query creates a parameterized helper function that extracts, cleans, and auto-appends every CSV or Excel workbook in that folder automatically!
4. Whenever a new branch file is dropped into the Windows directory, clicking **Refresh All** ingests it in seconds.

---

## 🔗 3. Merge Queries: The 6 Relational Join Kinds

Clicking **Home > Merge Queries** opens the visual join interface. Selecting matching key columns and choosing the Join Kind governs the output:

```mermaid
flowchart TD
    subgraph JOINS ["The 6 Join Kinds in Power Query"]
        J1["<b>Left Outer (Default)</b><br/>All rows from 1st table; matching from 2nd."]
        J2["<b>Right Outer</b><br/>All rows from 2nd table; matching from 1st."]
        J3["<b>Full Outer</b><br/>All rows from both tables; nulls when unmatched."]
        J4["<b>Inner</b><br/>Only rows that match in both tables."]
        J5["<b>Left Anti (Audit Tool)</b><br/>Rows in 1st table that have NO match in 2nd."]
        J6["<b>Right Anti</b><br/>Rows in 2nd table that have NO match in 1st."]
    end

    style JOINS fill:#fafafa,stroke:#37474f,stroke-width:2px
    style J1 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style J4 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style J5 fill:#ffebee,stroke:#c62828,stroke-width:2px
```

### Forensic Auditing with Anti-Joins (`Left Anti`):
The **Left Anti** join is an indispensable diagnostic weapon for data analysts:
- **Business Problem**: Why did 15 customer orders fail to ship?
- **Execution**: Merge `Orders` with `Customers` using **Left Anti**.
- **Result**: Instantly isolates all orders that reference non-existent or deleted `CustomerID` values, exposing broken referential integrity in seconds!

---

## 🔍 4. Expanding vs Aggregating Merged Tables

When two tables are merged, Power Query inserts a new column containing nested `Table` objects. Clicking the dual-arrow icon on the column header presents two paths:

```mermaid
flowchart LR
    MERGED["Merged Column\n[Table Object]"] --> EXP["<b>Expand</b><br/>Extracts specific columns<br/>(e.g., Name, Category, Price)<br/>Duplicates parent rows if 1:N"]
    MERGED --> AGG["<b>Aggregate</b><br/>Calculates scalar summaries<br/>(e.g., Count of Orders, Sum of Sales)<br/>Maintains 1:1 row granularity"]

    style MERGED fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    style EXP fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style AGG fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

1. **Expand (`Table.ExpandTableColumn`)**:
   - Pulls individual fields into the main table.
   - **Warning**: If merging a 1-to-many relationship (e.g. Customers merged with Orders), expanding Order items will duplicate customer rows!
2. **Aggregate (`Table.AggregateTableColumn`)**:
   - Computes aggregations directly inside the join (e.g. `Count of Orders`, `Sum of TotalRevenue`, `Average of Rating`) without creating Cartesian row explosions.

---

## 🎛️ 5. Fuzzy Matching in Merge Queries

Transactional records frequently suffer from typos, casing variations, and minor discrepancies (e.g. `Microsoft Corporation` vs `Microsoft Corp`):
- Checking **Use fuzzy matching to perform the merge** activates text distance algorithms (Jaccard similarity).
- **Similarity Threshold**: Specify tolerance between `0.00` (matches everything) and `1.00` (exact match only). Default is `0.80`.
- **Ignore Case & Spaces**: Automatically bridges casing anomalies.
- **Transformation Table**: Connect an explicit mapping dictionary mapping abbreviations to standardized names.

---

## Related Knowledge
- Notes:
  - [[01_Power_Query_Fundamentals_and_ETL]]
  - [[02_Core_Data_Transformations]]
  - [[04_Introduction_to_M_Language_and_APIs]]
  - [[01_Dimensional_Modeling_Principles]]
- Concepts: [[Power Query]], [[ETL Process]], [[M Language]], [[Dimensional Modeling]]
- Workbook Laboratory: [`Module_7_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/07_Data_Cleaning/Module_7_Demo.xlsx)

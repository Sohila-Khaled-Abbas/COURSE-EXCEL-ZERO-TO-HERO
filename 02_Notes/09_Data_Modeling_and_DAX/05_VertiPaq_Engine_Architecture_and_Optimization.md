---
type: lesson
course: Excel Zero to Hero
module: Module 9
topic: VertiPaq Engine Architecture & DAX Optimization
status: completed
difficulty: advanced
tags:
  - vertipaq
  - storage-engine
  - formula-engine
  - compression
  - dictionary-encoding
  - rle
  - cardinality
  - performance-tuning
prerequisites:
  - "[[02_Star_Schema_and_Relationships]]"
  - "[[03_DAX_Fundamentals_Calculated_Columns_vs_Measures]]"
related_project: "[[Master Project Guidance Manual]]"
source: https://endjin.com/blog/optimising-dax-how-vertipaq-stores-your-data
created: 2026-10-01
updated: 2026-10-01
video_chapter: "Inside the VertiPaq Engine"
video_timestamp: "2:41"
video_url: "https://www.youtube.com/watch?v=85rJ-9vQBbU&t=161"
---

# Lesson 9.5: VertiPaq Engine Architecture & DAX Optimization Masterclass

> [!abstract] Architectural Mandate
> The **VertiPaq engine** is the in-memory, column-oriented analytical database engine behind Microsoft Excel Power Pivot, Power BI (Import Mode), and Analysis Services Tabular. Understanding its internal storage structures, compression algorithms, and query pipeline is the definitive difference between a spreadsheet user and a Senior BI Developer.

> 📖 **Foundational Reading**: [Optimising DAX: How VertiPaq Stores Your Data (Carmel Eve, Endjin)](https://endjin.com/blog/optimising-dax-how-vertipaq-stores-your-data)  
> 🎥 **Deep Dive Video**: [Inside the VertiPaq Engine (Marco Russo, SQLBI)](https://www.youtube.com/watch?v=85rJ-9vQBbU&t=161)

---

## 1. Physical Storage Hierarchy: The "Plus Millions" Architecture

VertiPaq organises data into a strict hierarchical memory structure:

```mermaid
flowchart TD
    DB["VertiPaq In-Memory Database\n(Active Semantic Model)"]
    DB --> T1["Table: Fact_Calls"]
    DB --> T2["Table: Dim_Date"]
    DB --> T3["Table: Dim_Agent"]

    T1 --> P1["Partition 1"]
    P1 --> S1["Segment 1 (Rows 1 to 1,000,000)"]
    P1 --> S2["Segment 2 (Rows 1,000,001 to 2,000,000)"]

    S1 --> C1["Column: Call_Id (Dictionary Encoded)"]
    S1 --> C2["Column: Date (Value/Hash Encoded)"]
    S1 --> C3["Column: Speed_of_Answer (Value Encoded + RLE)"]

    style DB fill:#1e293b,color:#fff,stroke:#0f172a,stroke-width:2px
    style T1 fill:#0284c7,color:#fff,stroke:#0369a1
    style S1 fill:#10b981,color:#fff,stroke:#059669
    style C1 fill:#f8fafc,stroke:#94a3b8
    style C2 fill:#f8fafc,stroke:#94a3b8
    style C3 fill:#f8fafc,stroke:#94a3b8
```

### The Segment Rule
* Each table partition is broken into **Segments** of **1,000,000 rows** (default size).
* Each segment is compressed and indexed independently.
* **Why Multi-Million Rows Run Fast**: Multi-threaded CPU cores scan different segments simultaneously in parallel. A 10-million-row table across 10 segments running on an 8-core CPU completes scans in fractions of a second.

---

## 2. Deep Dive: The 3 Compression & Encoding Techniques

When data is loaded into Power Pivot, VertiPaq evaluates each column independently and chooses the optimal combination of three encoding strategies:

```mermaid
flowchart LR
    A["Raw Column Data"] --> B["Step 1: Value or Hash Encoding\n(Map to Minimum Bits)"]
    B --> C["Step 2: Run-Length Encoding\n(Compress Consecutive Runs)"]
    C --> D["Step 3: Bit-Packing\n(Pack into Exact Bit-Widths)"]
    D --> E["In-Memory Column Vector"]

    style A fill:#f1f5f9,stroke:#64748b
    style B fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px
    style C fill:#fef3c7,stroke:#b45309,stroke-width:2px
    style D fill:#dcfce7,stroke:#15803d,stroke-width:2px
    style E fill:#f3e8ff,stroke:#7e22ce,stroke-width:2px
```

---

### Technique 1: Value Encoding
* **Application**: Numeric columns (integers) with a bounded mathematical range.
* **Mechanism**: VertiPaq computes the column minimum ($V_{\min}$) and subtracts it from every row ($V_{\text{stored}} = V - V_{\min}$).
* **Example**:
  - Raw column values: `[2021, 2023, 2022, 2021]`.
  - Base subtracted: `2021`.
  - Stored numbers: `[0, 2, 1, 0]`.
* **Bit Width**: To store the number `2`, VertiPaq needs only **2 bits** ($2^2 = 4 \ge 2$). Storing raw 32-bit integers would require 16 times more memory!

---

### Technique 2: Hash (Dictionary) Encoding
* **Application**: Text columns, non-integer numbers, or integers with vast gaps.
* **Mechanism**: Creates an auxiliary in-memory lookup table called the **Dictionary**, which holds each unique value once and maps it to a zero-based integer index ($0, 1, \dots, N-1$).
* **Bit Packing Calculation**:
  $$\text{Bits Per Row} = \lceil\log_2(\text{Cardinality})\rceil$$

| Distinct Values (Cardinality) | Required Bits per Row | Max Rows Compressed in 1 Byte (8 bits) |
| :---: | :---: | :---: |
| **2** (e.g. Yes/No, Gender) | **1 bit** | **8 rows** |
| **4** (e.g. Quarters) | **2 bits** | **4 rows** |
| **16** (e.g. US Regions/States) | **4 bits** | **2 rows** |
| **256** (e.g. Product Categories) | **8 bits (1 byte)** | **1 row** |
| **65,536** (e.g. Store SKU IDs) | **16 bits (2 bytes)**| **0.5 rows** |

---

### Technique 3: Run-Length Encoding (RLE)
* **Application**: Compressing repeated adjacent entries.
* **Mechanism**: Replaces consecutive runs of identical values with a single pair: `(Value, RunLength)`.
* **Example**:
  ```text
  Uncompressed Sequence: [0, 0, 0, 0, 0, 0, 1, 1, 1, 2] (10 rows)
  RLE Compressed:        (0, 6), (1, 3), (2, 1)          (3 pairs)
  ```
* **The Sort Order Impact**:
  If a 1,000,000-row table is sorted by `Region`, and "West" appears 250,000 times consecutively, VertiPaq stores that quarter of the table in a **single RLE entry** `("West", 250000)` taking just a few bytes!

---

## 3. Why Cardinality is King: The Storage Cost Formula

The total memory footprint of any column in VertiPaq is defined by:

$$\text{Memory}_{\text{Column}} = \text{Size}_{\text{Dictionary}} + \text{Size}_{\text{DataVector}} + \text{Size}_{\text{Hierarchies/Indexes}}$$

```text
High Cardinality Column (e.g., Transaction GUID or Millisecond Timestamp):
• Dictionary: 1,000,000 unique strings × 36 bytes = ~36 MB Dictionary!
• Bit-width: ceil(log2(1,000,000)) = 20 bits per row.
• RLE Efficiency: 0% (every row is unique, so run length is 1).
• Total Memory: Enormous (~40 MB for 1M rows).

Low Cardinality Column (e.g., Topic or Region):
• Dictionary: 5 unique strings × 20 bytes = 100 bytes!
• Bit-width: ceil(log2(5)) = 3 bits per row.
• RLE Efficiency: Massive (tens of thousands of rows per run).
• Total Memory: Tiny (~50 KB for 1M rows).
```

### The Top 4 Cardinality Reduction Rules:
1. **Never import raw DateTime timestamps**: Split `2021-01-15 14:23:45` into `Date` (`2021-01-15`, 90 distinct values) and `Hour` (`14`, 24 distinct values).
2. **Never import surrogate transactional GUIDs**: If a column like `Transaction_UUID` is not needed for a relationship or UI drill-through, delete it in Power Query!
3. **Round currency and float values**: Round amounts to 2 decimal places to eliminate unique floating-point variations.
4. **Group low-frequency categories**: Consolidate minor categories into an `"Other"` bucket in Power Query.

---

## 4. Dual Engine Performance Tuning: FE vs SE

```mermaid
flowchart TD
    Q["Incoming DAX Query"] --> FE["Formula Engine (FE)\n• Single-Threaded\n• Query Plan & Tree Parser\n• Handles Iterators (SUMX, FILTER)\n• Coordinates Context Transition"]
    
    FE -- "xmSQL Query Batch" --> SE["Storage Engine (SE / VertiPaq)\n• Multi-Threaded Parallel Execution\n• Direct In-Memory Column Scans\n• Hash Joins across Relationships\n• Simple Aggregations (SUM, MIN, MAX)"]
    
    SE -- "Compressed Datacache" --> FE
    FE --> RES["Final Formatted Visual Output"]

    style Q fill:#f8fafc,stroke:#64748b
    style FE fill:#dbeafe,stroke:#1d4ed8,stroke-width:2px
    style SE fill:#dcfce7,stroke:#15803d,stroke-width:2px
    style RES fill:#faf5ff,stroke:#7e22ce,stroke-width:2px
```

### The "Materialization Trap" & How to Avoid It
* **The Goal**: Keep query execution in the Storage Engine (SE) for >90% of total query duration.
* **The Danger**: When a measure uses complex, row-by-row iterators over un-indexed cross-table expressions, the Storage Engine cannot aggregate the data. It must **materialize** the entire uncompressed dataset into temporary RAM and hand it off to the single-threaded Formula Engine (FE).
* **Symptoms**:
  - High query latency (5–30 seconds for a simple visual).
  - CPU utilization drops to a single core while memory spikes.
* **Solution**:
  - Use simple aggregations (`SUM`, `COUNTROWS`) inside explicit measures.
  - Rely on relationship-driven filter context rather than manually filtering entire tables with `FILTER(ALL(Table), ...)`.

---

## 5. Architectural Summary: BI Developer Checklist

| Checkpoint | Target State | Anti-Pattern |
| :--- | :--- | :--- |
| **Data Topology** | Pure **Star Schema** (Fact $\to$ Dim 1-hop) | Wide flat tables or Snowflake chains |
| **Calculations** | **Explicit DAX Measures** for all values | Calculated columns on large fact tables |
| **Cardinality** | Low distinct counts; Split Date/Time | Combined timestamps with seconds/GUIDs |
| **Division** | `DIVIDE(Num, Denom, 0)` | Raw slash arithmetic (`Num / Denom`) |
| **Relationships** | Single 1-to-Many (`1:*`) unidirectional | Many-to-Many (`*:*`) or Bi-directional cross-filtering |

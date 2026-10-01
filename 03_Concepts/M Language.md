---
type: concept
category: etl
aliases: [M Language, Power Query Formula Language, M Code]
tags: [excel, concept, m-language, power-query, etl, functional-programming, mindmap]
difficulty: advanced
status: mastered
related_lessons: ["[[01_Power_Query_Fundamentals_and_ETL]]", "[[04_Introduction_to_M_Language_and_APIs]]"]
related_project: "[[Call Center Performance Analysis]]"
created: 2026-09-28
updated: 2026-10-01
---

# Concept: M Language (Power Query Formula Language)

> [!summary] Definition & Mental Model
> The **M Language** (formally the *Power Query Formula Language*) is Microsoft's functional, case-sensitive, declarative mashup programming language that executes every transformation inside Power Query. Structured within immutable **`let ... in`** dependency blocks, M treats data transformations as pure mathematical evaluations without mutating state or procedurally looping. It supports primitive types, lists, records, and tables, enabling analysts to inspect, modify, and build custom connectors in the **Advanced Editor**.

---

## 🧠 Curriculum Mindmap Integration

```mermaid
flowchart LR
    M8["8-Power Query & M Language"]

    subgraph M_BRANCH ["M Formula Language"]
        direction TB
        ML["M Language"]
        OV["Overview\n• Functional Declarative Paradigm\n• Case-Sensitive Execution\n• let ... in Dependency Block\n• Core Containers: Lists, Records, Tables\n• Advanced Editor & Formula Bar\n• REST APIs & Web Scraping"]
        ML --> OV
    end

    M8 ==> ML

    style M8 fill:#f3e5f5,stroke:#7b1fa2,stroke-width:3px
    style ML fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style OV fill:#ede7f6,stroke:#4527a0,stroke-width:2px
```

```text
8-Power Query & M Language
└── M Language
    └── Overview
        ├── Functional Declarative Paradigm
        ├── Case-Sensitive Syntax
        ├── The let ... in Dependency Block
        ├── Primitives & Structured Containers (List, Record, Table)
        └── Advanced Editor & Custom Connectors
```

---

## 🧱 1. The `let ... in` Structural Syntax

Every M query evaluates an ordered sequence of named immutable expressions defined in a `let` block, concluding with an expression defined in the `in` block:

```powerquery
let
    // 1. Ingest CSV file
    Source = Csv.Document(File.Contents("D:\Data\Sales.csv"), [Delimiter=","]),
    
    // 2. Promote first row to headers
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    
    // 3. Enforce strong data types
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{
        {"OrderID", Int64.Type}, 
        {"Revenue", type number}, 
        {"Date", type date}
    }),
    
    // 4. Filter rows with revenue above threshold
    #"Filtered Rows" = Table.SelectRows(#"Changed Type", each [Revenue] >= 500)
in
    // Return final transformed table
    #"Filtered Rows"
```

### Essential Syntax Rules:
1. **Case-Sensitivity**: Every function name is case-sensitive (`Table.SelectRows` works; `table.selectrows` errors).
2. **Trailing Commas**: Every step inside the `let` block must end with a comma, **except** the step immediately preceding `in`.
3. **Quoted Identifiers**: Step names with spaces or symbols must be enclosed in hash-quotes: `#"Changed Type"`.

---

## 🗃️ 2. Core Data Containers: Lists, Records, and Tables

```mermaid
flowchart TD
    subgraph CONTAINERS ["The 3 Structural Containers in M"]
        L["<b>1. List: { ... }</b><br/>Ordered 0-indexed array<br/>Example: {1, 2, 3, 'USD'}"]
        R["<b>2. Record: [ ... ]</b><br/>Key-value dictionary (row)<br/>Example: [ID=101, Name='Sarah']"]
        T["<b>3. Table: #table( )</b><br/>2D grid of typed rows and columns<br/>Example: Table.FromRecords({R1, R2})"]
    end

    L --> T
    R --> T

    style CONTAINERS fill:#fafafa,stroke:#37474f,stroke-width:2px
    style L fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style R fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style T fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

| Container | Delimiters | Indexing & Access | Code Example |
| :--- | :---: | :--- | :--- |
| **List** | `{ ... }` | 0-indexed: `MyList{0}` | `Fruits = {"Apple", "Banana", "Cherry"}` |
| **Record** | `[ ... ]` | Field name: `MyRecord[FieldName]` | `Employee = [ID = 205, Name = "Diane", Dept = "Support"]` |
| **Table** | `#table(...)` | Cell selector: `MyTable{rowIndex}[colName]` | `#table({"ID", "Value"}, {{1, 100}, {2, 200}})` |

---

## 🌐 3. Live Enterprise Ingestion Connectors in M

M functions provide direct native connectors across enterprise storage protocols:

| Connector Function | Protocol / Target | Course Lab Case Study |
| :--- | :--- | :--- |
| `Csv.Document()` | Delimited flat text files | `Hotel Reservations.csv` & `Sample_ Superstore.csv` |
| `Excel.Workbook()` | External spreadsheet workbooks | `01 Call-Center-Dataset.xlsx` (PwC Switzerland) |
| `Json.Document()` | Web APIs and document streams | `People` register & live Exchange Rate FX API |
| `Xml.Tables()` | Hierarchical XML documents | `Product` catalog (AdventureWorks parts) |
| `Sql.Database()` | Relational RDBMS pushdown | `Query1` on local `AdventureWorks2022` instance |
| `Web.BrowserContents()` | Headless browser DOM rendering | Arabic Wikipedia (`التركيبة السكانية في مصر`) |
| `Html.Table()` | CSS selector table scraping | Demographic tables `Table 15`–`Table 19` |

---

## 🔗 Related Knowledge
- Lessons:
  - [[01_Power_Query_Fundamentals_and_ETL|Lesson 8.1: Power Query Fundamentals & ETL Architecture]]
  - [[04_Introduction_to_M_Language_and_APIs|Lesson 8.4: M Language Architecture & API Ingestion]]
- Concepts: [[Power Query]], [[ETL Process]], [[Data Cleaning]], [[Dimensional Modeling]]
- Course Reference: 
  - [[Module 7 Dataset Documentation]]
  - [[Module 8 Dataset Documentation]]

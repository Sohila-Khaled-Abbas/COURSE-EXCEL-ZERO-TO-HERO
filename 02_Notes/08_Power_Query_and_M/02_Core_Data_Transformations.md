---
type: lesson
course: Excel Zero to Hero
module: "Module 8"
topic: "Core Data Transformations in Power Query"
status: completed
difficulty: intermediate
tags: [excel, lesson, power-query, unpivot, transformations, data-cleaning, data-typing]
prerequisites: ["[[01_Power_Query_Fundamentals_and_ETL]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-10-01
video_chapter: "Chapter 8 – Power Query & M Language"
video_timestamp: "4:20:30"
video_url: "https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s"
---

# Lesson 8.2: Core Power Query Transformations: Unpivoting, Splitting & Data Typing

> [!abstract] Learning Objective
> Execute essential data shaping transformations inside the Power Query Editor. Master the **Unpivot Columns** operation to convert human-readable wide reports into database-ready tall tables, split complex text fields, enforce strict data typing contracts, and perform automated row/column sanitization.

> 🎥 **Video Chapter**: [Chapter 8 – Power Query & M Language (4:20:30)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s)

---

## 🔄 1. The Architectural Shift: Wide vs Tall Tabular Formats

In enterprise organizations, human stakeholders format monthly reports as **Wide Cross-Tabulations** (e.g. products down the rows, and calendar months spread across twelve horizontal columns). While pleasant for human reading, wide tables break relational database engines, dynamic filtering, and PivotTable aggregations!

```mermaid
flowchart TD
    subgraph WIDE ["Wide Format (Human Layout — Unsuitable for Analytics)"]
        W_T["Product | Jan | Feb | Mar | Apr ... Dec\n---------------------------------------------\nLaptop  | 100 | 120 | 140 | 110 ... 190\nPhone   |  80 |  95 |  85 |  90 ... 130"]
    end

    subgraph UNPIVOT ["Power Query Engine: Table.UnpivotOtherColumns()"]
        OP["Select Dimension Columns (Product)\nRight-Click > 'Unpivot Other Columns'"]
    end

    subgraph TALL ["Tall Format (Database Normalized — Analytical Ready)"]
        T_T["Product | Attribute (Month) | Value (Sales)\n-----------------------------------------\nLaptop  | Jan               | 100\nLaptop  | Feb               | 120\nLaptop  | Mar               | 140\nPhone   | Jan               |  80\nPhone   | Feb               |  95"]
    end

    WIDE ==> UNPIVOT ==> TALL

    style WIDE fill:#ffebee,stroke:#c62828,stroke-width:2px
    style UNPIVOT fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style TALL fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

### The Three Unpivot Operations Compared:

| Unpivot Command | Ribbon Navigation | When to Use & Behavioral Mechanics |
| :--- | :--- | :--- |
| **Unpivot Other Columns** *(Recommended)* | Select fixed key columns $\to$ **Transform > Unpivot Other Columns** | **Dynamic Ingestion (Best Practice)**.<br/>If new calendar months (e.g., `Nov`, `Dec`) are appended to the raw Excel report next quarter, this command automatically captures them into the tall table without modifying M code! |
| **Unpivot Columns** | Select monthly columns $\to$ **Transform > Unpivot Columns** | Transforms *only* the currently selected columns. If new columns appear in source files, they will be ignored and dropped from unpivoting. |
| **Unpivot Only Selected Columns** | Select specific metric columns $\to$ **Transform > Unpivot Only Selected** | Strictly confines unpivoting to the selected subset, leaving all other columns untouched. |

---

## 🔤 2. Text Splitting & Extraction Patterns

Raw transactional systems frequently bundle multiple discrete data attributes into a single delimited text string (e.g. `US-2024-10023` or `John Doe <john@company.com>`):

```mermaid
flowchart LR
    RAW["Raw Composite String:\n'CA-2024-152156'"] --> SPLIT["Table.SplitColumn(..., Delimiter='-')"]
    SPLIT --> C1["Country Code:\n'CA'"]
    SPLIT --> C2["Order Year:\n'2024'"]
    SPLIT --> C3["Serial Number:\n'152156'"]

    style RAW fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style SPLIT fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style C1 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style C2 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style C3 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

### Power Query Splitting Modalities:
1. **Split by Delimiter**:
   - Split at *Left-most*, *Right-most*, or *Each occurrence* of delimiters (Comma, Space, Hyphen, Semicolon, Custom character).
   - In M: `Table.SplitColumn(Source, "OrderID", Splitter.SplitTextByDelimiter("-", QuoteStyle.Csv), {"Country", "Year", "Serial"})`
2. **Split by Number of Characters**:
   - Splits fixed-width text streams (e.g. first 2 characters for state code, next 8 for account number).
3. **Split by Positions**:
   - Explicit 0-based character offsets: `0, 2, 6, 12`.
4. **Split by Transition**:
   - `Non-Digit to Digit` (e.g., converts `SKU450` into `SKU` and `450`).
   - `Lowercase to Uppercase` (e.g., camelCase parser converting `salesRevenue` into `sales` and `Revenue`).

---

## 🏷️ 3. Strict Data Type Enforcement & Locale Handling

Power Query enforces strict, strongly typed data contracts across all columns:

```mermaid
flowchart TD
    RAW_IN["Raw Untyped Stream (Strings)"] --> CAST["Table.TransformColumnTypes()"]
    
    CAST --> T_INT["Int64.Type (123)\nIDs, Counts, Quantities"]
    CAST --> T_DEC["type number (1.2)\nFinancial Decimals, Percentages"]
    CAST --> T_CURR["Currency.Type ($)\nFixed 4-decimal currency"]
    CAST --> T_DATE["type date (📅)\nStrict calendar dates"]
    CAST --> T_TXT["type text (ABC)\nNames, Descriptions, Codes"]

    style RAW_IN fill:#ffebee,stroke:#c62828,stroke-width:2px
    style CAST fill:#fff8e1,stroke:#f57f17,stroke-width:2px
    style T_INT fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style T_DEC fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style T_CURR fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style T_DATE fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
    style T_TXT fill:#ede7f6,stroke:#4527a0,stroke-width:2px
```

### The Regional Locale Pitfall (`Using Locale...`):
- In the United States: `1,250.50` (Comma = thousand separator, Period = decimal). Date: `MM/DD/YYYY`.
- In Continental Europe: `1.250,50` (Period = thousand separator, Comma = decimal). Date: `DD/MM/YYYY`.
- **The Error**: Casting European dates or numbers on an English OS converts values to errors or flips days and months (`03/04/2024` flips from March 4 to April 3)!
- **The Solution**: Right-click column $\to$ **Change Type > Using Locale...** $\to$ select target data type and explicit source country locale (e.g. `English (United Kingdom)` or `German (Germany)`).
- **Generated M Code**:
  ```powerquery
  #"Changed Type with Locale" = Table.TransformColumnTypes(#"PreviousStep", {{"OrderDate", type date}}, "en-GB")
  ```

---

## 🧹 4. Automated Row & Column Hygiene

### 1. Removing Blank & Corrupted Records:
- **`Remove Blank Rows`**: Purges completely blank rows created by worksheet padding.
- **`Remove Errors`**: Purges rows containing conversion failures (e.g. `#VALUE!` from bad dates).
- **`Remove Duplicates`**: Select key columns (e.g., `Booking_ID` or `CustomerID`) $\to$ right-click $\to$ **Remove Duplicates** to enforce 100% uniqueness.

### 2. Derived Columns: Visual vs Expression
- **Conditional Columns**: Visual rule wizard (e.g., `IF [Speed of answer] <= 20 THEN "Within SLA" ELSE "Breached SLA"`).
- **Custom Column (M Code)**: Direct calculations:
  ```powerquery
  = if [booking_status] = "Canceled" then [avg_price_per_room] * 0.20 else 0
  ```
- **Column From Examples**: Type desired output strings (e.g., extracting first names from emails) and Power Query infers the transformation pattern automatically.

---

## Related Knowledge
- Notes:
  - [[01_Power_Query_Fundamentals_and_ETL]]
  - [[03_Combining_Data_Append_and_Merge]]
  - [[04_Introduction_to_M_Language_and_APIs]]
  - [[02_Data_Cleaning_Techniques_in_Excel]]
- Concepts: [[Power Query]], [[Data Cleaning]], [[ETL Process]], [[M Language]]
- Workbook Laboratory: [`Module_7_Demo.xlsx`](file:///d:/courses/Data%20Analysis%2026-27/7-Introducation%20to%20Data%20Fields%20(Excel)/11_Demos_and_Workbooks/07_Data_Cleaning/Module_7_Demo.xlsx)

---
type: map-of-content
aliases:
  - Course Map
  - MOC
  - Knowledge Graph
tags:
  - excel
  - moc
  - knowledge-graph
created: 2026-09-28
updated: 2026-09-28
---

# 🗺️ Master Course Map of Content (MOC)

> [!abstract] Global Knowledge Graph
> Visual and structured Map of Content linking core modules, atomic concepts, formulas, and capstone analytics projects.

```mermaid
flowchart TD
    subgraph Fundamentals ["🌱 Phase 1: Core Foundations"]
        direction LR
        GUI["<b>Excel Interface</b><br/>Ribbon & Grid Navigation"]
        MGMT["<b>Data Management</b><br/>Data Types & Formatting"]
        VAL["<b>Data Validation</b><br/>Input Rules & Dropdowns"]
        GUI --> MGMT --> VAL
    end

    subgraph Logic ["⚡ Phase 2: Formulas & Calculation Engine"]
        direction LR
        REF["<b>Referencing</b><br/>Relative vs Absolute ($)"]
        MATH["<b>Aggregations</b><br/>SUM, COUNT, AVERAGE"]
        COND["<b>Logic & Decisions</b><br/>IF, IFS, IFERROR"]
        LOOK["<b>Modern Lookups</b><br/>XLOOKUP & INDEX/MATCH"]
        REF --> MATH --> COND --> LOOK
    end

    subgraph Structure ["🧱 Phase 3: Tables & Dynamic Summaries"]
        direction LR
        TBL["<b>Excel Tables</b><br/>ListObjects Architecture"]
        STR["<b>Structured References</b><br/>[@Column] & Headers"]
        PIV["<b>Pivot Tables</b><br/>Multi-Dimensional Grids"]
        SLC["<b>Slicers & Timelines</b><br/>Interactive Filtering"]
        TBL --> STR --> PIV --> SLC
    end

    subgraph DataEngineering ["🔄 Phase 4: Data Quality & Power Query ETL"]
        direction LR
        DQ["<b>Data Quality</b><br/>6 Dimensions & Audit"]
        CLN["<b>Data Cleaning</b><br/>Flash Fill & Text Split"]
        PQ["<b>Power Query ETL</b><br/>Extract, Transform, Load"]
        M["<b>M Language</b><br/>Applied Steps Pipeline"]
        DQ --> CLN --> PQ --> M
    end

    subgraph BI ["🧠 Phase 5: Dimensional Modeling & DAX"]
        direction LR
        DM["<b>Dimensional Modeling</b><br/>Star & Snowflake Schemas"]
        FACT["<b>Fact & Dimension</b><br/>1-to-Many Relationships"]
        DAX["<b>DAX Measures</b><br/>CALCULATE & Time Intelligence"]
        DM --> FACT --> DAX
    end

    subgraph Projects ["🚀 Phase 6: Production Analytics Projects"]
        direction LR
        HOTEL["<b>Hotel Reservation</b><br/>36K Bookings & Cancellations"]
        PWC["<b>PwC Call Center</b><br/>5K Calls Operational BI"]
        HOTEL --> PWC
    end

    subgraph AIAssisted ["🤖 Phase 7: AI-Augmented Analytics"]
        direction LR
        AIMOC["<b>AI for Analysts</b><br/>Capabilities & Boundaries"]
        AIWORKFLOW["<b>14-Step AI Workflow</b><br/>Prompting & Verification"]
        AIMOC --> AIWORKFLOW
    end

    PORT["<b>⭐ Executive Portfolio Showcase</b><br/>PwC Call Center Case Study Ready for Recruiters"]

    Fundamentals ==> Logic
    Logic ==> Structure
    Structure ==> DataEngineering
    DataEngineering ==> BI
    BI ==> Projects
    Structure -.->|Ad-Hoc Analysis| Projects
    Projects ==> PORT
    AIAssisted ==> PORT
```

---

## 📚 Direct Topic Navigation

### 1. Core Modules
- **[[01_Excel_Interface_and_GUI|Module 1: Excel Interface & Data Analytics Overview]]**
- **[[01_Data_Types_and_Formatting|Module 2: Data Management, Types, & Shortcuts]]**
- **[[01_Formula_Basics_and_Cell_Referencing|Module 3: Formulas, Functions, & Referencing]]**
- **[[01_Excel_Tables_Architecture|Module 4: Excel Tables & Structured References]]**
- **[[01_Pivot_Table_Foundations|Module 5: Pivot Tables & Multi-Dimensional Aggregation]]**
- **[[01_Visual_Analytics_and_Chart_Selection|Module 6: Data Analysis Charts & Visual Hierarchy]]**
- **[[01_Data_Quality_Dimensions_and_Audit|Module 7: Data Quality, Cleaning & Enterprise Sources]]**
- **[[01_Power_Query_Fundamentals_and_ETL|Module 8: Power Query, Data Pipelines & M Language]]**
- **[[01_Dimensional_Modeling_Principles|Module 9: Data Modeling, Power Pivot & DAX]]**

### 2. Standalone Concept Notes
- [[Excel Tables]] | [[Structured References]] | [[Relative vs Absolute References]] | [[Conditional Formatting]]
- [[VLOOKUP vs XLOOKUP]] | [[INDEX and MATCH]] | [[Pivot Tables]] | [[Slicers and Timelines]]
- [[Data Cleaning]] | [[Six Dimensions of Data Quality]] | [[Power Query]] | [[ETL Process]] | [[M Language]]
- [[Dimensional Modeling]] | [[Star Schema vs Snowflake Schema]] | [[Fact vs Dimension Tables]]
- [[Data Analysis Expressions (DAX)]] | [[Calculated Columns vs DAX Measures]] | [[Dashboard Design Principles]] | [[Chart Selection Matrix]] | [[Data Analysis Life Cycle]]
- [[Human Skill vs AI Assistance]] | [[AI for Data Analysts MOC]]

### 3. Key Projects
- 🏨 [[Hotel Reservation Analysis]]: 36,000+ booking records, cancellation trends, RevPAR, ADR, channel performance.
- 📞 [[Call Center Performance Analysis]]: 5,000 PwC customer service calls, CSAT, Speed of Answer, Agent Scorecard.
- 🤖 [[06_Projects/Call Center Performance Analysis/AI-Assisted Analysis Workflow|Call Center AI Workflow]]: Audit matrix of automated, AI-assisted, and manually verified tasks.

### 4. AI-Assisted Excel Track
- 🧭 **[[AI for Data Analysts MOC]]**: Master map of content for AI tools, prompts, verification, and practice.
- 🛠️ **[[AI for Excel Overview]]** | **[[GPT for MS Excel — Twistly]]** | **[[Claude for Excel — Anthropic]]** | **[[AI Tool Comparison]]**
- 📋 **[[AI Excel Installation Guide]]** | **[[AI Excel Workflow]]** | **[[AI Excel Prompt Library]]** | **[[AI Output Verification]]** | **[[AI Excel Security and Privacy]]**
- 🧪 **[[05_Practice/AI Assisted Excel/]]**: 10 progressive practice exercises & [[AI Experiment Log]].

---

## 🌐 Interactive Online Mindmaps & Architecture Blueprints
- 🧠 **Interactive Course Mindmap (MindMeister)**: [Open Live MindMeister Course Map](https://www.mindmeister.com/app/map/3782166881?t=I9gXHbkAlV)
- 🗺️ **Enterprise Architecture Topology**: [[Enterprise Architecture Mindmap|Enterprise Architecture Mindmap (Infographic)]]
- 🔍 **Data Quality Audit Flow**: [[Data Quality Framework Mind Map|Data Quality Framework Visual Mind Map]]
- 📖 **Data Quality Essentials**: [[Data Quality Essentials Guide|Data Quality Essentials Guide (Infographic)]]
- 📄 **Excel GUI Blueprint**: [[Excel Interface Blueprint|Excel Interface Blueprint (PDF Manual)]]
- 🎥 **Navigation Video**: [[Excel Navigation and Setup Video Guide|Excel Navigation and Setup Video Walkthrough]]



---
type: lesson
course: Excel Zero to Hero
module: Module 10
topic: CV Portfolio Project Architecture
status: completed
difficulty: advanced
tags:
  - portfolio
  - cv-project
  - power-pivot
  - power-query
  - dax
  - vba
  - vertipaq
  - pwc-switzerland
prerequisites:
  - "[[01_Message_for_Future_Students_and_Mindset]]"
  - "[[05_VertiPaq_Engine_Architecture_and_Optimization]]"
related_project: "[[Master Project Guidance Manual]]"
created: 2026-10-01
updated: 2026-10-01
---

# Module 10.2: CV Portfolio Project Architecture: The 7 Pillars of a Standout Capstone

> [!abstract] Architectural Objective
> Build a production-grade enterprise business intelligence capstone designed to impress hiring managers, recruiters, and technical leads. This note codifies the **7 Pillars of a Standout CV Project** and outlines the unified multi-fact **Galaxy / Constellation Semantic Model** powering the PwC Switzerland case simulation.

---

## 1. The 7 Pillars of a Standout CV Project

To prove true enterprise readiness, your portfolio project must demonstrate mastery across all 7 layers of modern business intelligence:

```mermaid
flowchart TD
    P1["1. Scale: Handling Data (+100K to Millions of Rows)\n• Performance under real-world data volumes\n• Sub-second query response times"]
    P2["2. ETL: Power Query & M Language\n• 'The Kitchen' — Automated ingestion pipeline\n• Data typing, null triage, feature extraction"]
    P3["3. Model: Power Pivot & VertiPaq Engine\n• Star Schema dimensional topology\n• In-memory columnar storage & dictionary compression"]
    P4["4. Analytics: Pivot Tables & Visual Insights\n• Multi-dimensional slicing & exploratory analytics\n• Agent Performance Quadrants & Pareto distributions"]
    P5["5. Interactivity: Slicers & Timelines\n• Synchronized report connections across multiple views\n• Cross-filtering without workbook lag"]
    P6["6. Automation: Modular VBA Application Controller\n• Fail-safe application state protection (Freeze/Restore)\n• View switching, filter reset, synchronous refresh, PDF export"]
    P7["7. UI/UX: Attractive Executive Design\n• Fixed-canvas web app layout (1080p optimized)\n• Semantic color palette (Dark Navy, Off-White, Alert Coral)"]

    P1 --> P2 --> P3 --> P4 --> P5 --> P6 --> P7

    style P1 fill:#eff6ff,stroke:#1d4ed8,stroke-width:2px
    style P2 fill:#f0fdf4,stroke:#15803d,stroke-width:2px
    style P3 fill:#fefce8,stroke:#a16207,stroke-width:2px
    style P4 fill:#faf5ff,stroke:#7e22ce,stroke-width:2px
    style P5 fill:#fff1f2,stroke:#be123c,stroke-width:2px
    style P6 fill:#f8fafc,stroke:#334155,stroke-width:2px
    style P7 fill:#f0fdfa,stroke:#0f766e,stroke-width:2px
```

---

## 2. Enterprise Unified Semantic Model: The PwC Tripartite Suite

Rather than presenting isolated, disjointed spreadsheets, our capstone unifies the **PwC Switzerland Virtual Case Experience** into a single **Power Pivot In-Memory Semantic Model** powered by the **VertiPaq Engine**:

```mermaid
flowchart TD
    subgraph VertiPaq ["Power Pivot In-Memory Semantic Model (VertiPaq Engine)"]
        direction TB
        
        subgraph Sub1 ["Sub-Model 1: Call Center Performance (Task 1)"]
            DimDate["DimDate\n(90 Days, Calendar Features)"]
            DimAgent["DimAgent\n(8 Agents, Targets)"]
            DimTopic["DimTopic\n(5 Inquiries, SLA Targets)"]
            FactCalls["Fact_Calls\n(5,000 Inbound Rows)"]

            DimDate -->|1 : *| FactCalls
            DimAgent -->|1 : *| FactCalls
            DimTopic -->|1 : *| FactCalls
        end

        subgraph Sub2 ["Sub-Model 2: Customer Retention & Churn (Task 2)"]
            DimContract["DimContract\n(Contract Types & Tenures)"]
            FactChurn["Fact_Churn\n(7,043 Customer Records)"]

            DimContract -->|1 : *| FactChurn
        end

        subgraph Sub3 ["Sub-Model 3: Diversity & Inclusion (Task 3)"]
            DimDept["DimDepartment\n(Corporate Departments)"]
            FactEmployees["Fact_Employees\n(500 Corporate Records)"]

            DimDept -->|1 : *| FactEmployees
        end
    end

    style VertiPaq fill:#fffbeb,stroke:#d97706,stroke-width:3px
    style Sub1 fill:#eff6ff,stroke:#2563eb,stroke-width:2px
    style Sub2 fill:#fff7ed,stroke:#ea580c,stroke-width:2px
    style Sub3 fill:#f0fdf4,stroke:#16a34a,stroke-width:2px
```

### Dataset Ground Truth Reconciled:
* **`Fact_Calls`**: 5,000 interactions spanning Jan 1 – Mar 31, 2021. Filtered by `DimDate`, `DimAgent`, and `DimTopic`.
* **`Fact_Churn`**: 7,043 telecom accounts evaluating customer retention elasticity, fiber-optic dissatisfaction, and monthly charge variance. Filtered by `DimContract`.
* **`Fact_Employees`**: 500 corporate personnel evaluating executive gender balance, promotion velocity, and retention at Pharma Group AG. Filtered by `DimDepartment`.

---

## 3. How to Present and Defend This Project in Interviews

When interviewing for Senior Data Analyst, BI Developer, or Analytics Engineer roles, structure your project defense around these key talking points:

### 1. The Architectural Choice: "Why Power Pivot and Star Schema instead of VLOOKUP?"
> *"Instead of creating a sluggish 30-column flat table using formulas that recalculate on every cell change, I architected a Kimball Star Schema inside Excel Power Pivot's VertiPaq engine. This allowed me to leverage dictionary encoding, bit-packing, and Run-Length Encoding (RLE) to achieve sub-second aggregations while consuming near-zero memory for calculations via explicit DAX measures."*

### 2. The Data Quality Breakthrough: "How did you handle the 946 null values?"
> *"A forensic cross-tabulation of the 5,000 call records revealed that the 946 missing wait times and CSAT ratings were strictly correlated with `Answered == 'N'`. These were operational nulls representing caller abandonment in queue. Treating them as errors and imputing zero would have artificially skewed average wait times by 19%. I preserved these nulls in Power Query and designed explicit DAX measures using `DIVIDE` and `CALCULATE` to correctly isolate operational answer rates from customer satisfaction scores."*

### 3. The Business Impact: "What operational recommendations did you deliver to Claire?"
> *"By mapping agents across a 2D Performance Quadrant (Handle Time vs Calls Answered), I discovered that queue abandonment peaks occurred between 11 AM and 2 PM due to concurrent staff lunch breaks. I recommended staggered scheduling, pairing low-CSAT agents with high-CSAT mentors like Martha, and implementing an automated IVR callback option to reclaim lost demand."*

---

## 4. Related Knowledge & Implementation Files
* [[Master Project Guidance Manual]] — Complete step-by-step implementation guide.
* [[05_VertiPaq_Engine_Architecture_and_Optimization]] — In-depth guide to VertiPaq memory optimization.

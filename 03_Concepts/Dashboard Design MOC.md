---
type: concept-moc
concept: Dashboard Design & Analytics Engineering
status: completed
created: 2026-10-01
updated: 2026-10-01
tags: [moc, dashboard-design, excel-ui-ux, data-visualization, vba-automation, power-pivot, dax]
---

# 🗺️ Dashboard Design & Analytics Engineering MOC

> [!abstract] Map of Content (MOC)
> This Map of Content serves as the central knowledge hub for architecting **professional, UI/UX-oriented Excel analytics applications**. Rather than treating spreadsheets as passive grids of numbers and charts, this domain operationalizes the complete engineering pipeline from raw enterprise ingestion to executive web-application shell interfaces.

---

## 🏛️ The Analytics Application Pipeline

```mermaid
flowchart TD
    RAW["Raw Data Layer\n(CSV, Excel, SQL, Web)"] --> PQ["Data Preparation Layer\n(Power Query & M Engine)"]
    PQ --> DM["Data Model Layer\n(Star Schema & Power Pivot)"]
    DM --> BL["Business Logic Layer\n(Explicit DAX Measures)"]
    BL --> KPI["KPI & Staging Layer\n(Decoupled Metric Feeds)"]
    KPI --> INT["Interaction Layer\n(Slicers, Dynamic Arrays, VBA)"]
    INT --> UI["UI / UX Layer\n(8pt Grid, Design System, Tokens)"]
    UI --> UX["Executive User Experience\n(Actionable Decision Making)"]

    style RAW fill:#f5f5f5,stroke:#757575,stroke-width:1px
    style PQ fill:#e3f2fd,stroke:#1565c0,stroke-width:1px
    style DM fill:#fff3e0,stroke:#ef6c00,stroke-width:1px
    style BL fill:#f3e5f5,stroke:#7b1fa2,stroke-width:1px
    style KPI fill:#ede7f6,stroke:#512da8,stroke-width:1px
    style INT fill:#e0f2f1,stroke:#00695c,stroke-width:1px
    style UI fill:#fbe9e7,stroke:#d84315,stroke-width:1px
    style UX fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

---

## 📚 Core Atomic Knowledge Concepts

| Concept Note | Core Focus & Theoretical Foundation | Key Techniques Covered |
| :--- | :--- | :--- |
| **[[Dashboard UI UX Principles]]** | Human-computer interaction (HCI), ergonomics, cognitive load | The decision loop, 8pt spatial grid, visual hierarchy |
| **[[Excel Dashboard Architecture]]** | Multi-tier application architecture inside Excel | Decoupled staging, web-app shell, container models |
| **[[KPI Design]]** | Metric governance and business definition standards | 11-field specification, explicit DAX vs implicit pivots |
| **[[Excel Visualization Principles]]** | Visual storytelling, cognitive ergonomics (Tufte, Few) | Question-to-visual framework, decluttering, chart selection |
| **[[Interactive Excel Dashboards]]** | Cross-filtering mechanics and interface controls | SlicerCaches, domain-scoped isolation, active breadcrumbs |
| **[[Dynamic Excel Techniques]]** | Modern calculation engines and resilient formatting | Dynamic arrays, LET/LAMBDA, CUBE formulas, custom masks |
| **[[Excel Performance Optimization]]** | Computational efficiency and memory management | VertiPaq compression, volatile function audit, calculation tree |
| **[[Advanced VBA for Dashboards]]** | Minimal, robust automation and view orchestration | `modAppState`, safe navigation, refresh coordination, PDF export |

---

## 💼 Flagship Implementation & Portfolio Assets

- 🏢 **PwC Digital Transformation Suite**:
  - 🏗️ [[Dashboard Architecture Assessment]] — Forensic audit of legacy workbooks & multi-dataset target architecture.
  - 📱 [[Dashboard UX Specification]] — Product design spec for Claire, David Chen, and Dr. Helena Weber.
  - 📖 [[KPI Dictionary]] — 38 explicit DAX measures across Call Center, Retention, and D&I.
  - 🎨 [[Dashboard Design System]] — PwC Corporate palette, typography scale, 8pt grid tokens.
  - 📐 [[Dashboard Wireframe]] — ASCII blueprints and exact grid coordinates for Portal and modules.
  - 📊 [[Dashboard Visualization Guide]] — Visual decision matrix and anti-pattern catalog.
  - 🤖 [[VBA Architecture]] — Modular production codebase (`modNavigation`, `modFilterController`, `modDataRefresh`).
  - ⚡ [[Excel Dashboard Performance]] — Memory benchmarks and the 7 golden performance rules.
  - ✅ [[Dashboard Testing Checklist]] — 32-point verification test suite.
  - 💼 [[Excel Dashboard Case Study]] — Master portfolio write-up for recruiters.

---

## 🔗 Related Curriculum Nodes
- 📊 [[Dashboard Design Principles]] — Foundations of executive dashboard ergonomics.
- 📐 [[Data Analysis Expressions (DAX)]] — The VertiPaq formula language.
- 🗄️ [[Dimensional Modeling]] — Fact and dimension table architectures.
- ⚡ [[Power Query]] — Automated repeatable ETL workflows.

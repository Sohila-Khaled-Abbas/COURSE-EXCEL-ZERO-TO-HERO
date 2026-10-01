---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Project Retrospective & Galaxy Lessons Learned
description: Engineering retrospective, VertiPaq optimizations, and Digital Accelerator competencies across all 3 datasets
---

# 9. Project Retrospective & Digital Accelerator Competencies

> [!abstract] Engineering Retrospective & Strategic Value Delivery
> Delivering the **PwC Switzerland Digital Transformation Suite** demonstrates the evolution of a modern analytics engineer: moving beyond isolated spreadsheet calculations to architect a unified enterprise **Galaxy Schema** that connects operational queues, commercial retention risk, and organizational human capital.

---

## 💡 Core Lessons Learned as a PwC Digital Accelerator

### 1. The Role of the Digital Accelerator in Enterprise Transformation
In top-tier management consulting, a Business Intelligence specialist is not a passive report builder—they are a digital catalyst. By integrating data pipelines across disparate enterprise domains into a centralized semantic model, the Digital Accelerator eliminates organizational blind spots and empowers senior leadership with real-time decision support.

### 2. Dimensional Modeling as an Enterprise Superpower: Star vs Galaxy Schema
Single-table models collapse under the weight of enterprise complexity. Moving from single flat tables to a **Kimball Galaxy Schema (Fact Constellation)** enabled:
- Modeling three distinct business processes (`Fact_Calls`, `Fact_Churn`, `Fact_Employees`) without artificial joins or denormalization bloat.
- Leveraging shared conformed dimensions (`DimDate`) alongside dedicated dimensions (`DimAgent`, `DimTopic`, `DimContract`, `DimDepartment`).
- Achieving over **85% memory compression** in the VertiPaq columnar in-memory engine through optimal dictionary encoding.

### 3. Data Empathy & Forensic Data Quality
Grounding technical ETL in operational reality prevented critical modeling failures:
- **Call Center Operational Nulls (946 rows)**: Recognizing that unanswered callers cannot have talk durations or satisfaction ratings avoided distorting average speed of answer.
- **Customer Churn Blanks in `TotalCharges` (11 rows)**: Identifying that zero-tenure new subscribers contained whitespace strings prevented catastrophic `DataFormat.Error` pipeline crashes.
- **HR Leavers & Evaluation Nulls (453 rows)**: Auditing corporate departure cohorts ensured mathematically rigorous turnover rates without misclassifying active personnel.

---

## 🛠️ Technical Competencies Demonstrated Across the 10 Course Modules

| Course Learning Module | Demonstrated Competency in Galaxy Project | Technical Execution |
| :--- | :--- | :--- |
| **Module 1 & 2: GUI & Data Management** | Tripartite Business Problem Definition | Defined operational mandates for Claire, David Chen, and HR Leadership |
| **Module 3: Formulas & Functions** | Ground-Truth Grid Formula Modeling | Implemented cross-check formulas (`SUMIFS`, `COUNTIFS`, `AVERAGEIFS`) |
| **Module 4: Tables & Data Structure** | Structured Table Architecture | Converted raw extracts into formal Excel tables with strict naming standards |
| **Module 5: Pivot Tables** | Multi-Fact Staging Engines | Architected 8 independent Pivot Tables driving scorecards and hazard matrixes |
| **Module 6: Analysis Charts** | Advanced Visual Analytics | Developed Agent Performance Quadrant, Churn Hazard Bar, and Parity Waterfall |
| **Module 7: Ingestion & Cleaning** | Multi-Source Forensic Auditing | Solved the 946 call center nulls, 11 churn blank strings, and HR leaver cohorts |
| **Module 8: Power Query & M** | Modular ETL Pipelines | Built automated M recipes for ingestion, type enforcement, and dimension extraction |
| **Module 9: Data Modeling & DAX** | Galaxy Schema & VertiPaq DAX | Modeled 3 facts and 5 dimensions in Diagram View; authored 38 explicit DAX measures |
| **Module 10: After Course & CV** | Portfolio Packaging & Recruiter Defense | Packaged production GitHub repo, documentation site, and case study narrative |
| **Macros & Automation** | VBA Controller Architecture | Built modular navigation and slicer controller routines (`modNavigation`, `modFilterController`) |

---

## 🚀 Quantified Enterprise Impact Across 3 Divisions

1. **Customer Operations (Claire)**:
   - Identified the root cause of the **18.92% queue abandonment rate** (queue wait times $>67$s during midday lunch peaks).
   - Recommended virtual queue callbacks and peak shift realignment, projected to cut abandonment below **10.0%** and lift CSAT by $+0.30$ points.
2. **Customer Retention (David Chen)**:
   - Quantified **$139,130.85/month ($1.67M annualized)** in lost monthly recurring revenue from customer churn.
   - Isolated the primary risk driver: **42.71% churn on month-to-month contracts** and **$3\times$ churn acceleration for customers with $\ge 2$ technical trouble tickets**.
   - Outlined proactive retention workflows projected to protect **$297,600+ annualized recurring revenue**.
3. **Human Capital & Diversity (HR Leadership)**:
   - Exposed the executive "glass ceiling": female representation plummets from **50.56% in Job Level 6** to **14.81% in executive leadership (Tiers 1 & 2)**.
   - Identified the FY21 promotion velocity gap (8.78% female vs 11.19% male) and designed targeted sponsorship programs to achieve 25% female executive representation within 24 months.

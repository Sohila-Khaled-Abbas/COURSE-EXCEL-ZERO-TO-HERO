---
type: dashboard
aliases:
  - Dashboard
  - Course Dashboard
tags:
  - excel
  - dashboard
created: 2026-09-28
updated: 2026-09-28
---

# 🎛️ Course Command Center & Dashboard

> [!tip] Quick Status Overview
> **Course**: Excel from Zero to Hero in 8 Hours | Mostafa Hamed  
> **Capstone Project**: [[Call Center Performance Analysis]] (PwC Dataset — 5,000 Records)  
> **Active Environment**: Obsidian with Dataview, Omnisearch & Tasks enabled  

---

## 📈 Learning Progression Overview

| Metric | Target | Current Status | Notes |
| :--- | :--- | :--- | :--- |
| **Modules Covered** | 9 Modules | 9 Structured | Grounded in course PPTX & Workbooks |
| **Lesson Notes** | 30+ Lessons | Completed | Across 9 functional modules |
| **Concept Knowledge Base** | 22 Atomic Concepts | Completed | Star schema, DAX, Tables, XLOOKUP, AI MOC, etc. |
| **Formula Reference** | 27 Key Functions | Documented | Structured arguments, examples & edge cases |
| **Practice Sets** | 7 Exercises + 10 AI Labs | Ready | Levels 1 to 5 with hidden solutions |
| **Analytics Projects** | 2 Projects | Documented | Hotel Reservation + PwC Call Center |
| **Portfolio Artifact** | 1 Recruiter Case Study | Ready | [[Call Center Analysis Portfolio Case Study]] |
| **Personal Workbooks** | 2 Active Demos | In Progress | [[11_Demos_and_Workbooks/README\|Mod 2 (Superstore) + Mod 3 (Formulas & Ref)]] |
| **Retail Benchmark** | 9,994 Rows (19 Cols) | Verified | [[Sample Superstore Dataset Documentation|Sample Superstore]] |
| **Hospitality Benchmark** | 36,275 Rows (19 Cols) | Verified | [[Hotel Reservations Dataset Documentation|Hotel Reservations]] |

---

## 📑 Interactive Dataview Views

### 1. Course Modules & Status (Dataview Query)
```dataview
TABLE status, difficulty, module
FROM "02_Notes"
WHERE type = "lesson"
SORT file.name ASC
```

### Static Fallback: Video Chapter Index
| Chapter | Topic | Video Timestamp | Primary Note | Core Competency |
| :---: | :--- | :---: | :--- | :--- |
| **Ch 1** | **Excel Introduction & GUI** | [0:00](https://www.youtube.com/watch?v=uv1bxe2gdnU) | [[01_Excel_Interface_and_GUI]] | Interface, Workbook Architecture |
| **Ch 2** | **Data Management** | [16:05](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s) | [[01_Data_Types_and_Formatting]] | Validation, Formatting, Flash Fill, File Formats (`XLSX`, `XLSM`, `XLSB`, `CSV`) |
| **Ch 3** | **Excel Formulas & Functions** | [1:38:56](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s) | [[01_Formula_Basics_and_Cell_Referencing]] | Referencing, Logic, Lookups, Dates |
| **Ch 4** | **Excel Tables** | [2:35:55](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=9355s) | [[01_Excel_Tables_Architecture]] | Structured References, Auto-expansion |
| **Ch 5** | **Pivot Tables** | [2:58:28](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=10708s) | [[01_Pivot_Table_Foundations]] | Aggregation, Slicers, Show Values As |
| **Ch 6** | **Data Analysis Charts** | [3:26:58](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=12418s&pp=0gcJCWMAwfN6Pr3D) | [[01_Visual_Analytics_and_Chart_Selection]] | Visual Hierarchy, Chart Selection |
| **Ch 7** | **Importing & Data Cleaning** | [3:54:03](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=14043s) | [[01_Data_Quality_Dimensions_and_Audit]] | 6 Dimensions of Quality, ERP/CRM |
| **Ch 8** | **Power Query & M Language** | [4:20:30](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=15630s) | [[01_Power_Query_Fundamentals_and_ETL]] | ETL Pipelines, Merge/Append, M Code |
| **Ch 9** | **Data Modeling, Power Pivot & DAX** | [5:03:39](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=18219s) | [[01_Dimensional_Modeling_Principles]] | Star Schema, Relationships, Measures |
| **Capstone** | **PwC Call Center Performance** | [5:39:46](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=20386s) | [[Project Overview]] | 5,000 Records Executive Dashboard |

---

### 2. Spaced Revision Queue
```dataview
TABLE review_cycle, status, next_review
FROM "08_Revision"
WHERE type = "revision"
SORT next_review ASC
```

### Quick Access Revision Files
- 🗂️ [[Flashcards|Master Flashcard Deck (Active Recall)]]
- 💼 [[Interview Questions|Senior Data Analyst Excel Interview Questions]]
- ⚠️ [[Common Mistakes|Top 15 Excel Pitfalls & Formula Errors]]
- ⚡ [[Quick Review|High-Yield 15-Minute Exam & Interview Cram Sheet]]

---

### 3. Capstone Project Navigator
- 🎯 **Overview**: [[06_Projects/Call Center Performance Analysis/Project Overview|Call Center Project Overview]]
- ❓ **Business Problem**: [[06_Projects/Call Center Performance Analysis/Business Problem|Business Problem & Stakeholder Objectives]]
- 🗄️ **Data Dictionary**: [[06_Projects/Call Center Performance Analysis/Data Dictionary|PwC Call Center Data Dictionary]]
- 🔍 **Data Quality Audit**: [[06_Projects/Call Center Performance Analysis/Data Quality Assessment|Data Quality Assessment (5,000 Rows)]]
- 📐 **KPI Architecture**: [[06_Projects/Call Center Performance Analysis/KPIs|KPI Definitions & DAX / Excel Formulas]]
- 💡 **Findings**: [[06_Projects/Call Center Performance Analysis/Findings|Evidence-Based Analytical Findings]]
- 💼 **Recruiter Case Study**: [[Call Center Analysis Portfolio Case Study]]

---

## 📚 4. Supplementary Resources & External Knowledge
- 🧭 **Resource Index**: [[Gemini Notebook Resource Index|Gemini Notebook Resource Index]]
- 🗺️ **Learning Path**: [[Supplementary Learning Path|Curated Supplementary Learning Path]]
- 🎯 **Skill Matrix**: [[Resource to Skill Map|Comprehensive Skill-to-Resource Map]]

### External Resources Catalog (Dataview Query)
```dataview
TABLE source_type, course_topic, status
FROM "07_Reference/Gemini Notebook"
SORT course_topic ASC
```

### Static Fallback: Curated Supplementary Reference Notes
| Resource Note | Type | Topic | Artifact Link |
| :--- | :--- | :--- | :--- |
| [[XLOOKUP and Modern Lookups]] | Formula Reference | Lookups & Error Handling | Dedicated Note |
| [[Dynamic Arrays and Modern Calculation]] | Engine Reference | Spill Arrays & Dynamic Range (`#`) | Dedicated Note |
| [[Power Query ETL Transformations]] | Tutorial | Automated ETL & Data Cleaning | Dedicated Note |
| [[DAX Measures and Data Modeling]] | Concept Reference | Star Schema & Explicit DAX Measures | Dedicated Note |
| [[Call Center KPI Analytics]] | Project Resource | Operational FCR, SLA & CSAT Math | Dedicated Note |
| [[Executive Dashboard Design Principles]] | Documentation | Visual Hierarchy & Slicer Reset Macro | Dedicated Note |
| [[Analytics Pipeline Comparison]] | Visual Infographic | Modern Data Stack Tool Comparison | `assets/analytics-pipeline-data-comparison.png` |
| [[Enterprise Architecture Mindmap]] | Architecture Mindmap | 9-Module Analytics Topology | `assets/enterprise-architecture-mindmap.png` |
| [[Excel Interface Blueprint]] | Reference PDF | Ribbon, Grid & Backstage Blueprint | `assets/excel-interface-blueprint.pdf` |
| [[Data Quality Framework Mind Map]] | Visual Mindmap | 6 Dimensions of Quality Audit Flow | `assets/data-quality-mind-map.png` |
| [[Data Quality Essentials Guide]] | Visual Guide | Core Quality Principles & Cleaning | `assets/data-quality-essentials-guide.png` |
| [[Excel Navigation and Setup Video Guide]] | Video Tutorial | Ergonomics & High-Speed Navigation | `assets/getting-started-with-excel-navigation-and-setup.mp4` |
| [[Hotel Reservations Dataset Documentation]] | Dataset Reference | 36,275 Records, ADR & Kaggle/HF Mirrors | Dedicated Note |
| [[Ex07_Supplementary_Dynamic_Lookups_and_KPIs]] | Practice Exercise | 5-Level Advanced Drills | [[Ex07_Solutions]] |

---

## 🤖 5. AI-Assisted Excel Analytics Track

> [!important] Core Principle
> **Use AI to accelerate Excel work, but never use AI to avoid understanding Excel.**
>
> I should be able to:
> - Explain the formula
> - Reproduce the logic
> - Test the result
> - Identify failure cases
> - Explain the analytical decision
>
> without depending on the AI tool.

### Track Navigation & Core Frameworks
- 🧭 **Master Map of Content**: [[AI for Data Analysts MOC]]
- 📚 **Prompt Engineering**: [[AI Excel Prompt Library]]
- 🛡️ **Quality Assurance**: [[AI Output Verification]]
- 🔄 **Analytical Lifecycle**: [[AI Excel Workflow]]
- 📓 **Experimentation Journal**: [[AI Experiment Log]]
- ⚖️ **Tools Matrix**: [[AI Tool Comparison]]
- 🔒 **Security & Governance**: [[AI Excel Security and Privacy]]

### Current AI Track Progress:
`Not Started ➔ Learning ➔ Practicing ➔ [Verified]`

### AI Knowledge Base (Dataview Query)
```dataview
TABLE type, status, track
FROM "07_Reference/AI for Excel"
SORT file.name ASC
```

### Static Fallback: AI Reference Guides
| Reference Guide | Subject | Primary Focus |
| :--- | :--- | :--- |
| [[AI for Excel Overview]] | Architecture | Pedagogical mission, tool ecosystem & workflow boundaries |
| [[GPT for MS Excel — Twistly]] | Tool Reference | Twistly custom formula functions (`AI.ASK`, `AI.TABLE`, `AI.FILL`) |
| [[Claude for Excel — Anthropic]] | Tool Reference | Anthropic sidebar workbook reasoning, citations & edits |
| [[AI Excel Installation Guide]] | Setup Guide | Office Add-ins vs COM add-ins, AppSource deployment |
| [[AI Excel Workflow]] | Methodology | 14-step professional analytics process |
| [[AI Excel Prompt Library]] | Prompt Library | Structured templates for formulas, debugging, and ETL |
| [[AI Output Verification]] | Quality Control | 6-stage verification pipeline & audit checklist |
| [[AI Excel Security and Privacy]] | Governance | Sensitive data decision gate & PII anonymization |
| [[AI Tool Comparison]] | Comparison Matrix | Objective side-by-side technical evaluation |
| [[Human Skill vs AI Assistance]] | Skill Concept | Demarcation of AI acceleration vs human accountability |
| [[AI-Assisted Analysis Workflow]] | Case Study | Real-world execution audit on 5,000 PwC call records |
| [[01 — Generate a Formula With AI\|10 AI Practice Drills]] | Hands-on Labs | Formula generation, debugging, and full manual rebuilds |



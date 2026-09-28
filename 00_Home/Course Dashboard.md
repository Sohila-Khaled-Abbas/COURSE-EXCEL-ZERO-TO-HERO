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
| **Concept Knowledge Base** | 20 Atomic Concepts | Completed | Star schema, DAX, Tables, XLOOKUP, etc. |
| **Formula Reference** | 25+ Key Functions | Documented | Structured arguments, examples & edge cases |
| **Practice Sets** | 6 Exercises + 2 Challenges | Ready | Levels 1 to 5 with hidden solutions |
| **Analytics Projects** | 2 Projects | Documented | Hotel Reservation + PwC Call Center |
| **Portfolio Artifact** | 1 Recruiter Case Study | Ready | [[Call Center Analysis Portfolio Case Study]] |

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
| **Ch 2** | **Data Management** | [16:05](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s) | [[01_Data_Types_and_Formatting]] | Validation, Formatting, Flash Fill |
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
- 🚀 **Recommendations**: [[06_Projects/Call Center Performance Analysis/Recommendations|Executive Strategic Recommendations]]
- 💼 **Recruiter Case Study**: [[Call Center Analysis Portfolio Case Study]]

---
type: lesson
course: Excel Zero to Hero
module: "Module 7"
topic: "Importing Enterprise Data"
status: not-started
difficulty: intermediate
tags: [excel, lesson, data-import, sql, json, xml]
prerequisites: ["[[01_Data_Types_and_Formatting]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 7 – Importing Data & Data Cleaning\"
video_timestamp: \"3:54:03\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=14043s\"
---

# Lesson 7.3: Ingesting Data from External Enterprise Sources (CSV, XML, JSON, SQL)

> [!abstract] Learning Objective
> Ingest external datasets into Excel using native connectors and SQL queries from relational databases, CSV/Text files, XML, and JSON payloads.

> 🎥 **Video Chapter**: [Chapter 7 – Importing Data & Data Cleaning (3:54:03)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=14043s)

## Ingestion Methods
1. **Relational Databases (SQL Server / Oracle / MySQL)**:
   - **Data > Get Data > From Database > From SQL Server Database**.
   - Input Server Name and Database.
   - Enter native SQL statement (e.g. from `Quries.sql`):
     ```sql
     SELECT City, SUM(ROUND(Total, 0)) AS TotalSales
     FROM supermarket_sales
     GROUP BY City;
     ```
2. **Semi-Structured Formats (XML & JSON)**:
   - **Data > Get Data > From File > From JSON / XML**.
   - Power Query automatically expands hierarchical records into tabular columns.
3. **REST APIs**:
   - Ingesting exchange rates or earthquake data directly via web URL using M language.

## Related Knowledge
- Concepts: [[Power Query]], [[ETL Process]], [[M Language]]

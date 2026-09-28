---
type: lesson
course: Excel Zero to Hero
module: "Module 7"
topic: "Data Cleaning Techniques"
status: not-started
difficulty: intermediate
tags: [excel, lesson, data-cleaning, formulas]
prerequisites: ["[[01_Data_Quality_Dimensions_and_Audit]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 7 – Importing Data & Data Cleaning\"
video_timestamp: \"3:54:03\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=14043s\"
---

# Lesson 7.2: Systematic Data Cleaning Techniques in Excel

> [!abstract] Learning Objective
> Apply a proven data cleaning toolkit in Excel to eliminate whitespace, repair broken dates, impute or filter nulls, and enforce categorical consistency.

> 🎥 **Video Chapter**: [Chapter 7 – Importing Data & Data Cleaning (3:54:03)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=14043s)

## The Data Cleaning Toolkit
1. **Whitespace & Non-Printable Characters**:
   ```excel
   =TRIM(CLEAN(A2))
   ```
2. **Standardizing Casing**:
   ```excel
   =PROPER(TRIM(A2))
   ```
3. **Handling Missing Values**:
   - Deletion: Only if primary key or target is irrecoverable.
   - Imputation: Replacing numeric blanks with Mean/Median.
   - Categorical Flagging: Assigning `"Unassigned"` or `"Abandoned"` to preserve row count.
4. **Isolating Blanks with Go To Special**:
   - Select range -> press `F5` -> click **Special...** -> select **Blanks**.
   - Type replacement value (e.g. `0`) -> press `Ctrl + Enter` to populate all blanks simultaneously.

## Related Knowledge
- Concepts: [[Data Cleaning]], [[Six Dimensions of Data Quality]]
- Formulas: [[TRIM]], [[PROPER]]

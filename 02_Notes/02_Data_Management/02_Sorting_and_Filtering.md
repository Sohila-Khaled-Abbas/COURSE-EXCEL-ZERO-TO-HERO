---
type: lesson
course: Excel Zero to Hero
module: "Module 2"
topic: "Sorting & Filtering"
status: not-started
difficulty: beginner
tags: [excel, lesson, sorting, filtering]
prerequisites: ["[[01_Data_Types_and_Formatting]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 2 – Data Management\"
video_timestamp: \"16:05\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s\"
---

# Lesson 2.2: Precision Sorting, Multi-Level Sorts & Advanced AutoFiltering

> [!abstract] Learning Objective
> Organize and isolate tabular subsets using multi-level sorting, custom lists, text, date, and numerical AutoFilter conditions.

> 🎥 **Video Chapter**: [Chapter 2 – Data Management (16:05)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s)

## Why This Matters
In exploratory data analysis, sorting reveals extremes, outliers, and distribution patterns, while filtering allows analysts to drill down into specific segments without modifying source datasets.

## Core Concepts
- **AutoFilter (`Ctrl + Shift + L`)**: Toggles filter dropdowns on table headers.
- **Multi-Level Sorting**: Sorting by Primary key (e.g. `Department` Ascending), then Secondary key (e.g. `Salary` Descending).
- **Custom List Sorting**: Sorting non-alphabetical categories (e.g. `High, Medium, Low` or `Jan, Feb, Mar`).
- **Contextual Filters**:
  - *Text Filters*: Contains, Does Not Contain, Begins With.
  - *Number Filters*: Greater Than, Top 10 (by items or percent), Above/Below Average.
  - *Date Filters*: This Month, Last Quarter, Year to Date.

## Step-by-Step Multi-Level Sort
1. Click any single cell within the dataset (never select a partial column).
2. Go to **Data > Sort** (`Alt + A + S + S`).
3. Ensure *My data has headers* is checked.
4. Set Level 1: Column = `Agent`, Order = `A to Z`.
5. Click **Add Level** -> Level 2: Column = `Speed of answer in seconds`, Order = `Smallest to Largest`.

## Common Mistakes & Edge Cases
> [!warning] Watch Out
> - **Partial Range Selection**: Selecting a single column before sorting can detach that column from the rest of the row, scrambling the dataset permanently. Always select the whole table or let Excel auto-detect contiguous data.

## Related Knowledge
- Concepts: [[Excel Tables]]
- Formulas: [[SORT]], [[FILTER]]

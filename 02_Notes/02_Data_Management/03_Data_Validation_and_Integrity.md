---
type: lesson
course: Excel Zero to Hero
module: Module 2
topic: Data Validation & Integrity
status: completed
difficulty: intermediate
tags:
  - excel
  - lesson
  - data-validation
  - governance
prerequisites:
  - "[[01_Data_Types_and_Formatting]]"
related_project: "[[Call Center Performance Analysis]]"
source: https://youtu.be/uv1bxe2gdnU
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 2 – Data Management\"
video_timestamp: \"16:05\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s\"
---

# Lesson 2.3: Data Validation, Dropdowns & Input Governance

> [!abstract] Learning Objective
> Restrict user input using Data Validation rules, build dynamic dropdown lists, and implement defensive constraints to prevent dirty data entry.

> 🎥 **Video Chapter**: [Chapter 2 – Data Management (16:05)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s)

## Why This Matters
Data cleaning is expensive; preventing bad data at the point of entry is the most efficient data quality strategy. Data validation ensures standardized categorical values, valid ranges, and consistent formats.

## Core Concepts
- **Validation Criteria**:
  - *List*: Dropdown menu driven by comma-separated values or a contiguous range reference.
  - *Whole Number / Decimal*: Bounded ranges (e.g. Satisfaction Rating between 1 and 5).
  - *Date / Time*: Validating operational business dates.
  - *Text Length*: Restricting characters (e.g. exact 10-digit phone number or postal code).
  - *Custom*: Evaluating a Boolean formula (e.g. `=ISNUMBER(A2)`).
- **Error Alert Styles**:
  - *Stop* (Red): Hard block; user cannot bypass.
  - *Warning* (Yellow): Alerts user to potential error; allows bypass.
  - *Information* (Blue): Informational prompt; default accepts input.

## Step-by-Step Dropdown Creation
1. Select target input cells.
2. Navigate to **Data > Data Validation** (`Alt + A + V + V`).
3. Under the **Settings** tab, set *Allow* = **List**.
4. In the *Source* box, enter:
   - Fixed list: `Contract related, Technical Support, Payment related, Admin Support, Streaming`
   - Or reference a dynamic table column: `=DeptList[Department]`.
5. Under the **Error Alert** tab, set Style to **Stop** and write an informative message.

## Practice & Application
- [x] Build a validation rule that prevents ratings outside the 1 to 5 range with an error prompt. ✅ 2026-09-28

## Related Knowledge
- Concepts: [[Six Dimensions of Data Quality]], [[Excel Tables]]

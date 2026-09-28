---
type: lesson
course: Excel Zero to Hero
module: Module 2
topic: Data Transformation Tools
status: completed
difficulty: intermediate
tags:
  - excel
  - lesson
  - flash-fill
  - text-to-columns
  - deduplication
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

# Lesson 2.4: Rapid Data Transformation: Flash Fill, Text to Columns & Deduplication

> [!abstract] Learning Objective
> Rapidly clean, restructure, and deconstruct messy columns using Flash Fill, delimited Text to Columns, and the Remove Duplicates utility.

> 🎥 **Video Chapter**: [Chapter 2 – Data Management (16:05)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s)

## Why This Matters
Data analysts frequently receive exports where multiple attributes are crammed into a single cell (e.g. `"Doe, John - Sales"`). Excel's built-in transformation tools allow instant parsing without complex formulas.

## Core Concepts
- **Flash Fill (`Ctrl + E`)**: Machine-learning driven pattern detection that parses, merges, or restructures text based on sample manual entries.
- **Text to Columns**: Converts delimited text strings (commas, tabs, pipes, spaces) into distinct adjacent columns.
- **Remove Duplicates**: Scans specified columns for duplicate key combinations and purges redundant rows.

## Step-by-Step Text to Columns
1. Select the source column to split.
2. Go to **Data > Text to Columns** (`Alt + A + E`).
3. Choose **Delimited** -> Click *Next*.
4. Check the appropriate delimiter (e.g. Comma or Other: `-`).
5. Choose destination cell (e.g. `B2` to avoid overwriting source).
6. Set data types for output columns (crucial for preserving leading zeros in IDs).

## Flash Fill Examples
| Raw Input | Desired Output | Shortcut |
| :--- | :--- | :--- |
| `john.doe@company.com` | `John Doe` | Type first example, hit `Ctrl + E` |
| `Call_ID_00129_US` | `00129` | Type `00129`, hit `Ctrl + E` |

## Related Knowledge
- Concepts: [[Data Cleaning]], [[Power Query]]
- Formulas: [[TEXTJOIN]], [[TRIM]]

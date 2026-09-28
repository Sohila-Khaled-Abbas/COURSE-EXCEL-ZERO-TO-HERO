---
type: lesson
course: Excel Zero to Hero
module: Module 2
topic: Data Types & Formatting
status: completed
difficulty: beginner
tags:
  - excel
  - lesson
  - data-types
  - formatting
prerequisites:
  - "[[01_Excel_Interface_and_GUI]]"
related_project: "[[Call Center Performance Analysis]]"
source: https://youtu.be/uv1bxe2gdnU
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 2 – Data Management\"
video_timestamp: \"16:05\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s\"
---

# Lesson 2.1: Data Types, Number Formatting & Custom Formats

> [!abstract] Learning Objective
> Distinguish Excel's underlying data representations from visual display formats, and engineer custom number formatting rules to enhance visual clarity without altering underlying numerical precision.

> 🎥 **Video Chapter**: [Chapter 2 – Data Management (16:05)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s)

## Why This Matters
Formatting changes *appearance*, not *underlying value*. Misunderstanding this distinction leads to calculation errors, broken lookups, and incorrect aggregation.

## Core Concepts
- **Primitive Data Types**:
  - *Text (Strings)*: Aligned left by default. Non-numeric characters or numbers stored as text.
  - *Numbers (Integers & Floats)*: Aligned right by default. Stored to 15 digits of precision.
  - *Dates & Times*: Serial integers (Days elapsed since Jan 1, 1900) where decimals represent fractions of a 24-hour day.
  - *Booleans*: `TRUE` / `FALSE`, centered by default.
  - *Formulas*: Begin with `=` and evaluate to one of the above types.
- **Custom Formatting Syntax**:
  `Positive Format ; Negative Format ; Zero Format ; Text Format`
  - Example: `#,##0.00;[Red]-#,##0.00;"-";@`

## Step-by-Step Custom Formatting
1. Select target numerical cells.
2. Press `Ctrl + 1` to open the **Format Cells** dialog.
3. Select **Custom** in the Category pane.
4. Input syntax:
   - For accounting shorthand: `#,##0, "K"` (divides by 1,000 and appends K).
   - For phone numbers: `(###) ###-####`.
   - For date formatting: `yyyy-mm-dd (ddd)` renders `2026-09-28 (Mon)`.

## Common Mistakes & Edge Cases
> [!warning] Watch Out
> - **Numbers Stored as Text**: Leading apostrophes (`'123`) or raw exports formatted as text cause `SUM` to treat them as 0 and `VLOOKUP` to return `#N/A`.
> - **Date Serial Confusion**: If a date appears as `45563`, the cell is simply unformatted; change format to Short Date.

## Practice & Application
- [x] Format a revenue column to display values in thousands with a `$` symbol: `$#,##0, "K"`. ✅ 2026-09-28
- [x] Practice resolving numbers stored as text using the text-to-number dropdown or multiplying by 1. ✅ 2026-09-28

## Related Knowledge
- Concepts: [[Six Dimensions of Data Quality]]
- Formulas: [[TEXTJOIN]]
- Reference: [[Excel Cheat Sheet]]

## Self-Test & Interview Questions
1. *How does Excel internally store the date January 1, 1900?* (As the integer `1`).
2. *What do the four semicolon-separated sections of a custom number format represent?* (Positive; Negative; Zero; Text).

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
  - *Text (Strings)*: Aligned left by default. Non-numeric characters or numbers stored as text (e.g. `Order ID`, `Customer ID`).
  - *Numbers (Integers & Floats)*: Aligned right by default. Stored to 15 digits of precision (e.g. `Quantity`, `Sales`).
  - *Dates & Times*: Serial integers (Days elapsed since Jan 1, 1900) where decimals represent fractions of a 24-hour day (e.g. `Order Date`, `Ship Date`).
  - *Booleans*: `TRUE` / `FALSE`, centered by default.
  - *Formulas*: Begin with `=` and evaluate to one of the above types.
- **Custom Formatting Syntax**:
  `Positive Format ; Negative Format ; Zero Format ; Text Format`
  - Example: `#,##0.00;[Red]-#,##0.00;"-";@`

---

## 📦 Practical Grounding: Sample Superstore Dataset (9,994 Rows)

This lesson is grounded in the benchmark **[[Sample Superstore Dataset Documentation|Sample Superstore]]** retail dataset:
- 🌐 **Provenance & Sources**: [Tableau Public Sample Data](https://public.tableau.com/app/learn/sample-data) • [Kaggle Sample Superstore Mirror](https://www.kaggle.com/datasets/naveenkumar20bps1137/sample-superstore)
- 🗄️ **Local File**: `D:\courses\Data Analysis 26-27\Sample_ Superstore.csv` (Preserved in `09_Source_Materials/Module 2/Sample_Superstore_Full.csv`)

### Ground-Truth Superstore Column Formatting Architecture

| Superstore Field | Underlying Data Type  | Visual Format Mask               | Formatted Display Example | Operational Analysis Rationale                                                            |
| :--------------- | :-------------------: | :------------------------------- | :------------------------ | :---------------------------------------------------------------------------------------- |
| `Order Date`     |      Date Serial      | `yyyy-mm-dd`                     | `2016-11-08`              | Stored as integer `42682`; prevents regional string ambiguity (MM/DD vs DD/MM).           |
| `Sales`          | Floating-point Number | `$#,##0.00`                      | `$261.96`                 | Formats as standard US currency without altering underlying cents precision.              |
| `Profit`         |     Signed Number     | `$#,##0.00;[Red]($#,##0.00);"-"` | `[Red]($17.50)`           | Highlights toxic negative margins in red parentheses; renders zero as neutral dash.       |
| `Discount`       |     Decimal Float     | `0.0%`                           | `20.0%`                   | Underlying value `0.20` displays as readable percentage.                                  |
| `Order ID`       |     Text / String     | `@`                              | `CA-2016-152156`          | Formatted strictly as text to prevent Excel from misinterpreting hyphens as subtractions. |
| `Postal Code`    |     Text / String     | `00000`                          | `02138`                   | Preserves leading zeros on East Coast US zip codes (e.g. Cambridge, MA).                  |

---

## Step-by-Step Custom Formatting
1. Select target numerical cells (e.g., Superstore `Profit` column).
2. Press `Ctrl + 1` to open the **Format Cells** dialog.
3. Select **Custom** in the Category pane.
4. Input syntax:
   - For accounting profit/loss: `$#,##0.00;[Red]($#,##0.00);"-"`
   - For revenue in thousands shorthand: `$#,##0, "K"` (divides by 1,000 and appends K).
   - For discount rates: `0.0%`.
   - For date formatting: `yyyy-mm-dd (ddd)` renders `2016-11-08 (Tue)`.

## Common Mistakes & Edge Cases
> [!warning] Watch Out
> - **Numbers Stored as Text**: Leading apostrophes (`'123`) or raw exports formatted as text cause `SUM` to treat them as 0 and `VLOOKUP` to return `#N/A`.
> - **Date Serial Confusion**: If an `Order Date` appears as `42682`, the cell is simply unformatted; change format to Short Date (`Ctrl + Shift + 3`).
> - **The Zip Code Trap**: If `Postal Code` is imported as an integer, Boston zip code `02138` becomes `2138`, corrupting geographic address mapping. Always import postal codes as text!

## Practice & Application
- [x] Format a revenue column to display values in thousands with a `$` symbol: `$#,##0, "K"`. ✅ 2026-09-28
- [x] Practice resolving numbers stored as text using the text-to-number dropdown or multiplying by 1. ✅ 2026-09-28
- [x] In `Sample_ Superstore.csv`, apply the custom format `$#,##0.00;[Red]($#,##0.00);"-"` to the `Profit` column to visually isolate all unprofitable transactions. ✅ 2026-09-28
- [x] Convert `Order Date` from string text to true Excel date serials using `DATEVALUE()` or Text-to-Columns. ✅ 2026-09-28

## Related Knowledge
- Dataset: [[Sample Superstore Dataset Documentation]]
- Concepts: [[Six Dimensions of Data Quality]]
- Formulas: [[TEXTJOIN]]
- Reference: [[Excel Cheat Sheet]]

## Self-Test & Interview Questions
1. *How does Excel internally store the date January 1, 1900?* (As the integer `1`).
2. *What do the four semicolon-separated sections of a custom number format represent?* (Positive; Negative; Zero; Text).
3. *Why must postal codes, employee IDs, and telephone numbers be stored as text data types?* (To preserve leading zeros, prevent mathematical coercion, and prevent scientific notation formatting).


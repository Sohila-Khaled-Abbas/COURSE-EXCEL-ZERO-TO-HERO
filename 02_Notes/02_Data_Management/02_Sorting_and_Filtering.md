---
type: lesson
course: Excel Zero to Hero
module: Module 2
topic: Sorting & Filtering
status: completed
difficulty: beginner
tags:
  - excel
  - lesson
  - sorting
  - filtering
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

# Lesson 2.2: Precision Sorting, Multi-Level Sorts & Advanced AutoFiltering

> [!abstract] Learning Objective
> Organize and isolate tabular subsets using multi-level sorting, custom lists, text, date, and numerical AutoFilter conditions.

> 🎥 **Video Chapter**: [Chapter 2 – Data Management (16:05)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=965s)

## Why This Matters
In exploratory data analysis, sorting reveals extremes, outliers, and distribution patterns, while filtering allows analysts to drill down into specific segments without modifying source datasets.

## Core Concepts
- **AutoFilter (`Ctrl + Shift + L`)**: Toggles filter dropdowns on table headers across all 19 Superstore columns.
- **Multi-Level Sorting**: Sorting by Primary key (e.g. `Region`), Secondary key (e.g. `Category`), and Tertiary key (e.g. `Profit`).
- **Custom List Sorting**: Sorting non-alphabetical categories (e.g. fulfillment priority: `Same Day, First Class, Second Class, Standard Class`).
- **Contextual Filters**:
  - *Text Filters*: Contains (e.g. `Product Name` contains `"Apple"` or `"Canon"`).
  - *Number Filters*: Greater Than, Top 10 by `Sales`, Negative `Profit` (`< 0`).
  - *Date Filters*: `Order Date` between specific quarters, Year to Date.

---

## 📦 Practical Grounding: Multi-Level Sorting on Superstore Data

Using `Sample_ Superstore.csv` (9,994 transactions):

### Step-by-Step Multi-Level Sort Execution
1. Click any single cell within the contiguous dataset (e.g., cell `A1` or `E15`). Never select a single column alone.
2. Go to **Data > Sort** (`Alt + A + S + S`).
3. Ensure **My data has headers** is checked.
4. **Level 1**: Column = `Region`, Sort On = `Cell Values`, Order = `A to Z`.
5. Click **Add Level** ➔ **Level 2**: Column = `Category`, Sort On = `Cell Values`, Order = `A to Z`.
6. Click **Add Level** ➔ **Level 3**: Column = `Profit`, Sort On = `Cell Values`, Order = `Smallest to Largest`.
*Result*: Instantly surfaces the deepest loss-making products at the top of each regional category group (e.g., Tables in the East and Central regions generating over -$1,000 losses per order).

---

## 🔍 Forensic Filtering Drill: Finding Toxic Discount Thresholds

In retail analytics, discounts above 20% frequently destroy profitability. Use AutoFilter to audit this hypothesis:
1. Press `Ctrl + Shift + L` to enable AutoFilter.
2. Click the dropdown on the **Discount** column ➔ **Number Filters** ➔ **Greater Than or Equal To...** ➔ Enter `0.2`.
3. Click the dropdown on the **Profit** column ➔ **Number Filters** ➔ **Less Than...** ➔ Enter `0`.
*Analytical Finding*: Filtering isolates over 1,200 unprofitable transactions, demonstrating that discounting beyond 20% on Furniture items consistently yields negative margins.

---

## Common Mistakes & Edge Cases
> [!warning] Watch Out
> - **Partial Range Selection**: Selecting a single column before sorting can detach that column from the rest of the row, scrambling the dataset permanently. Always select the whole table or let Excel auto-detect contiguous data.
> - **Hidden Rows Misconception**: Applying an AutoFilter hides rows; it does **not** delete them. Be cautious when copying and pasting: press `Alt + ;` (`Select Visible Cells Only`) before copying if pasting into unaligned worksheets.

## Practice & Application
- [ ] In `Sample_ Superstore.csv`, execute a 3-level sort on `Region`, `Sub-Category`, and `Sales` (Largest to Smallest).
- [ ] Filter `State == "Texas"` and inspect total profit; note why Texas ranks as one of the least profitable states due to aggressive 80% discounting on binders and appliances.
- [ ] Use `Top 10...` number filter on `Sales` to isolate the top 10 highest-grossing individual orders.

## Related Knowledge
- Dataset: [[Sample Superstore Dataset Documentation]]
- Concepts: [[Excel Tables]]
- Formulas: [[SORT]], [[SORTBY]], [[FILTER]]


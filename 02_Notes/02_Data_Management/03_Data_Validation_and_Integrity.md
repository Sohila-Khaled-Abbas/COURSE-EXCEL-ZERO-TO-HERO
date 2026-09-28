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
  - *Whole Number / Decimal*: Bounded ranges (e.g. Superstore `Discount` between `0.00` and `0.80`, `Quantity` integer >= 1).
  - *Date / Time*: Validating operational business dates (e.g. `Ship Date` must be >= `Order Date`).
  - *Text Length*: Restricting characters (e.g. Superstore `Postal Code` = exactly 5 digits).
  - *Custom*: Evaluating a Boolean formula (e.g. `=AND(ISNUMBER(Sales), Sales > 0)`).
- **Error Alert Styles**:
  - *Stop* (Red): Hard block; user cannot bypass. Essential for core financial/BI fields.
  - *Warning* (Yellow): Alerts user to potential outlier (e.g. `Discount > 50%`); allows bypass with confirmation.
  - *Information* (Blue): Informational prompt; default accepts input.

---

## 📦 Practical Grounding: Superstore Input Governance Architecture

Using `Sample_ Superstore.csv` fields, we establish data-entry governance to prevent raw data corruption:

### 1. Categorical Dropdown Picklists (List Validation)
- **Ship Mode Dropdown**:
  - Allow: `List`
  - Source: `Standard Class, Second Class, First Class, Same Day`
  - Prevents typos like `"2nd Class"` or `"Std Class"` that fracture Pivot Table grouping.
- **Customer Segment Dropdown**:
  - Allow: `List`
  - Source: `Consumer, Corporate, Home Office`

### 2. Commercial Boundary Constraints (Decimal Validation)
- **Discount Protection Rule**:
  - Allow: `Decimal`
  - Data: `between`
  - Minimum: `0.00`
  - Maximum: `0.80`
  - *Business Rationale*: Hard-blocks accidental inputs like `20` (which Excel interprets as 2,000% discount!) instead of `0.20`.

### 3. Chronological Consistency Check (Custom Formula Validation)
- In the `Ship Date` entry column (Cell `D2`):
  - Allow: `Custom`
  - Formula: `=D2 >= C2` (Where `C2` is `Order Date`)
  - Error Alert: *"Invalid Shipment Date: Order cannot be shipped before it is placed."*

---

## Step-by-Step Dropdown Creation
1. Select target input cells (e.g., column `Ship Mode`).
2. Navigate to **Data > Data Validation** (`Alt + A + V + V`).
3. Under the **Settings** tab, set *Allow* = **List**.
4. In the *Source* box, enter:
   - Fixed list: `Standard Class, Second Class, First Class, Same Day`
   - Or reference a dynamic table column: `=ShipModeList[Mode]`.
5. Under the **Error Alert** tab, set Style to **Stop**, Title = `"Invalid Shipping Method"`, and write an informative message.

## Practice & Application
- [x] Build a validation rule that prevents ratings outside the 1 to 5 range with an error prompt. ✅ 2026-09-28
- [x] In `Sample_ Superstore.csv`, apply List Validation to the `Region` column restricting entry strictly to: `Central, East, South, West`. ✅ 2026-09-28
- [x] Build a custom formula validation on `Order ID` ensuring that all entries begin with either `"CA-"` or `"US-"`: `=OR(LEFT(A2,3)="CA-", LEFT(A2,3)="US-")`. ✅ 2026-09-28

## Related Knowledge
- Dataset: [[Sample Superstore Dataset Documentation]]
- Concepts: [[Six Dimensions of Data Quality]], [[Excel Tables]]


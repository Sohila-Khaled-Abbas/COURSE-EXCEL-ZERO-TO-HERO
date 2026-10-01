---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Forensic Data Quality Audit & Hygiene
description: Forensic null audit, anomaly detection, and Power Query recipes across all 3 datasets and Backing 1-4 lookup tables
---

# 4. Forensic Data Quality Assessment Across All Datasets

> [!abstract] Architectural Data Hygiene Standards
> Clean, reliable analytical insights require a disciplined forensic audit of source data before modeling. In accordance with enterprise analytics engineering best practices, every dataset and auxiliary lookup sheet in the **PwC Switzerland Digital Transformation Suite** has undergone rigorous programmatic auditing for completeness, uniqueness, domain validity, and relational integrity.

---

## 📞 1. Forensic Audit: Dataset 01 — Call Centre Trends (`01 Call-Center-Dataset.xlsx`)

### Completeness & Null Distribution (5,000 Records)
- **Total Inbound Records**: 5,000 call interaction events.
- **Attributes with Zero Missing Values**: `Call Id` (0), `Agent` (0), `Date` (0), `Time` (0), `Topic` (0), `Answered (Y/N)` (0), `Resolved` (0).
- **Attributes with Missing Values**:
  - `Speed of answer in seconds`: exactly 946 nulls (18.92%).
  - `AvgTalkDuration`: exactly 946 nulls (18.92%).
  - `Satisfaction rating`: exactly 946 nulls (18.92%).

### Forensic Verification of the 946 Nulls
Cross-tabulation of `Answered (Y/N)` against missing value counts:
```python
unanswered_calls = df[df['Answered (Y/N)'] == 'N']
# len(unanswered_calls) == 946
# unanswered_calls['Speed of answer in seconds'].isnull().sum() == 946 (100.0%)
# unanswered_calls['AvgTalkDuration'].isnull().sum()            == 946 (100.0%)
# unanswered_calls['Satisfaction rating'].isnull().sum()        == 946 (100.0%)

answered_calls = df[df['Answered (Y/N)'] == 'Y']
# len(answered_calls) == 4,054
# answered_calls['Speed of answer in seconds'].isnull().sum() == 0 (0.0%)
# answered_calls['AvgTalkDuration'].isnull().sum()            == 0 (0.0%)
# answered_calls['Satisfaction rating'].isnull().sum()        == 0 (0.0%)
```

> [!important] Operational Null Rule for Call Center Data
> These 946 missing values are **strictly valid operational nulls**. When a caller abandons (`Answered == 'N'`), no agent conversation occurs, no talk duration exists, and no post-call survey can be administered.
> 
> **Never replace these nulls with zero!** Imputing zero for `Speed of answer` would distort average wait times by assuming 946 callers were answered instantaneously in 0.0 seconds!

---

## 🔄 2. Forensic Audit: Dataset 02 — Customer Retention (`02 Churn-Dataset.xlsx`)

### Completeness & The "11 Blank Strings" Finding (7,043 Records)
- **Total Customer Accounts**: 7,043 records.
- **Attributes with Zero Missing Values**: 22 fields.
- **Attribute with Hidden Missing Values**:
  - `TotalCharges`: Contains exactly **11 rows with blank space strings (`' '`)** rather than standard SQL/Excel nulls!

### Forensic Root-Cause Analysis of the 11 Blanks
Cross-tabulating `tenure` against `TotalCharges`:
```python
blank_charges = df_churn[df_churn['TotalCharges'].str.strip() == '']
# len(blank_charges) == 11
# blank_charges['tenure'].unique() == [0]
# All 11 records have tenure == 0 months!
```
- **Business Explanation**: These 11 customers are brand new subscribers who registered within the current billing cycle and have a tenure of 0 months. Because they have not yet received their first monthly bill, their cumulative lifetime charges have not generated.
- **ETL Risk in Power Query**: If an analyst attempts to cast `TotalCharges` directly to `type number` or `Currency`, Power Query will generate **11 cell-level errors (`DataFormat.Error`)**, corrupting data load into Power Pivot!

```powerquery
// Power Query M Cleaning Recipe for TotalCharges:
#"Replaced Blank Space" = Table.ReplaceValue(#"Previous Step", " ", "0", Replacer.ReplaceValue, {"TotalCharges"}),
#"Changed Type TotalCharges" = Table.TransformColumnTypes(#"Replaced Blank Space", {{"TotalCharges", Currency.Type}})
```

---

## 👥 3. Forensic Audit: Dataset 03 — Diversity & Inclusion Suite (`03 Diversity-Inclusion-Dataset.xlsx`)

### 3.1 Primary Sheet: `Pharma Group AG` (500 Corporate Records)
- **Total Employee Records**: 500 corporate personnel.
- **Structural Missing Values**:
  - `Leaver FY`: **453 nulls**. Exactly 47 employees departed in FY20 (9.40% turnover); the 453 nulls reflect active staff.
  - `FY20 Performance Rating`: **87 nulls**. Represents new hires who had not completed an annual review.
  - `Job Level after FY21 promotions`: **47 nulls**. Corresponds to leavers who departed before the FY21 appraisal cycle.
  - `FY19 Performance Rating`: **114 nulls**. Employees hired during FY20 without previous year appraisals.

### 3.2 Auxiliary Sheets: `Backing 1` to `Backing 4` Forensic Audit

#### Sheet: `Backing 1` (Detailed Employee Census — 500 rows)
- **Integrity**: Contains exactly 500 records mapping 1-to-1 to `Employee ID` 1 through 500.
- **Key Columns**: `Y_GRADE` (Years in Grade, 1 to 15), `Y_SERVIC` (Years of Service, 0 to 28), `AGE` (21 to 64), `OC_RATE` (Occupancy rate, 1.0 = Full time).
- **Validation**: Zero missing values in `Y_GRADE`, `Y_SERVIC`, or `AGE`. Can be ingested directly as an enriched employee dimension (`Dim_EmployeeCensus`).

#### Sheet: `Backing 2` (Career Ladder & Promotion Hierarchy — 5 rows)
- **Integrity**: Exactly 5 promotional transitions mapping each rank to its next higher grade without circular reference:
  - `6 - Junior Officer` $\to$ `5 - Senior Officer` $\to$ `4 - Manager` $\to$ `3 - Senior Manager` $\to$ `2 - Director` $\to$ `1 - Executive`.
- **Validation**: In the raw workbook, `Job Level before FY20 promotions` in sheet `Pharma Group AG` references this table via `=INDEX('Backing 2'!B:B, MATCH(...))`. Power Query replaces this formula with a native relational merge or relational model relationship!

#### Sheet: `Backing 3` (Nationality Census & Demographic Benchmark — 21 rows)
- **Integrity**: Lists 21 countries representing all 500 employees.
- **Validation**: Programmatic summation:
  $$\sum \text{Headcount} = 6 + 1 + 8 + 1 + 1 + 5 + 1 + 4 + 92 + 65 + 1 + 2 + 1 + 32 + 1 + 37 + 224 + 2 + 1 + 1 + 1 = \mathbf{500}$$
  Matches total employee population with 100.0% precision!

#### Sheet: `Backing 4` (Performance Review Assessment PRA Equity Matrix)
- **Structure**: Contains two distinct benchmark lookup blocks:
  1. **Department & Job Level Combinations (Rows 3–32)**: Maps 30 departmental tiers to PRA status (`Even`, `Uneven - Men benefit`, `Inconclusive`).
  2. **Job Level Summaries (Rows 3–7, Cols Y-Z)**: Summarizes overall equity by job tier (`3 - Senior Manager` is the only tier classified as `Uneven - Men benefit`).
- **Critical ETL Trap (Formula Decoupling)**: Columns in `Pharma Group AG` reference `Backing 4` via volatile `=INDEX('Backing 4'!U:U, MATCH(...))` formulas. In Power Query, ingest `Backing 4` as a dedicated dimension table (`Dim_PRA_Equity`) and connect it via relational keys in Power Pivot, eliminating brittle spreadsheet formula references.

---

## 📋 Comprehensive Forensic Data Quality Matrix

| Quality Dimension | Dataset 01: Call Centre | Dataset 02: Customer Churn | Dataset 03: Pharma Group AG | Backing 1 to 4 Lookups |
| :--- | :--- | :--- | :--- | :--- |
| **Row Count** | 5,000 | 7,043 | 500 | 500, 5, 21, 35 |
| **Primary Key** | `Call Id` (100% unique) | `customerID` (100% unique) | `Employee ID` (100% unique) | Natural composite keys |
| **Duplicate Rows**| 0 | 0 | 0 | 0 |
| **Missing Values**| 946 operational nulls | 11 blank spaces (`TotalCharges`) | 453 nulls in `Leaver FY` | Zero nulls in lookup keys |
| **Required ETL Fix** | Preserve nulls; do not impute zero | Replace `' '` with `0` before currency casting | Standardize job level strings | Decouple INDEX/MATCH formulas |
| **VertiPaq Readiness** | High compression | High compression | Compact footprint | Instantaneous in-memory lookup |

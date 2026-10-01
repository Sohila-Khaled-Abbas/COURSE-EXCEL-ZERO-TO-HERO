---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Forensic Data Quality Audit & Hygiene
description: Forensic null audit, anomaly detection, and Power Query recipes across all 3 datasets
---

# 4. Forensic Data Quality Assessment Across All 3 Datasets

> [!abstract] Architectural Data Hygiene Standards
> Clean, reliable analytical insights require a disciplined forensic audit of source data before modeling. In accordance with enterprise analytics engineering best practices, every dataset in the **PwC Switzerland Digital Transformation Suite** has undergone rigorous programmatic auditing for completeness, uniqueness, domain validity, and type consistency.

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

### Integrity & Domain Constraints
- `Call Id` is strictly unique (5,000 distinct values, zero duplicates).
- `Answered (Y/N)` and `Resolved` strictly contain binary `'Y'` and `'N'` flags.
- `Satisfaction rating` strictly adheres to integer values between 1 and 5.
- Call arrival timestamps strictly fall within operating business hours (09:00:00 to 18:00:00).

---

## 🔄 2. Forensic Audit: Dataset 02 — Customer Retention (`02 Churn-Dataset.xlsx`)

### Completeness & The "11 Blank Strings" Finding (7,043 Records)
- **Total Customer Accounts**: 7,043 records.
- **Attributes with Zero Missing Values**: `customerID`, `gender`, `SeniorCitizen`, `Partner`, `Dependents`, `tenure`, `PhoneService`, `MultipleLines`, `InternetService`, `OnlineSecurity`, `OnlineBackup`, `DeviceProtection`, `TechSupport`, `StreamingTV`, `StreamingMovies`, `Contract`, `PaperlessBilling`, `PaymentMethod`, `MonthlyCharges`, `numAdminTickets`, `numTechTickets`, `Churn`.
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

### Domain Validity & Encoding Audit
- `customerID` is strictly unique (7,043 distinct keys, zero duplicates).
- `SeniorCitizen` is coded as binary integer `0` or `1`.
- `Contract` strictly consists of 3 distinct values: `Month-to-month` (3,875), `One year` (1,473), `Two year` (1,695).
- `Churn` strictly consists of binary strings: `No` (5,174) and `Yes` (1,869). Baseline churn rate = **26.54%**.

---

## 👥 3. Forensic Audit: Dataset 03 — Diversity & Inclusion (`03 Diversity-Inclusion-Dataset.xlsx`)

### Completeness & Structural Null Audit (500 Corporate Records)
- **Total Employee Records**: 500 corporate personnel in sheet `Pharma Group AG`.
- **Attributes with Zero Missing Values**: `Employee ID` (0), `Gender` (0), `New hire FY20?` (0), `Department @01.07.2020` (0), `FTE group` (0), `Time type` (0), `Age group` (0), `Nationality 1` (0), `Years since last hire` (0).
- **Attributes with Structural / Conditional Missing Values**:
  - `Leaver FY`: **453 nulls**. Exactly 47 employees left the company during FY20; the remaining 453 are active employees!
  - `FY20 Performance Rating`: **87 nulls**. Represents new hires in FY20 who had not yet completed a full annual evaluation cycle.
  - `Job Level after FY21 promotions`: **47 nulls**. Exactly corresponds to the 47 leavers who departed before the FY21 appraisal cycle.
  - `FY19 Performance Rating`: **114 nulls**. Employees hired during FY20 or late FY19 without previous cycle evaluations.
  - `Job Level before FY20 promotions`: **66 nulls**. Corresponds to new hires entering directly into their post-promotion grade.

### Forensic Verification of Personnel Leavers & Promoted Cohorts
```python
leavers = df_div[df_div['FY20 leaver?'] == 'Yes']
# len(leavers) == 47 (Corporate annual turnover rate = 47 / 500 = 9.40%)
# leavers['Leaver FY'].isnull().sum() == 0 (all 47 have documented departure fiscal year)
# leavers['Job Level after FY21 promotions'].isnull().sum() == 47 (100% null because they left before FY21!)

stayed = df_div[df_div['FY20 leaver?'] == 'No']
# len(stayed) == 453
# stayed['Leaver FY'].isnull().sum() == 453 (100% null as expected!)
```

### Job Level Standardization
- Job levels in the raw file combine numeric ranks and titles: e.g., `1 - Executive`, `2 - Director`, `3 - Senior Manager`, `4 - Manager`, `5 - Senior Officer`, `6 - Junior Officer`.
- **Power Query Recipe**: Split column by delimiter ` - ` to extract `Job Level Rank` (Integer 1 to 6) and `Job Level Title` (Text) to allow proper executive hierarchy sorting in Pivot Tables and DAX measures.

---

## 📋 Comprehensive Forensic Data Quality Matrix

| Quality Dimension | Dataset 01: Call Centre Trends | Dataset 02: Customer Retention | Dataset 03: Diversity & Inclusion |
| :--- | :--- | :--- | :--- |
| **Row Count** | 5,000 | 7,043 | 500 |
| **Column Count** | 10 | 23 | 32 |
| **Primary Key** | `Call Id` (100% unique) | `customerID` (100% unique) | `Employee ID` (100% unique) |
| **Duplicate Rows**| 0 | 0 | 0 |
| **Missing Values**| 946 nulls across 3 fields (Operational Nulls) | 11 blank spaces in `TotalCharges` (Zero Tenure) | 453 nulls in `Leaver FY`, 87 in Performance Rating |
| **Required ETL Fix** | Preserve nulls; do not impute zero | Replace `' '` with `0` before currency casting | Standardize job level strings, parse numeric ranks |
| **VertiPaq Readiness** | High dictionary compression | High dictionary compression | Extremely compact in-memory footprint |

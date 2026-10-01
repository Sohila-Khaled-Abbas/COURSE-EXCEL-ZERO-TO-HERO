---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Master Data Dictionary & Galaxy Schema Specs
description: Comprehensive field definitions, types, null handling, and relationship keys across 3 datasets and Backing 1-4 lookup tables
---

# 3. Master Data Dictionary & Galaxy Schema Specifications

This master dictionary details the schema, data types, null distributions, business definitions, and relationship keys for all three primary datasets, extracted dimensions, and the **four auxiliary Backing tables** (`Backing 1` to `Backing 4`) within the **PwC Switzerland Digital Transformation Galaxy Schema**.

---

## 📞 Dataset 01: The Call Centre Trends (`Fact_Calls`)
- **Simulation Task**: Task 1 (Call Centre Trends & SLA Operations)
- **Client Stakeholder**: Claire (Call Centre Operations Manager)
- **Scope**: 5,000 Inbound Telephony Interactions (Q1 2021: Jan 1 – Mar 31, 2021) | 8 Dedicated Agents
- **Grain**: 1 Row = 1 Inbound Customer Call Interaction

| Column Name | Raw Excel Type | Power Query M Type | Null Count | Permitted Values / Format | Description & Business Meaning | Galaxy Schema Role |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `Call Id` | Text | `type text` | 0 | `ID0001` - `ID5000` | Unique alphanumeric identifier for each call interaction. | **Primary Key** |
| `Agent` | Text | `type text` | 0 | 8 Agents (`Diane`, `Becky`, `Stewart`, `Greg`, `Jim`, `Joe`, `Martha`, `Dan`) | Name of assigned representative. | **Foreign Key $\to$ `DimAgent[Agent]`** |
| `Date` | Date | `type date` | 0 | `YYYY-MM-DD` (2021-01-01 to 2021-03-31) | Date call entered telephony queue. | **Foreign Key $\to$ `DimDate[Date]`** |
| `Time` | Time / DateTime | `type time` | 0 | `HH:MM:SS` (09:00:00 to 18:00:00) | Exact switch queue arrival timestamp. | Dimension feature (Hour) |
| `Topic` | Text | `type text` | 0 | 5 Topics (`Contract related`, `Technical Support`, `Payment related`, `Admin Support`, `Streaming`) | Customer inquiry classification. | **Foreign Key $\to$ `DimTopic[Topic]`** |
| `Answered (Y/N)` | Text | `type text` | 0 | `'Y'`, `'N'` | Telephony pickup flag (`Y` = 4,054, `N` = 946). | Filtering & Slicing |
| `Resolved` | Text | `type text` | 0 | `'Y'`, `'N'` | First-contact issue resolution flag (`Y` = 3,646, `N` = 1,354). | Performance metric |
| `Speed of answer in seconds` | Integer | `Int64.Type` | **946** | `10` - `125` seconds | Elapsed queue wait duration before pickup. **946 operational nulls for abandoned calls.** | SLA measure calculation |
| `AvgTalkDuration` | Time / Duration | `type time` / `duration`| **946** | `HH:MM:SS` (`00:00:30` - `00:07:00`) | Active agent conversation length. Null when abandoned. | Handle time (AHT) calculation |
| `Satisfaction rating` | Integer | `Int64.Type` | **946** | `1` to `5` | Post-call CSAT rating (1 = Poor, 5 = Excellent). Average: 3.40 / 5.0. | Quality rating calculation |

---

## 🔄 Dataset 02: Customer Retention (`Fact_Churn`)
- **Simulation Task**: Task 2 (Customer Retention & Predictive Churn Risk)
- **Client Stakeholder**: David Chen (VP of Customer Retention)
- **Scope**: 7,043 Telecommunications Subscriber Accounts | 23 Raw Attributes
- **Grain**: 1 Row = 1 Customer Account

| Column Name | Raw Excel Type | Power Query M Type | Null Count | Permitted Values / Format | Description & Business Meaning | Galaxy Schema Role |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `customerID` | Text | `type text` | 0 | Alphanumeric (e.g., `7590-VHVEG`) | Unique customer account identifier. | **Primary Key** |
| `gender` | Text | `type text` | 0 | `'Female'`, `'Male'` | Biological / Demographic gender identity. | Demographic Slicer |
| `SeniorCitizen` | Integer | `Int64.Type` | 0 | `0`, `1` | Binary flag indicating age 65+. | Demographic Slicer |
| `Partner` | Text | `type text` | 0 | `'Yes'`, `'No'` | Marital or cohabitation status. | Demographic Feature |
| `Dependents` | Text | `type text` | 0 | `'Yes'`, `'No'` | Flag indicating financial dependents. | Demographic Feature |
| `tenure` | Integer | `Int64.Type` | 0 | `0` to `72` months | Total duration account has been active. | Retention Cohort Filter |
| `PhoneService` | Text | `type text` | 0 | `'Yes'`, `'No'` | Fixed landline telephone service. | Core Service |
| `MultipleLines` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No phone service'` | Multiple telephone lines contract. | Service Feature |
| `InternetService` | Text | `type text` | 0 | `'DSL'`, `'Fiber optic'`, `'No'` | Internet delivery architecture. | Risk Driver Slicer |
| `OnlineSecurity` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | Value-added cybersecurity add-on. | Retention Buffer |
| `OnlineBackup` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | Cloud backup storage add-on. | Retention Buffer |
| `DeviceProtection` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | Hardware warranty and insurance. | Retention Buffer |
| `TechSupport` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | Dedicated technical assistance contract. | Retention Buffer |
| `StreamingTV` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | IPTV subscription streaming service. | Entertainment Add-on |
| `StreamingMovies` | Text | `type text` | 0 | `'Yes'`, `'No'`, `'No internet service'` | On-demand movie streaming package. | Entertainment Add-on |
| `Contract` | Text | `type text` | 0 | `'Month-to-month'`, `'One year'`, `'Two year'` | Contract commitment horizon. | **Foreign Key $\to$ `DimContract[Contract]`** |
| `PaperlessBilling` | Text | `type text` | 0 | `'Yes'`, `'No'` | Electronic statement billing enrollment. | Billing Channel |
| `PaymentMethod` | Text | `type text` | 0 | `'Electronic check'`, `'Mailed check'`, `'Bank transfer (automatic)'`, `'Credit card (automatic)'` | Payment processing channel. | Risk Driver Slicer |
| `MonthlyCharges` | Decimal | `type number` / `Currency.Type` | 0 | `$18.25` to `$118.75` | Monthly recurring subscription charge. | Revenue at Risk Metric |
| `TotalCharges` | Text / Mixed | `Currency.Type` (Cleaned) | **11 blanks** | Cumulative lifetime billings. | 11 zero-tenure rows contain `' '`; cleaned to 0. | Financial Metric |
| `numAdminTickets` | Integer | `Int64.Type` | 0 | `0` to `5` | Administrative / billing tickets opened. | Operational Friction |
| `numTechTickets` | Integer | `Int64.Type` | 0 | `0` to `9` | Technical trouble tickets opened. | Leading Churn Indicator |
| `Churn` | Text | `type text` | 0 | `'Yes'`, `'No'` | Target churn flag (`Yes` = 1,869, `No` = 5,174). | Target Outcome Metric |

---

## 👥 Dataset 03: Diversity and Inclusion (`Fact_Employees`)
- **Simulation Task**: Task 3 (Executive Diversity & Human Capital Governance)
- **Client Stakeholder**: Chief Diversity Officer & Executive HR Committee (Pharma Group AG)
- **Scope**: 500 Corporate Employee Records (Sheet: `Pharma Group AG`) | 32 Attributes
- **Grain**: 1 Row = 1 Corporate Personnel Record

| Column Name | Raw Excel Type | Power Query M Type | Null Count | Permitted Values / Format | Description & Business Meaning | Galaxy Schema Role |
| :--- | :--- | :--- | :---: | :--- | :--- | :--- |
| `Employee ID` | Integer / Text | `type text` | 0 | `1` to `500` | Unique corporate employee identifier. | **Primary Key** |
| `Gender` | Text | `type text` | 0 | `'Male'`, `'Female'` | Gender identity (`Male` = 295, `Female` = 205). | Primary Parity Metric |
| `Job Level after FY20 promotions`| Text | `type text` | 0 | `1 - Executive` to `6 - Junior Officer` | Organizational rank following FY20 review. | Hierarchy Slicer |
| `New hire FY20?` | Text | `type text` | 0 | `'Y'`, `'N'` | Intake cohort flag during FY20 (`Y` = 66, `N` = 434). | Workforce Inflow |
| `FY20 Performance Rating` | Integer | `Int64.Type` | **87** | `1`, `2`, `3`, `4` | Appraisal score (Null for new hires). | Performance Evaluation |
| `Promotion in FY21?` | Text | `type text` | 0 | `'Yes'`, `'No'` | Target promotion outcome in FY21 (`Yes` = 51, `No` = 449). | Promotion Rate Metric |
| `In base group for Promotion FY21`| Text | `type text` | 0 | `'Yes'`, `'No'` | Eligibility denominator flag for promotion pool. | Eligibility Filter |
| `Target hire balance` | Decimal | `type number` | 0 | `0.5` (50%) | Diversity intake quota target. | Benchmark Standard |
| `FY20 leaver?` | Text | `type text` | 0 | `'Yes'`, `'No'` | Voluntary departure flag during FY20 (`Yes` = 47, `No` = 453). | Turnover Metric |
| `In base group for turnover FY20`| Text | `type text` | 0 | `'Y'`, `'N'` | Eligibility denominator flag for turnover rate. | Turnover Baseline |
| `Department @01.07.2020` | Text | `type text` | 0 | 6 Departments (`Operations`, `Sales & Marketing`, `Strategy`, `Human Resources`, `Finance`, `Legal`) | Baseline business unit. | **Foreign Key $\to$ `DimDepartment[Department]`** |
| `Leaver FY` | Text | `type text` | **453** | `'FY20'` | Departure fiscal year (Null for active staff). | Exit Analysis |
| `Job Level after FY21 promotions`| Text | `type text` | **47** | `1 - Executive` to `6 - Junior Officer` | Final organizational grade (Null for leavers). | Progression Matrix |
| `FTE group` | Text | `type text` | 0 | `'1 FTE'`, `'0.8 FTE'`, `'0.5 FTE'` | Full-time equivalent capacity band. | Capacity Feature |
| `Time type` | Text | `type text` | 0 | `'Full time'`, `'Part time'` | Employment contract schedule. | Contract Feature |
| `Age group` | Text | `type text` | 0 | `20 to 29`, `30 to 39`, `40 to 49`, `50 to 59`, `60+` | Demographic age cohort. | Demographic Slicer |
| `Nationality 1` | Text | `type text` | 0 | Country names (e.g., `Switzerland`, `Germany`, etc.) | Primary citizenship. | **Foreign Key $\to$ `Dim_NationalityCensus[Nationality]`** |
| `Years since last hire` | Integer | `Int64.Type` | 0 | `0` to `28` years | Cumulative tenure at organization. | Tenure Metric |
| `Department & JL group for PRA` | Text | `type text` | 47 | Text (e.g., `2 - Director & Operations`) | Composite Department & Job Level key. | **Foreign Key $\to$ `Dim_PRA_Equity[Department_and_Job_Level]`** |
| `Department & JL group PRA status` | Text | `type text` | 47 | `'Even'`, `'Uneven - Men benefit'`, `'Inconclusive'` | PRA equity classification evaluated via Backing 4. | Equity Metric |
| `Job Level group for PRA` | Text | `type text` | 47 | `2 - Director` to `6 - Junior Officer` | Job Level key for PRA equity evaluation. | Hierarchy Key |
| `Job Level group PRA status` | Text | `type text` | 47 | `'Even'`, `'Uneven - Men benefit'` | Level-wide equity classification from Backing 4. | Equity Metric |

---

## 🏛️ The 4 Auxiliary Backing Tables (`03 Diversity-Inclusion-Dataset.xlsx`)

In `03 Diversity-Inclusion-Dataset.xlsx`, sheets `Backing 1` through `Backing 4` provide enriched employee-level continuous features, promotion progression mappings, nationality census benchmarks, and Performance Review Assessment (PRA) gender equity standards:

### 1. `Backing 1`: Detailed Employee Census (`Dim_EmployeeCensus`)
- **Source Sheet**: `Backing 1` (500 rows, 12 columns)
- **Grain**: 1 Row = 1 Corporate Employee (`Employee ID` 1 to 500)
- **Role in Model**: Enriched 1-to-1 extension dimension connecting to `Fact_Employees[Employee ID]`. Provides continuous numerical variables for tenure, age, and years in grade.

| Column Name | M Data Type | Permitted Values / Range | Description & Analytical Value |
| :--- | :--- | :--- | :--- |
| `Employee ID` | `type text` | `1` to `500` | Primary Key linking 1-to-1 with `Fact_Employees`. |
| `GENDER` | `type text` | `'Male'`, `'Female'` | Gender verification cross-check. |
| `GRADE` | `type text` | `1 - Junior Officer` to `6 - Executive` | Internal grade classification. |
| `FUNCTION` | `type text` | `Operations`, `Sales & Marketing`, `Strategy`, `HR`, `Finance`, `Internal Services` | Functional operating department. |
| `OC_RATE` | `type number` | `1.0`, `0.8`, `0.5` | Occupancy / Full-Time Equivalent capacity rate. |
| `PERFORM` | `Int64.Type` | `1`, `2`, `3`, `4` | Performance rating (1 to 4). |
| `Y_GRADE` | `Int64.Type` | `1` to `15` years | **Years in Current Grade / Job Level**: Crucial for measuring promotion velocity and promotion stagnation! |
| `AGE` | `Int64.Type` | `21` to `64` years | Continuous chronological age in years. |
| `Y_SERVIC` | `Int64.Type` | `0` to `28` years | **Years of Total Organizational Service / Tenure**: Key for analyzing corporate retention. |
| `Nationality` | `type text` | 21 Country names | Country of citizenship. |
| `Rank 2` | `Int64.Type` | `1` to `500` | Relative employee seniority ranking index. |

---

### 2. `Backing 2`: Career Progression & Promotion Ladder (`Dim_CareerLadder`)
- **Source Sheet**: `Backing 2` (5 rows, 2 columns)
- **Grain**: 1 Row = 1 Promotional Step in Corporate Career Ladder
- **Role in Model**: Lookup dimension mapping every starting grade to its next promotional succession grade. In `Fact_Employees`, this table drives the logic for determining `Job Level before FY20 promotions`.

| Column Name | M Data Type | Permitted Values | Succession Flow & Purpose |
| :--- | :--- | :--- | :--- |
| `Source_Grade` (`From_Grade`) | `type text` | `6 - Junior Officer`, `5 - Senior Officer`, `4 - Manager`, `3 - Senior Manager`, `2 - Director` | The starting job level before promotion. |
| `Target_Grade` (`To_Grade`) | `type text` | `5 - Senior Officer`, `4 - Manager`, `3 - Senior Manager`, `2 - Director`, `1 - Executive` | The destination promotional job level upon promotion. |

#### Promotion Hierarchy Mapping Matrix:
```
6 - Junior Officer    ──[Promoted To]──> 5 - Senior Officer
5 - Senior Officer    ──[Promoted To]──> 4 - Manager
4 - Manager           ──[Promoted To]──> 3 - Senior Manager
3 - Senior Manager    ──[Promoted To]──> 2 - Director
2 - Director          ──[Promoted To]──> 1 - Executive (C-Suite)
```

---

### 3. `Backing 3`: Nationality Census & Demographic Benchmark (`Dim_NationalityCensus`)
- **Source Sheet**: `Backing 3` (21 rows, 3 columns)
- **Grain**: 1 Row = 1 Country / Nationality Cohort
- **Role in Model**: Regional diversity benchmark table connecting to `Fact_Employees[Nationality 1]`.

| Column Name | M Data Type | Permitted Values | Headcount | Description & Analytical Value |
| :--- | :--- | :--- | :---: | :--- |
| `Country_ID` | `Int64.Type` | `1` to `21` | — | Numeric country index. |
| `Nationality` | `type text` | 21 Countries | — | Primary Key connecting to `Fact_Employees[Nationality 1]`. |
| `Benchmark_Headcount` | `Int64.Type` | `1` to `224` | **500** | Cumulative employee count per nationality. |

#### Top Nationalities Represented:
1. **Switzerland**: 224 employees (**44.8%** of total workforce)
2. **France**: 92 employees (**18.4%**)
3. **Germany**: 65 employees (**13.0%**)
4. **Spain**: 37 employees (**7.4%**)
5. **Italy**: 32 employees (**6.4%**)
6. **United Kingdom**: 8 employees (**1.6%**)
7. **United States**: 6 employees (**1.2%**)
8. **Austria**: 5 employees (**1.0%**)
9. **Netherlands**: 4 employees (**0.8%**)
10. **Other Countries (12 nations)**: 27 employees (**5.4%**)

---

### 4. `Backing 4`: Performance Review Assessment (PRA) Equity Matrix (`Dim_PRA_Equity`)
- **Source Sheet**: `Backing 4` (30 rows for Department & Level combinations, 5 rows for Level summaries)
- **Grain**: 1 Row = 1 Job Level & Department Cohort
- **Role in Model**: Governance benchmark table classifying whether appraisal outcomes and promotions are statistically equitable across genders. Connects to `Fact_Employees[Department & JL group for PRA]`.

| Column Name | M Data Type | Permitted Values | Description & Governance Meaning |
| :--- | :--- | :--- | :--- |
| `Department_and_Job_Level` | `type text` | e.g., `3 - Senior Manager & Sales & Marketing` | Composite Primary Key linking to `Fact_Employees`. |
| `PRA_Status` | `type text` | `'Even'`, `'Uneven - Men benefit'`, `'Inconclusive'` | Statistical gender balance evaluation outcome. |
| `Benchmark_Cohort_Size` | `Int64.Type` | `1` to `98` | Total personnel evaluated in this departmental tier. |

#### Critical Empirical Governance Findings from `Backing 4`:
- **Uneven - Men Benefit Cohorts**:
  - `3 - Senior Manager & Internal Services`
  - `3 - Senior Manager & Sales & Marketing`
  - `4 - Manager & Sales & Marketing`
  - Overall Job Level `3 - Senior Manager` is classified across the company as **`Uneven - Men benefit`**!
- **Even / Balanced Cohorts**:
  - `2 - Director & Operations`
  - `3 - Senior Manager & Operations`
  - `4 - Manager & Operations`, `5 - Senior Officer & Operations`, `6 - Junior Officer & Operations`
  - Overall Job Levels `2 - Director`, `4 - Manager`, `5 - Senior Officer`, and `6 - Junior Officer` are classified as **`Even`**.
- **Inconclusive Cohorts (Small Sample Size $<5$)**:
  - All Director and Senior Manager positions within `Finance`, `HR`, and `Strategy` (sample sizes of 1 to 4 employees preclude statistical significance).

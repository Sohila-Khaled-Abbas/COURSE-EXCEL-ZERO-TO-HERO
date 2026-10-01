---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Master Data Dictionary & Galaxy Schema Specs
description: Comprehensive field definitions, types, null handling, and relationship keys across 3 datasets
---

# 3. Master Data Dictionary & Galaxy Schema Specifications

This master dictionary details the schema, data types, null distributions, business definitions, and relationship keys for all three datasets and extracted dimensions within the **PwC Switzerland Digital Transformation Galaxy Schema**.

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
| `Nationality 1` | Text | `type text` | 0 | Country names (e.g., `Switzerland`, `Germany`, etc.) | Primary citizenship. | Diversity Feature |
| `Years since last hire` | Integer | `Int64.Type` | 0 | `0` to `28` years | Cumulative tenure at organization. | Tenure Metric |

---

## 🏛️ Extracted Dimension Tables in the Galaxy Schema

### 1. `DimDate` (Extracted from `Fact_Calls[Date]`)
- **Grain**: 1 Row = 1 Calendar Day (90 distinct days in Q1 2021)
- **Primary Key**: `Date`
- **Attributes**: `Year` (2021), `Quarter` ("Q1"), `Month` (1–3), `Month Name` ("January", "February", "March"), `Day` (1–31), `Day of Week` ("Monday"–"Sunday"), `Is_Weekend` (0/1).

### 2. `DimAgent` (Extracted from `Fact_Calls[Agent]`)
- **Grain**: 1 Row = 1 Support Representative (8 dedicated agents)
- **Primary Key**: `Agent`
- **Attributes**: `Agent Name`, `Department` ("Customer Operations"), `Target_CSAT` (3.50), `Target_Answer_Rate` (0.85).

### 3. `DimTopic` (Extracted from `Fact_Calls[Topic]`)
- **Grain**: 1 Row = 1 Inquiry Classification (5 topics)
- **Primary Key**: `Topic`
- **Attributes**: `Topic Name`, `Category` ("Technical Support", "Finance & Accounts", "Administrative"), `Target_SLA_Seconds` (60s).

### 4. `DimContract` (Extracted from `Fact_Churn[Contract]`)
- **Grain**: 1 Row = 1 Contract Horizon (3 terms)
- **Primary Key**: `Contract`
- **Attributes**: `Contract Term` (`Month-to-month`, `One year`, `Two year`), `Commitment_Months` (1, 12, 24), `Risk_Tier` ("High Risk", "Moderate Risk", "Low Risk").

### 5. `DimDepartment` (Extracted from `Fact_Employees[Department @01.07.2020]`)
- **Grain**: 1 Row = 1 Corporate Division (6 business units)
- **Primary Key**: `Department`
- **Attributes**: `Department Name` (`Operations`, `Sales & Marketing`, `Strategy`, `Human Resources`, `Finance`, `Internal Audit / Legal`), `Division_Type` ("Revenue Generating" vs "Corporate Support").

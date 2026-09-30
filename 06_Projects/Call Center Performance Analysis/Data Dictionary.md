---
type: project-documentation
project_name: PwC Call Center Performance Analysis
section: Data Dictionary
created: 2026-09-28
updated: 2026-10-01
---

# 3. Master Data Dictionary: PwC Switzerland Simulation Suite

This master dictionary details the schema, data types, null distributions, and business definitions for all three datasets within the **PwC Switzerland Digital Transformation Virtual Case Experience**.

---

## 📞 Dataset 01: The Call Centre Trends (`01 Call-Center-Dataset.xlsx`)
- **Simulation Task**: Task 1 (Active Capstone Project)
- **Client Stakeholder**: Claire (Call Centre Manager)
- **Scope**: 5,000 Inbound Inquiries (Q1 2021) | 8 Dedicated Agents

| Column Name | Official Data Type | Null Count | Allowed Values / Format | Description & Business Meaning |
| :--- | :--- | :---: | :--- | :--- |
| `Call Id` | Text | 0 | `ID0001` - `ID5000` | Unique alphanumeric identifier for each call interaction (Primary Key). |
| `Agent` | Text | 0 | 8 Agents: `Diane`, `Becky`, `Stewart`, `Greg`, `Jim`, `Joe`, `Martha`, `Dan` | Name of the customer service representative assigned to the call. |
| `Date` | Date | 0 | `YYYY-MM-DD` (2021-01-01 to 2021-03-31) | The calendar date on which the call arrived in queue. |
| `Time` | Time / DateTime | 0 | `HH:MM:SS` (09:00:00 to 18:00:00) | Exact telephony switch timestamp when the customer dialed in. |
| `Topic` | Text | 0 | 5 Topics: `Contract related`, `Technical Support`, `Payment related`, `Admin Support`, `Streaming` | Primary categorization of customer inquiry. |
| `Answered (Y/N)` | Text | 0 | `Y`, `N` | Binary telephony pickup flag: `Y` = Connected (4,054), `N` = Abandoned (946). |
| `Resolved` | Text | 0 | `Y`, `N` | Binary issue resolution flag: `Y` = Resolved (3,646), `N` = Unresolved (1,354). |
| `Speed of answer in seconds` | Decimal / Int | 946 | `10` - `125` seconds | Duration caller waited in queue before pickup. **946 nulls reflect abandoned calls.** |
| `AvgTalkDuration` | Time / Duration | 946 | `HH:MM:SS` (`00:00:30` - `00:07:00`) | Elapsed talk time between customer and agent. Null for abandoned calls. |
| `Satisfaction rating` | Decimal / Int | 946 | `1` to `5` | Post-call CSAT rating (1 = Very Dissatisfied, 5 = Very Satisfied). Average: 3.40. |

---

## 🔄 Dataset 02: The Customer Retention (`02 Churn-Dataset.xlsx`)
- **Simulation Task**: Task 2 (Customer Retention & Predictive Risk Modeling)
- **Client Stakeholder**: Retention Department Manager
- **Scope**: 7,043 Customer Records | 25 Service, Contract & Ticket Attributes

| Column Name | Official Data Type | Description & Analytical Significance |
| :--- | :--- | :--- |
| `CustID` | Text | Unique customer account identifier (Primary Key). |
| `Gender` | Text | Customer gender identity (`Male`, `Female`). |
| `SeniorCitizen` | Text | Demographic flag (`Yes`, `No`). |
| `Partner` | Text | Marital / cohabitation status (`Yes`, `No`). |
| `Dependents` | Text | Flag indicating whether customer has financial dependents (`Yes`, `No`). |
| `Tenure_(Month)` | Whole Number | Continuous duration in months the customer has subscribed to services. |
| `Phone` | Text | Subscription to telephony landline (`Yes`, `No`). |
| `MultipleLines` | Text | Multiple phone lines service flag (`Yes`, `No`, `No phone service`). |
| `Internet` | Text | Internet service provider tier (`DSL`, `Fiber optic`, `No`). |
| `OnlineSecurity` | Text | Value-added cybersecurity add-on (`Yes`, `No`, `No internet service`). |
| `OnlineBackup` | Text | Cloud data backup service add-on (`Yes`, `No`, `No internet service`). |
| `DeviceProtection` | Text | Hardware warranty & insurance coverage (`Yes`, `No`, `No internet service`). |
| `TechSupport` | Text | Premium technical support contract (`Yes`, `No`, `No internet service`). |
| `StreamingTV` | Text | Television IPTV streaming package (`Yes`, `No`, `No internet service`). |
| `StreamingMovies` | Text | On-demand movie streaming package (`Yes`, `No`, `No internet service`). |
| `Contract` | Text | Contract commitment horizon (`Month-to-month`, `One year`, `Two year`). |
| `PaperlessBilling` | Text | Electronic statement billing enrollment (`Yes`, `No`). |
| `PaymentMethod` | Text | Payment channel (`Electronic check`, `Mailed check`, `Bank transfer`, `Credit card`). |
| `MonthlyCharges` | Decimal Number | Monthly recurring subscription charge billed to customer. |
| `TotalCharges` | Currency / Fixed Decimal | Lifetime cumulative billings across account tenure. |
| `#AdminTickets` | Whole Number | Total administrative and billing complaints submitted. |
| `#TechTickets` | Whole Number | Total technical support trouble tickets opened. |
| `Churn` | Text | Target outcome flag indicating account termination (`Yes`, `No`). |
| `SubsPeriod` | Text | Discretized tenure cohort grouping. |
| `PaymentGroup` | Text | Aggregated billing category (Automated vs Manual payment). |

---

## 👥 Dataset 03: Diversity and Inclusion (`03 Diversity-Inclusion-Dataset.xlsx`)
- **Simulation Task**: Task 3 (Executive Gender Parity & Human Resources BI)
- **Client Stakeholder**: Human Resources Executive Leadership (Pharma Group AG)
- **Scope**: 500 Corporate Employee Records | 32 Personnel & Promotion Attributes

| Column Name | Official Data Type | Description & Organizational Significance |
| :--- | :--- | :--- |
| `Employee ID` | Text | Unique corporate personnel identification number (Primary Key). |
| `Gender` | Text | Biological/Self-identified gender (`Male`, `Female`). |
| `Job Level after FY20 promotions`| Text | Organizational hierarchy tier following FY20 appraisal cycle (Executive to Staff). |
| `New hire FY20?` | Text | Cohort flag indicating recruitment within fiscal year 2020 (`Y`, `N`). |
| `FY20 Performance Rating` | Decimal Number | Annual performance evaluation score (1.0 to 5.0). |
| `Promotion in FY21?` | Text | Succession promotion flag awarded in fiscal year 2021 (`Yes`, `No`). |
| `In base group for Promotion FY21`| Text | Eligibility filter flag for FY21 promotion pool. |
| `Target hire balance` | Decimal Number | Benchmark diversity intake quota percentage. |
| `FY20 leaver?` | Text | Turnover flag indicating resignation or departure during FY20 (`Yes`, `No`). |
| `In base group for turnover FY20`| Text | Denominator baseline cohort for FY20 turnover rate calculation. |
| `Department @01.07.2020` | Text | Corporate operational division as of baseline census date. |
| `Leaver FY` | Text | Fiscal year of employee termination. |
| `Job Level after FY21 promotions`| Text | Final corporate hierarchy rank following FY21 review. |
| `Last Department in FY20` | Text | Final departmental assignment prior to departure or year-end. |
| `FTE group` | Decimal Number | Full-Time Equivalent capacity fraction (1.0 = Full Time, 0.5 = Part Time). |
| `Time type` | Text | Employment model (`Full-time`, `Part-time`). |
| `Department & JL group PRA status`| Text | Performance Review Assessment calibration status. |
| `Department & JL group for PRA` | Text | Combined analytical cohort grouping. |
| `Job Level group PRA status` | Text | Level-specific PRA compliance metric. |
| `Job Level group for PRA` | Text | Hierarchical tier classification for PRA evaluation. |
| `Time in Job Level @01.07.2020` | Whole Number | Tenure in current grade measured in months. |
| `Job Level before FY20 promotions`| Text | Starting grade prior to FY20 promotions. |
| `Promotion in FY20?` | Text | Promotion flag awarded in fiscal year 2020 (`Yes`, `No`). |
| `FY19 Performance Rating` | Decimal Number | Historical appraisal score from prior fiscal year. |
| `Age group` | Text | Demographic age bracket (<20, 20-29, 30-39, 40-49, 50-59, 60+). |
| `Age @01.07.2020` | Whole Number | Exact chronological age in years at census baseline. |
| `Nationality 1` | Text | Primary citizenship / nationality identifier. |
| `Region group: nationality 1` | Text | Continental region grouping. |
| `Broad region group: nationality 1`| Text | Macro geographic economic zone. |
| `Last hire date` | Date | Date of initial onboarding contract execution. |
| `Years since last hire` | Whole Number | Cumulative organizational tenure in full years. |
| `Rand` | Decimal Number | Pseudorandom uniform float [0, 1] used for test/validation sampling. |


---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
source_ecosystem: PwC Switzerland Digital Transformation / Forage Virtual Case Experience
canonical_url: https://triwgani.github.io/pwc_digital.transformation/
github_mirror: https://github.com/Boomslang-Maverick/PWC-Forage-Power-BI-Virtual-Experience
timeframe: Enterprise Analytical Baseline (Q1 2021 & FY20/FY21)
total_records: 12543 (5,000 Calls + 7,043 Churn Accounts + 500 Employee Records) + Auxiliary Backing Tables
galaxy_schema: VertiPaq In-Memory Fact Constellation (3 Facts, 9 Dimensions & Lookups)
created: 2026-09-28
updated: 2026-10-01
tags:
- pwc
- galaxy-schema
- call-center
- customer-churn
- diversity-inclusion
- backing-sheets
- forage
- power-bi
- digital-transformation
- dataset-documentation
title: Tripartite Dataset Provenance & Galaxy Specifications
description: Origin, authenticity, schemas, and Backing 1-4 lookup tables across all 3 PwC datasets
---

# 2. Master Dataset Documentation: The Complete PwC Tripartite Suite

> [!abstract] Provenance & Project Context
> The datasets analyzed in this project originate from the prestigious **PwC Switzerland Digital Transformation Virtual Case Experience**, hosted on **Forage**. Designed to simulate real-world management consulting engagements, the simulation comprises three distinct operational, financial, and human capital datasets. 
> Rather than analyzing these in isolation, this project unifies all three into an enterprise-grade **Galaxy Schema (Fact Constellation Schema)** within the **Power Pivot (VertiPaq Engine)** layer, actively incorporating all primary and auxiliary lookup sheets (`Backing 1` through `Backing 4`).

---

## 🌐 Official Sources, Provenance & CDN Links

```mermaid
flowchart TD
    PWC["PwC Switzerland Digital Transformation Suite\n(Forage Enterprise Simulation)"]
    
    T1["Dataset 01: Call Centre Trends\n(01 Call-Center-Dataset.xlsx)\n• 5,000 Inbound Inquiries | 8 Agents | Q1 2021\n• Fact_Calls | DimDate | DimAgent | DimTopic"]
    T2["Dataset 02: Customer Retention\n(02 Churn-Dataset.xlsx)\n• 7,043 Telco Customer Accounts | 23 Attributes\n• Fact_Churn | DimContract"]
    T3["Dataset 03: Diversity & Inclusion\n(03 Diversity-Inclusion-Dataset.xlsx)\n• 500 Corporate Employee Records | 32 Attributes\n• Fact_Employees | DimDepartment\n• Backing 1 to 4 Auxiliary Lookup Tables"]
    
    PWC --> T1
    PWC --> T2
    PWC --> T3
    
    style PWC fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style T1 fill:#e3f2fd,stroke:#1565c0,stroke-width:2px
    style T2 fill:#fff3e0,stroke:#ef6c00,stroke-width:2px
    style T3 fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px
```

### 📦 The Complete Tripartite Simulation Suite

| Dataset # | Official Filename | Sheets Ingested | Row Count | Primary Domain | Direct Official CDN Download Link |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | `01 Call-Center-Dataset.xlsx` | `Sheet1` | 5,000 | Customer Operations & Telephony SLAs | [Download 01 Call-Center-Dataset.xlsx](https://cdn.theforage.com/vinternships/companyassets/4sLyCPgmsy8DA6Dh3/01%20Call-Center-Dataset.xlsx) |
| **02** | `02 Churn-Dataset.xlsx` | `01 Churn-Dataset` | 7,043 | Customer Success & Revenue Risk | [Download 02 Churn-Dataset.xlsx](https://cdn.theforage.com/vinternships/companyassets/4sLyCPgmsy8DA6Dh3/02%20Churn-Dataset.xlsx) |
| **03** | `03 Diversity-Inclusion-Dataset.xlsx` | `Pharma Group AG`<br>`Backing 1` (Census)<br>`Backing 2` (Career Ladder)<br>`Backing 3` (Nationality)<br>`Backing 4` (PRA Equity) | 500<br>500<br>5<br>21<br>35 | Human Capital & Executive Governance | [Download 03 Diversity-Inclusion-Dataset.xlsx](https://cdn.theforage.com/vinternships/companyassets/4sLyCPgmsy8DA6Dh3/03%20Diversity-Inclusion-Dataset.xlsx) |

---

## 📞 Dataset 01: The Call Centre Trends (`Fact_Calls`)

### Scope & Summary Statistics
- **Total Inbound Calls**: 5,000 records spanning January 1 to March 31, 2021 (90 calendar days).
- **Roster**: 8 Dedicated Agents (`Becky`, `Dan`, `Diane`, `Greg`, `Jim`, `Joe`, `Martha`, `Stewart`).
- **Answer Rate**: **81.08%** (4,054 answered / 5,000 total).
- **Abandonment Rate**: **18.92%** (946 abandoned / 5,000 total).
- **First-Contact Resolution (Answered)**: **89.94%** (3,646 resolved / 4,054 answered).
- **Average Speed of Answer (ASA)**: **67.52 seconds**.
- **Average Talk Duration (AHT)**: **3 minutes 45 seconds** (225 seconds).
- **Average Customer Satisfaction (CSAT)**: **3.40 / 5.00**.

### Schema Specification
| Field Name | Data Type | Null Count | Sample Value | Role in Galaxy Model |
| :--- | :--- | :---: | :--- | :--- |
| `Call Id` | Text | 0 | `ID0001` | Primary Key |
| `Agent` | Text | 0 | `Diane` | Foreign Key $\to$ `DimAgent[Agent]` |
| `Date` | Date | 0 | `2021-01-01` | Foreign Key $\to$ `DimDate[Date]` |
| `Time` | Time | 0 | `09:12:58` | Queue arrival timestamp |
| `Topic` | Text | 0 | `Contract related` | Foreign Key $\to$ `DimTopic[Topic]` |
| `Answered (Y/N)` | Text | 0 | `Y` | Telephony pickup flag (`Y`/`N`) |
| `Resolved` | Text | 0 | `Y` | Issue resolution outcome (`Y`/`N`) |
| `Speed of answer in seconds` | Integer | 946 | `109` | Queue hold wait time (Null when abandoned) |
| `AvgTalkDuration` | Time | 946 | `00:03:45` | Conversation duration (Null when abandoned) |
| `Satisfaction rating` | Integer | 946 | `4` | CSAT survey score 1–5 (Null when abandoned) |

---

## 🔄 Dataset 02: Customer Retention & Churn Risk (`Fact_Churn`)

### Scope & Summary Statistics
- **Total Subscriber Accounts**: 7,043 telecommunications customers.
- **Churn Count & Rate**: **1,869 churned customers (26.54% churn rate)**.
- **Monthly Recurring Revenue (MRR)**: $456,116.60 total monthly billings.
- **Monthly Churn Revenue at Risk**: **$139,130.85 per month** ($1,669,570.20 annualized).
- **Average Customer Tenure**: 32.37 months (Churners: 17.98 months vs Retained: 37.57 months).
- **Contract Vulnerability**:
  - Month-to-Month: 3,875 accounts, **42.71% churn rate** (1,655 churned).
  - One Year: 1,473 accounts, **11.27% churn rate** (166 churned).
  - Two Year: 1,695 accounts, **2.83% churn rate** (48 churned).
- **Internet Service Breakdown**:
  - Fiber Optic: 3,096 accounts, **41.89% churn rate** (1,297 churned).
  - DSL: 2,421 accounts, **18.96% churn rate** (459 churned).
  - No Internet: 1,526 accounts, **7.40% churn rate** (113 churned).

### Schema Specification
| Field Name | Data Type | Null Count | Sample Value | Role in Galaxy Model |
| :--- | :--- | :---: | :--- | :--- |
| `customerID` | Text | 0 | `7590-VHVEG` | Primary Key |
| `gender` | Text | 0 | `Female` | Demographic slice (`Female`, `Male`) |
| `SeniorCitizen` | Integer | 0 | `0` | Binary demographic flag (`0`, `1`) |
| `Partner` | Text | 0 | `Yes` | Marital status flag (`Yes`, `No`) |
| `Dependents` | Text | 0 | `No` | Dependents flag (`Yes`, `No`) |
| `tenure` | Integer | 0 | `1` | Continuous months subscribed |
| `PhoneService` | Text | 0 | `No` | Fixed telephone landline subscription |
| `MultipleLines` | Text | 0 | `No phone service`| Phone line tiers |
| `InternetService` | Text | 0 | `DSL` | Internet technology (`DSL`, `Fiber optic`, `No`) |
| `OnlineSecurity` | Text | 0 | `No` | Cybersecurity add-on service |
| `OnlineBackup` | Text | 0 | `Yes` | Cloud backup add-on service |
| `DeviceProtection` | Text | 0 | `No` | Hardware warranty add-on |
| `TechSupport` | Text | 0 | `No` | Dedicated tech support contract |
| `StreamingTV` | Text | 0 | `No` | IPTV television package |
| `StreamingMovies` | Text | 0 | `No` | VOD streaming package |
| `Contract` | Text | 0 | `Month-to-month` | Foreign Key $\to$ `DimContract[Contract]` |
| `PaperlessBilling` | Text | 0 | `Yes` | Electronic billing flag |
| `PaymentMethod` | Text | 0 | `Electronic check`| Payment channel |
| `MonthlyCharges` | Decimal | 0 | `29.85` | Monthly recurring subscription charge |
| `TotalCharges` | Decimal | 11 blanks | `29.85` | Cumulative lifetime charges (11 blanks cleaned to 0) |
| `numAdminTickets` | Integer | 0 | `0` | Billing/admin tickets logged |
| `numTechTickets` | Integer | 0 | `0` | Technical support tickets logged |
| `Churn` | Text | 0 | `No` | Target outcome flag (`Yes`, `No`) |

---

## 👥 Dataset 03: Diversity & Inclusion Suite (`03 Diversity-Inclusion-Dataset.xlsx`)

The Diversity & Inclusion workbook contains **5 distinct sheets**, consisting of the core employee fact table and four rich auxiliary lookup and benchmark dimensions:

### 1. `Pharma Group AG` (`Fact_Employees`)
- **Total Corporate Personnel**: 500 employees.
- **Gender Balance**: 295 Male (59.0%), 205 Female (41.0%).
- **Turnover & Promotions**: 47 leavers in FY20 (9.40% turnover rate); 51 promoted in FY21 (10.20% promotion rate).
- **Executive Glass Ceiling**: Female representation plummets from **50.56% at Junior Officer (Job Level 6)** down to **12.50% at Executive Director (Job Level 1)**.

### 2. `Backing 1`: Detailed Employee Census (`Dim_EmployeeCensus`)
- **Scope**: 500 rows $\times$ 12 columns.
- **Grain**: 1 Row = 1 Corporate Personnel Record (`Employee ID` 1 to 500).
- **Core Features**:
  - `Y_GRADE`: Years in current grade / job level (continuous integer 1 to 15).
  - `Y_SERVIC`: Years of total corporate service / tenure (continuous integer 0 to 28).
  - `AGE`: Exact chronological age in years (21 to 64).
  - `OC_RATE`: Occupancy rate (Full-Time Equivalent fraction: 1.0, 0.8, 0.5).
  - `Rank 2`: Seniority index ranking.
- **Analytical Value**: Connects 1-to-1 to `Fact_Employees` to allow granular analysis of time-in-grade before promotion and retention curves by service tenure.

### 3. `Backing 2`: Promotion Progression Ladder (`Dim_CareerLadder`)
- **Scope**: 5 rows $\times$ 2 columns.
- **Grain**: 1 Row = 1 Promotional Level Step.
- **Succession Mapping**:
  - `6 - Junior Officer` $\longrightarrow$ `5 - Senior Officer`
  - `5 - Senior Officer` $\longrightarrow$ `4 - Manager`
  - `4 - Manager` $\longrightarrow$ `3 - Senior Manager`
  - `3 - Senior Manager` $\longrightarrow$ `2 - Director`
  - `2 - Director` $\longrightarrow$ `1 - Executive`
- **Analytical Value**: Provides the formal corporate career progression taxonomy used to calculate succession pipelines and step-down grade logic.

### 4. `Backing 3`: Nationality Census Benchmark (`Dim_NationalityCensus`)
- **Scope**: 21 rows $\times$ 3 columns.
- **Grain**: 1 Row = 1 Country Nationality.
- **Demographic Benchmark**:
  - Sums to exactly **500 total employees**.
  - Top Cohorts: Switzerland (224, 44.8%), France (92, 18.4%), Germany (65, 13.0%), Spain (37, 7.4%), Italy (32, 6.4%), UK (8, 1.6%), USA (6, 1.2%).
- **Analytical Value**: Connects to `Fact_Employees[Nationality 1]` to benchmark domestic Swiss workforce vs European and global expatriate talent.

### 5. `Backing 4`: Performance Review Assessment (PRA) Equity Matrix (`Dim_PRA_Equity`)
- **Scope**: 30 Department & Level combinations + 5 Job Level summaries.
- **Grain**: 1 Row = 1 Departmental Tier Cohort.
- **Equity Classifications**:
  - Evaluates gender equity across reviews: `Even`, `Uneven - Men benefit`, or `Inconclusive`.
  - **Key Finding**: Highlights that `3 - Senior Manager` roles in `Sales & Marketing` and `Internal Services` exhibit statistically significant gender imbalances favoring men.
- **Analytical Value**: Provides the regulatory and governance benchmark for corporate DEI audits.

---

## 💾 VertiPaq Columnar Storage & Compression Footprint

Because all datasets and lookup tables are loaded into the **VertiPaq In-Memory Engine**, memory footprint is heavily determined by **column cardinality** (number of distinct values):

```mermaid
flowchart LR
    subgraph Storage ["VertiPaq Columnar Compression in Power Pivot"]
        direction TB
        Dictionary["1. Dictionary Encoding\n(Substitutes strings with integer IDs)"]
        BitPack["2. Bit-Packing\n(Compresses IDs to minimum bits)"]
        RLE["3. Run-Length Encoding (RLE)\n(Compresses repeating adjacent values)"]
        
        Dictionary --> BitPack --> RLE
    end
```

- **Low Cardinality Columns (< 10 distinct values)**: `Contract` (3), `InternetService` (3), `Topic` (5), `Department` (6), `Agent` (8), `Answered (Y/N)` (2), `Churn` (2), `Gender` (2), `PRA_Status` (3). These achieve compression ratios exceeding **90%**!
- **Lookup Dimensions**: The auxiliary Backing dimensions (`Dim_CareerLadder` [5 rows], `Dim_NationalityCensus` [21 rows], `Dim_PRA_Equity` [35 rows]) have negligible memory footprints ($< 15\text{ KB}$ combined) while vastly enriching analytical drill-down capability.

---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
document: KPI Dictionary
version: 2.0
target_platform: Microsoft Excel (.xlsm) & Power Pivot DAX
date: 2026-10-01
author: Senior Excel Dashboard Architect & Business Intelligence Specialist
tags: [pwc-case-study, kpi-dictionary, dax-measures, business-metrics, call-center, customer-retention, diversity-inclusion]
---

# 📖 Master KPI Dictionary: PwC Digital Transformation Suite

> [!abstract] Architectural Governance & Metric Standards
> Every visual component and KPI card in **`PwC_Digital_Transformation_Suite.xlsm`** is governed by this Master KPI Dictionary. In accordance with enterprise analytics engineering best practices, every metric is defined across 11 mandatory dimensions: **Business Definition, Mathematical & DAX Formula, Data Source, Grain, Slicing Dimensions, Target Benchmark, Reporting Frequency, Operational Owner, Analytical Interpretation, and Data Caveats**.
> No metric is permitted on the dashboard without an entry in this dictionary.

---

## 📞 Domain 1: Call Centre Operations & Service Levels (Task 1)

### KPI 1.1: Total Calls Offered (Gross Inbound Demand)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Total Calls Offered** |
| **Business Definition** | The total gross volume of inbound telephony calls entering the contact center queue during the reporting period. |
| **Formula (DAX)** | `Total Calls = DISTINCTCOUNT(Fact_Calls[Call Id])` |
| **Formula (Excel Grid)**| `=COUNTA(Fact_Calls[Call Id])` |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | Individual Call Event (`Call Id`) |
| **Dimensions** | `Date`, `Time (Hour)`, `Topic`, `Agent` |
| **Target Benchmark** | Capacity threshold: $\le 1,800 \text{ calls/month}$ (Baseline: 5,000 Q1 total) |
| **Frequency** | Daily / Shift Hourly |
| **Owner** | Claire (Call Centre Operations Manager) |
| **Interpretation** | Measures gross customer demand. Rapid spikes indicate external service outages, marketing campaign launches, or billing cycles. |
| **Caveats** | Includes both answered calls and callers who hung up before being connected (abandoned). |

---

### KPI 1.2: Call Abandonment Rate (%)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Call Abandonment Rate (%)** |
| **Business Definition** | The percentage of total inbound callers who disconnected from the queue before speaking with an agent. |
| **Formula (DAX)** | `Abandoned Rate = DIVIDE(CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "N"), [Total Calls], 0)` |
| **Formula (Excel Grid)**| `=COUNTIF(Fact_Calls[Answered (Y/N)], "N") / COUNTA(Fact_Calls[Call Id])` |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | Aggregate ratio over call population |
| **Dimensions** | `Date`, `Day Name`, `Topic`, `Time (Hour)` |
| **Target Benchmark** | $\le 10.0\%$ (Strict SLA); **Current baseline 18.92% represents an Operational SLA Breach** |
| **Frequency** | Hourly / Daily SLA Monitoring |
| **Owner** | Shift Supervisors & Claire |
| **Interpretation** | Primary indicator of customer friction and staffing deficit. High abandonment leads directly to lost revenue and low CSAT. |
| **Caveats** | Abandoned calls have null values for talk duration, speed of answer, and satisfaction ratings. |

---

### KPI 1.3: Average Speed of Answer (ASA)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Average Speed of Answer (Seconds)** |
| **Business Definition** | The average elapsed wait time (in seconds) that a connected caller spent in queue before an agent answered. |
| **Formula (DAX)** | `Avg Speed of Answer = DIVIDE(CALCULATE(SUM(Fact_Calls[Speed of answer in seconds]), Fact_Calls[Answered (Y/N)] = "Y"), CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y"), 0)` |
| **Formula (Excel Grid)**| `=AVERAGE(Fact_Calls[Speed of answer in seconds])` |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | Seconds per answered call |
| **Dimensions** | `Agent`, `Topic`, `Day Name`, `Date` |
| **Target Benchmark** | $\le 45.0 \text{ seconds}$ (Baseline: $67.52 \text{ seconds}$) |
| **Frequency** | Shift Real-Time / Daily |
| **Owner** | Workforce Management & Shift Leads |
| **Interpretation** | Direct proxy for agent availability and queue absorption capacity. |
| **Caveats** | Excludes abandoned calls (which did not wait long enough to be answered). |

---

### KPI 1.4: Average Handle Time (AHT)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Average Handle Time (AHT / Talk Duration)** |
| **Business Definition** | The average duration of customer conversation per answered call. |
| **Formula (DAX)** | `AHT = CALCULATE(AVERAGE(Fact_Calls[AvgTalkDuration]), Fact_Calls[Answered (Y/N)] = "Y")` |
| **Formula (Excel Grid)**| `=AVERAGE(Fact_Calls[AvgTalkDuration])` (Formatted as `[m]"m "ss"s"`) |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | Duration per connected call |
| **Dimensions** | `Agent`, `Topic` |
| **Target Benchmark** | $00:03:30$ to $00:04:00$ (Baseline: $00:03:45$, or $225 \text{ seconds}$) |
| **Frequency** | Weekly / Monthly Agent Scorecards |
| **Owner** | Team Leads (Marcus & Sarah) |
| **Interpretation** | Measures agent efficiency and problem complexity. Must be evaluated alongside First-Contact Resolution to prevent rushing callers. |
| **Caveats** | Unanswered calls have null durations; stored as time serials in Excel ($1.0 = 24 \text{ hours}$). Must be formatted with custom number mask. |

---

### KPI 1.5: First-Contact Resolution Rate (FCR - Answered Calls)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Call Resolution Rate (%) — Answered Calls** |
| **Business Definition** | The proportion of answered calls successfully resolved by the receiving agent. |
| **Formula (DAX)** | `Call Resolution Rate (%) = DIVIDE(CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y", Fact_Calls[Resolved] = "Y"), CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y"), 0)` |
| **Formula (Excel Grid)**| `=COUNTIFS(Fact_Calls[Answered (Y/N)], "Y", Fact_Calls[Resolved], "Y") / COUNTIF(Fact_Calls[Answered (Y/N)], "Y")` |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | Percentage of answered inquiries |
| **Dimensions** | `Agent`, `Topic` |
| **Target Benchmark** | $\ge 85.0\%$ (Baseline: **89.94%** — Strong Performance) |
| **Frequency** | Monthly Operational Review |
| **Owner** | Quality Assurance & Training Lead |
| **Interpretation** | Evaluates agent technical capability and procedural empowerment. |
| **Caveats** | Distinct from Gross Resolution Rate ($72.92\%$), which includes abandoned calls in the denominator. |

---

### KPI 1.6: Customer Satisfaction Score (CSAT)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Customer Satisfaction Score (CSAT)** |
| **Business Definition** | Average post-call customer satisfaction rating on an integer scale from 1 (Very Dissatisfied) to 5 (Very Satisfied). |
| **Formula (DAX)** | `Satisfaction Score = CALCULATE(AVERAGE(Fact_Calls[Satisfaction rating]), Fact_Calls[Answered (Y/N)] = "Y")` |
| **Formula (Excel Grid)**| `=AVERAGE(Fact_Calls[Satisfaction rating])` (Formatted as `0.00" / 5.0"`) |
| **Data Source** | `01 Call-Center-Dataset.xlsx` (`Fact_Calls`) |
| **Grain** | 1 to 5 scale per surveyed call |
| **Dimensions** | `Agent`, `Topic`, `Resolved` |
| **Target Benchmark** | $\ge 3.80 / 5.0$ (Baseline: **3.40 / 5.0** — Below Target) |
| **Frequency** | Daily / Weekly Executive Pulse |
| **Owner** | Claire & Customer Experience Committee |
| **Interpretation** | Primary executive metric reflecting customer perception and brand health. |
| **Caveats** | Survey completion is conditional upon call pickup and resolution; unresolved calls drag CSAT down significantly. |

---

## 🔄 Domain 2: Customer Retention & Churn Risk (Task 2)

### KPI 2.1: Customer Churn Rate (%)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Customer Churn Rate (%)** |
| **Business Definition** | The percentage of total active subscriber accounts who canceled their service contract. |
| **Formula (DAX)** | `Churn Rate = DIVIDE(CALCULATE(COUNT(Fact_Churn[customerID]), Fact_Churn[Churn] = "Yes"), COUNT(Fact_Churn[customerID]), 0)` |
| **Formula (Excel Grid)**| `=COUNTIF(Fact_Churn[Churn], "Yes") / COUNTA(Fact_Churn[customerID])` |
| **Data Source** | `02 Churn-Dataset.xlsx` (`Fact_Churn`) |
| **Grain** | Percentage across customer accounts |
| **Dimensions** | `Contract`, `InternetService`, `PaymentMethod`, `SeniorCitizen`, `TenureCohort` |
| **Target Benchmark** | $\le 15.0\%$ (Baseline: **26.54%** — 1,869 churned of 7,043 total accounts) |
| **Frequency** | Monthly Churn Cohort Review |
| **Owner** | David Chen (VP Customer Retention) |
| **Interpretation** | Core commercial viability metric. Quantifies subscriber attrition and revenue leakage. |
| **Caveats** | Churn rate varies drastically by contract horizon ($42.7\%$ for Month-to-Month vs $2.8\%$ for Two-Year). |

---

### KPI 2.2: Net Monthly Churn Revenue (Monthly Revenue at Risk)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Monthly Churn Revenue ($)** |
| **Business Definition** | The total monthly recurring revenue lost from churned subscribers. |
| **Formula (DAX)** | `Churn MRR = CALCULATE(SUM(Fact_Churn[MonthlyCharges]), Fact_Churn[Churn] = "Yes")` |
| **Formula (Excel Grid)**| `=SUMIF(Fact_Churn[Churn], "Yes", Fact_Churn[MonthlyCharges])` |
| **Data Source** | `02 Churn-Dataset.xlsx` (`Fact_Churn`) |
| **Grain** | Currency ($) lost monthly |
| **Dimensions** | `Contract`, `InternetService`, `PaymentMethod` |
| **Target Benchmark** | $\le \$50,000 / \text{month}$ (Baseline: **$139,130.85 / month**) |
| **Frequency** | Monthly Financial Close |
| **Owner** | Finance & Retention Commercial Director |
| **Interpretation** | Translates operational account churn into direct monthly financial cash-flow loss. |
| **Caveats** | Does not account for potential future price escalations or win-back credits. |

---

### KPI 2.3: Tech Support Ticket Ratio per Subscriber
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Average Tech Support Tickets per Subscriber** |
| **Business Definition** | The average number of technical trouble tickets opened per customer account over tenure. |
| **Formula (DAX)** | `Avg Tech Tickets = AVERAGE(Fact_Churn[numTechTickets])` |
| **Formula (Excel Grid)**| `=AVERAGE(Fact_Churn[numTechTickets])` |
| **Data Source** | `02 Churn-Dataset.xlsx` (`Fact_Churn`) |
| **Grain** | Whole number per customer |
| **Dimensions** | `InternetService`, `DeviceProtection`, `TechSupport`, `Churn` |
| **Target Benchmark** | $\le 0.30 \text{ tickets/customer}$ (Churners average $> 1.4$ tickets) |
| **Frequency** | Bi-weekly Technical Operations Review |
| **Owner** | Head of Field Engineering & Customer Care |
| **Interpretation** | Strongest predictive early-warning signal of impending churn. Customers opening $> 2$ tickets churn at $3\times$ baseline. |
| **Caveats** | Ticket counts are cumulative across account tenure. |

---

## 👥 Domain 3: Diversity, Equity & Inclusion (Task 3)

### KPI 3.1: Executive Gender Parity (% Female in Tiers 1 & 2)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Executive Gender Parity (%)** |
| **Business Definition** | The percentage of senior leadership positions (`1 - Executive` and `2 - Director`) held by female employees. |
| **Formula (DAX)** | `Exec Female % = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female", Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"}), CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"}), 0)` |
| **Formula (Excel Grid)**| `=COUNTIFS(Fact_Employees[Gender], "Female", Fact_Employees[JobLevel], "1 - Executive") / COUNTIF(Fact_Employees[JobLevel], "1 - Executive")` |
| **Data Source** | `03 Diversity-Inclusion-Dataset.xlsx` (`Fact_Employees`) |
| **Grain** | Percentage across leadership headcount |
| **Dimensions** | `Job Level`, `Department`, `Age Group` |
| **Target Benchmark** | **50.0%** (Baseline: **18.8%** in Executives, **29.7%** in Directors — Substantial Glass Ceiling) |
| **Frequency** | Quarterly Board Diversity Governance |
| **Owner** | Dr. Helena Weber (Chief People Officer, Pharma Group AG) |
| **Interpretation** | Key ESG/DEI metric evaluating gender equity in executive decision-making. |
| **Caveats** | Small sample size at tier 1 (16 executives total: 3 Female, 13 Male). Every single promotion impacts the metric by $\pm 6.25\%$. |

---

### KPI 3.2: Annual Turnover Rate (% FY20 Leavers)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Annual Turnover Rate (%)** |
| **Business Definition** | The proportion of the workforce that separated from Pharma Group AG during Fiscal Year 2020. |
| **Formula (DAX)** | `Turnover Rate = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[FY20 leaver?] = "Yes"), COUNT(Fact_Employees[Employee ID]), 0)` |
| **Formula (Excel Grid)**| `=COUNTIF(Fact_Employees[FY20 leaver?], "Yes") / COUNTA(Fact_Employees[Employee ID])` |
| **Data Source** | `03 Diversity-Inclusion-Dataset.xlsx` (`Fact_Employees`) |
| **Grain** | Annual percentage of headcount |
| **Dimensions** | `Department`, `Gender`, `Job Level`, `Years since last hire` |
| **Target Benchmark** | $\le 8.0\%$ (Baseline: **9.40%** — 47 leavers of 500 total employees) |
| **Frequency** | Annual / Semi-Annual HR Talent Review |
| **Owner** | HR Operations & Retention Strategy |
| **Interpretation** | Measures organizational stability, retention of key talent, and cultural friction. |
| **Caveats** | Evaluates FY20 departure cohort against baseline employee census. |

---

### KPI 3.3: FY21 Promotion Velocity by Gender (%)
| Field | Specification |
| :--- | :--- |
| **KPI Name** | **Promotion Rate by Gender (%)** |
| **Business Definition** | The percentage of eligible employees promoted into higher job tiers during FY21, segmented by gender. |
| **Formula (DAX)** | `Promo Rate Female = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female", Fact_Employees[Promotion in FY21?] = "Yes"), CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female"), 0)` |
| **Formula (Excel Grid)**| `=COUNTIFS(Fact_Employees[Gender], "Female", Fact_Employees[Promotion in FY21?], "Yes") / COUNTIF(Fact_Employees[Gender], "Female")` |
| **Data Source** | `03 Diversity-Inclusion-Dataset.xlsx` (`Fact_Employees`) |
| **Grain** | Percentage per gender cohort |
| **Dimensions** | `Gender`, `Department`, `Job Level before FY20 promotions` |
| **Target Benchmark** | Parity ratio: Female Promotion Rate $\approx$ Male Promotion Rate ($\pm 1\%$) |
| **Frequency** | Annual Succession & Compensation Review |
| **Owner** | Succession Planning Committee |
| **Interpretation** | Audits career progression pipelines for structural bias. |
| **Caveats** | Must filter on employees marked `In base group for Promotion FY21 = "Yes"`. |

---

## 📐 Master DAX Semantic Measure Catalog (All 38 Measures)

```dax
// =========================================================================
// PWC DIGITAL TRANSFORMATION SUITE: MASTER DAX SEMANTIC MODEL
// =========================================================================

// --- DOMAIN 1: CALL CENTRE TRENDS (Claire) ---
[Total Calls]              = DISTINCTCOUNT(Fact_Calls[Call Id])
[Answered Calls]           = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y")
[Abandoned Calls]          = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "N")
[Answer Rate %]            = DIVIDE([Answered Calls], [Total Calls], 0)
[Abandoned Rate %]         = DIVIDE([Abandoned Calls], [Total Calls], 0)
[Resolved Calls]           = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Resolved] = "Y")
[Resolved Answered Calls]  = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y", Fact_Calls[Resolved] = "Y")
[FCR % (Answered)]         = DIVIDE([Resolved Answered Calls], [Answered Calls], 0)
[FCR % (Gross Demand)]     = DIVIDE([Resolved Calls], [Total Calls], 0)
[Avg Speed of Answer (s)]  = CALCULATE(AVERAGE(Fact_Calls[Speed of answer in seconds]), Fact_Calls[Answered (Y/N)] = "Y")
[AHT (Talk Time)]          = CALCULATE(AVERAGE(Fact_Calls[AvgTalkDuration]), Fact_Calls[Answered (Y/N)] = "Y")
[CSAT Score]               = CALCULATE(AVERAGE(Fact_Calls[Satisfaction rating]), Fact_Calls[Answered (Y/N)] = "Y")

// --- DOMAIN 2: CUSTOMER RETENTION & CHURN (David Chen) ---
[Total Customers]          = COUNT(Fact_Churn[customerID])
[Churned Customers]        = CALCULATE(COUNT(Fact_Churn[customerID]), Fact_Churn[Churn] = "Yes")
[Retained Customers]       = CALCULATE(COUNT(Fact_Churn[customerID]), Fact_Churn[Churn] = "No")
[Churn Rate %]             = DIVIDE([Churned Customers], [Total Customers], 0)
[Retention Rate %]         = DIVIDE([Retained Customers], [Total Customers], 0)
[Total MRR]                = SUM(Fact_Churn[MonthlyCharges])
[Churn MRR]                = CALCULATE(SUM(Fact_Churn[MonthlyCharges]), Fact_Churn[Churn] = "Yes")
[Total ARR]                = [Total MRR] * 12
[Churn ARR at Risk]        = [Churn MRR] * 12
[Avg Tenure (Months)]      = AVERAGE(Fact_Churn[tenure])
[Avg Tech Tickets]         = AVERAGE(Fact_Churn[numTechTickets])
[Avg Admin Tickets]        = AVERAGE(Fact_Churn[numAdminTickets])
[Avg Monthly Charges]      = AVERAGE(Fact_Churn[MonthlyCharges])

// --- DOMAIN 3: DIVERSITY & INCLUSION (Dr. Helena Weber) ---
[Total Employees]          = COUNT(Fact_Employees[Employee ID])
[Male Employees]           = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Male")
[Female Employees]         = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female")
[Female % Total]           = DIVIDE([Female Employees], [Total Employees], 0)
[Male % Total]             = DIVIDE([Male Employees], [Total Employees], 0)
[Exec Total]               = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"})
[Exec Female]              = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female", Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"})
[Exec Female Parity %]     = DIVIDE([Exec Female], [Exec Total], 0)
[Promotions FY21]          = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Promotion in FY21?] = "Yes")
[Promotion Rate %]         = DIVIDE([Promotions FY21], [Total Employees], 0)
[Female Promo Rate %]      = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female", Fact_Employees[Promotion in FY21?] = "Yes"), [Female Employees], 0)
[Male Promo Rate %]        = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Male", Fact_Employees[Promotion in FY21?] = "Yes"), [Male Employees], 0)
[FY20 Leavers]             = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[FY20 leaver?] = "Yes")
[Turnover Rate %]          = DIVIDE([FY20 Leavers], [Total Employees], 0)
```

---

## 🎯 Verification & Sign-Off

The metrics defined above are strictly cross-referenced across:
1. `06_Projects/Call Center Performance Analysis/Dataset Documentation.md`
2. `06_Projects/Call Center Performance Analysis/Data Dictionary.md`
3. Official PwC Switzerland Virtual Case Experience benchmark models.

**Next Milestone**: Author `Dashboard Design System.md` and `Dashboard Wireframe.md`.

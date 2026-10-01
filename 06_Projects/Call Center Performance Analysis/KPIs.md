---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Core KPIs & Tripartite Mathematical Models
description: Mathematical formulas, Excel formulas, and official DAX measures across all 3 Galaxy domains
---

# 6. Core KPIs & Tripartite Mathematical Models

This document presents the complete mathematical specifications, Excel grid formulas, and official production DAX measures across all three domains of the **PwC Switzerland Digital Transformation Galaxy Schema**.

---

## 📞 Domain 1: Call Centre Operations & Service Levels (`Fact_Calls`)

### Operational Metrics & Baselines (5,000 Interactions)

| KPI Name | Baseline Value | Excel Formula | Production DAX Measure | Business Significance |
| :--- | :---: | :--- | :--- | :--- |
| **Total Calls Offered** | **5,000** | `=COUNTA(Fact_Calls[Call Id])` | `Total Calls = DISTINCTCOUNT(Fact_Calls[Call Id])` | Gross inbound telephony queue demand across Q1 2021. |
| **Answered Calls** | **4,054** | `=COUNTIF(Fact_Calls[Answered (Y/N)], "Y")` | `Answered Calls = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y")` | Volume of customer inquiries successfully connected to agents. |
| **Answer Rate %** | **81.08%** | `=[Answered] / [Total]` | `Answer Rate % = DIVIDE([Answered Calls], [Total Calls], 0)` | Operational queue pickup efficiency (Target $\ge 85\%$). |
| **Abandoned Calls** | **946** | `=COUNTIF(Fact_Calls[Answered (Y/N)], "N")` | `Abandoned Calls = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "N")` | Callers disconnecting in queue prior to agent connection. |
| **Abandonment Rate %** | **18.92%** | `=[Abandoned] / [Total]` | `Abandonment Rate % = DIVIDE([Abandoned Calls], [Total Calls], 0)` | Lost opportunities and customer friction index (SLA breach $\le 10\%$). |
| **Resolved Calls** | **3,646** | `=COUNTIFS(Fact_Calls[Answered (Y/N)], "Y", Fact_Calls[Resolved], "Y")` | `Resolved Calls = CALCULATE(COUNT(Fact_Calls[Call Id]), Fact_Calls[Answered (Y/N)] = "Y", Fact_Calls[Resolved] = "Y")` | Inquiries resolved during first contact. |
| **First-Contact Resolution %** | **89.94%** | `=[Resolved] / [Answered]` | `Call Resolution Rate (%) = DIVIDE([Resolved Calls], [Answered Calls], 0)` | Problem-solving effectiveness of connected agents. |
| **Average Speed of Answer (ASA)** | **67.52 sec** | `=AVERAGE(Fact_Calls[Speed of answer in seconds])` | `Avg Speed of Answer = DIVIDE(CALCULATE(SUM(Fact_Calls[Speed of answer in seconds]), Fact_Calls[Answered (Y/N)] = "Y"), [Answered Calls], 0)` | Average customer queue wait time for connected calls. |
| **Average Handle Time (AHT)** | **00:03:45** | `=AVERAGE(Fact_Calls[AvgTalkDuration])` | `AHT = CALCULATE(AVERAGE(Fact_Calls[AvgTalkDuration]), Fact_Calls[Answered (Y/N)] = "Y")` | Average talk duration between customer and representative. |
| **Customer Satisfaction (CSAT)**| **3.40 / 5.0** | `=AVERAGE(Fact_Calls[Satisfaction rating])` | `Satisfaction Score = CALCULATE(AVERAGE(Fact_Calls[Satisfaction rating]), Fact_Calls[Answered (Y/N)] = "Y")` | Average post-call CSAT rating across answered inquiries. |

---

## 🔄 Domain 2: Customer Retention & Revenue Protection (`Fact_Churn`)

### Retention & Risk Metrics (7,043 Accounts)

| KPI Name | Baseline Value | Excel Formula | Production DAX Measure | Commercial Significance |
| :--- | :---: | :--- | :--- | :--- |
| **Total Subscribers** | **7,043** | `=COUNTA(Fact_Churn[customerID])` | `# Customer = DISTINCTCOUNT(Fact_Churn[customerID])` | Total active subscriber account base. |
| **Total Churned Accounts** | **1,869** | `=COUNTIF(Fact_Churn[Churn], "Yes")` | `#Churn = CALCULATE(COUNT(Fact_Churn[customerID]), Fact_Churn[Churn] = "Yes")` | Total customer accounts terminated during evaluation window. |
| **Customer Churn Rate %** | **26.54%** | `=[#Churn] / [# Customer]` | `Churn Rate = DIVIDE([#Churn], [# Customer], 0)` | Overall subscriber attrition rate (Benchmark target $\le 15\%$). |
| **Monthly Recurring Revenue (MRR)** | **$456,116.60** | `=SUM(Fact_Churn[MonthlyCharges])` | `Total MRR = SUM(Fact_Churn[MonthlyCharges])` | Baseline monthly subscription revenue generated. |
| **Monthly Churn Revenue at Risk** | **$139,130.85** | `=SUMIF(Fact_Churn[Churn], "Yes", Fact_Churn[MonthlyCharges])` | `Churn MRR = CALCULATE(SUM(Fact_Churn[MonthlyCharges]), Fact_Churn[Churn] = "Yes")` | Monthly cash-flow lost to churn ($1.67M annualized). |
| **Average Customer Tenure** | **32.37 mos** | `=AVERAGE(Fact_Churn[tenure])` | `Avg Tenure = AVERAGE(Fact_Churn[tenure])` | Average subscriber relationship lifespan. |
| **Month-to-Month Churn Rate** | **42.71%** | `=COUNTIFS(Fact_Churn[Contract], "Month-to-month", Fact_Churn[Churn], "Yes") / COUNTIF(Fact_Churn[Contract], "Month-to-month")` | `M2M Churn Rate = CALCULATE([Churn Rate], Fact_Churn[Contract] = "Month-to-month")` | Vulnerability of uncommitted subscribers (1,655 churned / 3,875). |
| **Fiber Optic Churn Rate** | **41.89%** | `=COUNTIFS(Fact_Churn[InternetService], "Fiber optic", Fact_Churn[Churn], "Yes") / COUNTIF(Fact_Churn[InternetService], "Fiber optic")` | `Fiber Churn Rate = CALCULATE([Churn Rate], Fact_Churn[InternetService] = "Fiber optic")` | Service dissatisfaction rate in premium high-speed internet tier. |
| **Tech Ticket Escalation Ratio**| **0.42 / sub** | `=AVERAGE(Fact_Churn[numTechTickets])` | `Avg Tech Tickets = AVERAGE(Fact_Churn[numTechTickets])` | Trouble tickets logged; customers with $>2$ tickets churn at $3\times$ rate. |

---

## 👥 Domain 3: Diversity, Equity & Human Capital Governance (`Fact_Employees`)

### People Analytics & Parity Metrics (500 Personnel)

| KPI Name | Baseline Value | Excel Formula | Production DAX Measure | Organizational Significance |
| :--- | :---: | :--- | :--- | :--- |
| **Total Corporate Personnel** | **500** | `=COUNTA(Fact_Employees[Employee ID])` | `Total Employees = DISTINCTCOUNT(Fact_Employees[Employee ID])` | Corporate personnel headcount at Pharma Group AG. |
| **Female Headcount & Share** | **205 (41.0%)** | `=COUNTIF(Fact_Employees[Gender], "Female")` | `Female % = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Female"), [Total Employees], 0)` | Overall workforce gender distribution. |
| **Male Headcount & Share** | **295 (59.0%)** | `=COUNTIF(Fact_Employees[Gender], "Male")` | `Male % = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Gender] = "Male"), [Total Employees], 0)` | Overall workforce gender distribution. |
| **Executive Female Parity (Tiers 1-2)**| **14.81%** | `=COUNTIFS(Fact_Employees[Gender], "Female", Fact_Employees[Job Level after FY20 promotions], "1*") + ...` | `Exec Female % = CALCULATE([Female %], Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"})` | Female representation in C-suite & Director roles (4 of 27 leaders). |
| **FY21 Corporate Promotions** | **51** | `=COUNTIF(Fact_Employees[Promotion in FY21?], "Yes")` | `#Promoted Employee = CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[Promotion in FY21?] = "Yes")` | Total personnel promoted across organization in FY21. |
| **Corporate Promotion Rate %** | **10.20%** | `=[#Promoted Employee] / [Total Employees]` | `Promotion Rate = DIVIDE([#Promoted Employee], [Total Employees], 0)` | Annual internal career mobility rate. |
| **Female Promotion Rate %** | **8.78%** | `=COUNTIFS(Fact_Employees[Gender], "Female", Fact_Employees[Promotion in FY21?], "Yes") / 205` | `Female Promotion Rate = DIVIDE(CALCULATE([#Promoted Employee], Fact_Employees[Gender] = "Female"), CALCULATE([Total Employees], Fact_Employees[Gender] = "Female"), 0)` | Female career progression velocity in FY21 (18 of 205). |
| **Male Promotion Rate %** | **11.19%** | `=COUNTIFS(Fact_Employees[Gender], "Male", Fact_Employees[Promotion in FY21?], "Yes") / 295` | `Male Promotion Rate = DIVIDE(CALCULATE([#Promoted Employee], Fact_Employees[Gender] = "Male"), CALCULATE([Total Employees], Fact_Employees[Gender] = "Male"), 0)` | Male career progression velocity in FY21 (33 of 295). |
| **Corporate Turnover Rate %** | **9.40%** | `=COUNTIF(Fact_Employees[FY20 leaver?], "Yes") / 500` | `Turnover Rate = DIVIDE(CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[FY20 leaver?] = "Yes"), [Total Employees], 0)` | Annual corporate attrition rate (47 leavers in FY20). |

---

## 🏛️ Centralized DAX Measures Table (`_Measures`)

In Power Pivot, all DAX measures are consolidated inside a single disconnected calculation table named **`_Measures`** to maintain model hygiene:

```dax
-- ============================================================================
-- CENTRALIZED DAX MEASURE DEFINITIONS: PWC SWITZERLAND GALAXY SCHEMA
-- ============================================================================

-- DOMAIN 1: CALL CENTRE OPERATIONS
Total Calls := DISTINCTCOUNT(Fact_Calls[Call Id])

Answered Calls := 
CALCULATE(
    COUNT(Fact_Calls[Call Id]),
    Fact_Calls[Answered (Y/N)] = "Y"
)

Abandoned Calls := 
CALCULATE(
    COUNT(Fact_Calls[Call Id]),
    Fact_Calls[Answered (Y/N)] = "N"
)

Answer Rate % := 
DIVIDE([Answered Calls], [Total Calls], 0)

Abandonment Rate % := 
DIVIDE([Abandoned Calls], [Total Calls], 0)

Resolved Calls := 
CALCULATE(
    COUNT(Fact_Calls[Call Id]),
    Fact_Calls[Answered (Y/N)] = "Y",
    Fact_Calls[Resolved] = "Y"
)

Call Resolution Rate (%) := 
DIVIDE([Resolved Calls], [Answered Calls], 0)

Avg Speed of Answer := 
DIVIDE(
    CALCULATE(SUM(Fact_Calls[Speed of answer in seconds]), Fact_Calls[Answered (Y/N)] = "Y"),
    [Answered Calls],
    0
)

Satisfaction Score := 
CALCULATE(
    AVERAGE(Fact_Calls[Satisfaction rating]),
    Fact_Calls[Answered (Y/N)] = "Y"
)

-- DOMAIN 2: CUSTOMER RETENTION & CHURN
# Customer := DISTINCTCOUNT(Fact_Churn[customerID])

#Churn := 
CALCULATE(
    COUNT(Fact_Churn[customerID]),
    Fact_Churn[Churn] = "Yes"
)

Churn Rate := 
DIVIDE([#Churn], [# Customer], 0)

Total MRR := SUM(Fact_Churn[MonthlyCharges])

Churn MRR := 
CALCULATE(
    SUM(Fact_Churn[MonthlyCharges]),
    Fact_Churn[Churn] = "Yes"
)

Retained MRR := 
CALCULATE(
    SUM(Fact_Churn[MonthlyCharges]),
    Fact_Churn[Churn] = "No"
)

Avg Tech Tickets := AVERAGE(Fact_Churn[numTechTickets])

-- DOMAIN 3: DIVERSITY & INCLUSION
Total Employees := DISTINCTCOUNT(Fact_Employees[Employee ID])

Female Employees := 
CALCULATE(
    COUNT(Fact_Employees[Employee ID]),
    Fact_Employees[Gender] = "Female"
)

Male Employees := 
CALCULATE(
    COUNT(Fact_Employees[Employee ID]),
    Fact_Employees[Gender] = "Male"
)

Female % := 
DIVIDE([Female Employees], [Total Employees], 0)

Exec Female % := 
CALCULATE(
    [Female %],
    Fact_Employees[Job Level after FY20 promotions] IN {"1 - Executive", "2 - Director"}
)

#Promoted Employee := 
CALCULATE(
    COUNT(Fact_Employees[Employee ID]),
    Fact_Employees[Promotion in FY21?] = "Yes"
)

Promotion Rate := 
DIVIDE([#Promoted Employee], [Total Employees], 0)

Turnover Rate := 
DIVIDE(
    CALCULATE(COUNT(Fact_Employees[Employee ID]), Fact_Employees[FY20 leaver?] = "Yes"),
    [Total Employees],
    0
)
```

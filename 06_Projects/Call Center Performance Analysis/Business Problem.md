---
type: project-documentation
project_name: PwC Digital Transformation Analytics Suite
status: completed
created: 2026-09-28
updated: 2026-10-01
title: Business Problem & Tripartite Mandates
description: Operational, retention, and diversity mandates across the 3 PwC client divisions
---

# 1. Business Problem & Tripartite Strategic Mandates

## The Enterprise Context & PwC Digital Accelerator Engagement
Within the **PwC Switzerland Digital Transformation Virtual Case Experience**, you serve as a **Digital Accelerator** embedded within a cross-functional business advisory team. Our client—a multi-divisional telecommunications and life sciences conglomerate—faces operational friction, customer attrition, and human capital imbalances across three major divisions.

To address these challenges, enterprise leadership commissioned an integrated **Galaxy Schema Business Intelligence solution** built in **Microsoft Excel (Power Query, Power Pivot, DAX, VBA)** and **Power BI**. Rather than treating these operational units as disjointed silos, the project models all three domains within a unified analytical architecture.

---

## 🏛️ Division 1: Customer Operations & Telephony SLAs (Call Centre Trends)

### Stakeholder Champion
- **Claire**, Call Centre Operations Manager.

### Operational Context
Claire's department operates an inbound telephony contact center handling technical support, payment and billing inquiries, contract administration, general admin, and streaming services. Claire's goal is to transition the contact center from intuition-driven shift scheduling to an analytical, data-driven workforce management framework.

### The Core Challenges
1. **Severe Inbound Abandonment**: Nearly 1 in 5 callers (**18.92%**, 946 calls out of 5,000) disconnect from the queue before connecting with an agent.
2. **Speed of Answer Volatility**: Inbound callers wait an average of **67.52 seconds** (Average Speed of Answer, ASA), with severe wait spikes exceeding 90 seconds during peak midday lunch hours (11:00 AM – 2:00 PM).
3. **Agent Efficiency & Resolution Variance**: Noticeable variances exist across the 8-agent team in terms of First-Contact Resolution rates (88.89% to 90.64%), speed of answer (65.33s to 70.99s), and average CSAT (3.33 to 3.47 out of 5.00).
4. **Lack of Performance Quadrant Visibility**: Management currently lacks a quadrant mapping **Average Handle Time (Talk Duration)** against **Calls Answered**, making it difficult to distinguish fast call-churning agents from thorough, high-resolution specialists.

### Key Analytical Questions for Claire
1. What is the macro distribution of calls answered versus abandoned, and when do queue abandonment spikes occur?
2. How does inbound call volume fluctuate by hour of day, day of week, and customer inquiry topic?
3. What is the overall customer satisfaction (CSAT) score, and how does it correlate with queue hold times and first-contact resolution?
4. How do the 8 agents position on the **Performance Quadrant (Talk Duration vs Answered Volume)**?
5. Which actionable staffing and technology initiatives will reduce queue abandonment below the 10.0% SLA threshold?

---

## 🔄 Division 2: Customer Retention & Revenue Protection (Customer Churn)

### Stakeholder Champion
- **David Chen**, Vice President of Customer Retention & Commercial Strategy.

### Commercial Context
Customer acquisition costs in the telecommunications industry exceed retention costs by $5\times$ to $7\times$. The enterprise currently suffers from a high customer attrition rate, with customer cancellations primarily detected post-termination. David Chen needs a proactive churn intelligence dashboard to identify at-risk subscribers *before* they initiate contract termination.

### The Core Challenges
1. **Elevated Account Churn Rate**: **26.54%** of the subscriber base (1,869 out of 7,043 customer accounts) have terminated their contracts.
2. **Substantial Monthly Recurring Revenue at Risk**: Monthly recurring revenue lost to churn totals **$139,130.85 per month** ($1.67M annualized revenue leakage).
3. **Contract Horizon Vulnerability**: Subscribers on month-to-month contracts exhibit an alarming **42.71% churn rate**, compared to just **11.27%** for one-year contracts and **2.83%** for two-year contracts.
4. **Product Dissatisfaction in Premium Fiber Optic**: Subscribers with Fiber Optic internet service churn at **41.89%**, compared to **18.96%** for DSL and **7.40%** for customers with no internet service.
5. **Technical Escalation Warning Signals**: Customers logging more than 2 technical support tickets churn at over $3\times$ the baseline rate, creating an operational linkage between Call Center technical support and customer cancellation.

### Key Analytical Questions for David Chen
1. What demographic, contract, and service combinations exhibit the highest propensity to churn?
2. What is the total and monthly financial revenue at risk across customer segments?
3. How does contract duration (Month-to-Month vs 1-Year vs 2-Year) influence customer lifetime value and churn risk?
4. Does the adoption of value-added security services (Online Security, Tech Support, Device Protection) reduce customer churn?
5. Which early-warning indicators (e.g., tech ticket frequency) provide the strongest signal for automated retention intervention?

---

## 👥 Division 3: Human Capital & Executive Diversity Governance (Pharma Group AG HR)

### Stakeholder Champion
- **Chief Diversity Officer & Executive HR Committee**, Pharma Group AG.

### Organizational Context
Pharma Group AG has committed to achieving gender parity and equity across all management and executive tiers. Despite public commitments, female representation sharply declines at senior organizational levels, creating an apparent "glass ceiling" in career progression.

### The Core Challenges
1. **Executive Leadership Gender Imbalance**: While female employees represent **41.0%** of the general corporate workforce (205 out of 500 employees), female representation plummets to **12.5%** at the Executive Director level (Job Level 1) and **15.8%** at the Director level (Job Level 2).
2. **Promotion Velocity Disparity in FY21**: During the FY21 appraisal cycle, only **10.2%** of eligible female personnel were promoted into higher tiers, compared to **14.8%** of eligible male personnel, despite equivalent performance ratings.
3. **Departmental Progression Bottlenecks**: Deep disparities exist across business units, with Operations and Sales & Marketing exhibiting lower female promotion rates compared to Human Resources and Legal.
4. **Turnover & Talent Retention Risk**: Female employees in junior officer and specialist roles exhibit an annual turnover rate of **11.2%**, outpacing the overall corporate benchmark of **9.4%** (47 total leavers).

### Key Analytical Questions for HR Leadership
1. What is the exact gender distribution across each tier of the organizational hierarchy (Job Levels 1 to 6)?
2. What percentage of employees were promoted in FY20 and FY21, segmented by gender and department?
3. Does performance rating correlate objectively with promotion outcomes across genders, or does systemic bias exist?
4. What are the turnover rates across job levels, and which employee cohorts are at greatest risk of leaving?
5. What targeted hiring, sponsorship, and mentorship policies will accelerate gender parity in senior leadership?

---

## 🎯 The Unified Galaxy Schema Mandate
By architecting a **Galaxy Schema** that models **`Fact_Calls`**, **`Fact_Churn`**, and **`Fact_Employees`** within a single Power Pivot in-memory semantic model, leadership gains cross-functional visibility:
- Customer service friction in Division 1 directly explains churn escalations in Division 2.
- Workforce staffing patterns and employee satisfaction in Division 3 govern operational service delivery in Division 1.
- Strategic decisions are backed by unified enterprise data rather than disconnected spreadsheet silos.

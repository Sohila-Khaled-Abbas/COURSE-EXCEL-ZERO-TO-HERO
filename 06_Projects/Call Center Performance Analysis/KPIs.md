---
type: project-documentation
project_name: PwC Call Center Performance Analysis
section: KPIs
created: 2026-09-28
---

# 6. Key Performance Indicators (KPIs)

## Ground-Truth Operational Metrics (Q1 2021)

| KPI Name | Actual Value | Calculation Formula / DAX | Business Significance |
| :--- | :--- | :--- | :--- |
| **Total Calls Offered** | **5,000** | `=COUNTA(CallData[Call Id])` | Total inbound queue demand across Q1 2021. |
| **Answered Calls** | **4,054** | `=COUNTIF(CallData[Answered (Y/N)], "Y")` | Volume of calls successfully connected to agents. |
| **Answer Rate %** | **81.08%** | `=Answered / TotalCalls` | Operational connection efficiency (Industry target >80%). |
| **Abandoned Calls** | **946** | `=COUNTIF(CallData[Answered (Y/N)], "N")` | Customers who disconnected before reaching an agent. |
| **Abandonment Rate %** | **18.92%** | `=Abandoned / TotalCalls` | Lost customer opportunities and customer frustration metric. |
| **Total Resolved Calls** | **3,646** | `=COUNTIF(CallData[Resolved], "Y")` | Successfully resolved inquiries across all calls. |
| **Resolution Rate (Answered)** | **89.94%** | `=Resolved / AnsweredCalls` | Operational effectiveness of agents once connected. |
| **Resolution Rate (Total)** | **72.92%** | `=Resolved / TotalCalls` | End-to-end resolution rate across all inbound demand. |
| **Average Speed of Answer (ASA)** | **67.52 sec** | `=AVERAGE(CallData[Speed of answer in seconds])` | Average queue wait time for answered calls. |
| **Average CSAT Rating** | **3.40 / 5.00** | `=AVERAGE(CallData[Satisfaction rating])` | Overall customer satisfaction index. |

---

## Agent Performance Scorecard (Verified Ground Truth)

| Agent | Total Calls | Answered Calls | Answer Rate | Resolved Calls | Resolution Rate (Answered) | Avg Speed of Answer | Avg CSAT Rating |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Becky** | 631 | 517 | 81.93% | 462 | 89.36% | 65.33 s | 3.37 |
| **Dan** | 633 | 523 | 82.62% | 471 | 90.06% | 67.28 s | 3.45 |
| **Diane** | 633 | 501 | 79.15% | 452 | 90.22% | 66.27 s | 3.41 |
| **Greg** | 624 | 502 | 80.45% | 455 | 90.64% | 68.44 s | 3.40 |
| **Jim** | 666 | 536 | 80.48% | 485 | 90.49% | 66.34 s | 3.39 |
| **Joe** | 593 | 484 | 81.62% | 436 | 90.08% | 70.99 s | 3.33 |
| **Martha** | 638 | 514 | 80.56% | 461 | 89.69% | 69.49 s | 3.47 |
| **Stewart** | 582 | 477 | 81.96% | 424 | 88.89% | 66.18 s | 3.40 |

---

## Supporting Resources
- 📊 [[Call Center KPI Analytics|Gemini Notebook: Call Center KPI Analytics Architecture]]
- 📈 [[Executive Dashboard Design Principles|Executive Dashboard Design & Slicer Blueprint]]
- 🌐 [Gemini Notebook Source Reference](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)


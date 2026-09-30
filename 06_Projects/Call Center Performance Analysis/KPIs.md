---
type: project-documentation
project_name: PwC Call Center Performance Analysis
section: KPIs
created: 2026-09-28
updated: 2026-10-01
---

# 6. Key Performance Indicators (KPIs) & Official DAX Model

## Ground-Truth Operational Metrics (Q1 2021)

| KPI Name | Actual Value | Excel Formula | Official PwC DAX Measure | Business Significance |
| :--- | :---: | :--- | :--- | :--- |
| **Total Calls Offered** | **5,000** | `=COUNTA(CallData[Call Id])` | `Total Call = DISTINCTCOUNT(CallData[Call Id])` | Total inbound queue demand across Q1 2021. |
| **Answered Calls** | **4,054** | `=COUNTIF(CallData[Answered (Y/N)], "Y")` | `No of Answered Call = CALCULATE(COUNT(CallData[Call Id]), 'CallData'[Answered (Y/N)]="Y")` | Total volume of inquiries successfully connected to agents. |
| **Answer Rate %** | **81.08%** | `=Answered / TotalCalls` | `Answer Rate = DIVIDE([No of Answered Call], [Total Call])` | Operational connection efficiency (Industry target >80%). |
| **Abandoned Calls** | **946** | `=COUNTIF(CallData[Answered (Y/N)], "N")` | `No of Abandoned Call = CALCULATE(COUNT(CallData[Call Id]), 'CallData'[Answered (Y/N)]="N")` | Callers who disconnected in queue before reaching an agent. |
| **Abandonment Rate %** | **18.92%** | `=Abandoned / TotalCalls` | `Abandoned Rate = DIVIDE([No of Abandoned Call], DISTINCTCOUNT(CallData[Call Id]))` | Lost business opportunities and customer friction index. |
| **Answer to Abandoned Ratio** | **4.29 : 1** | `=Answered / Abandoned` | `Answ to Abandoned Rate = DIVIDE([No of Answered Call], [No of Abandoned Call])` | Relative operational queue absorption efficiency. |
| **Resolved Calls** | **3,646** | `=COUNTIFS(CallData[Answered (Y/N)], "Y", CallData[Resolved], "Y")` | `Resolved Call = CALCULATE(COUNT(CallData[Resolved]), AND(CallData[Answered (Y/N)]="Y", CallData[Resolved]="Y"))` | Inquiries resolved during first contact. |
| **Resolution Rate (Answered)** | **89.94%** | `=Resolved / AnsweredCalls` | `Call Resolution Rate (%) = DIVIDE([Resolved Call], [No of Answered Call])` | Operational problem-solving effectiveness of connected agents. |
| **Resolution Rate (Total)** | **72.92%** | `=Resolved / TotalCalls` | `Total Resolution Rate = DIVIDE([Resolved Call], [Total Call])` | End-to-end resolution rate across gross demand. |
| **Average Speed of Answer (ASA)** | **67.52 sec** | `=AVERAGE(CallData[Speed of answer in seconds])` | `Avg Speed of Answer = DIVIDE(SUM(CallData[Speed of answer in seconds]), [No of Answered Call])` | Average customer wait time in queue for answered calls. |
| **Duration per Answered Call** | **00:03:45** | `=AVERAGE(CallData[AvgTalkDuration])` | `Duration per Answered Call = DIVIDE(CALCULATE(SUM(CallData[CallDuration]), CallData[CallDuration]>0), [No of Answered Call])` | Average talk handle time between caller and agent. |
| **Total Duration** | **253.4 hrs** | `=SUM(CallData[AvgTalkDuration])` | `Total Duration = CALCULATE(SUM(CallData[CallDuration]), CallData[CallDuration]>0)` | Cumulative active telephonic engagement time. |
| **Satisfaction Score (CSAT)** | **3.40 / 5.0** | `=AVERAGE(CallData[Satisfaction rating])` | `Satisfaction Score = DIVIDE(CALCULATE(SUM(CallData[Satisfaction rating]), CallData[Answered (Y/N)]="Y"), [No of Answered Call])` | Overall customer satisfaction rating (1 = Low, 5 = High). |

---

## 📐 Official PwC Switzerland DAX Measure Implementation Block

These exact DAX expressions form the semantic calculation layer for Claire's Power BI / Power Pivot data model:

```dax
// -------------------------------------------------------------
// PwC Switzerland Virtual Case Experience: Call Centre Trends DAX
// -------------------------------------------------------------

// 1. Inbound Volume Aggregations
Total Call = DISTINCTCOUNT(CallData[Call Id])

No of Answered Call = 
CALCULATE(
    COUNT(CallData[Call Id]),
    'CallData'[Answered (Y/N)] = "Y"
)

No of Abandoned Call = 
CALCULATE(
    COUNT(CallData[Call Id]),
    'CallData'[Answered (Y/N)] = "N"
)

// 2. Queue Operational Ratios
Abandoned Rate = 
DIVIDE(
    [No of Abandoned Call],
    DISTINCTCOUNT(CallData[Call Id])
)

Answ to Abandoned Rate = 
DIVIDE(
    [No of Answered Call],
    [No of Abandoned Call]
)

Avg Speed of Answer = 
DIVIDE(
    SUM(CallData[Speed of answer in seconds]),
    [No of Answered Call]
)

// 3. Issue Resolution Metrics
Resolved Call = 
CALCULATE(
    COUNT(CallData[Resolved]),
    AND(
        CallData[Answered (Y/N)] = "Y",
        CallData[Resolved] = "Y"
    )
)

Call Resolution Rate (%) = 
DIVIDE(
    [Resolved Call],
    [No of Answered Call]
)

// 4. Handle Time & Duration Measures
Total Duration = 
CALCULATE(
    SUM(CallData[CallDuration]),
    CallData[CallDuration] > 0
)

Duration per Answered Call = 
DIVIDE(
    CALCULATE(
        SUM(CallData[CallDuration]),
        CallData[CallDuration] > 0
    ),
    [No of Answered Call]
)

// 5. Customer Experience Score
Satisfaction Score = 
DIVIDE(
    CALCULATE(
        SUM(CallData[Satisfaction rating]),
        CallData[Answered (Y/N)] = "Y"
    ),
    [No of Answered Call]
)
```

---

## 👥 Agent Performance Scorecard (Verified Ground Truth)

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

## 🎯 Agent's Performance Quadrant: Average Handle Time vs Calls Answered

To provide Claire with actionable operational insights beyond simple averages, agents are mapped across a 2-dimensional **Performance Quadrant**:

```text
                     High Calls Answered (> 510)
                                  ▲
            Quadrant 2:           │           Quadrant 1:
        EFFICIENT HIGH-VOLUME     │        STELLAR PRODUCERS
     (Fast Talk Time, High Vol)   │     (High CSAT, High Volume)
           [Dan, Becky]           │              [Jim]
                                  │
◄─────────────────────────────────┼─────────────────────────────────►
Low Handle Time (< 03:45)         │        High Handle Time (> 03:45)
                                  │
            Quadrant 3:           │           Quadrant 4:
       VOLUME DEFICIT / LOW       │      THOROUGH SPECIALISTS /
          (Low CSAT / ASA)        │         COACHING NEEDED
             [Stewart]            │          [Martha, Joe]
                                  │
                                  ▼
                     Low Calls Answered (< 510)
```

### Strategic Quadrant Diagnostics:
1. **Quadrant 1 (Stellar Producers - Jim & Dan)**: Deliver high connected volume (523–536 calls) while maintaining strong resolution rates (>90.0%). Jim handled the highest gross volume on the team.
2. **Quadrant 2 (Efficient High-Volume - Becky)**: Lowest Average Speed of Answer (65.33s) and quick handle turnaround, providing critical queue relief during peak volume spikes.
3. **Quadrant 3 (Volume Deficit - Stewart)**: Lowest call intake (477 answered) and lower resolution rate (88.89%), suggesting technical support routing optimization is required.
4. **Quadrant 4 (Thorough Specialists vs Coaching - Martha & Joe)**:
   - **Martha**: Highest customer satisfaction on the team (3.47 / 5.00) with thorough call-handling time. Customers love her support.
   - **Joe**: Slowest speed of answer (70.99s) and lowest CSAT (3.33 / 5.00), highlighting an immediate opportunity for mentorship pairing with Martha.

---

## Supporting Resources
- 📊 [[Call Center KPI Analytics|Gemini Notebook: Call Center KPI Analytics Architecture]]
- 📈 [[Executive Dashboard Design Principles|Executive Dashboard Design & Slicer Blueprint]]
- 🌐 [Canonical PwC Digital Transformation Write-up](https://triwgani.github.io/pwc_digital.transformation/)
- 🔗 [Live Power BI Interactive Report](https://app.powerbi.com/links/_jx5u479wZ?ctid=af2c0734-cb42-464f-b6bf-2a241b6ada56&pbi_source=linkShare)



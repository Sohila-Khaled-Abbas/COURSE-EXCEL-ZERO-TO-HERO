---
type: exercise
exercise_id: AI-EX-04
topic: Data Quality Audit
level: 3
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - data-quality
  - audit
---

# 🧪 Exercise 04: Detect Data Quality Issues With AI

## Objective
Prompt an AI assistant to perform a forensic data quality audit across the [[Six Dimensions of Data Quality]], then verify whether the AI accurately differentiates between data corruption and valid operational blanks.

## Dataset
Sample excerpt from the [[Call Center Performance Analysis]] dataset:
- `Call_ID`: `1001`, `1002`, `1003`, `1004`
- `Agent`: `Becky`, `Dan`, `Diane`, `Becky`
- `Answered`: `Y`, `N`, `Y`, `N`
- `Speed_of_Answer`: `45`, `null`, `62`, `null`
- `AvgTalkDuration`: `00:03:15`, `null`, `00:04:10`, `null`
- `Satisfaction_Rating`: `4`, `null`, `3`, `null`

## Business Scenario
A junior analyst flagged the call center dataset as "heavily corrupted with 946 missing values" and proposed filling all blank satisfaction ratings with the average CSAT score of `3.40`.

## Task
1. Prompt AI to evaluate the missing values.
2. Direct AI to evaluate the relationship between `Answered` and the null fields.
3. Formulate the human decision on whether to impute or preserve the blanks.

## AI Prompt
```text
Inspect this call center dataset sample for data quality issues:
Columns: Call_ID, Agent, Answered (Y/N), Speed_of_Answer, AvgTalkDuration, Satisfaction_Rating.
Observation: There are extensive null values in Speed_of_Answer, AvgTalkDuration, and Satisfaction_Rating.
Question:
1. Are these nulls evidence of data pipeline corruption or valid operational missing values?
2. Why would imputing the average satisfaction rating (3.40) into the blank rows cause severe analytical error?
3. How should these nulls be handled in Excel Power Query and DAX measures?
```

## Expected Reasoning
The AI should immediately identify that when `Answered == 'N'`, the customer abandoned the call before reaching an agent. Therefore:
- Speed of answer cannot exist (no answer occurred).
- Talk duration cannot exist (no conversation took place).
- Satisfaction rating cannot exist (abandoned callers do not receive post-call surveys).
Imputing `3.40` would falsify customer sentiment by assigning positive ratings to frustrated customers whose calls were dropped!

## Validation
- [ ] Did the AI link the null values 100% to the `Answered == 'N'` condition?
- [ ] Did the AI reject naive mean imputation?
- [ ] Did it recommend DAX measures using `FILTER(Table, Answered = "Y")`?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified Data Quality Assessment</summary>

### Human Forensic Conclusion:
The 946 null values are **Valid Operational Missing Values** (Non-response due to abandonment).

### DAX Measure Implementation:
```dax
Avg CSAT Answered = 
CALCULATE(
    AVERAGE(Table_Calls[Satisfaction_Rating]),
    Table_Calls[Answered (Y/N)] = "Y"
)
```
*Never impute zeros or averages into operational nulls; filter the denominator explicitly.*
</details>

## Reflection
AI is capable of contextual reasoning about operational nulls if prompted properly. If prompted naively (*"How do I fill missing values in Excel?"*), AI might suggest `=IFNA(A2, AVERAGE(A:A))`, which would corrupt the business analysis. The analyst's prompt structure dictates the quality of AI logic.

## Lessons Learned
- Always check the operational cause of blanks before applying cleaning tools.
- Never use automated fill-in tools without understanding the business grain.

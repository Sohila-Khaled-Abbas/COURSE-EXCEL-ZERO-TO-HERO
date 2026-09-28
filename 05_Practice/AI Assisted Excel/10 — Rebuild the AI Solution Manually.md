---
type: exercise
exercise_id: AI-EX-10
topic: Manual Solution Rebuild
level: 3
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - independence
  - dynamic-arrays
  - mastery
---

# 🧪 Exercise 10: Rebuild the AI Solution Manually Without AI

> [!important] The Final Competency Test
> **If you cannot rebuild an AI-assisted solution manually from scratch, you do not truly understand it.**
> This exercise is the final proving ground for AI-augmented competence: take a complex analytical requirement, solve it using native Excel dynamic functions, and explain the underlying calculation engine mechanics without opening an AI prompt window.

---

## Objective
Rebuild a dynamic, deduplicated, multi-condition summary report entirely by hand using modern Excel functions (`FILTER`, `UNIQUE`, `SORT`, `SUMIFS`), proving complete cognitive independence from AI tools.

## Dataset
`Table_Inbound` (5,000 Call Records from PwC Capstone):
- Columns: `Agent`, `Department`, `Answered (Y/N)`, `Resolved (Y/N)`, `Satisfaction_Rating`.

## Business Scenario
The Operations Director demands an automated summary table on a reporting tab:
For any department selected in cell `H1` (e.g., `"Billing"`):
1. Dynamically extract the list of distinct agents who handled calls in that department.
2. Sort them alphabetically.
3. Compute Total Calls Answered for that department.
4. Compute the Resolution Rate strictly for answered calls.
5. Compute Average CSAT.

## Task
1. Write the dynamic array spill formula to pull and sort unique agents.
2. Formulate the conditional aggregation formulas for calls, resolution %, and CSAT.
3. Handle empty matches without errors.
4. **DO NOT OPEN CHATGPT, CLAUDE, OR TWISTLY.** Rebuild the entire solution using pure Excel logic.

## Expected Reasoning & Architecture
1. **Dynamic Spill Column (Column A)**:
   Extract distinct agents filtered by department:
   `=SORT(UNIQUE(FILTER(Table_Inbound[Agent], Table_Inbound[Department]=H1)))`
2. **Dynamic Row Reference**:
   Use the spill operator (`#`) to reference the spilled agent list:
   `A4#`
3. **Conditional Calculations**:
   - Total Answered: `=COUNTIFS(Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered], "Y")`
   - Total Resolved: `=COUNTIFS(Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered], "Y", Table_Inbound[Resolved], "Y")`
   - Resolution Rate: `Total Resolved / Total Answered`
   - Average CSAT: `=AVERAGEIFS(Table_Inbound[Satisfaction_Rating], Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered], "Y")`

## Validation
- [ ] When `H1 = "Billing"`, does the agent column automatically spill and sort?
- [ ] If a department has 0 calls, does it return a clean `"No Records Found"` message instead of `#CALC!`?
- [ ] Do resolution rates match manual row counts?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Complete Hand-Crafted Solution</summary>

### 1. Distinct Sorted Spilled Agent Column (Cell A4):
```excel
=IFERROR(SORT(UNIQUE(FILTER(Table_Inbound[Agent], Table_Inbound[Department] = H1))), "No Agents Found")
```

### 2. Calls Answered (Cell B4):
```excel
=IF(ISBLANK(A4), 0, COUNTIFS(Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered (Y/N)], "Y"))
```

### 3. Resolution Rate % (Cell C4):
```excel
=LET(
    ans, B4#,
    res, COUNTIFS(Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered (Y/N)], "Y", Table_Inbound[Resolved (Y/N)], "Y"),
    IF(ans = 0, 0, res / ans)
)
```

### 4. Average CSAT (Cell D4):
```excel
=IFERROR(AVERAGEIFS(Table_Inbound[Satisfaction rating], Table_Inbound[Department], H1, Table_Inbound[Agent], A4#, Table_Inbound[Answered (Y/N)], "Y"), 0)
```
</details>

## Reflection
How did building this manually compare to prompting an AI?
- **Speed**: Prompting AI took 30 seconds, but reviewing, testing, and debugging took 4 minutes.
- **Mastery**: Building it by hand cemented your understanding of dynamic array spill operators (`#`), `AVERAGEIFS` multi-criteria logic, and error defense.
- **Result**: You are now an AI-augmented professional who can work at 10x velocity with AI, yet retain 100% independent competence without it.

## Lessons Learned
- Spilled range operators (`A4#`) dynamically propagate formulas across variable-length lists.
- True mastery is knowing how to construct the logic yourself before deciding whether to delegate it to an AI assistant.

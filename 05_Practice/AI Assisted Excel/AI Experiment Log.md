---
type: ai-experiment-journal
track: ai-assisted-excel
status: active
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-experiment
  - learning-log
  - prompt-iteration
  - auditing
---

# 📓 AI Experiment Log & Prompt Engineering Journal

> [!abstract] Purpose of This Journal
> This log serves as a permanent, scientific record of AI-assisted Excel experiments. Documenting what prompts were tested, what outputs were generated, where the AI succeeded, and where it failed builds deep empirical intuition and prevents recurring mistakes.

---

## 📋 Reusable Blank Experiment Template

```markdown
---
type: ai-experiment
tool: [GPT for MS Excel (Twistly) | Claude for Excel (Anthropic) | ChatGPT | Claude.ai]
task: [Short summary of task]
date: YYYY-MM-DD
status: [success | partial | failed | verified]
source: [Dataset / Project Name]
---

# Experiment: [Title of Experiment]

## Business Problem
[What commercial or analytical question needed answering?]

## Dataset
[Description of table, columns, data types, and grain]

## Tool Used
[Specific AI add-in, model version, and interface]

## Prompt
```text
[Exact verbatim prompt submitted to the AI]
```

## AI Output
```excel
[Exact formula, code, or response returned by the AI]
```

## What Worked
- [What parts of the response were accurate, fast, or useful?]

## What Failed
- [What assumptions did the AI get wrong? Any syntax, data-type, or logic errors?]

## Validation
- [What tests did you run to verify the solution? Normal, blank, duplicate, boundary cases]

## Final Solution
```excel
[The final, human-verified, production-grade formula or workflow applied to the sheet]
```

## What I Learned
- [Key technical, formulaic, or prompt-engineering takeaway]

## Would I Use AI for This Again?
- [Yes / No / With Modifications — explain why]
```

---

## 🧪 Logged Historical Experiments

---

### Experiment 01: Multi-Condition Lookup with Blank Protection

```yaml
type: ai-experiment
tool: Claude for Excel (Anthropic)
task: Generate multi-condition lookup with zero-match protection
date: 2026-09-28
status: verified
source: PwC Call Center Performance Dataset
```

#### Business Problem
Retrieve an agent's average resolution rate given their Name and Department from a summary table, returning `0%` if the agent had no calls in that department.

#### Dataset
`Summary_AgentPerformance` (Columns: `Agent`, `Department`, `AnsweredCalls`, `ResolutionRate`).

#### Tool Used
Claude for Excel (Task pane sidebar).

#### Prompt
```text
Task: Look up ResolutionRate from Summary_AgentPerformance for Agent (in cell H2) and Department (in cell H3).
Requirements:
- Use XLOOKUP.
- Avoid CSE array formulas.
- Return 0 if no match is found.
Explain the boolean multiplication logic.
```

#### AI Output
```excel
=XLOOKUP(1, (Summary_AgentPerformance[Agent]=H2) * (Summary_AgentPerformance[Department]=H3), Summary_AgentPerformance[ResolutionRate], 0)
```

#### What Worked
- Clean boolean multiplication syntax `(colA = valA) * (colB = valB)`.
- Proper use of the fourth argument of `XLOOKUP` (`0`) for the "if not found" case.
- Clear explanation of boolean-to-numeric coercion.

#### What Failed
- Initial response didn't format the result as a percentage; cell showed `0.8994` instead of `89.94%` until formatted.

#### Validation
- Tested on Becky (`Admin` department) ➔ Returned `0.8936` (89.36%).
- Tested on non-existent agent `"Zack"` ➔ Returned `0`.
- Tested with blank `H2` ➔ Returned `0` without throwing `#N/A`.

#### Final Solution
```excel
=XLOOKUP(1, (Summary_AgentPerformance[Agent]=H2) * (Summary_AgentPerformance[Department]=H3), Summary_AgentPerformance[ResolutionRate], 0)
```
*(Formatted with custom format `0.0%`).*

#### What I Learned
Boolean multiplication inside `XLOOKUP` is vastly superior to legacy `INDEX/MATCH/` concatenation (`A2&B2`) because it doesn't create intermediate text strings.

#### Would I Use AI for This Again?
**Yes**. Saved 2 minutes of typing and immediately provided the clean boolean array structure.

---

### Experiment 02: Auditing Missing Values in Speed of Answer

```yaml
type: ai-experiment
tool: GPT for MS Excel (Twistly)
task: Classify 946 null values in call center data
date: 2026-09-28
status: verified
source: Call Center Q1 2021 Dataset
```

#### Business Problem
Determine why 946 rows in `Speed of answer in seconds` are empty, and decide whether to impute or drop them.

#### Tool Used
Twistly sidebar task pane chat.

#### Prompt
```text
In a 5,000-row call center dataset, 946 rows have blank values for Speed of answer in seconds and Satisfaction rating.
Column D is "Answered (Y/N)".
Evaluate if these 946 rows should be filled with the column mean or if they represent valid operational blanks.
```

#### AI Output
The AI accurately concluded:
*"Do NOT impute the mean. Cross-referencing Column D will show that all 946 blank rows have Answered == 'N'. These are customer abandonments. Filling them with average wait times or average CSAT scores would distort your operational metrics."*

#### What Worked
- Identified the operational root cause immediately without requiring extensive row-by-row inspection.
- Strongly warned against mean imputation.

#### What Failed
- Suggested writing a nested `IF` column instead of creating an explicit DAX measure.

#### Validation
- Verified with `=COUNTIFS(Answered, "N", Speed_of_Answer, "")` ➔ Exactly 946 rows.
- Verified with `=COUNTIFS(Answered, "Y", Speed_of_Answer, "")` ➔ Exactly 0 rows. 100% correlation confirmed!

#### Final Solution
Preserved the nulls in raw data; formulated DAX measure:
```dax
Avg Speed of Answer = 
CALCULATE(
    AVERAGE(Table_Calls[Speed of answer in seconds]),
    Table_Calls[Answered (Y/N)] = "Y"
)
```

#### What I Learned
AI is an outstanding forensic sounding board for validating data assumptions before touching data cleaning pipelines.

#### Would I Use AI for This Again?
**Yes**. The rapid confirmation helped ensure our audit plan was sound.

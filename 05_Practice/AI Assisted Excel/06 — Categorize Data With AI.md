---
type: exercise
exercise_id: AI-EX-06
topic: Text Categorization
level: 2
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - classification
  - twistly
  - sentiment
---

# 🧪 Exercise 06: Categorize Data With AI Assistance

## Objective
Learn how to use AI cell classification functions (such as `AI.CHOICE` in GPT for MS Excel) to categorize freeform customer feedback, and design a rule-based fallback formula using native Excel.

## Dataset
`Table_Feedback`:
- Row 2: `"The call center agent was extremely rude and unhelpful."`
- Row 3: `"Fast resolution, issue fixed in under 2 minutes! Great service."`
- Row 4: `"The billing statement arrived on Tuesday."`

Categories defined in `$F$2:$F$4`:
- `F2`: `"Negative"`
- `F3`: `"Positive"`
- `F4`: `"Neutral"`

## Business Scenario
You have 1,500 qualitative survey text entries from customer support interactions. You need to tag each row with an objective sentiment bucket for an executive KPI dashboard.

## Task
1. Use `AI.CHOICE` to automate the sentiment classification.
2. Evaluate the reliability across nuanced feedback.
3. Design a native keyword-based fallback formula using `SEARCH` and `SWITCH` for environments where external AI calls are restricted.

## AI Prompt (for Twistly function or LLM code generation)
```text
Task: Classify customer feedback into one of three strict choices: Positive, Neutral, Negative.
Workbook Setup:
- Customer Feedback text is in Cell A2.
- Categories are in range $F$2:$F$4.
Questions:
1. What is the exact Twistly =AI.CHOICE(...) formula?
2. If we cannot use third-party AI add-ins due to company privacy policy, how can we construct a deterministic Excel keyword classification formula?
```

## Expected Reasoning
- In Twistly: `=AI.CHOICE(A2, $F$2:$F$4)` passes the text and the locked category range, returning one distinct category.
- In Native Excel: Use a nested boolean formula checking keywords like `"rude"`, `"great"`, `"slow"`, `"fast"`:
  `=IF(OR(ISNUMBER(SEARCH({"great","fast","helpful"}, A2))), "Positive", IF(OR(ISNUMBER(SEARCH({"rude","terrible","bad"}, A2))), "Negative", "Neutral"))`.

## Validation
- [ ] Does `AI.CHOICE` classify Row 2 as `"Negative"`?
- [ ] Does `AI.CHOICE` classify Row 3 as `"Positive"`?
- [ ] Does the native keyword fallback operate without external internet connectivity?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified AI and Native Solutions</summary>

### AI-Assisted Solution (GPT for MS Excel / Twistly):
```excel
=AI.CHOICE(A2, $F$2:$F$4)
```
*(Remember to Copy and Paste as Values once evaluated to avoid recalculation).*

### Deterministic Native Excel Fallback (No AI / Offline):
```excel
=LET(
    txt, LOWER(A2),
    is_pos, OR(ISNUMBER(SEARCH({"great","fast","excellent","happy"}, txt))),
    is_neg, OR(ISNUMBER(SEARCH({"rude","slow","terrible","unhelpful","broken"}, txt))),
    IFS(is_pos, "Positive", is_neg, "Negative", TRUE, "Neutral")
)
```
</details>

## Reflection
While `AI.CHOICE` captures subtle sentiment and sarcasm much better than keyword matching, it requires internet access, consumes tokens, and can vary slightly across runs. The native keyword fallback is deterministic, instant, and 100% private.

## Lessons Learned
- AI is powerful for unstructured text classification that defies rigid keywords.
- Always convert AI classification columns to static values before publishing workbooks.

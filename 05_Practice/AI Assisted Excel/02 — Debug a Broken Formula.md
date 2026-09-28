---
type: exercise
exercise_id: AI-EX-02
topic: Formula Debugging
level: 2
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - debugging
  - error-handling
---

# 🧪 Exercise 02: Debug a Broken Formula With AI Assistance

## Objective
Use AI to diagnose a formula producing `#N/A` errors caused by subtle data-type mismatches, then evaluate the proposed fix.

## Dataset
`Table_Employees`:
- Column A (`ID`): `101`, `102`, `103` (Stored as text strings with leading green error indicators: `'101`, `'102`, `'103'`).
- Column B (`Name`): `Alice`, `Bob`, `Charlie`.

Input Cell `D2`: Contains the number `102` (Entered as a standard numerical value).
Target Cell `E2`: Contains `=VLOOKUP(D2, Table_Employees, 2, FALSE)`.

## Business Scenario
A human resources report is failing with `#N/A` across 400 lookup cells even though the employee ID `102` clearly exists in the table.

## Task
1. Prompt AI to analyze the formula and dataset characteristics.
2. Determine whether the AI identifies the numeric vs text data type mismatch.
3. Validate the solution against both text and numeric inputs.

## AI Prompt
```text
Analyze this Excel formula and diagnose why it is failing.
Formula: =VLOOKUP(D2, Table_Employees, 2, FALSE)
Current Behavior:
- D2 contains number 102.
- Table_Employees Column 1 contains text '102'.
- The formula returns #N/A.
Provide:
1. Exact root-cause diagnosis.
2. Corrected formula using modern XLOOKUP that handles both numbers and text gracefully.
3. Edge-case test cases.
```

## Expected Reasoning
The AI should immediately pinpoint that Excel treats numeric `102` and string `"102"` as fundamentally different data types. A standard lookup will never match a number to a string. The solution must either coerce `D2` to text using `""&D2` or `TEXT(D2, "@")`, or check both formats.

## Validation
- [ ] Does the proposed fix resolve `#N/A` when `D2` is a number?
- [ ] Does the formula still work if someone enters text into `D2`?
- [ ] Is the formula safe from `#VALUE!` errors?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified Manual Solution</summary>

```excel
=XLOOKUP(D2&"", Table_Employees[ID]&"", Table_Employees[Name], "Not Found")
```

**Alternative coerced lookup:**
```excel
=XLOOKUP(TEXT(D2, "@"), Table_Employees[ID], Table_Employees[Name], "Not Found")
```
</details>

## Reflection
Did the AI suggest reformatting the entire column manually or fixing it dynamically inside the formula? In production ETL, fixing the data type at the ingestion layer (Power Query) is superior to complex formula coercion.

## Lessons Learned
- `#N/A` in lookups is almost always a type mismatch (Number vs Text) or hidden trailing whitespace.
- AI is exceptionally quick at diagnosing type coercion issues when given exact cell formatting details.

---
type: exercise
exercise_id: AI-EX-05
topic: Data Cleaning
level: 2
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - data-cleaning
  - text-functions
  - power-query
---

# 🧪 Exercise 05: Clean Messy Data With AI Assistance

## Objective
Use AI to generate text cleaning and standardization formulas, inspect the generated functions (`TRIM`, `CLEAN`, `PROPER`), and rebuild the pipeline in Power Query.

## Dataset
`Raw_Customer_Names`:
- Cell A2: `"  john  DOE  "` (Leading/trailing whitespace, non-breaking space `CHAR(160)`, inconsistent casing)
- Cell A3: `"sarah	connor"` (Tab character `CHAR(9)` inside string)
- Cell A4: `"MICHAEL   O'CONNOR"` (Consecutive internal spaces, uppercase with apostrophe)

## Business Scenario
A marketing database export contains messy customer names with hidden spaces and improper capitalization. You need clean, standardized names formatted in proper title case for an email campaign.

## Task
1. Prompt AI for an Excel formula to strip extra whitespace, remove non-printable characters, and format to proper case.
2. Verify how the formula handles Irish surnames like `O'Connor`.
3. Translate the formula logic into an automated Power Query step.

## AI Prompt
```text
Task: Clean messy customer names in Excel.
Input string in cell A2 has:
- Extra leading/trailing spaces
- Multiple internal spaces
- Possible non-breaking spaces (CHAR(160)) and non-printable control characters
- Mixed uppercase and lowercase letters
Write an Excel formula to sanitize this text to Proper Case.
Explain how Excel handles words with apostrophes like "O'Connor".
Provide the equivalent Power Query M code.
```

## Expected Reasoning
- Standard Excel `TRIM()` removes leading/trailing ASCII spaces (`CHAR(32)`) and collapses multiple consecutive spaces to one.
- `CLEAN()` removes non-printable ASCII characters (`0` to `31`).
- `SUBSTITUTE(A2, CHAR(160), " ")` replaces web non-breaking spaces with standard spaces before trimming.
- `PROPER()` capitalizes the first letter of each word, but capitalizes the letter following an apostrophe (`O'Connor` becomes `O'Connor` or `O'connor` depending on Excel localization).

## Validation
- [ ] Does `=PROPER(TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " "))))` clean cell A2 to `"John Doe"`?
- [ ] Are leading and trailing spaces completely eliminated (`LEN` check)?
- [ ] Does the solution work dynamically across the entire column?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified Formula & Power Query Solution</summary>

### Excel Formula:
```excel
=PROPER(TRIM(CLEAN(SUBSTITUTE(A2, CHAR(160), " "))))
```

### Power Query M Code:
```powerquery
= Table.TransformColumns(Source, {
    {"CustomerName", each Text.Proper(Text.Trim(Text.Clean(_))), type text}
})
```
</details>

## Reflection
Did the AI mention `CHAR(160)`? Web-scraped data frequently contains non-breaking spaces that standard `TRIM()` cannot remove. Prompting AI specifically about web data prompts it to include `SUBSTITUTE(..., CHAR(160), " ")`.

## Lessons Learned
- `TRIM` + `CLEAN` + `SUBSTITUTE` is the classic Excel triple-defense formula for dirty text.
- Power Query's `Text.Trim` and `Text.Clean` provide a more scalable, permanent solution for automated data ingestion.

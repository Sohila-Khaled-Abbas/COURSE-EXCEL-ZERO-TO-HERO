---
type: exercise
exercise_id: AI-EX-09
topic: Output Validation
level: 3
status: ready
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - ai-practice
  - validation
  - stress-testing
  - auditing
---

# 🧪 Exercise 09: Validate an AI-Generated Solution Against Hostile Inputs

## Objective
Take an AI-generated formula that appears completely functional on sample data, apply the [[AI Output Verification]] framework, and discover where it breaks under boundary and edge-case conditions.

## Dataset
`Table_Orders` (Columns: `OrderID`, `CustomerName`, `OrderTotal`, `DiscountCode`):
- Row 1: `101`, `Acme Corp`, `$1,000`, `"VIP10"`
- Row 2: `102`, `Beta LLC`, `$500`, `""` (Empty string)
- Row 3: `103`, `Gamma Inc`, `$0`, `"SUMMER5"`
- Row 4: `104`, `Delta Co`, `-$50`, `"VIP10"` (Negative return)
- Row 5: `105`, `Epsilon Ltd`, `""` (Null total), `"VIP10"`

## Business Scenario
An AI generated this formula to calculate the net order price after discount:
```excel
=A2 * (1 - VLOOKUP(D2, DiscountRates, 2, FALSE))
```
Where `DiscountRates` maps `"VIP10"` to `0.10` and `"SUMMER5"` to `0.05`.

## Task
1. Inspect the AI formula across rows 1 through 5.
2. Identify which rows cause runtime calculation failures (`#N/A`, `#VALUE!`, or mathematical nonsense).
3. Re-engineer the formula to be 100% resilient against hostile inputs.

## AI Prompt (Adversarial Stress Test)
```text
Critically audit this formula:
=OrderTotal * (1 - VLOOKUP(DiscountCode, DiscountRates, 2, FALSE))
Identify:
1. What happens when DiscountCode is empty/blank?
2. What happens when OrderTotal is zero, blank, or negative?
3. What happens if DiscountCode is not found in the table?
Rewrite the formula to be completely bombproof.
```

## Expected Reasoning
- Row 2: `DiscountCode` is blank ➔ `VLOOKUP` returns `#N/A`, corrupting the entire cell!
- Row 4: Negative return ➔ Discount reduces the credit amount incorrectly.
- Row 5: Blank total ➔ Produces `#VALUE!` if coerced or unhandled.
- Unfound code ➔ `VLOOKUP` crashes without `IFERROR` or `XLOOKUP`.

## Validation
- [ ] Does the formula evaluate cleanly to `$500` for Row 2 (no discount)?
- [ ] Does it return `$0` for Row 3?
- [ ] Does it return `$0` or clean blank for Row 5?
- [ ] Is `VLOOKUP` upgraded to modern `XLOOKUP`?

## Manual Solution
<details>
<summary>🔍 Click to Reveal Verified Resilient Solution</summary>

```excel
=LET(
    total, IF(OR(ISBLANK(Table_Orders[OrderTotal]), Table_Orders[OrderTotal] <= 0), 0, Table_Orders[OrderTotal]),
    code, Table_Orders[DiscountCode],
    discount_pct, XLOOKUP(code, DiscountRates[Code], DiscountRates[Rate], 0, 0),
    total * (1 - discount_pct)
)
```

**Key Architectural Defenses:**
1. Zero/blank protection on `OrderTotal`.
2. `XLOOKUP` defaults to `0` discount if the code is blank or invalid.
3. Completely immune to `#N/A` and `#VALUE!`.
</details>

## Reflection
The original AI formula worked on the "happy path" (Row 1), but failed on 80% of the realistic operational edge cases. This is why human verification is non-negotiable in data engineering.

## Lessons Learned
- Always test formulas with blanks, negatives, and invalid codes.
- `LET` with `XLOOKUP` provides clean defense against cascading errors.

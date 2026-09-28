---
type: revision
category: flashcards
tags: [excel, revision, flashcards, active-recall]
created: 2026-09-28
updated: 2026-09-28
---

# 🗂️ Active Recall Flashcard Deck

> [!tip] How to Revise
> Read the Question, form your answer in your mind, then click the toggle to check your understanding!

### Card 1: Absolute vs Relative
> [!question]- Q: What does `=A$1` mean when dragged across cells?
> **A**: The column is relative and will shift when dragged horizontally, but Row 1 is locked with `$` and will remain fixed when dragged vertically.

### Card 2: XLOOKUP Defaults
> [!question]- Q: What is the default match mode of `XLOOKUP` vs `VLOOKUP`?
> **A**: `XLOOKUP` defaults to **Exact Match** (`0`), whereas legacy `VLOOKUP` defaults to **Approximate Match** (`TRUE`), making `XLOOKUP` vastly safer.

### Card 3: Tables vs Normal Ranges
> [!question]- Q: What happens to a calculated column in an Excel Table when you add a new row at the bottom?
> **A**: The table dynamically expands automatically, and the calculated column formula immediately auto-populates down the new row without manual dragging.

### Card 4: SUMIFS Argument Order
> [!question]- Q: Where does the `sum_range` go in `SUMIFS` versus `SUMIF`?
> **A**: In `SUMIFS`, the `sum_range` is the **first argument**. In single-condition `SUMIF`, it is the **last (optional) argument**.

### Card 5: Power Query Applied Steps
> [!question]- Q: Does cleaning data in Power Query modify the original source CSV or database table?
> **A**: **No**. Power Query is strictly non-destructive. It reads source data, applies a sequence of recorded transformations in memory, and outputs the result to Excel.

### Card 6: DAX Measures vs Calculated Columns
> [!question]- Q: Why should ratio metrics like `Answer Rate %` be built as DAX Measures rather than Calculated Columns?
> **A**: Calculated columns evaluate row-by-row and sum up incorrectly in Pivot summaries. DAX Measures evaluate in the dynamic filter context of the Pivot Table, calculating `=SUM(Answered) / SUM(TotalCalls)` at the aggregate level.

### Card 7: Valid Missing Data
> [!question]- Q: In the Call Center project, why did `Speed of answer in seconds` have 946 missing values?
> **A**: Because exactly 946 calls were abandoned (`Answered == "N"`). Callers disconnected before agent answer, so speed of answer and CSAT survey never occurred.

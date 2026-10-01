---
type: project-documentation
project_name: PwC Call Center Performance Analysis
created: 2026-09-28
title: Data Quality & Null Triage Assessment
description: Forensic audit of 5,000 rows and explanation of 946 nulls
---

# 4. Forensic Data Quality Assessment

> [!important] Grounded Audit Findings
> A complete programmatic audit of all 5,000 records in `PWC Dataset.xlsx` yielded the following findings:

## 1. Completeness & Missing Values Analysis
- **Total Rows**: 5,000.
- **Attributes with Zero Missing Values**: `Call Id` (0), `Agent` (0), `Date` (0), `Time` (0), `Topic` (0), `Answered (Y/N)` (0), `Resolved` (0).
- **Attributes with Missing Values**:
  - `Speed of answer in seconds`: exactly 946 nulls (18.92%).
  - `AvgTalkDuration`: exactly 946 nulls (18.92%).
  - `Satisfaction rating`: exactly 946 nulls (18.92%).

### Forensic Verification of the 946 Nulls
Cross-tabulation of `Answered (Y/N)` against missing value counts:
```python
unanswered = df[df['Answered (Y/N)'] == 'N']
# len(unanswered) = 946
# unanswered[['Speed of answer', 'AvgTalkDuration', 'Satisfaction rating']].isnull().sum() = 946 each!

answered = df[df['Answered (Y/N)'] == 'Y']
# len(answered) = 4,054
# answered[['Speed of answer', 'AvgTalkDuration', 'Satisfaction rating']].isnull().sum() = 0!
```
**Conclusion**: These 946 missing values are **strictly valid operational nulls**. When a caller abandons (`Answered == 'N'`), no agent conversation occurs, no talk duration is generated, and no post-call CSAT survey is administered. They must NOT be dropped or imputed with zero, as zero speed would imply instantaneous answering!

## 2. Uniqueness & Primary Key Integrity
- `Call Id` has exactly 5,000 distinct values.
- Zero duplicate rows detected.

## 3. Validity & Range Bounds
- `Satisfaction rating` values strictly conform to integers 1, 2, 3, 4, and 5.
- `Answered (Y/N)` contains only `'Y'` and `'N'`.
- `Resolved` contains only `'Y'` and `'N'`.
- Operating hours span 9:00 AM to 6:00 PM daily.

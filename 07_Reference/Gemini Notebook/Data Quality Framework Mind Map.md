---
type: external-resource
source_type: external
source_name: Gemini Notebook Curated Asset
source_url: https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1
course_topic: Data Quality & Forensic Cleaning
status: reviewed
created: 2026-09-28
updated: 2026-09-28
tags:
  - excel
  - data-quality
  - mindmap
  - visual-asset
  - gemini-notebook
---

# Data Quality Framework Mind Map

## Why This Resource Matters
Data analysis errors rarely originate from formula syntax; they stem from bad underlying data (whitespace anomalies, broken foreign keys, mixed types, truncation). The Data Quality Framework Mind Map decomposes data hygiene into actionable verification checks across the data preparation lifecycle.

---

## Source Visual Artifact
![Data Quality Mind Map](../../assets/data-quality-mind-map.png)

---

## Source Summary
The visual diagram outlines the core dimensions and validation stages of data quality:
- **Completeness**: Identifying missing values, differentiating operational blanks from data corruption.
- **Uniqueness**: Detecting accidental duplicate primary keys vs recurring dimension attributes.
- **Validity & Conformance**: Enforcing domain constraints (e.g. phone numbers, email regex, date formatting, rating scales 1-5).
- **Accuracy & Integrity**: Verifying reference integrity across fact and dimension tables.
- **Consistency**: Ensuring casing, naming conventions, and terminology match across ERP/CRM systems.

---

## My Understanding
In our [[Call Center Performance Analysis]] audit, we applied this exact framework to 5,000 records. We proved that the 946 null values in `Speed of answer`, `AvgTalkDuration`, and `Satisfaction rating` are not "missing data defects"—they are 100% correlated with `Answered (Y/N) == 'N'`. Understanding this prevented naive imputation errors.

---

## Key Takeaways
1. **Never Impute Blanks Blindly**: Always verify why a field is blank before replacing it with 0 or the column mean.
2. **Standardize Early**: Cleanse strings with `TRIM` and `PROPER` or Power Query text transformations prior to modeling.

---

## Concepts Supported
- [[Six Dimensions of Data Quality]]
- [[Data Cleaning]]
- [[ETL Process]]

---

## Related Course Lessons
- [[01_Data_Quality_Dimensions_and_Audit]]
- [[01_Data_Types_and_Formatting]]

---

## Practice Opportunities
- [[Ex05_Data_Cleaning_and_Transformation]]

---

## Project Connection
- [[06_Projects/Call Center Performance Analysis/Data Quality Assessment]]

---

## Original Source
[Open Gemini Notebook Source](https://notebook.google.com/notebook/bcdef821-08bc-4186-9221-2c747d5a2b15?authuser=1)
Asset file: `assets/data-quality-mind-map.png`

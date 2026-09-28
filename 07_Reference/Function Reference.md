---
type: reference
title: Function Reference
tags: [excel, reference, functions]
created: 2026-09-28
updated: 2026-09-28
---

# 📖 Complete Excel Function Reference Guide

| Category | Function | Purpose | Return Type | Difficulty | Note Link |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Lookup** | `XLOOKUP` | Bidirectional search, exact by default | Any | Intermediate | [[XLOOKUP]] |
| **Lookup** | `VLOOKUP` | Legacy vertical search (left-to-right) | Any | Beginner | [[VLOOKUP]] |
| **Lookup** | `HLOOKUP` | Horizontal table search across rows | Any | Intermediate | [[HLOOKUP]] |
| **Lookup** | `INDEX` | Return value at row/col coordinates | Any | Intermediate | [[INDEX]] |
| **Lookup** | `MATCH` | Return position index of matching value | Integer | Intermediate | [[MATCH]] |
| **Aggregation** | `SUM` | Adds numeric values | Number | Beginner | [[SUM]] |
| **Aggregation** | `SUMIF` | Adds values matching a single condition | Number | Beginner | [[SUMIF]] |
| **Aggregation** | `SUMIFS` | Adds values matching multiple conditions| Number | Intermediate | [[SUMIFS]] |
| **Aggregation** | `AVERAGE` | Arithmetic mean | Number | Beginner | [[AVERAGE]] |
| **Aggregation** | `AVERAGEIFS`| Average of values matching conditions | Number | Intermediate | [[AVERAGEIFS]] |
| **Aggregation** | `MIN` | Minimum numeric value | Number | Beginner | [[MIN]] |
| **Aggregation** | `MAX` | Maximum numeric value | Number | Beginner | [[MAX]] |
| **Arithmetic** | `PRODUCT` | Multiplies all numeric arguments | Number | Beginner | [[PRODUCT]] |
| **Arithmetic** | `QUOTIENT` | Returns integer portion of a division | Integer | Beginner | [[QUOTIENT]] |
| **Arithmetic** | `MOD` | Remainder of division (modulo) | Number | Beginner | [[MOD]] |
| **Arithmetic** | `POWER` | Raises number to exponential power | Number | Beginner | [[POWER]] |
| **Arithmetic** | `ROUND` | Standard mathematical rounding | Number | Beginner | [[ROUND]] |
| **Arithmetic** | `ROUNDUP` | Rounds number away from zero | Number | Beginner | [[ROUNDUP]] |
| **Arithmetic** | `ROUNDDOWN`| Rounds number toward zero | Number | Beginner | [[ROUNDDOWN]] |
| **Counting** | `COUNT` | Count cells containing numbers | Integer | Beginner | [[COUNT]] |
| **Counting** | `COUNTA` | Count non-empty cells | Integer | Beginner | [[COUNTA]] |
| **Counting** | `COUNTBLANK` | Count empty cells or empty strings | Integer | Beginner | [[COUNTBLANK]] |
| **Counting** | `COUNTIF` | Count cells matching a single condition | Integer | Beginner | [[COUNTIF]] |
| **Counting** | `COUNTIFS` | Count rows matching multiple conditions | Integer | Intermediate | [[COUNTIFS]] |
| **Logical** | `IF` | Binary conditional test | Any | Beginner | [[IF]] |
| **Logical** | `IFS` | Multi-branch conditional test | Any | Intermediate | [[IFS]] |
| **Logical** | `SWITCH` | Exact value expression mapper | Any | Intermediate | [[SWITCH]] |
| **Logical** | `IFERROR` | Trap all errors and substitute fallback | Any | Beginner | [[IFERROR]] |
| **Logical** | `IFNA` | Trap only missing lookup `#N/A` errors | Any | Intermediate | [[IFNA]] |
| **Logical** | `AND` | Compound boolean (all must be TRUE) | Boolean | Beginner | [[AND]] |
| **Logical** | `OR` | Compound boolean (any can be TRUE) | Boolean | Beginner | [[OR]] |
| **Logical** | `NOT` | Invert boolean logic state | Boolean | Beginner | [[NOT]] |
| **Text** | `CONCAT` | Combine strings/ranges without delimiter | Text | Beginner | [[CONCAT]] |
| **Text** | `LEFT` | Extract characters from start (left) | Text | Beginner | [[LEFT]] |
| **Text** | `RIGHT` | Extract characters from end (right) | Text | Beginner | [[RIGHT]] |
| **Text** | `MID` | Extract substring from middle by index | Text | Beginner | [[MID]] |
| **Text** | `LEN` | Return character count | Integer | Beginner | [[LEN]] |
| **Text** | `TRIM` | Strip extra whitespace | Text | Beginner | [[TRIM]] |
| **Text** | `UPPER` | Convert text to uppercase | Text | Beginner | [[UPPER]] |
| **Text** | `LOWER` | Convert text to lowercase | Text | Beginner | [[LOWER]] |
| **Text** | `PROPER` | Convert text to Title Case | Text | Beginner | [[PROPER]] |
| **Text** | `SUBSTITUTE`| Replace text by matching content | Text | Intermediate | [[SUBSTITUTE]] |
| **Text** | `REPLACE` | Replace text by character position | Text | Intermediate | [[REPLACE]] |
| **Text** | `FIND` | Locate substring (case-sensitive) | Integer | Intermediate | [[FIND]] |
| **Text** | `SEARCH` | Locate substring (case-insensitive) | Integer | Intermediate | [[SEARCH]] |
| **Text** | `TEXTJOIN` | Concatenate array with delimiter | Text | Intermediate | [[TEXTJOIN]] |
| **Text** | `TEXTSPLIT` | Split text into array across columns/rows | Array | Intermediate | [[TEXTSPLIT]] |
| **Date/Time** | `TODAY` | Current system date serial | Date | Beginner | [[TODAY]] |
| **Date/Time** | `NOW` | Current system date and time timestamp | Date/Time | Beginner | [[NOW]] |
| **Date/Time** | `DAY` | Extract day of month integer (1-31) | Integer | Beginner | [[DAY]] |
| **Date/Time** | `MONTH` | Extract month integer (1-12) | Integer | Beginner | [[MONTH]] |
| **Date/Time** | `YEAR` | Extract 4-digit year integer | Integer | Beginner | [[YEAR]] |
| **Date/Time** | `WEEKDAY` | Extract day-of-week index (1-7) | Integer | Intermediate | [[WEEKDAY]] |
| **Date/Time** | `WEEKNUM` | Extract week-of-year index (1-54) | Integer | Intermediate | [[WEEKNUM]] |
| **Date/Time** | `DATEDIF` | Difference between dates in days/months/years | Integer | Intermediate | [[DATEDIF]] |
| **Date/Time** | `NETWORKDAYS`| Working business days (excluding weekends)| Integer | Intermediate | [[NETWORKDAYS]] |
| **Date/Time** | `NETWORKDAYS.INTL` | Workdays with custom weekend masks | Integer | Intermediate | [[NETWORKDAYS.INTL]] |
| **Dynamic Array**| `FILTER` | Filter array into spill range | Array | Advanced | [[FILTER]] |
| **Dynamic Array**| `UNIQUE` | Distinct values array | Array | Intermediate | [[UNIQUE]] |
| **DAX** | `CALCULATE` | Override/modify filter context | Scalar | Advanced | [[CALCULATE]] |
| **DAX** | `DIVIDE` | Safe division avoiding divide by zero | Scalar | Intermediate | [[DIVIDE]] |

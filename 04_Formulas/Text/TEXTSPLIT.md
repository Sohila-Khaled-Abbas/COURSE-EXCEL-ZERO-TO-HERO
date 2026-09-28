---
type: excel-function
category: text
difficulty: intermediate
introduced_in: "Excel 365"
aliases: [TEXTSPLIT]
tags: [excel, function, text, dynamic-array, data-cleaning]
status: mastered
related_functions: ["[[TEXTJOIN]]", "[[TEXTBEFORE]]", "[[TEXTAFTER]]", "[[TRIM]]"]
created: 2026-09-28
updated: 2026-09-28
---

# TEXTSPLIT Function

> [!abstract] Purpose
> Splits a text string into an array of substrings across columns, rows, or both, using specified delimiters. It is the modern formula-based replacement for the legacy **Text to Columns** wizard.

## Syntax

```excel
=TEXTSPLIT(text, col_delimiter, [row_delimiter], [ignore_empty], [match_mode], [pad_with])
```

## Arguments Breakdown

| Argument | Required? | Description |
| :--- | :--- | :--- |
| `text` | **Required** | The text string to split (or cell reference). |
| `col_delimiter` | **Required\*** | The delimiter to split text across **columns** (horizontally). Can be an array `{",", ";"}`. |
| `row_delimiter` | *Optional* | The delimiter to split text down **rows** (vertically). |
| `ignore_empty` | *Optional* | `FALSE` (default) creates an empty cell for consecutive delimiters. `TRUE` ignores them. |
| `match_mode` | *Optional* | `0` = Case-sensitive (default). `1` = Case-insensitive. |
| `pad_with` | *Optional* | The value used to pad missing elements in a 2D split (defaults to `#N/A`). |

*\* Note: Either `col_delimiter` or `row_delimiter` must be provided.*

---

## Practical Examples

### 1. Splitting Superstore Product ID (Horizontal Split)
Splitting hierarchical identifiers like `FUR-BO-10001798` across 3 columns:

```excel
=TEXTSPLIT([@[Product ID]], "-")
```

**Result**:
| Column 1 (Dept) | Column 2 (Sub-Cat) | Column 3 (Serial) |
| :--- | :--- | :--- |
| `FUR` | `BO` | `10001798` |

---

### 2. Extracting a Specific Segment (Extracting Order Year)
To extract specifically the 2nd element (Year) from `CA-2016-152156`, wrap with `INDEX`:

```excel
=INDEX(TEXTSPLIT([@[Order ID]], "-"), 2)
```

**Result**: `2016`

---

### 3. Multiple Delimiters (Array Constant)
When text contains mixed separators (e.g. `City, State - Region`):

```excel
=TEXTSPLIT("Los Angeles, California - West", {", ", " - "})
```

**Result**: Spills `Los Angeles`, `California`, and `West` into 3 separate cells.

---

### 4. Two-Dimensional Grid Split (Rows and Columns)
Transforming key-value pairs (`Category:Sales;Furniture:4199.99;Tech:8320.50`) into a structured 2D table:

```excel
=TEXTSPLIT("Furniture:4199.99;Tech:8320.50;Office:2100.00", ":", ";")
```

**Result**:
| Column A | Column B |
| :--- | :--- |
| Furniture | 4199.99 |
| Tech | 8320.50 |
| Office | 2100.00 |

---

## Comparison: TEXTSPLIT vs Other Transformation Tools

| Feature | `TEXTSPLIT` | Text to Columns (`Alt+A+E`) | Flash Fill (`Ctrl+E`) | Power Query |
| :--- | :--- | :--- | :--- | :--- |
| **Dynamism** | Dynamic (Auto-updates) | Static snapshot | Static snapshot | Dynamic on Refresh |
| **Direction** | Columns, Rows, or 2D Grid | Columns only | Columns only | Columns or Rows |
| **Preserves Raw Data** | Yes (Non-destructive) | Can overwrite if destination not changed | Non-destructive | Non-destructive |
| **Excel Version** | Excel 365 / Web only | All versions | Excel 2013+ | Excel 2016+ / Add-in |

---

## Key Behaviors & Gotchas

> [!CAUTION] Dynamic Array Spill Obstruction (`#SPILL!`)
> Because `TEXTSPLIT` returns a dynamic array, ensure the destination cells to the right (or below) are blank. If an existing value blocks the output range, Excel returns a `#SPILL!` error.

> [!TIP] Table Limitation
> Dynamic array formulas cannot spill inside an official Excel Table (`ListObject`). To use `TEXTSPLIT` inside a table row, wrap it with a scalar function like `INDEX(...)`, `CHOOSECOLS(...)`, or place the formula in a standard worksheet grid outside the table.

---

## Vault Cross-References
- 📖 Lesson Note: [[04_Data_Transformation_Tools|Lesson 2.4: Data Transformation Tools]]
- 🧩 Related Formulas: [[TEXTJOIN]], [[TRIM]], [[TEXTBEFORE]], [[TEXTAFTER]]
- 📊 Concept: [[Relative vs Absolute References]]
- 📂 Practical Demo: `11_Demos_and_Workbooks/02_Data_Management/Superstore_Dataset_Demo.xlsx`

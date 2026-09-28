---
type: lesson
course: Excel Zero to Hero
module: "Module 3"
topic: "Text Manipulation"
status: not-started
difficulty: intermediate
tags: [excel, lesson, text, data-cleaning]
prerequisites: ["[[01_Formula_Basics_and_Cell_Referencing]]"]
related_project: "[[Call Center Performance Analysis]]"
source: "https://youtu.be/uv1bxe2gdnU"
created: 2026-09-28
updated: 2026-09-28
video_chapter: \"Chapter 3 – Excel Formulas & Functions\"
video_timestamp: \"1:38:56\"
video_url: \"https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s\"
---

# Lesson 3.5: String Cleansing, Text Parsing & Concatenation

> [!abstract] Learning Objective
> Clean, extract, and assemble text strings using `TRIM`, `PROPER`, `LEFT`, `RIGHT`, `MID`, `LEN`, and modern delimiters like `TEXTJOIN` and `TEXTSPLIT`.

> 🎥 **Video Chapter**: [Chapter 3 – Excel Formulas & Functions (1:38:56)](https://www.youtube.com/watch?v=uv1bxe2gdnU&t=5936s)

## Core Text Functions
- `=TRIM(text)`: Removes all leading, trailing, and excessive internal spaces (leaves single space).
- `=PROPER(text)`: Capitalizes the first letter of each word (Title Case).
- `=LEN(text)`: Returns total character count.
- `=LEFT(text, num_chars)` / `=RIGHT(text, num_chars)`: Extracts substring from start/end.
- `=MID(text, start_num, num_chars)`: Extracts substring from middle.
- `=TEXTJOIN(delimiter, ignore_empty, text1, ...)`: Combines arrays of text with a custom delimiter.

## Practical Cleaning Formula
To clean and standardize messy user names:
```excel
=PROPER(TRIM(A2))
```

## Related Knowledge
- Concepts: [[Data Cleaning]]
- Formulas: [[TRIM]], [[PROPER]], [[TEXTJOIN]], [[TEXTSPLIT]]

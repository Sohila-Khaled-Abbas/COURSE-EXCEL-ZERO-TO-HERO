---
name: create-lesson-note
description: Creates a standardized, richly linked lesson note following vault conventions.
---

# Create Lesson Note Skill

Use this workflow to generate a new lesson note in `02_Notes/<Module_Folder>/`:

1. **Verify Evidence**: Ground the content in the corresponding module under `09_Source_Materials/`.
2. **Apply Template**: Use the structure from `Templates/Lesson Note Template.md`.
3. **Include Frontmatter**:
   ```yaml
   type: lesson
   course: Excel Zero to Hero
   module: "Module X"
   topic: "Topic Name"
   status: not-started
   difficulty: beginner | intermediate | advanced
   tags: [excel, lesson]
   prerequisites: []
   related_project: "[[Call Center Performance Analysis]]"
   ```
4. **Link Integrations**: Ensure links to relevant `[[03_Concepts/]]` and `[[04_Formulas/]]`.
5. **Self-Check**: Include 3 self-test questions and 2 interview questions.

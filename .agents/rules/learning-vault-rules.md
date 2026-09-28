# Learning Vault Architecture & Obsidian Guidelines

## 1. Core Principles
- **Grounding in Evidence**: Never fabricate functions, formulas, dataset values, or course lessons. Verify all statements against course materials in `09_Source_Materials/` or verified datasets.
- **Link First Architecture**: Connect concepts via bidirectional Obsidian links `[[Note Name]]`. Every lesson connects to its concepts, formulas, exercises, and relevant projects.
- **Strict Frontmatter**: Every note must have valid YAML frontmatter with controlled taxonomy:
  - `status`: `not-started` | `learning` | `practiced` | `understood` | `mastered` | `needs-review`
  - `difficulty`: `beginner` | `intermediate` | `advanced`
  - `type`: `lesson` | `concept` | `excel-function` | `exercise` | `project-documentation` | `revision`
- **Avoid Content Duplication**: Maintain atomic concept notes in `03_Concepts/` and function notes in `04_Formulas/`. Reference them in lesson notes rather than repeating full definitions.
- **Preserve Source Materials**: Never overwrite or delete files in `09_Source_Materials/`.

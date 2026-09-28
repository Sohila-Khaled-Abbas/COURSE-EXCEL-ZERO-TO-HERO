# Contributing to COURSE-EXCEL-ZERO-TO-HERO

Thank you for your interest in contributing to the **Excel Zero to Hero Knowledge Vault & PwC Call Center Analytics System**! This repository is engineered as an open-source, second-brain learning architecture and enterprise analytics case study.

---

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
  - [Reporting Errors or Typos](#reporting-errors-or-typos)
  - [Suggesting New Concepts or Practice Drills](#suggesting-new-concepts-or-practice-drills)
  - [Enhancing Documentation & Workflows](#enhancing-documentation--workflows)
- [Development & Note Conventions](#development--note-conventions)
  - [Obsidian Frontmatter Requirements](#obsidian-frontmatter-requirements)
  - [Wikilinks & Internal Graph Integrity](#wikilinks--internal-graph-integrity)
  - [Mermaid Diagram Standards](#mermaid-diagram-standards)
- [Git Workflow & Commit Guidelines](#git-workflow--commit-guidelines)
- [Submitting a Pull Request](#submitting-a-pull-request)

---

## Code of Conduct
This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [sohila.k.data@gmail.com](mailto:sohila.k.data@gmail.com).

---

## How Can I Contribute?

### Reporting Errors or Typos
If you find a formula syntax error, broken wikilink, or calculation mismatch:
1. Search existing [Issues](https://github.com/Sohila-Khaled-Abbas/COURSE-EXCEL-ZERO-TO-HERO/issues) to ensure it hasn't been reported.
2. If not, open a new Issue using the **Documentation / Bug Report** template.
3. Include the exact note path (e.g., `02_Notes/03_Formulas_and_Functions/04_Lookup_and_Reference_Functions.md`) and the relevant line or formula.

### Suggesting New Concepts or Practice Drills
We welcome additional business analytics scenarios, practice exercises, and formula explanations that align with the course topics (Chapters 1 to 10).
- Open an Issue labeled `enhancement` describing the proposed concept, its business context, and target module.

---

## Development & Note Conventions

Every note in this vault must comply with standardized Obsidian and GitHub Flavored Markdown (GFM) conventions:

### Obsidian Frontmatter Requirements
All new lesson, concept, or formula notes must include valid YAML frontmatter:
```yaml
---
type: lesson | concept | formula | practice | project
course: Excel Zero to Hero
module: "Module X"
topic: "Topic Name"
status: completed | in-progress | not-started
difficulty: beginner | intermediate | advanced
tags: [excel, topic, subtopic]
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

### Wikilinks & Internal Graph Integrity
- Use standard Obsidian wikilinks: `[[Note Name]]` or aliased wikilinks: `[[Note Name|Display Label]]`.
- Always verify that the target note exists in the repository before referencing it to prevent dangling graph nodes.

### Mermaid Diagram Standards
- When illustrating data flows, architectures, or decision trees, use fenced `mermaid` code blocks.
- Quote node labels containing parentheses, spaces, or brackets: `id["Node Label (Detail)"]`.

---

## Git Workflow & Commit Guidelines

We enforce the **Conventional Commits** specification for clean, readable history:

| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat:` | New note, formula guide, or exercise | `feat: add Dynamic Array SORTBY practice drill` |
| `fix:` | Corrected formula, broken link, or typo | `fix: correct XLOOKUP match_mode argument in 04_Formulas` |
| `docs:` | Updates to README, dashboards, or curriculum | `docs: update video curriculum timestamps for chapter 5` |
| `style:` | Formatting, CSS snippet adjustments, or callout alignment | `style: standardize admonition callout formatting` |
| `refactor:` | Reorganizing folder structures or note aliases | `refactor: align module notes with 10-chapter video curriculum` |

---

## Submitting a Pull Request
1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your additions or corrections, following the note templates in `Templates/`.
3. Test all links and markdown rendering locally.
4. Commit your changes with a conventional commit message.
5. Push to your fork and submit a Pull Request targeting `main`.
6. Fill out the [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md) completely.

---

## Recognition & Attribution
Contributors who submit accepted PRs will be acknowledged in release notes. Thank you for helping build an elite open-source data analytics learning system!

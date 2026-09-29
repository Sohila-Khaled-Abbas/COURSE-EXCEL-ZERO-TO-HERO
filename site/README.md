# 🌐 Excel Zero to Hero — Interactive Learning Platform

> A static, modern, accessible educational web platform deployed on GitHub Pages, transforming the comprehensive Microsoft Excel and Data Analytics Obsidian vault into an interactive learning environment.

---

## 🏛️ Architecture & Technology Choices

The platform follows a **zero-duplication static site architecture (SSG)**:
- **Source of Truth**: The original markdown files across the Obsidian vault (`00_Home/`, `01_Course/`, `02_Notes/`, `03_Concepts/`, `04_Formulas/`, `05_Practice/`, `06_Projects/`, `07_Reference/`, `08_Revision/`, `10_Portfolio/`) remain the single source of truth. No markdown content is duplicated.
- **SSG Engine (`site/build.js`)**: A custom, high-speed Node.js static site generator that parses YAML frontmatter using `js-yaml` and renders GitHub Flavored Markdown using `marked`.
- **Obsidian Preprocessor**:
  - Automatically resolves all Obsidian wikilinks (`[[Note]]` and `[[Note|Label]]`) to directory-based clean URLs (`/lessons/01_excel_interface_and_gui/`, `/formulas/xlookup/`, etc.).
  - Converts Obsidian callouts (`> [!tip]`, `> [!warning]`, `> [!abstract]`, `> [!question]-`, etc.) into semantic styled HTML alert containers with SVG icons and collapsible details.
  - Automatically wraps code and formula blocks with language badges and one-click copy-to-clipboard buttons.
- **Client App Engine (`site/src/app.js`)**:
  - **Zero-Backend LocalStorage Persistence**: Stores completed lessons, mastered exercises, bookmarked resources, theme preferences, and 3D flashcard mastery securely in the learner's browser.
  - **Dynamic Course Gauge**: Real-time progress percentage calculated from actual completed lessons out of 38 total.
  - **Interactive 3D Flashcards**: 3D flip card animation with keyboard controls (`Space` to flip, `Arrow` keys for next/prev), shuffle, and self-assessment ("Know it" vs "Review again").
  - **Interactive Self-Check Quizzes**: Knowledge check cards with instant visual feedback and educational explanations.
  - **Global Search Modal (`Ctrl+K` / `Cmd+K`)**: Lightning-fast, client-side fuzzy search across all 207 pages using the pre-compiled `search-index.json`.
- **Design System (`site/src/styles.css`)**:
  - Spreadsheet-inspired analytics aesthetic featuring Excel emerald green (`#107c41`), subtle slate tones, glassmorphism, responsive navigation drawer, and persistent light/dark mode.

---

## 🚀 Local Development & Preview

### Prerequisites
- Node.js `v18+` or `v20+` (verified on Node `v24.16.0`)
- npm `v9+` or `v11+`

### Commands
```bash
# 1. Navigate to the site workspace
cd site

# 2. Install dependencies (marked, js-yaml)
npm install

# 3. Build for local preview (sets base path to '/')
npm run build:local

# 4. Serve the generated static files locally
npx serve dist -l 3000
```
Open `http://localhost:3000` in your web browser.

### Production Build
```bash
# Builds with GitHub Pages project base path (/COURSE-EXCEL-ZERO-TO-HERO/)
npm run build

# Run site verification and integrity test suite (audits all internal links, HTML, and assets)
node verify.js
```

---

## 🔄 Content Ingestion & Updating Workflow

Because the build pipeline reads directly from the parent repository folders:
1. **Adding a Lesson**: Create a new `.md` file inside `02_Notes/0X_ModuleName/`. Include standard YAML frontmatter (`title`, `module`, `difficulty`, `status`, `tags`).
2. **Adding a Formula**: Add a `.md` note in `04_Formulas/Category/`. The SSG will automatically index it into the Formula Library with syntax copy buttons.
3. **Adding a Practice Lab**: Add the exercise to `05_Practice/Exercises/` and matching solution to `05_Practice/Solutions/`. The platform automatically nests a collapsible "Reveal Step-by-Step Solution" panel on the exercise page.
4. **Updating Revision**: Update cards in `08_Revision/Flashcards.md`. The generator automatically compiles them into interactive flip cards.
5. **Rebuilding**: Run `npm run build` inside `site/` (or push to GitHub, where GitHub Actions automatically builds and deploys).

---

## 🚢 GitHub Pages Automated Deployment

The deployment pipeline is configured via `.github/workflows/deploy.yml`:
1. Triggers on pushes to `main` or `master`.
2. Checks out the repository and sets up Node.js.
3. Runs `npm ci` and `npm run build` inside `site/`.
4. Uploads `site/dist/` as a GitHub Pages artifact using `actions/upload-pages-artifact@v3`.
5. Deploys to GitHub Pages using `actions/deploy-pages@v4`.

### Manual GitHub Repository Setting
To ensure GitHub Pages uses GitHub Actions:
- Go to repository **Settings** → **Pages**.
- Under **Build and deployment** → **Source**, select **GitHub Actions**.
- The published platform will be live at:
  `https://sohila-khaled-abbas.github.io/COURSE-EXCEL-ZERO-TO-HERO/`

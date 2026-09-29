/**
 * Excel Zero to Hero — High-Performance Static Site Generator (SSG)
 * Converts Obsidian learning vault and Excel curriculum into a static,
 * responsive, accessible learning platform for GitHub Pages.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { marked } = require('marked');

// ---------------------------------------------------------------------------
// 1. CONFIGURATION & ARGUMENT PARSING
// ---------------------------------------------------------------------------
const args = process.argv.slice(2);
let BASE_URL = '/COURSE-EXCEL-ZERO-TO-HERO/';

if (args.includes('--local') || process.env.LOCAL_DEV === '1') {
  BASE_URL = '/';
} else if (process.env.BASE_URL) {
  BASE_URL = process.env.BASE_URL;
}

const baseArgIndex = args.indexOf('--base-url');
if (baseArgIndex !== -1 && args[baseArgIndex + 1]) {
  BASE_URL = args[baseArgIndex + 1];
}

if (!BASE_URL.endsWith('/')) {
  BASE_URL += '/';
}

console.log(`[BUILD] Target Base URL: ${BASE_URL}`);

const REPO_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

// ---------------------------------------------------------------------------
// 2. HELPER UTILITIES
// ---------------------------------------------------------------------------
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseMarkdownFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data = {};
  let body = raw;

  if (raw.startsWith('---')) {
    const end = raw.indexOf('---', 3);
    if (end !== -1) {
      const yamlStr = raw.slice(3, end).trim();
      body = raw.slice(end + 3).trim();
      try {
        data = yaml.load(yamlStr) || {};
      } catch (e) {
        data = {};
      }
    }
  }

  // Derive title from H1 or filename
  let title = data.title || data.topic || data.project_name || '';
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].replace(/^[^\w\s]+/, '').trim();
    } else {
      title = path.basename(filePath, '.md').replace(/_/g, ' ');
    }
  }

  return { data, body, title };
}

// ---------------------------------------------------------------------------
// 3. SCAN & INDEX ALL VAULT CONTENT
// ---------------------------------------------------------------------------
const database = {
  lessons: [],
  concepts: [],
  formulas: [],
  practice: [],
  projects: [],
  reference: [],
  revision: [],
  portfolio: null,
  allFiles: []
};

// Map basename (lowercase) -> URL
const linkIndex = new Map();

function scanVault() {
  const sections = [
    { folder: '02_Notes', type: 'lesson' },
    { folder: '03_Concepts', type: 'concept' },
    { folder: '04_Formulas', type: 'formula' },
    { folder: '05_Practice', type: 'practice' },
    { folder: '06_Projects', type: 'project' },
    { folder: '07_Reference', type: 'reference' },
    { folder: '08_Revision', type: 'revision' },
    { folder: '10_Portfolio', type: 'portfolio' }
  ];

  sections.forEach(({ folder, type }) => {
    const fullPath = path.join(REPO_ROOT, folder);
    if (!fs.existsSync(fullPath)) return;

    function walk(dir) {
      fs.readdirSync(dir).forEach(file => {
        const itemPath = path.join(dir, file);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          walk(itemPath);
        } else if (file.endsWith('.md')) {
          const baseName = path.basename(file, '.md');
          const { data, body, title } = parseMarkdownFile(itemPath);

          let slug = slugify(baseName);
          let itemUrl = '';

          if (type === 'lesson') {
            itemUrl = `${BASE_URL}lessons/${slug}/`;
          } else if (type === 'concept') {
            itemUrl = `${BASE_URL}concepts/${slug}/`;
          } else if (type === 'formula') {
            itemUrl = `${BASE_URL}formulas/${slug}/`;
          } else if (type === 'practice') {
            itemUrl = `${BASE_URL}practice/${slug}/`;
          } else if (type === 'project') {
            if (itemPath.includes('Call Center Performance Analysis')) {
              itemUrl = `${BASE_URL}projects/call-center-performance-analysis/#doc-${slug}`;
            } else if (itemPath.includes('Hotel Reservation Analysis')) {
              itemUrl = `${BASE_URL}projects/hotel-reservation-analysis/`;
            } else {
              itemUrl = `${BASE_URL}projects/${slug}/`;
            }
          } else if (type === 'reference') {
            itemUrl = `${BASE_URL}reference/${slug}/`;
          } else if (type === 'revision') {
            itemUrl = `${BASE_URL}revision/#${slug}`;
          } else if (type === 'portfolio') {
            itemUrl = `${BASE_URL}portfolio/`;
          }

          const record = {
            id: slug,
            baseName,
            filePath: itemPath,
            relPath: path.relative(REPO_ROOT, itemPath).replace(/\\/g, '/'),
            type,
            data,
            body,
            title,
            slug,
            url: itemUrl,
            category: data.category || (folder === '02_Notes' ? data.module : type),
            module: data.module || '',
            difficulty: data.difficulty || 'intermediate',
            tags: Array.isArray(data.tags) ? data.tags : []
          };

          linkIndex.set(baseName.toLowerCase(), itemUrl);
          linkIndex.set(slug, itemUrl);
          database.allFiles.push(record);

          if (type === 'lesson') database.lessons.push(record);
          else if (type === 'concept') database.concepts.push(record);
          else if (type === 'formula') database.formulas.push(record);
          else if (type === 'practice') database.practice.push(record);
          else if (type === 'project') database.projects.push(record);
          else if (type === 'reference') database.reference.push(record);
          else if (type === 'revision') database.revision.push(record);
          else if (type === 'portfolio') database.portfolio = record;
        }
      });
    }

    walk(fullPath);
  });

  // Additional common aliases
  linkIndex.set('call center performance analysis', `${BASE_URL}projects/call-center-performance-analysis/`);
  linkIndex.set('hotel reservation analysis', `${BASE_URL}projects/hotel-reservation-analysis/`);
  linkIndex.set('course dashboard', BASE_URL);
  linkIndex.set('curriculum roadmap', `${BASE_URL}curriculum/`);
  linkIndex.set('flashcards', `${BASE_URL}revision/#flashcards`);
  linkIndex.set('interview questions', `${BASE_URL}revision/#interview`);
  linkIndex.set('common mistakes', `${BASE_URL}revision/#mistakes`);
  linkIndex.set('quick review', `${BASE_URL}revision/#cram`);
  linkIndex.set('keyboard shortcuts', `${BASE_URL}reference/keyboard-shortcuts/`);
  linkIndex.set('excel cheat sheet', `${BASE_URL}reference/excel-cheat-sheet/`);
}

// ---------------------------------------------------------------------------
// 4. OBSIDIAN SYNTAX CONVERSION & RENDERING
// ---------------------------------------------------------------------------
function transformObsidian(rawText, currentRecord = null) {
  let text = rawText;

  // 1. Obsidian Callouts: > [!type][+-]? Title
  // Supports multi-line blockquotes
  text = text.replace(/^> \[!([a-zA-Z_-]+)\]([+-]?)(?:[ \t]+([^\r\n]*))?\r?\n((?:> .*(?:\r?\n|$))+)/gm, (match, type, collapse, title, bodyLines) => {
    const cleanType = type.toLowerCase();
    const cleanTitle = title ? title.trim() : (cleanType.charAt(0).toUpperCase() + cleanType.slice(1));
    const bodyContent = bodyLines.split('\n').map(l => l.replace(/^> ?/, '')).join('\n').trim();

    const icons = {
      tip: '💡',
      warning: '⚠️',
      caution: '⚠️',
      danger: '🚫',
      important: '📌',
      abstract: '🎯',
      summary: '📋',
      note: '📝',
      info: 'ℹ️',
      question: '❓',
      example: '🔍',
      quote: '💬'
    };
    const icon = icons[cleanType] || '📝';

    const isCollapsible = collapse === '-' || collapse === '+';
    const isOpen = collapse === '+' ? ' open' : '';

    if (isCollapsible) {
      return `\n<details class="callout callout-${cleanType}"${isOpen}><summary class="callout-header"><span class="callout-icon">${icon}</span><span class="callout-title">${cleanTitle}</span></summary><div class="callout-body">\n\n${bodyContent}\n\n</div></details>\n\n`;
    }
    return `\n<div class="callout callout-${cleanType}"><div class="callout-header"><span class="callout-icon">${icon}</span><span class="callout-title">${cleanTitle}</span></div><div class="callout-body">\n\n${bodyContent}\n\n</div></div>\n\n`;
  });

  // 2. Obsidian Embeds / Images: ![[Image.png]]
  text = text.replace(/!\[\[([^\|\]]+)(?:\|([^\]]+))?\]\]/g, (match, fileName, alt) => {
    const cleanName = path.basename(fileName.trim());
    return `<img src="${BASE_URL}assets/images/${cleanName}" alt="${alt || cleanName}" loading="lazy" class="content-img" />`;
  });

  // 3. Obsidian Wikilinks: [[Target|Label]] & [[Target]]
  text = text.replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, (match, target, label) => {
    const key = target.trim().toLowerCase();
    const url = linkIndex.get(key) || linkIndex.get(slugify(key)) || '#';
    return `<a href="${url}" class="internal-link">${label.trim()}</a>`;
  });

  text = text.replace(/\[\[([^\|\]]+)\]\]/g, (match, target) => {
    const key = target.trim().toLowerCase();
    const url = linkIndex.get(key) || linkIndex.get(slugify(key)) || '#';
    const display = target.replace(/_/g, ' ').trim();
    return `<a href="${url}" class="internal-link">${display}</a>`;
  });

  // 4. Suppress raw Dataview query blocks into styled info boxes
  text = text.replace(/```dataview[\s\S]*?```/g, () => {
    return `<div class="callout callout-info"><div class="callout-header"><span class="callout-icon">ℹ️</span><span class="callout-title">Interactive Vault Query</span></div><div class="callout-body"><p>This table is automatically aggregated from our course database. Use the search bar or curriculum roadmap to browse all linked lessons and resources.</p></div></div>`;
  });

  // 5. Checklist task formatting
  text = text.replace(/^- \[ \]\s+(.+)$/gm, '<li class="task-item"><label><input type="checkbox" disabled /> $1</label></li>');
  text = text.replace(/^- \[x\]\s+(.+)$/gm, '<li class="task-item task-done"><label><input type="checkbox" checked disabled /> $1</label></li>');

  // Parse Markdown to HTML
  let html = marked.parse(text);

  // Wrap code blocks with copy buttons
  html = html.replace(/<pre><code class="language-([a-zA-Z0-9_\-]+)">([\s\S]*?)<\/code><\/pre>/g, (m, lang, code) => {
    return `
      <div class="code-block-container">
        <div class="code-block-header">
          <span>${lang.toUpperCase()}</span>
          <button class="code-copy-btn">Copy</button>
        </div>
        <pre><code class="language-${lang}">${code}</code></pre>
      </div>
    `;
  });

  html = html.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (m, code) => {
    return `
      <div class="code-block-container">
        <div class="code-block-header">
          <span>CODE</span>
          <button class="code-copy-btn">Copy</button>
        </div>
        <pre><code>${code}</code></pre>
      </div>
    `;
  });

  return html;
}

// ---------------------------------------------------------------------------
// 5. HTML TEMPLATE GENERATOR
// ---------------------------------------------------------------------------
function renderPageLayout({ title, pageId, type, content, activeNav, breadcrumbs = [], wideLayout = false, customHead = '' }) {
  const breadcrumbHtml = breadcrumbs.length > 0 ? `
    <nav class="breadcrumb-nav" aria-label="Breadcrumb">
      <a href="${BASE_URL}">Home</a>
      ${breadcrumbs.map(b => `
        <span class="breadcrumb-separator">/</span>
        ${b.url ? `<a href="${b.url}">${escapeHtml(b.label)}</a>` : `<span>${escapeHtml(b.label)}</span>`}
      `).join('')}
    </nav>
  ` : '';

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} — Excel Zero to Hero</title>
  <meta name="description" content="Master Microsoft Excel, Business Intelligence, Data Analysis, Power Query, and DAX with hands-on lessons, interactive exercises, and real-world projects.">
  <meta name="base-url" content="${BASE_URL}">
  ${pageId ? `<meta name="excel-page-id" content="${pageId}" data-type="${type || 'page'}">` : ''}
  <link rel="stylesheet" href="${BASE_URL}assets/styles.css">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23107c41%22/><text y=%2268%22 x=%2250%22 font-size=%2255%22 font-family=%22sans-serif%22 font-weight=%22bold%22 text-anchor=%22middle%22 fill=%22white%22>X</text></svg>">
  ${customHead}
</head>
<body>

  <!-- Top App Navigation Bar -->
  <header class="app-header">
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <button class="mobile-menu-btn icon-btn" aria-label="Toggle Navigation Menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <a href="${BASE_URL}" class="brand-container">
        <div class="brand-icon">X</div>
        <div class="brand-title">
          Excel Zero to Hero
          <small>Interactive Learning Platform</small>
        </div>
      </a>
    </div>

    <div class="header-center">
      <button class="search-trigger-btn" aria-label="Open Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Search lessons, formulas, concepts...</span>
        <kbd class="kbd-shortcut">Ctrl K</kbd>
      </button>
    </div>

    <div class="header-actions">
      <div class="header-progress-pill" title="Overall Course Completion">
        <span class="header-progress-pct">0%</span>
        <div class="progress-mini-bar">
          <div class="progress-mini-fill"></div>
        </div>
      </div>
      <button class="theme-toggle-btn icon-btn" aria-label="Toggle Color Theme"></button>
    </div>
  </header>

  <!-- Main Platform Container -->
  <div class="app-container">
    <!-- Navigation Sidebar -->
    <aside class="app-sidebar">
      <div class="sidebar-section">
        <div class="sidebar-title">Learning Core</div>
        <ul class="sidebar-nav-list">
          <li>
            <a href="${BASE_URL}" class="sidebar-nav-link ${activeNav === 'dashboard' ? 'active' : ''}">
              <span class="sidebar-nav-icon">📊</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}curriculum/" class="sidebar-nav-link ${activeNav === 'curriculum' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🗺️</span>
              <span>Curriculum Roadmap</span>
              <span class="sidebar-badge">9 Mods</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}practice/" class="sidebar-nav-link ${activeNav === 'practice' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🎯</span>
              <span>Practice Center</span>
              <span class="sidebar-badge">Labs</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}revision/" class="sidebar-nav-link ${activeNav === 'revision' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🗂️</span>
              <span>Flashcards & Cram</span>
              <span class="sidebar-badge">Active</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Analytics & References</div>
        <ul class="sidebar-nav-list">
          <li>
            <a href="${BASE_URL}formulas/" class="sidebar-nav-link ${activeNav === 'formulas' ? 'active' : ''}">
              <span class="sidebar-nav-icon">⚡</span>
              <span>Formula Library</span>
              <span class="sidebar-badge">65+</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}concepts/" class="sidebar-nav-link ${activeNav === 'concepts' ? 'active' : ''}">
              <span class="sidebar-nav-icon">💡</span>
              <span>Atomic Concepts</span>
              <span class="sidebar-badge">25</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}projects/" class="sidebar-nav-link ${activeNav === 'projects' ? 'active' : ''}">
              <span class="sidebar-nav-icon">💼</span>
              <span>Projects & Case Studies</span>
              <span class="sidebar-badge">PwC</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}reference/" class="sidebar-nav-link ${activeNav === 'reference' ? 'active' : ''}">
              <span class="sidebar-nav-icon">📚</span>
              <span>Cheatsheets & AI</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}portfolio/" class="sidebar-nav-link ${activeNav === 'portfolio' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🏆</span>
              <span>Portfolio Case Study</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar-section" style="margin-top: auto; padding-top: 1.5rem; border-top: 1px solid var(--border-subtle);">
        <button class="btn btn-secondary btn-sm" style="width: 100%; justify-content: flex-start; gap: 0.5rem; color: var(--text-muted);" data-action="reset-progress">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          <span>Reset Browser Progress</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Stage -->
    <main class="app-main">
      <div class="content-wrapper ${wideLayout ? 'wide-layout' : ''}">
        ${breadcrumbHtml}
        ${content}
      </div>
    </main>
  </div>

  <!-- Global Search Modal -->
  <div id="search-modal" class="search-modal-backdrop" role="dialog" aria-modal="true" aria-label="Search content">
    <div class="search-modal-box">
      <div class="search-input-wrapper">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--text-muted);"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" id="search-input" class="search-input-field" placeholder="Search 38 lessons, 65 formulas, 25 concepts, exercises..." autocomplete="off">
      </div>
      <div id="search-results" class="search-results-list"></div>
      <div class="search-modal-footer">
        <span>Navigation: <kbd class="kbd-shortcut">↑</kbd> <kbd class="kbd-shortcut">↓</kbd> Select: <kbd class="kbd-shortcut">Enter</kbd> Close: <kbd class="kbd-shortcut">Esc</kbd></span>
        <span>Excel Zero to Hero Platform</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <p><strong>Excel Zero to Hero</strong> — Interactive Analytics Learning Platform</p>
    <p style="margin-top: 0.35rem; font-size: 0.8rem;">Sourced from the comprehensive Microsoft Excel & Data Analytics Curriculum Vault • Built for GitHub Pages</p>
  </footer>

  <script src="${BASE_URL}assets/app.js"></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// 6. BUILD PAGES
// ---------------------------------------------------------------------------

// A. Build Dashboard (index.html)
function buildDashboard() {
  console.log('[BUILD] Building Learning Dashboard...');
  const firstLesson = database.lessons[0] || { url: `${BASE_URL}curriculum/`, title: 'Start Curriculum' };

  const html = `
    <!-- Hero Card -->
    <div class="dashboard-hero-card">
      <div class="hero-content">
        <h1>Welcome to Excel Zero to Hero</h1>
        <p>A structured, interactive journey from core spreadsheet foundations to professional data analytics, Power Query ETL, and DAX dimensional modeling.</p>
        <div class="hero-cta-group">
          <a id="continue-learning-btn" href="${firstLesson.url}" class="btn btn-primary first-lesson-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span id="continue-learning-desc">Continue Learning</span>
          </a>
          <a href="${BASE_URL}curriculum/" class="btn btn-secondary">
            Explore 9-Module Roadmap
          </a>
        </div>
      </div>
      <div class="progress-dial-box">
        <svg viewBox="0 0 36 36" class="circular-chart">
          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path id="dash-circle-bar" class="circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <text id="dash-pct-text" x="18" y="20.35" class="percentage-text">0%</text>
        </svg>
        <span style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 0.4rem;">Course Progress</span>
      </div>
    </div>

    <!-- 4 High-Yield Metric Cards -->
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-icon-box icon-green">📖</div>
        <div class="metric-info">
          <h3>Completed Lessons</h3>
          <div class="metric-value" id="metric-completed-lessons">0 / 38</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon-box icon-blue">🎯</div>
        <div class="metric-info">
          <h3>Mastered Labs</h3>
          <div class="metric-value" id="metric-mastered-exercises">0 / 7</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon-box icon-purple">⚡</div>
        <div class="metric-info">
          <h3>Formula Library</h3>
          <div class="metric-value">${database.formulas.length} Functions</div>
        </div>
      </div>

      <div class="metric-card">
        <div class="metric-icon-box icon-amber">🗂️</div>
        <div class="metric-info">
          <h3>Flashcards Mastered</h3>
          <div class="metric-value" id="metric-flashcards-mastered">0 / 25</div>
        </div>
      </div>
    </div>

    <!-- Learning Journey Overview -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
      <div>
        <div class="section-heading-row">
          <h2>Core Curriculum Path</h2>
          <a href="${BASE_URL}curriculum/" style="font-size: 0.85rem; font-weight: 600;">View Full Roadmap →</a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${[
            { num: '1', title: 'Excel Fundamentals & Analytics Roles', lessons: '2 Lessons', desc: 'Interface navigation, cell mechanics, and data analyst workflow' },
            { num: '2', title: 'Data Management & Formatting', lessons: '6 Lessons', desc: 'Types, custom formatting, validation lists, deduplication, and shortcuts' },
            { num: '3', title: 'Formulas & Functions Mastery', lessons: '8 Lessons', desc: 'Cell references, conditional logic, XLOOKUP, dates, and dynamic arrays' },
            { num: '4', title: 'Excel Tables Architecture', lessons: '3 Lessons', desc: 'Structured references, calculated columns, and table governance' },
            { num: '5', title: 'Pivot Tables & Aggregation', lessons: '4 Lessons', desc: 'Multi-dimensional summaries, calculated fields, slicers, and timelines' },
            { num: '6', title: 'Data Analysis Charts & Dashboards', lessons: '3 Lessons', desc: 'Visual analytics, cognitive load design, and executive layout' },
            { num: '7', title: 'Data Cleaning & Governance', lessons: '4 Lessons', desc: 'DAMA 6 quality dimensions, null auditing, and ERP ingestion' },
            { num: '8', title: 'Power Query & M Language ETL', lessons: '4 Lessons', desc: 'Automated data pipelines, unpivoting, merges, and API ingestion' },
            { num: '9', title: 'Data Modeling & DAX Intelligence', lessons: '4 Lessons', desc: 'Star schema, CALCULATE context transition, and business measures' },
          ].map(m => `
            <div class="module-card" style="margin-bottom: 0;">
              <div class="module-header" onclick="location.href='${BASE_URL}curriculum/#module-${m.num}'">
                <div class="module-header-main">
                  <div class="module-num-badge">M${m.num}</div>
                  <div class="module-header-titles">
                    <h3>${m.title}</h3>
                    <p>${m.desc}</p>
                  </div>
                </div>
                <div class="module-header-stats">
                  <span class="meta-pill">${m.lessons}</span>
                  <span style="font-size: 0.85rem; color: var(--brand-primary); font-weight: 600;">Explore →</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Quick Action & Saved Items Sidebar -->
      <div>
        <div class="section-heading-row">
          <h2>Saved Resources</h2>
        </div>
        <div id="dashboard-bookmarks-list" style="margin-bottom: 2rem;">
          <!-- Populated dynamically by app.js -->
        </div>

        <div class="section-heading-row">
          <h2>High-Yield Practice</h2>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          <a href="${BASE_URL}revision/" class="pagination-card" style="padding: 1rem;">
            <span class="pagination-label">Active Recall</span>
            <span class="pagination-title">3D Flashcards & Interview Deck</span>
          </a>
          <a href="${BASE_URL}projects/call-center-performance-analysis/" class="pagination-card" style="padding: 1rem;">
            <span class="pagination-label">Capstone Case Study</span>
            <span class="pagination-title">PwC Call Center Performance Analysis</span>
          </a>
          <a href="${BASE_URL}formulas/" class="pagination-card" style="padding: 1rem;">
            <span class="pagination-label">Instant Reference</span>
            <span class="pagination-title">65+ Searchable Excel & DAX Functions</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const fullHtml = renderPageLayout({
    title: 'Learning Dashboard',
    pageId: 'dashboard',
    type: 'dashboard',
    content: html,
    activeNav: 'dashboard',
    wideLayout: true
  });

  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), fullHtml, 'utf8');
}

// B. Build Curriculum Roadmap (curriculum/index.html)
function buildCurriculum() {
  console.log('[BUILD] Building Curriculum Roadmap...');
  const outDir = path.join(DIST_DIR, 'curriculum');
  ensureDir(outDir);

  const modules = [
    { num: 1, id: '01_fundamentals', title: 'Module 1: Excel Fundamentals & Analytics Roles', desc: 'Master the user interface, spreadsheet grid mechanics, and career roadmap for data analytics.' },
    { num: 2, id: '02_data_management', title: 'Module 2: Data Management, Validation & Hygiene', desc: 'Primitive data types, custom number formatting, list validation, sorting algorithms, and file formats.' },
    { num: 3, id: '03_formulas_and_functions', title: 'Module 3: Formulas & Functions Engine', desc: 'Cell referencing (Relative vs Absolute), math/stats functions, logical IFS, modern XLOOKUP, dates, and dynamic arrays.' },
    { num: 4, id: '04_tables', title: 'Module 4: Excel Tables Architecture', desc: 'ListObject engine, structured column references, calculated fields, and robust table design.' },
    { num: 5, id: '05_pivot_tables', title: 'Module 5: Pivot Tables & Multi-Dimensional Summaries', desc: 'Aggregation mechanics, Show Values As percentage calculations, grouping, slicers, and interactive timelines.' },
    { num: 6, id: '06_charts', title: 'Module 6: Data Visualization & Executive Dashboards', desc: 'Visual analytics, chart selection rules, cognitive load reduction, and KPI dashboard visual hierarchy.' },
    { num: 7, id: '07_data_cleaning', title: 'Module 7: Data Cleaning & Enterprise Governance', desc: 'The DAMA 6 Dimensions of Data Quality, formula cleaning techniques, and enterprise ERP/CRM data ingestion.' },
    { num: 8, id: '08_power_query', title: 'Module 8: Power Query ETL & M Automation', desc: 'Extract, Transform, Load (ETL) pipeline, column unpivoting, fuzzy merging, append queries, and introduction to M.' },
    { num: 9, id: '09_data_modeling_and_dax', title: 'Module 9: Data Modeling, Star Schema & DAX Measures', desc: 'Dimensional modeling, relationship cardinality (1-to-many), CALCULATE context transition, and business intelligence.' }
  ];

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Comprehensive Learning Path</span>
      <h1 class="page-title">Curriculum Roadmap & Learning Path</h1>
      <p class="page-subtitle">A progressive, structured 9-module curriculum designed to take you from initial spreadsheet navigation to building enterprise-grade analytics pipelines.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1.5rem;">
      ${modules.map(mod => {
        const modLessons = database.lessons.filter(l => {
          const modStr = (l.module || '').toLowerCase();
          return modStr.includes(`module ${mod.num}`) || l.filePath.includes(`0${mod.num}_`);
        });

        return `
          <div id="module-${mod.num}" class="module-card open">
            <div class="module-header">
              <div class="module-header-main">
                <div class="module-num-badge">M${mod.num}</div>
                <div class="module-header-titles">
                  <h3>${mod.title}</h3>
                  <p>${mod.desc}</p>
                </div>
              </div>
              <div class="module-header-stats">
                <span class="meta-pill">${modLessons.length} Lessons</span>
                <span class="chevron-icon">▼</span>
              </div>
            </div>

            <div class="module-body">
              <div class="lessons-list" style="margin-top: 1rem;">
                ${modLessons.map((lesson, idx) => `
                  <a href="${lesson.url}" class="lesson-item-row" data-lesson-id="${lesson.id}">
                    <div class="lesson-row-left">
                      <span class="completion-check-icon"></span>
                      <span class="lesson-title-text">${mod.num}.${idx + 1} — ${lesson.title}</span>
                    </div>
                    <div class="lesson-row-meta">
                      <span class="meta-pill difficulty-${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>
                      <span>Read Lesson →</span>
                    </div>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const fullHtml = renderPageLayout({
    title: 'Curriculum Roadmap',
    pageId: 'curriculum',
    type: 'curriculum',
    content: html,
    activeNav: 'curriculum',
    breadcrumbs: [{ label: 'Curriculum Roadmap' }]
  });

  fs.writeFileSync(path.join(outDir, 'index.html'), fullHtml, 'utf8');
}

// C. Build Individual Lesson Pages (lessons/[slug]/index.html)
function buildLessons() {
  console.log(`[BUILD] Building ${database.lessons.length} Lesson Pages...`);

  database.lessons.forEach((lesson, index) => {
    const outDir = path.join(DIST_DIR, 'lessons', lesson.slug);
    ensureDir(outDir);

    const prevLesson = index > 0 ? database.lessons[index - 1] : null;
    const nextLesson = index < database.lessons.length - 1 ? database.lessons[index + 1] : null;

    const renderedBody = transformObsidian(lesson.body, lesson);

    const videoBadge = lesson.data.video_chapter ? `
      <div class="meta-item">
        <span>🎥</span>
        <span>${lesson.data.video_chapter.replace(/\\"/g, '"')} (${lesson.data.video_timestamp ? lesson.data.video_timestamp.replace(/\\"/g, '') : 'Video'})</span>
      </div>
    ` : '';

    const html = `
      <div class="page-header-box">
        <span class="page-category-badge">${lesson.module || 'Core Curriculum'}</span>
        <h1 class="page-title">${lesson.title}</h1>

        <div class="page-meta-bar">
          <div class="meta-item">
            <span class="meta-pill difficulty-${lesson.difficulty.toLowerCase()}">${lesson.difficulty}</span>
          </div>
          ${videoBadge}
          <div class="meta-item">
            <span>⏱️</span>
            <span>~8 min read</span>
          </div>
        </div>

        <div class="page-actions-toolbar">
          <button id="btn-mark-complete" class="btn btn-secondary btn-sm" aria-label="Mark lesson as complete">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
            <span>Mark as Complete</span>
          </button>
          <button id="btn-bookmark" class="btn btn-secondary btn-sm" aria-label="Bookmark lesson">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>Bookmark</span>
          </button>
          <a href="${BASE_URL}practice/" class="btn btn-primary btn-sm" style="margin-left: auto;">
            <span>Practice in Labs →</span>
          </a>
        </div>
      </div>

      <article class="prose">
        ${renderedBody}
      </article>

      <!-- Bottom Pagination (Previous / Next Lesson) -->
      <nav class="page-pagination-footer">
        ${prevLesson ? `
          <a href="${prevLesson.url}" class="pagination-card">
            <span class="pagination-label">← Previous Lesson</span>
            <span class="pagination-title">${prevLesson.title}</span>
          </a>
        ` : `<div></div>`}

        ${nextLesson ? `
          <a href="${nextLesson.url}" class="pagination-card next">
            <span class="pagination-label">Next Lesson →</span>
            <span class="pagination-title">${nextLesson.title}</span>
          </a>
        ` : `<div></div>`}
      </nav>
    `;

    const fullHtml = renderPageLayout({
      title: lesson.title,
      pageId: lesson.id,
      type: 'lesson',
      content: html,
      activeNav: 'curriculum',
      breadcrumbs: [
        { label: 'Curriculum', url: `${BASE_URL}curriculum/` },
        { label: lesson.module || 'Lessons' },
        { label: lesson.title }
      ]
    });

    fs.writeFileSync(path.join(outDir, 'index.html'), fullHtml, 'utf8');
  });
}

// D. Build Atomic Concepts (concepts/index.html & concepts/[slug]/index.html)
function buildConcepts() {
  console.log(`[BUILD] Building ${database.concepts.length} Concept Pages...`);

  // Index page
  const indexDir = path.join(DIST_DIR, 'concepts');
  ensureDir(indexDir);

  const indexHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Mental Models & Frameworks</span>
      <h1 class="page-title">25 Atomic Analytics Concepts</h1>
      <p class="page-subtitle">Focused, deeply-explained concept notes answering the core structural questions of data architecture, formulas, and business intelligence.</p>
    </div>

    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
      ${database.concepts.map(concept => `
        <a href="${concept.url}" class="metric-card" style="text-decoration: none; display: flex; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <span class="meta-pill">${concept.data.category || 'Concept'}</span>
            <span class="meta-pill difficulty-${concept.difficulty.toLowerCase()}">${concept.difficulty}</span>
          </div>
          <h3 style="font-size: 1.1rem; color: var(--text-primary); font-weight: 700; margin-top: 0.4rem;">${concept.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">Explore mental model, trade-offs, and analytics applications.</p>
        </a>
      `).join('')}
    </div>
  `;

  fs.writeFileSync(
    path.join(indexDir, 'index.html'),
    renderPageLayout({
      title: 'Atomic Concepts Directory',
      pageId: 'concepts-index',
      type: 'concept',
      content: indexHtml,
      activeNav: 'concepts',
      breadcrumbs: [{ label: 'Atomic Concepts' }]
    }),
    'utf8'
  );

  // Individual Concept Pages
  database.concepts.forEach(concept => {
    const outDir = path.join(DIST_DIR, 'concepts', concept.slug);
    ensureDir(outDir);

    const renderedBody = transformObsidian(concept.body, concept);

    const html = `
      <div class="page-header-box">
        <span class="page-category-badge">${concept.data.category || 'Core Concept'}</span>
        <h1 class="page-title">${concept.title}</h1>
        <div class="page-meta-bar">
          <span class="meta-pill difficulty-${concept.difficulty.toLowerCase()}">${concept.difficulty}</span>
          <span>Status: ${concept.data.status || 'Active'}</span>
        </div>
      </div>

      <article class="prose">
        ${renderedBody}
      </article>

      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-default);">
        <a href="${BASE_URL}concepts/" class="btn btn-secondary">← Back to All Concepts</a>
      </div>
    `;

    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      renderPageLayout({
        title: concept.title,
        pageId: concept.id,
        type: 'concept',
        content: html,
        activeNav: 'concepts',
        breadcrumbs: [
          { label: 'Atomic Concepts', url: `${BASE_URL}concepts/` },
          { label: concept.title }
        ]
      }),
      'utf8'
    );
  });
}

// E. Build Formula Library (formulas/index.html & formulas/[slug]/index.html)
function buildFormulas() {
  console.log(`[BUILD] Building ${database.formulas.length} Formula Pages...`);

  const indexDir = path.join(DIST_DIR, 'formulas');
  ensureDir(indexDir);

  const categories = ['All', 'Aggregation', 'Date_and_Time', 'DAX', 'Dynamic_Array', 'Logical', 'Lookup', 'Text'];

  const indexHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Function Encyclopedia</span>
      <h1 class="page-title">Excel & DAX Formula Library</h1>
      <p class="page-subtitle">A comprehensive, searchable dictionary of 65+ Excel functions and DAX measures complete with syntax breakdowns, argument rules, and real-world analytics examples.</p>
    </div>

    <!-- Category Filter Bar -->
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
      ${categories.map(cat => `
        <button class="btn btn-secondary btn-sm" onclick="filterCategory('${cat}')">${cat.replace(/_/g, ' ')}</button>
      `).join('')}
    </div>

    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
      ${database.formulas.map(formula => `
        <div class="metric-card formula-card" data-category="${formula.data.category || ''}" style="display: flex; flex-direction: column; align-items: flex-start; gap: 0.75rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <a href="${formula.url}" style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 800; color: var(--brand-primary); text-decoration: none;">
              =${formula.title.replace(/ Function/i, '')}
            </a>
            <span class="meta-pill">${formula.data.category || 'Function'}</span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">
            ${(formula.data.aliases || [formula.title]).join(', ')} • ${formula.data.introduced_in || 'Excel'}
          </div>
          <div style="display: flex; gap: 0.5rem; margin-top: auto; width: 100%;">
            <a href="${formula.url}" class="btn btn-secondary btn-sm" style="flex: 1;">View Syntax & Examples</a>
          </div>
        </div>
      `).join('')}
    </div>

    <script>
      function filterCategory(cat) {
        document.querySelectorAll('.formula-card').forEach(card => {
          if (cat === 'All' || card.getAttribute('data-category').toLowerCase() === cat.toLowerCase()) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      }
    </script>
  `;

  fs.writeFileSync(
    path.join(indexDir, 'index.html'),
    renderPageLayout({
      title: 'Formula Library (65+ Functions)',
      pageId: 'formulas-index',
      type: 'formula',
      content: indexHtml,
      activeNav: 'formulas',
      breadcrumbs: [{ label: 'Formula Library' }]
    }),
    'utf8'
  );

  // Individual Formula Pages
  database.formulas.forEach(formula => {
    const outDir = path.join(DIST_DIR, 'formulas', formula.slug);
    ensureDir(outDir);

    const renderedBody = transformObsidian(formula.body, formula);

    const html = `
      <div class="page-header-box">
        <span class="page-category-badge">${formula.data.category || 'Excel Function'}</span>
        <h1 class="page-title">${formula.title}</h1>
        <div class="page-meta-bar">
          <span class="meta-pill difficulty-${formula.difficulty.toLowerCase()}">${formula.difficulty}</span>
          ${formula.data.introduced_in ? `<span class="meta-pill">${formula.data.introduced_in}</span>` : ''}
        </div>
      </div>

      <article class="prose">
        ${renderedBody}
      </article>

      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-default);">
        <a href="${BASE_URL}formulas/" class="btn btn-secondary">← Back to Formula Library</a>
      </div>
    `;

    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      renderPageLayout({
        title: formula.title,
        pageId: formula.id,
        type: 'formula',
        content: html,
        activeNav: 'formulas',
        breadcrumbs: [
          { label: 'Formulas', url: `${BASE_URL}formulas/` },
          { label: formula.title }
        ]
      }),
      'utf8'
    );
  });
}

// F. Build Practice Center (practice/index.html & individual practice pages)
function buildPractice() {
  console.log(`[BUILD] Building Practice Center (${database.practice.length} Practice Items)...`);

  const indexDir = path.join(DIST_DIR, 'practice');
  ensureDir(indexDir);

  const exercises = database.practice.filter(p => p.filePath.includes('Exercises'));
  const challenges = database.practice.filter(p => p.filePath.includes('Challenges'));
  const miniProjects = database.practice.filter(p => p.filePath.includes('Mini Projects'));
  const aiLabs = database.practice.filter(p => p.filePath.includes('AI Assisted Excel'));

  const indexHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Hands-On Practice</span>
      <h1 class="page-title">Practice Center & Interactive Labs</h1>
      <p class="page-subtitle">Test and sharpen your Excel analytics skills through guided practice exercises, multi-level business challenges, and AI-assisted workflow labs.</p>
    </div>

    <!-- Quick Knowledge Check Quiz Card -->
    <div class="quiz-card" style="margin-bottom: 2.5rem; border-left: 5px solid var(--brand-primary);">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
        <span class="meta-pill" style="color: var(--brand-primary); border-color: var(--brand-primary);">Interactive Self-Check</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Instant Feedback</span>
      </div>
      <h3 class="quiz-question-title">What happens when you enter =VLOOKUP("Widget", A2:C50, 4, FALSE)?</h3>
      <div class="quiz-options-list">
        <div class="quiz-option-item" data-correct="false">
          <span>Returns the 4th row below Widget</span>
        </div>
        <div class="quiz-option-item" data-correct="true">
          <span>Throws a #REF! error because the table range only has 3 columns (A to C)</span>
        </div>
        <div class="quiz-option-item" data-correct="false">
          <span>Automatically expands the range to column D</span>
        </div>
        <div class="quiz-option-item" data-correct="false">
          <span>Returns #N/A</span>
        </div>
      </div>
      <button class="btn btn-primary quiz-submit-btn" disabled>Check Answer</button>
      <div class="quiz-feedback-box" data-explanation="VLOOKUP column index 4 exceeds the 3 columns specified in A2:C50, resulting in an immediate #REF! reference error. Prefer XLOOKUP to avoid column counting!"></div>
    </div>

    <!-- Tabs for Practice Categories -->
    <div class="section-heading-row">
      <h2>1. Guided Practice Exercises (7 Labs)</h2>
    </div>
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); margin-bottom: 3rem;">
      ${exercises.map(ex => `
        <div class="metric-card" style="flex-direction: column; align-items: flex-start; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span class="meta-pill">${ex.data.module || 'Exercise'}</span>
            <span class="meta-pill difficulty-${ex.difficulty.toLowerCase()}">${ex.difficulty}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${ex.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Includes Level 1 to Level 4 challenges and full step-by-step solution walkthrough.</p>
          <a href="${ex.url}" class="btn btn-primary btn-sm" style="margin-top: auto; width: 100%;">Open Lab & Solution →</a>
        </div>
      `).join('')}
    </div>

    <div class="section-heading-row">
      <h2>2. Advanced Analytics Challenges</h2>
    </div>
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); margin-bottom: 3rem;">
      ${challenges.map(ch => `
        <div class="metric-card" style="flex-direction: column; align-items: flex-start; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span class="meta-pill">Challenge</span>
            <span class="meta-pill difficulty-advanced">Advanced</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${ch.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Complex business scenario testing multi-step logic and performance.</p>
          <a href="${ch.url}" class="btn btn-secondary btn-sm" style="margin-top: auto; width: 100%;">View Challenge →</a>
        </div>
      `).join('')}
    </div>

    <div class="section-heading-row">
      <h2>3. AI-Assisted Excel Labs</h2>
    </div>
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
      ${aiLabs.map(ai => `
        <a href="${ai.url}" class="metric-card" style="text-decoration: none; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span class="meta-pill" style="color: var(--brand-purple); border-color: rgba(124, 58, 237, 0.4);">AI Lab</span>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">${ai.title}</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Prompting, verification, and human audit techniques.</p>
        </a>
      `).join('')}
    </div>
  `;

  fs.writeFileSync(
    path.join(indexDir, 'index.html'),
    renderPageLayout({
      title: 'Practice Center & Labs',
      pageId: 'practice-index',
      type: 'practice',
      content: indexHtml,
      activeNav: 'practice',
      breadcrumbs: [{ label: 'Practice Center' }]
    }),
    'utf8'
  );

  // Individual Practice Items
  database.practice.forEach(item => {
    const outDir = path.join(DIST_DIR, 'practice', item.slug);
    ensureDir(outDir);

    let renderedBody = transformObsidian(item.body, item);

    // If this is an exercise (Ex01 .. Ex07), find matching solution
    let solutionHtml = '';
    const exMatch = item.slug.match(/ex0(\d)/i);
    if (exMatch) {
      const solNum = exMatch[1];
      const solItem = database.practice.find(p => p.slug === `ex0${solNum}-solutions` || p.slug === `ex0${solNum}_solutions`);
      if (solItem) {
        const solRendered = transformObsidian(solItem.body, solItem);
        solutionHtml = `
          <div style="margin-top: 3rem;">
            <details class="callout callout-tip" style="border: 2px solid var(--brand-primary); background: var(--bg-surface);">
              <summary class="callout-header" style="cursor: pointer; padding: 1rem 1.25rem; font-size: 1.05rem;">
                <span class="callout-icon">💡</span>
                <span class="callout-title" style="font-weight: 800;">Reveal Step-by-Step Solution & Walkthrough</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: auto;">(Click to expand)</span>
              </summary>
              <div class="callout-body" style="padding: 1.5rem;">
                <div class="prose">
                  ${solRendered}
                </div>
              </div>
            </details>
          </div>
        `;
      }
    }

    const html = `
      <div class="page-header-box">
        <span class="page-category-badge">${item.data.module || 'Practice Exercise'}</span>
        <h1 class="page-title">${item.title}</h1>
        <div class="page-meta-bar">
          <span class="meta-pill difficulty-${item.difficulty.toLowerCase()}">${item.difficulty}</span>
          ${item.data.source_dataset ? `<span class="meta-pill">📁 Dataset: ${path.basename(item.data.source_dataset)}</span>` : ''}
        </div>
      </div>

      <article class="prose">
        ${renderedBody}
      </article>

      ${solutionHtml}

      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-default);">
        <a href="${BASE_URL}practice/" class="btn btn-secondary">← Back to Practice Center</a>
      </div>
    `;

    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      renderPageLayout({
        title: item.title,
        pageId: item.id,
        type: 'practice',
        content: html,
        activeNav: 'practice',
        breadcrumbs: [
          { label: 'Practice', url: `${BASE_URL}practice/` },
          { label: item.title }
        ]
      }),
      'utf8'
    );
  });
}

// G. Build Revision Center (revision/index.html)
function buildRevision() {
  console.log('[BUILD] Building Revision & Active Recall Hub...');
  const outDir = path.join(DIST_DIR, 'revision');
  ensureDir(outDir);

  // Parse Flashcards
  const flashcardItem = database.revision.find(r => r.baseName === 'Flashcards');
  const flashcards = [];

  if (flashcardItem) {
    const cardMatches = [...flashcardItem.body.matchAll(/### Card \d+:\s*([^\r\n]+)\r?\n> \[!question\]-\s*Q:\s*([^\r\n]+)\r?\n>\s*\*\*A\*\*:\s*([^\r\n]+(?:\r?\n>[^\r\n]+)*)/g)];
    cardMatches.forEach((m, idx) => {
      flashcards.push({
        id: `card_${idx + 1}`,
        topic: m[1].trim(),
        question: m[2].trim(),
        answer: m[3].replace(/^>\s*/gm, '').trim()
      });
    });
  }

  // Parse Interview Questions
  const interviewItem = database.revision.find(r => r.baseName === 'Interview Questions');
  let interviewHtml = '';
  if (interviewItem) {
    interviewHtml = transformObsidian(interviewItem.body, interviewItem);
  }

  // Parse Common Mistakes
  const mistakesItem = database.revision.find(r => r.baseName === 'Common Mistakes');
  let mistakesHtml = '';
  if (mistakesItem) {
    mistakesHtml = transformObsidian(mistakesItem.body, mistakesItem);
  }

  // Parse Quick Review Cram Sheet
  const cramItem = database.revision.find(r => r.baseName === 'Quick Review');
  let cramHtml = '';
  if (cramItem) {
    cramHtml = transformObsidian(cramItem.body, cramItem);
  }

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Active Recall & Retention</span>
      <h1 class="page-title">Revision & Active Recall Center</h1>
      <p class="page-subtitle">Reinforce mental models, retain technical syntax, and prepare for analytics interviews using 3D flip cards, senior Q&A, and diagnostic error logs.</p>
    </div>

    <!-- 3D Interactive Flashcards Experience -->
    <div id="flashcards" style="margin-bottom: 4rem;">
      <div class="section-heading-row">
        <h2>🗂️ 3D Active Recall Flashcard Deck</h2>
        <span id="flashcard-mastery-stat" class="meta-pill" style="color: var(--brand-primary);">Mastered: 0 / ${flashcards.length} (0%)</span>
      </div>

      <div class="flashcard-deck-wrapper" id="flashcard-deck">
        <div class="flashcard-status-bar">
          <span id="flashcard-current-num">Card 1 of ${flashcards.length}</span>
          <span id="flashcard-topic" class="meta-pill">Excel Core</span>
        </div>

        <div id="interactive-flashcard" class="flashcard-container" title="Click or press Space to flip">
          <!-- Front Face -->
          <div class="flashcard-face flashcard-front">
            <div class="flashcard-header">
              <span class="flashcard-badge badge-front">Question</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Press Space or Click to Flip</span>
            </div>
            <div id="flashcard-question" class="flashcard-content">
              Loading question...
            </div>
            <div class="flashcard-footer">
              <span>Touch/Click card to reveal answer</span>
            </div>
          </div>

          <!-- Back Face -->
          <div class="flashcard-face flashcard-back">
            <div class="flashcard-header">
              <span class="flashcard-badge badge-back">Answer & Logic</span>
              <span style="font-size: 0.8rem; color: var(--brand-primary); font-weight: 600;">Solution</span>
            </div>
            <div id="flashcard-answer" class="flashcard-content" style="font-size: 1.15rem; text-align: left;">
              Loading answer...
            </div>
            <div class="flashcard-footer">
              <span>Assess your confidence below</span>
            </div>
          </div>
        </div>

        <!-- Flashcard Controls -->
        <div class="flashcard-controls">
          <button id="flashcard-prev-btn" class="btn btn-secondary btn-sm" aria-label="Previous card">← Prev</button>
          <button id="flashcard-flip-btn" class="btn btn-secondary btn-sm">Flip Card</button>
          <button id="flashcard-next-btn" class="btn btn-secondary btn-sm" aria-label="Next card">Next →</button>
          <button id="flashcard-shuffle-btn" class="btn btn-secondary btn-sm" title="Shuffle Deck">🔀 Shuffle</button>
          <div style="height: 20px; width: 1px; background: var(--border-default); margin: 0 0.5rem;"></div>
          <button id="flashcard-review-btn" class="btn btn-review btn-sm">🔴 Review Again</button>
          <button id="flashcard-know-btn" class="btn btn-know btn-sm">🟢 Know It</button>
        </div>
      </div>

      <!-- Embedded Data for Flashcards Engine -->
      <script id="flashcards-data" type="application/json">
        ${JSON.stringify(flashcards)}
      </script>
    </div>

    <!-- Senior Interview Questions Section -->
    <div id="interview" style="margin-bottom: 4rem;">
      <div class="section-heading-row">
        <h2>💼 Senior Data Analyst Interview Questions & Model Answers</h2>
      </div>
      <div class="prose">
        ${interviewHtml}
      </div>
    </div>

    <!-- Diagnostic Error Log Section -->
    <div id="mistakes" style="margin-bottom: 4rem;">
      <div class="section-heading-row">
        <h2>⚠️ Diagnostic Error Log & Common Pitfalls</h2>
      </div>
      <div class="prose">
        ${mistakesHtml}
      </div>
    </div>

    <!-- 15-Minute Technical Cram Sheet Section -->
    <div id="cram">
      <div class="section-heading-row">
        <h2>⚡ 15-Minute Technical Cram Sheet</h2>
      </div>
      <div class="prose">
        ${cramHtml}
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Revision & Active Recall Hub',
      pageId: 'revision-index',
      type: 'revision',
      content: html,
      activeNav: 'revision',
      breadcrumbs: [{ label: 'Revision Hub' }]
    }),
    'utf8'
  );
}

// H. Build Projects & Case Studies (projects/index.html & projects/[slug]/index.html)
function buildProjects() {
  console.log(`[BUILD] Building Projects & Portfolio Hub...`);

  const indexDir = path.join(DIST_DIR, 'projects');
  ensureDir(indexDir);

  const indexHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Real-World Case Studies</span>
      <h1 class="page-title">Analytics Projects & Portfolio Hub</h1>
      <p class="page-subtitle">End-to-end data analytics projects demonstrating business problem formulation, data quality auditing, exploratory analysis, KPIs, and executive reporting.</p>
    </div>

    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));">
      <!-- PwC Call Center Project Card -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <span class="meta-pill" style="background: rgba(37, 99, 235, 0.1); color: #2563eb; border-color: rgba(37, 99, 235, 0.3);">Enterprise Capstone</span>
        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">PwC Call Center Performance Analysis</h2>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
          A comprehensive corporate BI simulation evaluating 5,000 omnichannel telecom call logs. Analyzes First Call Resolution (FCR), agent utilization, churn risk, and caller satisfaction (CSAT).
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <span class="meta-pill">Power Pivot</span>
          <span class="meta-pill">DAX Measures</span>
          <span class="meta-pill">Executive KPIs</span>
        </div>
        <a href="${BASE_URL}projects/call-center-performance-analysis/" class="btn btn-primary btn-sm" style="width: 100%; margin-top: auto;">Explore Full Capstone Project →</a>
      </div>

      <!-- Hotel Reservation Project Card -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <span class="meta-pill" style="background: rgba(217, 119, 6, 0.1); color: #d97706; border-color: rgba(217, 119, 6, 0.3);">Operations Analytics</span>
        <h2 style="font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">Hotel Reservation Cancellation Analysis</h2>
        <p style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.5;">
          Exploratory analysis across 36,000+ guest booking transactions to isolate cancellation drivers, optimize channel commissions, and maximize room inventory yield.
        </p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
          <span class="meta-pill">Pivot Tables</span>
          <span class="meta-pill">Cancellation KPIs</span>
          <span class="meta-pill">Slicers</span>
        </div>
        <a href="${BASE_URL}projects/hotel-reservation-analysis/" class="btn btn-secondary btn-sm" style="width: 100%; margin-top: auto;">View Case Study →</a>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(indexDir, 'index.html'),
    renderPageLayout({
      title: 'Analytics Projects Hub',
      pageId: 'projects-index',
      type: 'project',
      content: indexHtml,
      activeNav: 'projects',
      breadcrumbs: [{ label: 'Projects & Case Studies' }]
    }),
    'utf8'
  );

  // Individual Project Pages
  // 1. PwC Call Center Hub Page
  const pwcDir = path.join(DIST_DIR, 'projects', 'call-center-performance-analysis');
  ensureDir(pwcDir);

  const pwcFiles = database.projects.filter(p => p.filePath.includes('Call Center Performance Analysis'));
  const pwcOverview = pwcFiles.find(p => p.baseName === 'Project Overview') || pwcFiles[0];

  const pwcContentHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Capstone Portfolio Project</span>
      <h1 class="page-title">PwC Call Center Performance Analysis</h1>
      <p class="page-subtitle">End-to-end operational intelligence analysis for a global telecom client simulation. Powered by Excel Tables, Power Pivot, and DAX Measures.</p>
    </div>

    <!-- Project Tabs / Sections Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
      ${pwcFiles.map(f => `
        <a href="#doc-${f.slug}" class="metric-card" style="text-decoration: none; padding: 1rem;">
          <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${f.title}</div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Read Section ↓</span>
        </a>
      `).join('')}
    </div>

    <!-- Concatenated Project Chapters -->
    <div class="prose">
      ${pwcFiles.map(f => `
        <div id="doc-${f.slug}" style="margin-bottom: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--border-default);">
          <span class="meta-pill" style="margin-bottom: 0.75rem; display: inline-block;">Chapter: ${f.title}</span>
          ${transformObsidian(f.body, f)}
        </div>
      `).join('')}
    </div>
  `;

  fs.writeFileSync(
    path.join(pwcDir, 'index.html'),
    renderPageLayout({
      title: 'PwC Call Center Performance Analysis',
      pageId: 'project-call-center',
      type: 'project',
      content: pwcContentHtml,
      activeNav: 'projects',
      breadcrumbs: [
        { label: 'Projects', url: `${BASE_URL}projects/` },
        { label: 'PwC Call Center Analysis' }
      ]
    }),
    'utf8'
  );

  // Generate individual pages for all project documents (e.g. Business Problem, Data Dictionary, etc.)
  database.projects.forEach(proj => {
    const projSubDir = path.join(DIST_DIR, 'projects', proj.slug);
    ensureDir(projSubDir);
    fs.writeFileSync(
      path.join(projSubDir, 'index.html'),
      renderPageLayout({
        title: proj.title,
        pageId: proj.id,
        type: 'project',
        content: `
          <div class="page-header-box">
            <span class="page-category-badge">Project Chapter</span>
            <h1 class="page-title">${proj.title}</h1>
            <div class="page-meta-bar">
              <a href="${BASE_URL}projects/call-center-performance-analysis/" class="meta-pill">← Back to PwC Call Center Hub</a>
            </div>
          </div>
          <article class="prose">
            ${transformObsidian(proj.body, proj)}
          </article>
          <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-default);">
            <a href="${BASE_URL}projects/call-center-performance-analysis/" class="btn btn-secondary">← Back to Project Hub</a>
          </div>
        `,
        activeNav: 'projects',
        breadcrumbs: [
          { label: 'Projects', url: `${BASE_URL}projects/` },
          { label: 'PwC Call Center Analysis', url: `${BASE_URL}projects/call-center-performance-analysis/` },
          { label: proj.title }
        ]
      }),
      'utf8'
    );
  });

  // 2. Hotel Reservation Hub Page
  const hotelDir = path.join(DIST_DIR, 'projects', 'hotel-reservation-analysis');
  ensureDir(hotelDir);

  const hotelFile = database.projects.find(p => p.filePath.includes('Hotel Reservation Analysis')) || { body: '# Hotel Reservation Analysis\nComing soon.', title: 'Hotel Reservation Analysis' };

  fs.writeFileSync(
    path.join(hotelDir, 'index.html'),
    renderPageLayout({
      title: 'Hotel Reservation Analysis',
      pageId: 'project-hotel-reservation',
      type: 'project',
      content: `
        <div class="page-header-box">
          <span class="page-category-badge">Operations Analytics</span>
          <h1 class="page-title">Hotel Reservation Cancellation Analysis</h1>
          <p class="page-subtitle">Exploratory data analysis of 36,000+ guest booking transactions to diagnose cancellation drivers.</p>
        </div>
        <article class="prose">
          ${transformObsidian(hotelFile.body, hotelFile)}
        </article>
      `,
      activeNav: 'projects',
      breadcrumbs: [
        { label: 'Projects', url: `${BASE_URL}projects/` },
        { label: 'Hotel Reservation Analysis' }
      ]
    }),
    'utf8'
  );

  // Build Portfolio Case Study Page (portfolio/index.html)
  const portDir = path.join(DIST_DIR, 'portfolio');
  ensureDir(portDir);

  const portRecord = database.portfolio || { body: '# Portfolio\nExecutive Case Study', title: 'Portfolio Case Study' };

  fs.writeFileSync(
    path.join(portDir, 'index.html'),
    renderPageLayout({
      title: 'Executive Portfolio Case Study',
      pageId: 'portfolio',
      type: 'portfolio',
      content: `
        <div class="page-header-box">
          <span class="page-category-badge">Executive Presentation</span>
          <h1 class="page-title">${portRecord.title}</h1>
          <p class="page-subtitle">A recruiter-ready, polished data analytics portfolio piece showcasing complete problem-to-recommendation workflow.</p>
        </div>
        <article class="prose">
          ${transformObsidian(portRecord.body, portRecord)}
        </article>
      `,
      activeNav: 'portfolio',
      breadcrumbs: [{ label: 'Portfolio Case Study' }]
    }),
    'utf8'
  );
}

// I. Build Reference & Cheatsheets (reference/index.html & reference/[slug]/index.html)
function buildReference() {
  console.log(`[BUILD] Building Reference Library (${database.reference.length} Guides)...`);

  const indexDir = path.join(DIST_DIR, 'reference');
  ensureDir(indexDir);

  const indexHtml = `
    <div class="page-header-box">
      <span class="page-category-badge">Desk Reference & Tools</span>
      <h1 class="page-title">Reference Library & Guides</h1>
      <p class="page-subtitle">Handy cheat sheets, keyboard shortcuts, dataset documentation, and generative AI prompt libraries for Excel workflows.</p>
    </div>

    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
      ${database.reference.map(ref => `
        <a href="${ref.url}" class="metric-card" style="text-decoration: none; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span class="meta-pill">${ref.data.category || 'Reference'}</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-top: 0.35rem;">${ref.title}</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4;">Quick technical reference and best practice guide.</p>
        </a>
      `).join('')}
    </div>
  `;

  fs.writeFileSync(
    path.join(indexDir, 'index.html'),
    renderPageLayout({
      title: 'Reference Library',
      pageId: 'reference-index',
      type: 'reference',
      content: indexHtml,
      activeNav: 'reference',
      breadcrumbs: [{ label: 'Reference' }]
    }),
    'utf8'
  );

  database.reference.forEach(ref => {
    const outDir = path.join(DIST_DIR, 'reference', ref.slug);
    ensureDir(outDir);

    const html = `
      <div class="page-header-box">
        <span class="page-category-badge">${ref.data.category || 'Reference Guide'}</span>
        <h1 class="page-title">${ref.title}</h1>
      </div>

      <article class="prose">
        ${transformObsidian(ref.body, ref)}
      </article>

      <div style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid var(--border-default);">
        <a href="${BASE_URL}reference/" class="btn btn-secondary">← Back to Reference Library</a>
      </div>
    `;

    fs.writeFileSync(
      path.join(outDir, 'index.html'),
      renderPageLayout({
        title: ref.title,
        pageId: ref.id,
        type: 'reference',
        content: html,
        activeNav: 'reference',
        breadcrumbs: [
          { label: 'Reference', url: `${BASE_URL}reference/` },
          { label: ref.title }
        ]
      }),
      'utf8'
    );
  });
}

// J. Build 404 Page (404.html)
function build404() {
  console.log('[BUILD] Building 404 Page...');
  const html = `
    <div style="text-align: center; padding: 4rem 1rem;">
      <div style="font-family: var(--font-display); font-size: 6rem; font-weight: 900; color: var(--brand-primary); line-height: 1;">#REF!</div>
      <h1 style="font-size: 2rem; margin: 1rem 0 0.5rem;">Page Not Found (Reference Error)</h1>
      <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 2rem;">
        The requested cell, lesson, or formula does not exist or has been relocated in the curriculum.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="${BASE_URL}" class="btn btn-primary">Return to Dashboard</a>
        <button class="btn btn-secondary search-trigger-btn">Search Course Content</button>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(DIST_DIR, '404.html'),
    renderPageLayout({
      title: 'Page Not Found',
      pageId: '404',
      type: 'error',
      content: html,
      activeNav: ''
    }),
    'utf8'
  );
}

// K. Build Search Index (search-index.json)
function buildSearchIndex() {
  console.log('[BUILD] Generating Search Index (search-index.json)...');

  const searchEntries = database.allFiles.map(f => {
    // Generate clean text snippet (first 140 chars)
    const cleanSnippet = f.body
      .replace(/^#+.*$/gm, '')
      .replace(/>.*$/gm, '')
      .replace(/\[\[(.*?)\]\]/g, '$1')
      .replace(/[\*\_\`\#]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 140);

    return {
      title: f.title,
      url: f.url,
      type: f.type,
      category: f.category || f.type,
      tags: f.tags,
      snippet: cleanSnippet
    };
  });

  fs.writeFileSync(
    path.join(DIST_DIR, 'search-index.json'),
    JSON.stringify(searchEntries, null, 2),
    'utf8'
  );
}

// L. Copy Static Assets (CSS, JS, Images)
function copyAssets() {
  console.log('[BUILD] Copying styles, scripts, and media assets...');
  const assetOutDir = path.join(DIST_DIR, 'assets');
  ensureDir(assetOutDir);

  // Copy styles.css and app.js
  fs.copyFileSync(path.join(SRC_DIR, 'styles.css'), path.join(assetOutDir, 'styles.css'));
  fs.copyFileSync(path.join(SRC_DIR, 'app.js'), path.join(assetOutDir, 'app.js'));

  // Copy images from repo assets
  const repoAssetsDir = path.join(REPO_ROOT, 'assets');
  const imgOutDir = path.join(assetOutDir, 'images');
  ensureDir(imgOutDir);

  if (fs.existsSync(repoAssetsDir)) {
    fs.readdirSync(repoAssetsDir).forEach(file => {
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.svg') || file.endsWith('.webp')) {
        fs.copyFileSync(path.join(repoAssetsDir, file), path.join(imgOutDir, file));
      }
    });
  }

  // Create .nojekyll in dist for GitHub Pages
  fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf8');
}

// ---------------------------------------------------------------------------
// 7. MAIN BUILD ORCHESTRATOR
// ---------------------------------------------------------------------------
function buildAll() {
  console.time('[BUILD COMPLETE]');
  console.log('===========================================================');
  console.log(' EXCEL ZERO TO HERO — STATIC SITE GENERATOR');
  console.log('===========================================================');

  ensureDir(DIST_DIR);

  scanVault();
  console.log(`[INDEXED] Total Files: ${database.allFiles.length}`);
  console.log(`  - Lessons: ${database.lessons.length}`);
  console.log(`  - Concepts: ${database.concepts.length}`);
  console.log(`  - Formulas: ${database.formulas.length}`);
  console.log(`  - Practice: ${database.practice.length}`);
  console.log(`  - Projects: ${database.projects.length}`);
  console.log(`  - References: ${database.reference.length}`);
  console.log(`  - Revision: ${database.revision.length}`);

  buildDashboard();
  buildCurriculum();
  buildLessons();
  buildConcepts();
  buildFormulas();
  buildPractice();
  buildRevision();
  buildProjects();
  buildReference();
  build404();
  buildSearchIndex();
  copyAssets();

  console.log('===========================================================');
  console.timeEnd('[BUILD COMPLETE]');
  console.log(`[SUCCESS] Platform generated in: ${DIST_DIR}`);
  console.log('===========================================================');
}

buildAll();

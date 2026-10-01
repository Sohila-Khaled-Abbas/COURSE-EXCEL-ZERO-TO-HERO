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

  // Derive title from title, H1, or filename
  let title = data.title || data.topic || '';
  if (!title) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].replace(/^[^\w\s\u0600-\u06FF]+/, '').trim();
    } else if (data.project_name && !data.project_name.toLowerCase().includes('pwc') && !data.project_name.toLowerCase().includes('digital transformation')) {
      title = data.project_name;
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
  linkIndex.set('start here', `${BASE_URL}start-here/`);
  linkIndex.set('course orientation', `${BASE_URL}start-here/`);
  linkIndex.set('course mind map', `${BASE_URL}mindmap/`);
  linkIndex.set('mind map', `${BASE_URL}mindmap/`);
  linkIndex.set('mindmap', `${BASE_URL}mindmap/`);
  linkIndex.set('dataset library', `${BASE_URL}datasets/`);
  linkIndex.set('datasets', `${BASE_URL}datasets/`);
  linkIndex.set('learning resources', `${BASE_URL}resources/`);
  linkIndex.set('resources hub', `${BASE_URL}resources/`);
  linkIndex.set('resources', `${BASE_URL}resources/`);
  linkIndex.set('obsidian publishing guide', `${BASE_URL}obsidian-guide/`);
  linkIndex.set('obsidian guide', `${BASE_URL}obsidian-guide/`);
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

  // Wrap code blocks with copy buttons (or render Mermaid diagrams)
  html = html.replace(/<pre><code class="language-([a-zA-Z0-9_\-]+)">([\s\S]*?)<\/code><\/pre>/g, (m, lang, code) => {
    if (lang.toLowerCase() === 'mermaid') {
      const rawCode = code
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .trim();

      const encodedRaw = encodeURIComponent(rawCode);

      return `
        <div class="mermaid-block-container" data-diagram-raw="${encodedRaw}">
          <div class="mermaid-diagram-toolbar">
            <div class="mermaid-toolbar-left">
              <span class="mermaid-diagram-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                DIAGRAM
              </span>
            </div>
            <div class="mermaid-diagram-actions">
              <button class="mermaid-action-btn mermaid-zoom-btn" title="Toggle Fullscreen / Zoom" aria-label="Toggle Fullscreen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
                <span>Zoom</span>
              </button>
              <button class="mermaid-action-btn mermaid-copy-btn" title="Copy Mermaid Syntax" aria-label="Copy Mermaid Syntax">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copy</span>
              </button>
            </div>
          </div>
          <div class="mermaid-viewport">
            <div class="mermaid-loading-indicator">Rendering architecture diagram...</div>
            <div class="mermaid" style="display:none;">${rawCode}</div>
          </div>
          <details class="mermaid-source-details">
            <summary class="mermaid-source-summary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
              View Mermaid Syntax
            </summary>
            <pre class="mermaid-source-pre"><code>${code}</code></pre>
          </details>
        </div>
      `;
    }

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
        <div class="sidebar-title">Getting Started & Core</div>
        <ul class="sidebar-nav-list">
          <li>
            <a href="${BASE_URL}" class="sidebar-nav-link ${activeNav === 'dashboard' ? 'active' : ''}">
              <span class="sidebar-nav-icon">📊</span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}start-here/" class="sidebar-nav-link ${activeNav === 'start-here' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🚀</span>
              <span>Start Here</span>
              <span class="sidebar-badge">Guide</span>
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
            <a href="${BASE_URL}mindmap/" class="sidebar-nav-link ${activeNav === 'mindmap' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🧠</span>
              <span>Course Mind Map</span>
              <span class="sidebar-badge">Visual</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Hands-On & Practice</div>
        <ul class="sidebar-nav-list">
          <li>
            <a href="${BASE_URL}practice/" class="sidebar-nav-link ${activeNav === 'practice' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🎯</span>
              <span>Practice Center</span>
              <span class="sidebar-badge">Labs</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}datasets/" class="sidebar-nav-link ${activeNav === 'datasets' ? 'active' : ''}">
              <span class="sidebar-nav-icon">📁</span>
              <span>Dataset Library</span>
              <span class="sidebar-badge">36K+</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}revision/" class="sidebar-nav-link ${activeNav === 'revision' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🗂️</span>
              <span>Flashcards & Cram</span>
              <span class="sidebar-badge">Active</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}projects/" class="sidebar-nav-link ${activeNav === 'projects' ? 'active' : ''}">
              <span class="sidebar-nav-icon">💼</span>
              <span>Projects & Case Studies</span>
              <span class="sidebar-badge">PwC</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="sidebar-section">
        <div class="sidebar-title">Knowledge & Vault</div>
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
            <a href="${BASE_URL}resources/" class="sidebar-nav-link ${activeNav === 'resources' ? 'active' : ''}">
              <span class="sidebar-nav-icon">🌐</span>
              <span>Learning Resources</span>
              <span class="sidebar-badge">Hub</span>
            </a>
          </li>
          <li>
            <a href="${BASE_URL}obsidian-guide/" class="sidebar-nav-link ${activeNav === 'obsidian-guide' ? 'active' : ''}">
              <span class="sidebar-nav-icon">📝</span>
              <span>Obsidian Guide</span>
              <span class="sidebar-badge">Vault</span>
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

  <!-- Diagram Zoom / Fullscreen Modal -->
  <div id="mermaid-modal" class="mermaid-modal-backdrop" role="dialog" aria-modal="true" aria-label="Diagram Zoom View" style="display: none;">
    <div class="mermaid-modal-box">
      <div class="mermaid-modal-header">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="mermaid-diagram-badge">DIAGRAM VIEW</span>
          <span class="mermaid-modal-title">Architecture & Process Flow</span>
        </div>
        <div class="mermaid-modal-actions">
          <button id="mermaid-modal-copy-btn" class="mermaid-action-btn" title="Copy Mermaid Syntax">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Syntax</span>
          </button>
          <button id="mermaid-modal-close-btn" class="icon-btn" aria-label="Close Diagram View">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="mermaid-modal-viewport" id="mermaid-modal-content"></div>
      <div class="mermaid-modal-footer">
        <span>Use mouse wheel or touchpad to scroll and inspect complex branches. Press <kbd class="kbd-shortcut">Esc</kbd> to close.</span>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="site-footer">
    <p><strong>Excel Zero to Hero</strong> — Interactive Analytics Learning Platform</p>
    <p style="margin-top: 0.35rem; font-size: 0.8rem;">Sourced from the comprehensive Microsoft Excel & Data Analytics Curriculum Vault • Built for GitHub Pages</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
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

  const modulesData = [
    { num: 1, title: 'Excel Fundamentals & Analytics Roles', desc: 'Interface navigation, cell mechanics, and data analyst workflow' },
    { num: 2, title: 'Data Management & Formatting', desc: 'Types, custom formatting, validation lists, deduplication, and shortcuts' },
    { num: 3, title: 'Formulas & Functions Mastery', desc: 'Cell references, conditional logic, XLOOKUP, dates, and dynamic arrays' },
    { num: 4, title: 'Excel Tables Architecture', desc: 'Structured references, calculated columns, and table governance' },
    { num: 5, title: 'Pivot Tables & Aggregation', desc: 'Multi-dimensional summaries, calculated fields, slicers, and timelines' },
    { num: 6, title: 'Data Analysis Charts & Dashboards', desc: 'Visual analytics, cognitive load design, and executive layout' },
    { num: 7, title: 'Data Cleaning & Governance', desc: 'DAMA 6 quality dimensions, null auditing, and ERP ingestion' },
    { num: 8, title: 'Power Query & M Language ETL', desc: 'Automated data pipelines, unpivoting, merges, and API ingestion' },
    { num: 9, title: 'Data Modeling & DAX Intelligence', desc: 'Star schema, CALCULATE context transition, and business measures' },
  ];

  const videoChapters = [
    { mod: 1, time: '0:00', sec: 0, title: 'M1: Fundamentals' },
    { mod: 2, time: '16:05', sec: 965, title: 'M2: Data Management' },
    { mod: 3, time: '1:38:56', sec: 5936, title: 'M3: Formulas' },
    { mod: 4, time: '2:35:55', sec: 9355, title: 'M4: Tables' },
    { mod: 5, time: '2:58:28', sec: 10708, title: 'M5: PivotTables' },
    { mod: 6, time: '3:26:58', sec: 12418, title: 'M6: Charts & Dashboards' },
    { mod: 7, time: '3:54:03', sec: 14043, title: 'M7: Data Cleaning' },
    { mod: 8, time: '4:20:30', sec: 15630, title: 'M8: Power Query' },
    { mod: 9, time: '5:03:39', sec: 18219, title: 'M9: DAX Modeling' },
  ];

  const html = `
    <!-- Hero Card -->
    <div class="dashboard-hero-card">
      <div class="hero-content">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
          <span class="meta-pill" style="color: var(--brand-primary); border-color: var(--brand-primary); background: rgba(16, 124, 65, 0.1);">Interactive Learning Hub</span>
          <span class="meta-pill">9 Modules • 38 Lessons</span>
          <span class="meta-pill">Obsidian Synchronized</span>
        </div>
        <h1>Excel Zero to Hero — Master Spreadsheet Analytics</h1>
        <p>A rigorous, interactive learning path taking you from foundational grid mechanics to enterprise data cleaning, Power Query ETL pipelines, and DAX dimensional modeling.</p>
        
        <div style="display: flex; align-items: center; gap: 0.75rem; margin: 1rem 0; font-size: 0.85rem; color: var(--text-secondary); flex-wrap: wrap;">
          <span><strong>Designed for:</strong> Aspiring Data Analysts • Finance & BI Professionals • Excel Power Users</span>
        </div>

        <div class="hero-cta-group">
          <a id="continue-learning-btn" href="${firstLesson.url}" class="btn btn-primary first-lesson-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span id="continue-learning-desc">Continue Learning</span>
          </a>
          <a href="#course-video-player" class="btn btn-secondary">
            🎬 Watch Full Masterclass
          </a>
          <a href="${BASE_URL}mindmap/" class="btn btn-secondary">
            🧠 Explore Course Mind Map
          </a>
          <a href="${BASE_URL}start-here/" class="btn btn-secondary" style="border-color: var(--brand-primary); color: var(--brand-primary);">
            🚀 Start Here Guide
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

    <!-- Embedded YouTube Course Video Section -->
    <div id="course-video-player" class="course-video-section" style="margin-top: 2.5rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <span class="meta-pill" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">🎥 Complete Video Masterclass</span>
          <h2 style="font-size: 1.35rem; margin-top: 0.35rem;">Excel Zero to Hero — Complete Course (5+ Hours)</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">Comprehensive lecture series. Click any module below to immediately jump to its exact timestamp in the player.</p>
        </div>
        <a href="https://youtu.be/uv1bxe2gdnU?si=3x0z6LYU5uSkwShe" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm">
          Watch on YouTube ↗
        </a>
      </div>

      <!-- Responsive 16:9 Video Container -->
      <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: var(--radius-md); background: #000; box-shadow: var(--shadow-md);">
        <iframe id="main-course-iframe" src="https://www.youtube-nocookie.com/embed/uv1bxe2gdnU" title="Excel from Zero to Hero — Complete Course" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"></iframe>
      </div>

      <!-- Interactive Chapter Selector -->
      <div style="margin-top: 1.25rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 0.5rem;">
          Jump to Module Video Chapter:
        </div>
        <div class="video-chapters-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 0.5rem;">
          ${videoChapters.map((ch, idx) => `
            <button class="chapter-btn ${idx === 0 ? 'active' : ''}" data-start-seconds="${ch.sec}">
              <span class="chapter-time">${ch.time}</span>
              <span class="chapter-title">${ch.title}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Quick Access Hub Cards -->
    <div style="margin-top: 2.5rem;">
      <div class="section-heading-row">
        <h2>⚡ Integrated Learning Ecosystem</h2>
        <span class="meta-pill">One Hub</span>
      </div>
      <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <a href="${BASE_URL}start-here/" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">🚀</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Start Here Orientation</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">8-step active learning loop, prerequisites, and study framework.</p>
        </a>

        <a href="${BASE_URL}mindmap/" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">🧠</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Course Mind Map</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">Interactive MindMeister visual architecture and local diagrams.</p>
        </a>

        <a href="https://drive.google.com/drive/folders/1FbT96Hyp9KZbmjT2UeP-CVK0gL1JPn0T" target="_blank" rel="noopener noreferrer" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">📁</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Google Drive Materials ↗</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">Slide decks, raw workbooks, templates, and solutions folder.</p>
        </a>

        <a href="${BASE_URL}datasets/" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">📊</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Dataset Library</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">Superstore, Hotel (36K), and PwC Call Center benchmark data.</p>
        </a>

        <a href="${BASE_URL}resources/" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">🌐</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Resources Directory</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">Unified index of videos, code repos, shortcuts, and cheat sheets.</p>
        </a>

        <a href="${BASE_URL}obsidian-guide/" class="metric-card" style="text-decoration: none; padding: 1.25rem; flex-direction: column; align-items: flex-start; gap: 0.5rem;">
          <span style="font-size: 1.5rem;">📝</span>
          <h3 style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary);">Obsidian Publishing Guide</h3>
          <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">How markdown notes synchronize from vault to web via GitHub.</p>
        </a>
      </div>
    </div>

    <!-- Personalized Study Planner & Progress Analytics -->
    <div class="study-planner-section" style="margin-top: 2.5rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <span class="meta-pill" style="color: var(--brand-primary); border-color: var(--brand-primary);">Personalized Planner</span>
          <h2 style="font-size: 1.35rem; margin-top: 0.35rem;">Study Pace & Completion Target</h2>
          <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0;">Calculate your estimated completion date based on your stored browser progress.</p>
        </div>
        
        <!-- Pace Options -->
        <div class="pace-selector-group" style="display: flex; gap: 0.5rem;">
          <button class="btn btn-secondary btn-sm pace-option-btn" data-pace="casual">Casual (2/wk)</button>
          <button class="btn btn-secondary btn-sm pace-option-btn active" data-pace="steady">Steady (4/wk)</button>
          <button class="btn btn-secondary btn-sm pace-option-btn" data-pace="intensive">Intensive (7/wk)</button>
        </div>
      </div>

      <div id="planner-eta-text" class="planner-eta-box" style="padding: 0.75rem 1rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); font-size: 0.92rem; color: var(--text-primary); margin-bottom: 1.25rem;">
        Target Finish: <strong>Calculating...</strong>
      </div>

      <!-- Module Progress Breakdown Rows -->
      <div class="module-progress-breakdown-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0.75rem;">
        ${modulesData.map(m => {
          const modLessons = database.lessons.filter(l => {
            const modStr = (l.module || '').toLowerCase();
            return modStr.includes(`module ${m.num}`) || l.filePath.includes(`0${m.num}_`);
          });
          const ids = modLessons.map(l => l.id).join(',');

          return `
            <div class="module-progress-row" data-module-num="${m.num}" data-lesson-ids="${ids}" style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 0.65rem 0.85rem; border-radius: var(--radius-md);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-primary);">M${m.num}: ${m.title.split('&')[0].trim()}</span>
                <span class="module-row-stat" style="font-size: 0.78rem; font-weight: 600; color: var(--brand-primary);">0/${modLessons.length} (0%)</span>
              </div>
              <div class="module-progress-bar-track" style="height: 6px; background: var(--bg-surface); border-radius: 3px; overflow: hidden; border: 1px solid var(--border-subtle);">
                <div class="module-progress-bar-fill" style="width: 0%; height: 100%; background: var(--brand-primary); transition: width 0.3s ease;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Learning Journey Overview & Bookmarks -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2.5rem;">
      <div>
        <div class="section-heading-row">
          <h2>Core Curriculum Path</h2>
          <a href="${BASE_URL}curriculum/" style="font-size: 0.85rem; font-weight: 600;">View Full Roadmap →</a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          ${modulesData.map(m => {
            const modLessons = database.lessons.filter(l => {
              const modStr = (l.module || '').toLowerCase();
              return modStr.includes(`module ${m.num}`) || l.filePath.includes(`0${m.num}_`);
            });

            return `
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
                    <span class="meta-pill">${modLessons.length} Lessons</span>
                    <span style="font-size: 0.85rem; color: var(--brand-primary); font-weight: 600;">Explore →</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Quick Action & Saved Items Sidebar -->
      <div>
        <div class="section-heading-row">
          <h2>Saved Bookmarks</h2>
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

function timestampToSeconds(ts) {
  if (!ts) return 0;
  const clean = ts.toString().replace(/[^\d:]/g, '');
  const parts = clean.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
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

    // Derive module number
    const modMatch = (lesson.module || '').match(/module\s*(\d)/i) || lesson.filePath.match(/0(\d)_/);
    const modNum = modMatch ? parseInt(modMatch[1], 10) : 1;

    // Find relevant practice lab
    let relatedLab = database.practice.find(p => p.slug === `ex0${modNum}` || p.slug.startsWith(`ex0${modNum}`));
    if (!relatedLab && modNum >= 8) {
      relatedLab = database.projects[0] || database.practice[0];
    }

    // Find recommended dataset
    let datasetInfo = { name: 'Sample Superstore (9,994 rows)', url: `${BASE_URL}datasets/#superstore` };
    if (modNum === 2 || modNum === 5) {
      datasetInfo = { name: 'Hotel Reservations (36,275 bookings)', url: `${BASE_URL}datasets/#hotel` };
    } else if (modNum >= 8) {
      datasetInfo = { name: 'PwC Call Center Performance (5,000 records)', url: `${BASE_URL}datasets/#call-center` };
    }

    // Related formulas
    const modFormulas = database.formulas.filter(f => {
      const cat = (f.data.category || '').toLowerCase();
      if (modNum === 3) return ['lookup', 'logical', 'aggregation', 'dynamic_array', 'date_and_time'].includes(cat);
      if (modNum === 5) return ['aggregation'].includes(cat);
      if (modNum === 9) return cat === 'dax';
      return false;
    }).slice(0, 4);

    const videoBadge = lesson.data.video_chapter ? `
      <div class="meta-item">
        <span>🎥</span>
        <a href="${BASE_URL}#course-video-player" style="color: inherit; text-decoration: underline;" title="Seek to video timestamp">
          ${lesson.data.video_chapter.replace(/\\"/g, '"')} (${lesson.data.video_timestamp ? lesson.data.video_timestamp.replace(/\\"/g, '') : 'Video'})
        </a>
      </div>
    ` : '';

    const html = `
      <!-- Obsidian Source Synchronizer Bar -->
      <div class="obsidian-source-bar" style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); padding: 0.5rem 0.85rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.85rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--text-secondary);">
          <span>📁</span>
          <code>${lesson.relPath}</code>
        </div>
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <a href="https://github.com/Sohila-Khaled-Abbas/COURSE-EXCEL-ZERO-TO-HERO/blob/main/${lesson.relPath}" target="_blank" rel="noopener noreferrer" class="obsidian-source-link" style="color: var(--brand-primary); font-weight: 600; text-decoration: none;">
            View Note on GitHub ↗
          </a>
          <span style="color: var(--border-default);">|</span>
          <a href="obsidian://open?vault=COURSE-EXCEL-ZERO-TO-HERO&file=${encodeURIComponent(lesson.relPath)}" class="obsidian-source-link" style="color: var(--text-muted); text-decoration: none;" title="Open in local Obsidian app">
            Open in Obsidian
          </a>
        </div>
      </div>

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

      <!-- Smart Connected Knowledge & Practice Widget -->
      <section class="smart-relationships-box" style="margin-top: 3rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin: 0; display: flex; align-items: center; gap: 0.5rem;">
            <span>🔗</span>
            <span>Connected Knowledge & Hands-On Practice</span>
          </h3>
          <span class="meta-pill" style="color: var(--brand-primary); border-color: var(--brand-primary);">8-Step Learning Loop</span>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          ${relatedLab ? `
            <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--brand-primary); margin-bottom: 0.35rem;">🎯 Practice Lab</div>
              <a href="${relatedLab.url}" style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary); text-decoration: none;">${relatedLab.title}</a>
            </div>
          ` : ''}

          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #2563eb; margin-bottom: 0.35rem;">📊 Recommended Dataset</div>
            <a href="${datasetInfo.url}" style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary); text-decoration: none;">${datasetInfo.name}</a>
          </div>

          ${modFormulas.length > 0 ? `
            <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
              <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: var(--brand-purple); margin-bottom: 0.35rem;">⚡ Key Functions</div>
              <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
                ${modFormulas.map(f => `<a href="${f.url}" class="meta-pill" style="font-size: 0.78rem;">=${f.title.replace(/ Function/i, '')}</a>`).join('')}
              </div>
            </div>
          ` : ''}

          <div style="background: var(--bg-surface-elevated); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
            <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #d97706; margin-bottom: 0.35rem;">🧠 Visual Architecture</div>
            <a href="${BASE_URL}mindmap/" style="font-size: 0.92rem; font-weight: 600; color: var(--text-primary); text-decoration: none;">Explore Module ${modNum} in Mind Map →</a>
          </div>
        </div>
      </section>

      <!-- Bottom Pagination (Previous / Next Lesson) -->
      <nav class="page-pagination-footer" style="margin-top: 2rem;">
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

    <!-- Organized Project Documentation Sections -->
    <div style="margin-bottom: 3rem;">
      ${(() => {
        const categories = [
          {
            badge: 'Master Blueprint',
            icon: '🏆',
            title: '1. Master Implementation Guide & Overview',
            desc: 'Complete end-to-end execution guide mapped across the 10 course learning modules.',
            match: ['Master Project Guidance Manual', 'Project Overview']
          },
          {
            badge: 'Business & Data Governance',
            icon: '📋',
            title: '2. Operational Problem & Data Governance',
            desc: 'Operational challenge for Claire, dataset provenance, forensic audit of the 946 nulls, and schema dictionary.',
            match: ['Business Problem', 'Dataset Documentation', 'Data Quality Assessment', 'Data Dictionary', 'Analysis Plan']
          },
          {
            badge: 'Analytics & KPIs',
            icon: '📐',
            title: '3. KPIs, Mathematical Models & Insights',
            desc: 'DAX measure formulas, arrival heatmaps, 2D agent performance quadrant, and actionable recommendations.',
            match: ['Core KPIs', 'KPI Dictionary', 'Empirical Findings', 'Strategic Recommendations']
          },
          {
            badge: 'Executive UI/UX',
            icon: '🎨',
            title: '4. Executive Design System & Layout',
            desc: 'Fixed-canvas 1080p layout, color tokens, typography scale, cell wireframes, and visual chart selection.',
            match: ['Dashboard Design System', 'Dashboard Wireframe', 'Dashboard UX Specification', 'Dashboard Visualization Guide']
          },
          {
            badge: 'Engineering & Automation',
            icon: '⚙️',
            title: '5. Modular Automation, QA & Technical Defense',
            desc: 'VBA state controllers, Excel performance optimization, 32-point verification audit, and retrospective.',
            match: ['Modular VBA', 'Excel Performance', 'Dashboard Testing', 'AI-Assisted Analysis', 'Dashboard Architecture', 'Project Retrospective']
          }
        ];

        let renderedSlugs = new Set();
        let html = '';

        categories.forEach(cat => {
          const matchedFiles = pwcFiles.filter(f => {
            return cat.match.some(m => f.title.toLowerCase().includes(m.toLowerCase()) || f.baseName.toLowerCase().includes(m.toLowerCase()));
          });

          matchedFiles.forEach(f => renderedSlugs.add(f.slug));

          if (matchedFiles.length > 0) {
            html += `
              <div style="margin-bottom: 2.25rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem;">
                  <span style="font-size: 1.35rem;">${cat.icon}</span>
                  <h2 style="font-size: 1.25rem; font-weight: 700; margin: 0; color: var(--text-primary);">${cat.title}</h2>
                  <span class="meta-pill" style="font-size: 0.7rem;">${cat.badge}</span>
                </div>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin: 0 0 1rem 0;">${cat.desc}</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                  ${matchedFiles.map(f => `
                    <a href="#doc-${f.slug}" class="metric-card" style="text-decoration: none; padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; border-radius: 8px; border: 1px solid var(--border-default); background: var(--bg-card); transition: all 0.2s ease;">
                      <div>
                        <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary); margin-bottom: 0.35rem; line-height: 1.3;">${f.title}</div>
                        <div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 0.75rem;">${f.data.description || 'Explore chapter documentation and technical specifications.'}</div>
                      </div>
                      <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: var(--color-primary); font-weight: 600; padding-top: 0.5rem; border-top: 1px solid var(--border-default);">
                        <span>Read Chapter</span>
                        <span>↓</span>
                      </div>
                    </a>
                  `).join('')}
                </div>
              </div>
            `;
          }
        });

        // Any remaining files not explicitly categorized
        const remainingFiles = pwcFiles.filter(f => !renderedSlugs.has(f.slug));
        if (remainingFiles.length > 0) {
          html += `
            <div style="margin-bottom: 2rem;">
              <h2 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">📁 Additional Supporting Documents</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
                ${remainingFiles.map(f => `
                  <a href="#doc-${f.slug}" class="metric-card" style="text-decoration: none; padding: 1rem; border-radius: 8px;">
                    <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${f.title}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${f.data.description || 'Supplementary project analysis'}</div>
                  </a>
                `).join('')}
              </div>
            </div>
          `;
        }

        return html;
      })()}
    </div>

    <!-- Concatenated Project Chapters -->
    <div class="prose">
      ${pwcFiles.map(f => `
        <div id="doc-${f.slug}" style="margin-bottom: 3.5rem; padding-top: 2rem; border-top: 1px solid var(--border-default);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <span class="meta-pill" style="font-weight: 700;">Chapter: ${f.title}</span>
            <a href="#" style="font-size: 0.75rem; text-decoration: none; color: var(--text-muted);">↑ Back to Top</a>
          </div>
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

// J. Build Course Orientation & Start Here (start-here/index.html)
function buildStartHere() {
  console.log('[BUILD] Building Start Here Orientation Page...');
  const outDir = path.join(DIST_DIR, 'start-here');
  ensureDir(outDir);

  const firstLesson = database.lessons[0] || { url: `${BASE_URL}curriculum/`, title: 'Lesson 1.1' };

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Course Orientation & Study Guide</span>
      <h1 class="page-title">Start Here: Master Spreadsheet Analytics</h1>
      <p class="page-subtitle">Welcome to Excel Zero to Hero! This orientation outlines how our 9-module curriculum is organized, how to leverage our multi-modal learning resources, and how to follow our proven 8-step active learning loop.</p>
    </div>

    <!-- Target Audience & Prerequisites Grid -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); margin-bottom: 2.5rem;">
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.5rem; gap: 0.75rem;">
        <div style="font-size: 1.75rem;">🌱</div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Who This Course Is For</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
          Designed for beginners entering data fields, business professionals wanting to eliminate manual spreadsheet chaos, and analysts preparing for technical Excel/BI interviews.
        </p>
      </div>

      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.5rem; gap: 0.75rem;">
        <div style="font-size: 1.75rem;">⚙️</div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Prerequisites</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
          Zero programming or advanced mathematics required. You only need basic computer literacy and Microsoft Excel (Excel 365, Excel 2021, or Excel 2019 desktop app recommended).
        </p>
      </div>

      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.5rem; gap: 0.75rem;">
        <div style="font-size: 1.75rem;">🎯</div>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">Expected Outcomes</h3>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5;">
          Progress from basic cell references to mastering 65+ formulas, dynamic arrays, ListObject table design, automated Power Query ETL pipelines, Star Schema modeling, and DAX measures.
        </p>
      </div>
    </div>

    <!-- The 8-Step Active Learning Loop -->
    <div style="margin-bottom: 3.5rem;">
      <div class="section-heading-row">
        <h2>🔄 The 8-Step Active Learning Loop</h2>
        <span class="meta-pill" style="color: var(--brand-primary); border-color: var(--brand-primary);">Pedagogical Method</span>
      </div>
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6;">
        Passive watching yields low retention. Our platform is built around a structured 8-step cycle proven to build muscle memory and analytical autonomy:
      </p>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        ${[
          { step: '1', title: 'Watch', icon: '🎥', desc: 'Stream the video lecture segment to observe live click paths, UI ergonomics, and immediate visual feedback.' },
          { step: '2', title: 'Understand', icon: '📖', desc: 'Read the comprehensive lesson note to grasp formal syntax, argument mechanics, and architectural principles.' },
          { step: '3', title: 'Explore', icon: '🧠', desc: 'Consult atomic concept cards and the visual Mind Map to connect the topic with broader business intelligence models.' },
          { step: '4', title: 'Practice', icon: '⌨️', desc: 'Open the associated hands-on Excel workbook in our Practice Center and solve progressive Level 1 to Level 4 challenges.' },
          { step: '5', title: 'Validate', icon: '💡', desc: 'Expand the collapsible verified solution walkthroughs to compare your formulas against industry best practices.' },
          { step: '6', title: 'Apply', icon: '📊', desc: 'Conduct exploratory analysis on production-scale benchmark datasets (Superstore, Hotel Reservations, PwC Call Center).' },
          { step: '7', title: 'Revise', icon: '🗂️', desc: 'Solidify recall using 3D flip flashcards, the 15-minute technical cram sheet, and senior interview diagnostic questions.' },
          { step: '8', title: 'Build Portfolio', icon: '🏆', desc: 'Synthesize your skills in end-to-end case studies that communicate measurable business impact to recruiters.' },
        ].map(s => `
          <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-md); padding: 1.25rem;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem;">${s.icon}</span>
              <span class="meta-pill" style="font-weight: 800;">Step ${s.step}</span>
            </div>
            <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.35rem;">${s.title}</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.45; margin: 0;">${s.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- The Multi-Modal Ecosystem Grid -->
    <div style="margin-bottom: 3.5rem;">
      <div class="section-heading-row">
        <h2>🌐 How Our Learning Resources Work Together</h2>
      </div>

      <div style="overflow-x: auto; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1rem;">
        <table class="data-table" style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-default); text-align: left;">
              <th style="padding: 0.75rem 1rem;">Resource</th>
              <th style="padding: 0.75rem 1rem;">Primary Medium</th>
              <th style="padding: 0.75rem 1rem;">Core Purpose</th>
              <th style="padding: 0.75rem 1rem;">When To Use</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.75rem 1rem;"><strong>YouTube Masterclass</strong></td>
              <td style="padding: 0.75rem 1rem;"><span class="meta-pill">Video Player</span></td>
              <td style="padding: 0.75rem 1rem;">5+ hours of visual instruction and live walkthroughs</td>
              <td style="padding: 0.75rem 1rem;">First-time exposure and visual orientation</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.75rem 1rem;"><strong>MindMeister Mind Map</strong></td>
              <td style="padding: 0.75rem 1rem;"><span class="meta-pill">Interactive Map</span></td>
              <td style="padding: 0.75rem 1rem;">Cognitive hierarchy and multi-module skill connections</td>
              <td style="padding: 0.75rem 1rem;">Reviewing how concepts relate across modules</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.75rem 1rem;"><strong>Obsidian Knowledge Vault</strong></td>
              <td style="padding: 0.75rem 1rem;"><span class="meta-pill">Markdown Vault</span></td>
              <td style="padding: 0.75rem 1rem;">Permanent notes, formula syntax rules, and concept cards</td>
              <td style="padding: 0.75rem 1rem;">Deep technical reference and authoring updates</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-subtle);">
              <td style="padding: 0.75rem 1rem;"><strong>Google Drive Materials</strong></td>
              <td style="padding: 0.75rem 1rem;"><span class="meta-pill">Workbooks & Slides</span></td>
              <td style="padding: 0.75rem 1rem;">Raw Excel files, demonstration templates, and slide decks</td>
              <td style="padding: 0.75rem 1rem;">Tactile keyboard practice and following along</td>
            </tr>
            <tr>
              <td style="padding: 0.75rem 1rem;"><strong>Web Learning Platform</strong></td>
              <td style="padding: 0.75rem 1rem;"><span class="meta-pill">Static Web Hub</span></td>
              <td style="padding: 0.75rem 1rem;">Search, study planner, progress tracking, and flashcards</td>
              <td style="padding: 0.75rem 1rem;">Daily learning dashboard, quizzes, and revision</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Responsible AI Guidance -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-left: 5px solid var(--brand-purple); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 3.5rem;">
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
        <span style="font-size: 1.5rem;">🤖</span>
        <h3 style="font-size: 1.25rem; margin: 0; font-weight: 800;">Responsible AI Usage & Verification Policy</h3>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
        Modern data analysts use generative AI (Copilot, ChatGPT, Gemini) to accelerate productivity. However, AI cannot replace spreadsheet intuition. In enterprise environments, entering an unverified formula can corrupt financial statements or customer billing.
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <strong style="color: var(--brand-primary); display: block; margin-bottom: 0.35rem;">✓ Recommended AI Uses</strong>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.25rem; margin: 0; line-height: 1.5;">
            <li>Explaining cryptic errors (#VALUE!, #CALC!, circular refs)</li>
            <li>Generating synthetic dummy data for testing formulas</li>
            <li>Suggesting alternative formulas (e.g. INDEX/MATCH vs XLOOKUP)</li>
            <li>Brainstorming regex or Power Query M expressions</li>
          </ul>
        </div>
        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <strong style="color: #ef4444; display: block; margin-bottom: 0.35rem;">✗ Prohibited / Risky Habits</strong>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.25rem; margin: 0; line-height: 1.5;">
            <li>Pasting complex formulas without auditing argument boundaries</li>
            <li>Assuming AI knows your data types or date formats correctly</li>
            <li>Allowing AI to alter raw source data without a transformation log</li>
            <li>Relying on AI for basic calculations before mastering fundamentals</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Ready to Start CTA -->
    <div style="text-align: center; padding: 2.5rem 1rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg);">
      <h2 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Ready to Begin Your Analytics Journey?</h2>
      <p style="color: var(--text-muted); max-width: 550px; margin: 0 auto 1.5rem; line-height: 1.5;">
        Start with Module 1 to master the spreadsheet interface and understand how professional data analysts structure their workflow.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <a href="${firstLesson.url}" class="btn btn-primary">
          Start Lesson 1.1 →
        </a>
        <a href="${BASE_URL}curriculum/" class="btn btn-secondary">
          Explore 9-Module Roadmap
        </a>
        <a href="${BASE_URL}mindmap/" class="btn btn-secondary">
          View Visual Mind Map
        </a>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Start Here: Course Orientation',
      pageId: 'start-here',
      type: 'guide',
      content: html,
      activeNav: 'start-here',
      breadcrumbs: [{ label: 'Start Here' }]
    }),
    'utf8'
  );
}

// K. Build Course Mind Map (mindmap/index.html)
function buildMindMap() {
  console.log('[BUILD] Building Course Mind Map Page...');
  const outDir = path.join(DIST_DIR, 'mindmap');
  ensureDir(outDir);

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Visual Learning & Mental Models</span>
      <h1 class="page-title">Interactive Course Mind Map</h1>
      <p class="page-subtitle">A visual, hierarchical architecture of the entire 9-module curriculum. Trace how core cell mechanics connect with formulas, tables, pivot tables, data cleaning, Power Query ETL, and DAX dimensional modeling.</p>
    </div>

    <!-- Action Bar & View Controls -->
    <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 1.5rem; padding: 0.85rem 1.25rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-md);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <a href="https://www.mindmeister.com/app/map/3782166881?t=I9gXHbkAlV" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
          Open in MindMeister (Interactive 3D App) ↗
        </a>
        <button id="toggle-mindmap-view-btn" class="btn btn-secondary btn-sm">
          Switch to High-Res Local Architecture Diagram
        </button>
      </div>
      <div style="font-size: 0.82rem; color: var(--text-muted);">
        Map ID: 3782166881 • 9 Modules • 38 Lessons Mapped
      </div>
    </div>

    <!-- Primary Interactive Embed Container -->
    <div id="mindmap-iframe-container" class="mindmap-embed-wrapper" style="position: relative; width: 100%; height: 680px; border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-default); background: var(--bg-surface); box-shadow: var(--shadow-md);">
      <iframe src="https://www.mindmeister.com/maps/public_map_shell/3782166881?t=I9gXHbkAlV" title="Excel Zero to Hero Interactive Course Mind Map" width="100%" height="100%" frameborder="0" scrolling="no" style="overflow: hidden; border: none;" allowfullscreen></iframe>
      <div class="mindmap-embed-fallback-bar" style="padding: 0.65rem 1rem; background: var(--bg-surface-elevated); border-top: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; color: var(--text-muted);">
        <span>💡 Note: If third-party iframe cookies are blocked in your browser, click "Open in MindMeister" above or toggle the diagram view.</span>
        <a href="https://www.mindmeister.com/app/map/3782166881?t=I9gXHbkAlV" target="_blank" rel="noopener noreferrer" style="color: var(--brand-primary); font-weight: 600;">Direct Link ↗</a>
      </div>
    </div>

    <!-- Local High-Res Diagram Container (Toggleable) -->
    <div id="mindmap-diagram-container" style="display: none; margin-top: 1rem;">
      <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">Enterprise Analytics Architecture Mind Map</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">High-resolution conceptual hierarchy showing the progression from data ingestion to BI modeling.</p>
        <img src="${BASE_URL}assets/images/enterprise-architecture-mindmap.png" alt="Enterprise Architecture Mind Map" loading="lazy" style="width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" />
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.5rem;">Data Quality & Cleaning Framework Mind Map</h3>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">The DAMA 6 Dimensions of Data Quality and enterprise audit rules.</p>
        <img src="${BASE_URL}assets/images/data-quality-mind-map.png" alt="Data Quality Mind Map" loading="lazy" style="width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" />
      </div>
    </div>

    <!-- Mind Map Conceptual Structure Guide -->
    <div style="margin-top: 3.5rem;">
      <div class="section-heading-row">
        <h2>🗺️ The 3-Tier Curriculum Architecture</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🧱</div>
          <span class="meta-pill" style="color: var(--brand-primary); margin-bottom: 0.5rem;">Tier 1: Foundation</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Data Capture, Hygiene & UI</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            <strong>Modules 1, 2 & 7:</strong> Grid coordinates, primitive data types, custom number formatting, list validation, deduplication, and the DAMA 6 Dimensions of Data Quality. Ensures data is structured before analysis begins.
          </p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">⚡</div>
          <span class="meta-pill" style="color: #2563eb; margin-bottom: 0.5rem;">Tier 2: Calculation</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Analytical Computation & Summaries</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            <strong>Modules 3, 4, 5 & 6:</strong> Relative vs Absolute references, dynamic array calculations, XLOOKUP, Excel Tables (<code>ListObject</code>), multi-dimensional PivotTables, and executive KPI dashboard visualization.
          </p>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">🚀</div>
          <span class="meta-pill" style="color: var(--brand-purple); margin-bottom: 0.5rem;">Tier 3: Enterprise BI</span>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">Automated ETL & Scaled Modeling</h3>
          <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5;">
            <strong>Modules 8, 9 & Capstone:</strong> Power Query M pipelines, column unpivoting, fuzzy merging, Star Schema relationship modeling, CALCULATE context transitions, and executive portfolio presentation.
          </p>
        </div>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Course Mind Map',
      pageId: 'mindmap',
      type: 'mindmap',
      content: html,
      activeNav: 'mindmap',
      breadcrumbs: [{ label: 'Course Mind Map' }]
    }),
    'utf8'
  );
}

// L. Build Dataset Library (datasets/index.html)
function buildDatasets() {
  console.log('[BUILD] Building Dataset Library Page...');
  const outDir = path.join(DIST_DIR, 'datasets');
  ensureDir(outDir);

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Hands-On Practice Data</span>
      <h1 class="page-title">Enterprise Dataset Library & Labs</h1>
      <p class="page-subtitle">Production-scale, verified datasets used throughout our curriculum, practice exercises, and capstone projects. Each dataset includes documented schemas, verified row counts, business scenarios, and direct access links.</p>
    </div>

    <!-- Domain Filter Bar -->
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
      <button class="btn btn-primary btn-sm dataset-filter-btn" data-domain="all">All Datasets (4 Collections)</button>
      <button class="btn btn-secondary btn-sm dataset-filter-btn" data-domain="retail">Retail & E-Commerce</button>
      <button class="btn btn-secondary btn-sm dataset-filter-btn" data-domain="hospitality">Hospitality Operations</button>
      <button class="btn btn-secondary btn-sm dataset-filter-btn" data-domain="telecom">Telecom & Customer BI</button>
      <button class="btn btn-secondary btn-sm dataset-filter-btn" data-domain="workbooks">Curriculum Workbooks</button>
    </div>

    <!-- Dataset Cards Grid -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
      
      <!-- Dataset 1: Sample Superstore -->
      <div id="superstore" class="metric-card dataset-card" data-domain="retail" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="meta-pill" style="color: #107c41; border-color: rgba(16, 124, 65, 0.4); background: rgba(16, 124, 65, 0.1);">Retail Benchmark</span>
          <span class="meta-pill">9,994 Rows • 19 Cols</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Sample Superstore Sales</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          A multi-regional US commercial retail transaction dataset spanning 2014 to 2017. Total revenue $2,297,200 with $286,397 profit across 4 geographic regions and 3 customer segments (Consumer, Corporate, Home Office).
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: var(--text-muted); width: 100%; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div><strong>Data Grain:</strong> Single line-item purchase within an order</div>
          <div><strong>Skills Practiced:</strong> XLOOKUP, SUMIFS, ListObject Tables, Slicers, Pareto Distribution</div>
          <div><strong>Related Modules:</strong> Module 2, Module 3, Module 4, Module 5, Module 6</div>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto; flex-wrap: wrap;">
          <a href="${BASE_URL}reference/sample-superstore-dataset-documentation/" class="btn btn-secondary btn-sm" style="flex: 1;">View Data Dictionary</a>
          <a href="${BASE_URL}practice/ex03_excel_tables_and_structured_references/" class="btn btn-primary btn-sm" style="flex: 1;">Practice Lab (Ex03) →</a>
        </div>
      </div>

      <!-- Dataset 2: Hotel Reservations -->
      <div id="hotel" class="metric-card dataset-card" data-domain="hospitality" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="meta-pill" style="color: #d97706; border-color: rgba(217, 119, 6, 0.4); background: rgba(217, 119, 6, 0.1);">Hospitality Operations</span>
          <span class="meta-pill">36,275 Rows • 19 Cols</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Hotel Reservations Classification</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          A rich hospitality dataset documenting guest booking patterns, meal plans, room types, lead time (0 to 443 days), average price per room (€103.42), and cancellation status (32.76% overall cancellation rate).
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: var(--text-muted); width: 100%; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div><strong>Data Grain:</strong> Single guest reservation booking</div>
          <div><strong>Skills Practiced:</strong> Data validation, missing value imputation, pivot cross-tabulation, revenue risk</div>
          <div><strong>Sources:</strong> Kaggle Benchmark & HuggingFace Mirror</div>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto; flex-wrap: wrap;">
          <a href="${BASE_URL}reference/hotel-reservations-dataset-documentation/" class="btn btn-secondary btn-sm" style="flex: 1;">Documentation</a>
          <a href="${BASE_URL}projects/hotel-reservation-analysis/" class="btn btn-primary btn-sm" style="flex: 1;">Case Study →</a>
          <a href="https://www.kaggle.com/datasets/ahsan81/hotel-reservations-classification-dataset" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="width: 100%;">Kaggle Source ↗</a>
        </div>
      </div>

      <!-- Dataset 3: PwC Call Center -->
      <div id="call-center" class="metric-card dataset-card" data-domain="telecom" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="meta-pill" style="color: #2563eb; border-color: rgba(37, 99, 235, 0.4); background: rgba(37, 99, 235, 0.1);">Telecom BI Capstone</span>
          <span class="meta-pill">5,000 Records • 10 Cols</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">PwC Call Center Performance</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          A corporate simulation evaluating 5,000 customer service telephony records for Q1 2021. Tracks First Call Resolution (FCR ~72.9%), agent utilization, speed of answer (67.5s avg), and satisfaction scores (3.4 / 5.0 CSAT).
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: var(--text-muted); width: 100%; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div><strong>Data Grain:</strong> Single customer service phone interaction</div>
          <div><strong>Skills Practiced:</strong> Power Pivot, Star Schema, DAX Measures, Executive KPI cards</div>
          <div><strong>Source:</strong> PwC Virtual BI Case Experience</div>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto; flex-wrap: wrap;">
          <a href="${BASE_URL}projects/call-center-performance-analysis/#doc-data-dictionary" class="btn btn-secondary btn-sm" style="flex: 1;">Data Dictionary</a>
          <a href="${BASE_URL}projects/call-center-performance-analysis/" class="btn btn-primary btn-sm" style="flex: 1;">Full Capstone →</a>
        </div>
      </div>

      <!-- Dataset 4: Course Workbooks -->
      <div id="workbooks" class="metric-card dataset-card" data-domain="workbooks" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span class="meta-pill" style="color: var(--brand-purple); border-color: rgba(124, 58, 237, 0.4); background: rgba(124, 58, 237, 0.1);">Curriculum Workbooks</span>
          <span class="meta-pill">10+ Workbooks • Excel (.xlsx)</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Chapter Practice Workbooks</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Pre-built exercise workbooks and completed instructor demonstrations saved in <code>11_Demos_and_Workbooks/</code>, including <em>Conditional Formatting & Absolute Relative.xlsx</em>, <em>Formulas_&_Functions_Part_1.xlsx</em>, and <em>2-Module_2 Test Data.xlsx</em>.
        </p>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: var(--text-muted); width: 100%; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <div><strong>Location:</strong> Google Drive Course Materials Folder</div>
          <div><strong>Usage:</strong> Download to local disk to follow along with video lectures</div>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="https://drive.google.com/drive/folders/1FbT96Hyp9KZbmjT2UeP-CVK0gL1JPn0T" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width: 100%;">
            Open Course Materials in Google Drive ↗
          </a>
        </div>
      </div>

    </div>

    <!-- Data Quality & Governance Callout -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.75rem;">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">🛡️ Data Quality Standards Across Datasets</h3>
      <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6; margin-bottom: 1rem;">
        In real-world data jobs, 80% of an analyst's time is spent preparing and verifying data. All datasets in our library are grounded in the <strong>DAMA 6 Dimensions of Data Quality</strong>:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.85rem;">
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>1. Completeness:</strong> Zero unplanned null keys in critical dimensions.</div>
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>2. Uniqueness:</strong> Deduplication across primary order/booking IDs.</div>
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>3. Timeliness:</strong> ISO-compliant date formatting (YYYY-MM-DD).</div>
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>4. Validity:</strong> List validation enforcement on categorical fields.</div>
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>5. Accuracy:</strong> Reconciled totals matching accounting ledgers.</div>
        <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);"><strong>6. Consistency:</strong> Cross-table relationship referential integrity.</div>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Enterprise Dataset Library',
      pageId: 'datasets',
      type: 'dataset',
      content: html,
      activeNav: 'datasets',
      breadcrumbs: [{ label: 'Dataset Library' }]
    }),
    'utf8'
  );
}

// M. Build Unified Learning Resources Hub (resources/index.html)
function buildResources() {
  console.log('[BUILD] Building Learning Resources Hub...');
  const outDir = path.join(DIST_DIR, 'resources');
  ensureDir(outDir);

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Unified Directory</span>
      <h1 class="page-title">Central Learning Resources Hub</h1>
      <p class="page-subtitle">A comprehensive, single-entry directory bringing together all external tools, downloadable workbooks, source code repositories, and technical reference guides.</p>
    </div>

    <!-- Core Integrated Resources Grid -->
    <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
      
      <!-- Resource 1: YouTube Video -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: #ef4444; border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.1);">Video Lecture</span>
          <span class="meta-pill">5+ Hours</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Full YouTube Masterclass</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          The complete masterclass lecture covering interface navigation, cell mechanics, formulas, dynamic arrays, tables, pivot tables, data cleaning, Power Query ETL, and DAX modeling.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="${BASE_URL}#course-video-player" class="btn btn-primary btn-sm" style="flex: 1;">Watch on Dashboard</a>
          <a href="https://youtu.be/uv1bxe2gdnU?si=3x0z6LYU5uSkwShe" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="flex: 1;">YouTube ↗</a>
        </div>
      </div>

      <!-- Resource 2: MindMeister Mind Map -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: #d97706; border-color: rgba(217, 119, 6, 0.4); background: rgba(217, 119, 6, 0.1);">Interactive Map</span>
          <span class="meta-pill">9 Modules</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Course Mind Map (MindMeister)</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Interactive visual mind map tracing how each lesson, concept, and technique connects across the curriculum. Includes local high-resolution offline architecture diagrams.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="${BASE_URL}mindmap/" class="btn btn-primary btn-sm" style="flex: 1;">Explore Mind Map</a>
          <a href="https://www.mindmeister.com/app/map/3782166881?t=I9gXHbkAlV" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="flex: 1;">MindMeister ↗</a>
        </div>
      </div>

      <!-- Resource 3: Google Drive Course Materials -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: #2563eb; border-color: rgba(37, 99, 235, 0.4); background: rgba(37, 99, 235, 0.1);">Google Drive</span>
          <span class="meta-pill">Workbooks & Slides</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Google Drive Materials Hub</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Official course repository containing presentation decks, starter Excel files, raw datasets, demo workbooks, and completed instructor solutions.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="https://drive.google.com/drive/folders/1FbT96Hyp9KZbmjT2UeP-CVK0gL1JPn0T" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="width: 100%;">
            Open Materials Folder in Google Drive ↗
          </a>
        </div>
      </div>

      <!-- Resource 4: GitHub Repository -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: var(--brand-purple); border-color: rgba(124, 58, 237, 0.4); background: rgba(124, 58, 237, 0.1);">Open Source</span>
          <span class="meta-pill">Git / CI/CD</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">GitHub Source Repository</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          The open-source code repository hosting the complete Obsidian Markdown vault, GitHub Actions continuous deployment workflows, and the static site generator.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="https://github.com/Sohila-Khaled-Abbas/COURSE-EXCEL-ZERO-TO-HERO" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="width: 100%;">
            View on GitHub (Sohila-Khaled-Abbas) ↗
          </a>
        </div>
      </div>

      <!-- Resource 5: Dataset Library -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: #107c41; border-color: rgba(16, 124, 65, 0.4); background: rgba(16, 124, 65, 0.1);">Internal Library</span>
          <span class="meta-pill">36K+ Records</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Enterprise Dataset Library</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Verified benchmark datasets for Superstore, Hotel Reservations (36K), and PwC Call Center simulation, complete with data dictionaries and grain specifications.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="${BASE_URL}datasets/" class="btn btn-primary btn-sm" style="width: 100%;">Explore Dataset Catalog →</a>
        </div>
      </div>

      <!-- Resource 6: Obsidian Vault Guide -->
      <div class="metric-card" style="flex-direction: column; align-items: flex-start; padding: 1.75rem; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="meta-pill" style="color: var(--text-primary); border-color: var(--border-default);">Knowledge Base</span>
          <span class="meta-pill">PKM Architecture</span>
        </div>
        <h2 style="font-size: 1.35rem; font-weight: 800; color: var(--text-primary); margin: 0;">Obsidian Publishing Guide</h2>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">
          Documentation detailing how Obsidian Markdown notes synchronize through GitHub into static HTML pages, frontmatter conventions, callouts, and wikilinks.
        </p>
        <div style="display: flex; gap: 0.5rem; width: 100%; margin-top: auto;">
          <a href="${BASE_URL}obsidian-guide/" class="btn btn-secondary btn-sm" style="width: 100%;">Read Publishing Guide →</a>
        </div>
      </div>

    </div>

    <!-- Quick Technical Desk References -->
    <div>
      <div class="section-heading-row">
        <h2>📚 Technical Desk References & Tools</h2>
      </div>
      <div class="metrics-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));">
        <a href="${BASE_URL}reference/keyboard-shortcuts/" class="metric-card" style="text-decoration: none; padding: 1.25rem;">
          <span style="font-size: 1.5rem; margin-bottom: 0.25rem;">⌨️</span>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Keyboard Shortcuts Guide</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Windows & Mac navigation, formatting, and formula shortcuts.</p>
        </a>

        <a href="${BASE_URL}reference/excel-cheat-sheet/" class="metric-card" style="text-decoration: none; padding: 1.25rem;">
          <span style="font-size: 1.5rem; margin-bottom: 0.25rem;">📋</span>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Excel Formula Cheat Sheet</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">One-page desk reference of essential syntax and arguments.</p>
        </a>

        <a href="${BASE_URL}formulas/" class="metric-card" style="text-decoration: none; padding: 1.25rem;">
          <span style="font-size: 1.5rem; margin-bottom: 0.25rem;">⚡</span>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Formula Encyclopedia</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">65+ searchable functions with syntax breakdowns and examples.</p>
        </a>

        <a href="${BASE_URL}concepts/" class="metric-card" style="text-decoration: none; padding: 1.25rem;">
          <span style="font-size: 1.5rem; margin-bottom: 0.25rem;">💡</span>
          <h3 style="font-size: 1rem; font-weight: 700; color: var(--text-primary);">Atomic Concepts</h3>
          <p style="font-size: 0.8rem; color: var(--text-muted);">25 foundational mental models for data architecture and logic.</p>
        </a>
      </div>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Learning Resources Hub',
      pageId: 'resources',
      type: 'resource',
      content: html,
      activeNav: 'resources',
      breadcrumbs: [{ label: 'Learning Resources' }]
    }),
    'utf8'
  );
}

// N. Build Obsidian Publishing Guide (obsidian-guide/index.html)
function buildObsidianGuide() {
  console.log('[BUILD] Building Obsidian Publishing Guide...');
  const outDir = path.join(DIST_DIR, 'obsidian-guide');
  ensureDir(outDir);

  const html = `
    <div class="page-header-box">
      <span class="page-category-badge">Vault to Web Architecture</span>
      <h1 class="page-title">Obsidian to Website Publishing Guide</h1>
      <p class="page-subtitle">Learn how this platform connects an author-friendly Obsidian Markdown vault with automated GitHub Actions CI/CD to generate a lightning-fast, accessible static educational website on GitHub Pages.</p>
    </div>

    <!-- Publishing Architecture Pipeline Diagram -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 3rem;">
      <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1rem;">🔄 Automated Git-Backed Publishing Pipeline</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--brand-purple); text-transform: uppercase;">Stage 1</div>
          <h4 style="font-size: 1rem; margin: 0.35rem 0;">Obsidian Vault</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">Author notes locally in Markdown with YAML frontmatter, wikilinks, and callouts.</p>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.75rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">Stage 2</div>
          <h4 style="font-size: 1rem; margin: 0.35rem 0;">Git & GitHub</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">Push commits to <code>main</code> branch. Version control tracks every lesson revision.</p>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.75rem; font-weight: 700; color: var(--brand-primary); text-transform: uppercase;">Stage 3</div>
          <h4 style="font-size: 1rem; margin: 0.35rem 0;">GitHub Actions</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;"><code>.github/workflows/deploy.yml</code> checks out repo, installs Node, and runs build script.</p>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.75rem; font-weight: 700; color: #d97706; text-transform: uppercase;">Stage 4</div>
          <h4 style="font-size: 1rem; margin: 0.35rem 0;">SSG (build.js)</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">Parses vault, converts Obsidian syntax, validates links, builds HTML in <code>dist/</code>.</p>
        </div>

        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <div style="font-size: 0.75rem; font-weight: 700; color: #107c41; text-transform: uppercase;">Stage 5</div>
          <h4 style="font-size: 1rem; margin: 0.35rem 0;">GitHub Pages</h4>
          <p style="font-size: 0.82rem; color: var(--text-muted); margin: 0;">Deploys static site to global CDN with zero server maintenance and instant load times.</p>
        </div>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5;">
        <strong>Zero Duplication Principle:</strong> You never have to manually update HTML or JSON when editing curriculum notes. The Obsidian Markdown files in <code>02_Notes/</code>, <code>03_Concepts/</code>, and <code>04_Formulas/</code> are the single source of truth.
      </div>
    </div>

    <!-- Supported Obsidian Syntax Conventions -->
    <div style="margin-bottom: 3.5rem;">
      <div class="section-heading-row">
        <h2>📝 Supported Obsidian Syntax & Conventions</h2>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">1. YAML Frontmatter</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
            Every educational note begins with YAML frontmatter to populate metadata badges, difficulty indicators, and search tags:
          </p>
          <pre style="background: var(--bg-surface-elevated); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.82rem; overflow-x: auto;"><code>---
title: "Modern XLOOKUP Mastery"
module: "Module 3: Formulas & Functions"
difficulty: "intermediate"
tags: [xlookup, lookup, dynamic-arrays]
video_chapter: "Module 3: Formulas & Functions"
video_timestamp: "01:38:56"
---</code></pre>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">2. Obsidian Callouts</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
            Use blockquotes with <code>&gt; [!type] Title</code>. These automatically render as colored alert boxes with icons:
          </p>
          <pre style="background: var(--bg-surface-elevated); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.82rem; overflow-x: auto;"><code>&amp;gt; [!tip] Best Practice
&amp;gt; Always use XLOOKUP instead of VLOOKUP.

&amp;gt; [!warning] Common Mistake
&amp;gt; Forgetting absolute $ references in copied formulas.</code></pre>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">3. Wikilinks Resolution</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
            Internal vault links using <code>[[Note Name]]</code> or <code>[[Note Name|Custom Text]]</code> are indexed and translated into clean static web URLs:
          </p>
          <pre style="background: var(--bg-surface-elevated); padding: 0.85rem; border-radius: var(--radius-md); font-size: 0.82rem; overflow-x: auto;"><code>Refer to [[Relative vs Absolute Referencing]]
or practice with [[Ex03 - Formulas and Functions|Lab 3]].</code></pre>
        </div>

        <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.5rem;">
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem;">4. Code Blocks with Copy</h3>
          <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.75rem;">
            Fenced code blocks with language identifiers (<code>excel</code>, <code>dax</code>, <code>powerquery</code>) are automatically wrapped with language headers and one-click copy buttons.
          </p>
        </div>
      </div>
    </div>

    <!-- Safe Publishing & Privacy Policy -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-left: 5px solid var(--brand-primary); border-radius: var(--radius-lg); padding: 1.75rem; margin-bottom: 3.5rem;">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">🔒 Safe Publishing Rules & Privacy Hygiene</h3>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
        To ensure sensitive files, local environment configurations, or unpublished drafts are never exposed on GitHub Pages, the publishing workflow enforces strict exclusion rules:
      </p>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <strong style="color: #ef4444; display: block; margin-bottom: 0.35rem;">⛔ Excluded by Default (.gitignore)</strong>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.25rem; margin: 0; line-height: 1.5;">
            <li><code>.obsidian/</code> workspace configuration & plugins</li>
            <li>Local machine paths, credentials, and tokens</li>
            <li>Large raw binaries not meant for Git tracking</li>
            <li>Temporary editor swap and lock files</li>
          </ul>
        </div>
        <div style="background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <strong style="color: var(--brand-primary); display: block; margin-bottom: 0.35rem;">✓ Published Content Allowlist</strong>
          <ul style="font-size: 0.85rem; color: var(--text-muted); padding-left: 1.25rem; margin: 0; line-height: 1.5;">
            <li><code>02_Notes/</code> — 38 structured curriculum lessons</li>
            <li><code>03_Concepts/</code> — 25 atomic mental models</li>
            <li><code>04_Formulas/</code> — 65+ formula encyclopedia notes</li>
            <li><code>05_Practice/</code>, <code>06_Projects/</code>, <code>07_Reference/</code>, <code>08_Revision/</code></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Step-by-Step Guide for Adding Content -->
    <div style="background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-lg); padding: 1.75rem;">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">🚀 How to Publish a New Lesson or Concept</h3>
      <ol style="font-size: 0.92rem; color: var(--text-secondary); line-height: 1.7; padding-left: 1.5rem; margin: 0;">
        <li>Open your local Obsidian vault in <code>COURSE-EXCEL-ZERO-TO-HERO</code>.</li>
        <li>Create a new Markdown note inside the relevant folder (e.g. <code>02_Notes/03_Formulas_and_Functions/</code>).</li>
        <li>Add the YAML frontmatter block with <code>title</code>, <code>module</code>, and <code>difficulty</code>.</li>
        <li>Write your lesson content using standard Markdown headings, callouts, and wikilinks.</li>
        <li>Commit your changes and push to GitHub:
          <pre style="background: var(--bg-surface-elevated); padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin: 0.5rem 0; font-size: 0.85rem;"><code>git add .
git commit -m "Add Lesson: Advanced Dynamic Arrays"
git push origin main</code></pre>
        </li>
        <li>The GitHub Actions workflow triggers automatically and deploys the update to GitHub Pages within ~60 seconds!</li>
      </ol>
    </div>
  `;

  fs.writeFileSync(
    path.join(outDir, 'index.html'),
    renderPageLayout({
      title: 'Obsidian Publishing Guide',
      pageId: 'obsidian-guide',
      type: 'guide',
      content: html,
      activeNav: 'obsidian-guide',
      breadcrumbs: [{ label: 'Obsidian Publishing Guide' }]
    }),
    'utf8'
  );
}

// O. Build 404 Page (404.html)
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

// P. Build Search Index (search-index.json)
function buildSearchIndex() {
  console.log('[BUILD] Generating Search Index (search-index.json)...');

  const specialPages = [
    {
      title: 'Start Here: Course Orientation & Study Guide',
      url: `${BASE_URL}start-here/`,
      type: 'guide',
      category: 'Orientation',
      tags: ['start here', 'orientation', 'study guide', 'prerequisites', 'learning loop'],
      snippet: 'Welcome guide explaining the 8-step active learning loop, prerequisites, study pacing, and how to use the video, mind map, notes, and datasets together.'
    },
    {
      title: 'Course Mind Map & Visual Curriculum',
      url: `${BASE_URL}mindmap/`,
      type: 'mindmap',
      category: 'Visual Learning',
      tags: ['mind map', 'curriculum', 'architecture', 'mindmeister', 'visual'],
      snippet: 'Interactive MindMeister mind map and local enterprise architecture diagrams connecting all 9 modules from grid mechanics to DAX.'
    },
    {
      title: 'Enterprise Dataset Library & Labs',
      url: `${BASE_URL}datasets/`,
      type: 'dataset',
      category: 'Datasets',
      tags: ['datasets', 'superstore', 'hotel reservations', 'call center', 'practice data'],
      snippet: 'Verified benchmark datasets including Sample Superstore (9,994 rows), Hotel Reservations (36,275 bookings), and PwC Call Center (5,000 calls).'
    },
    {
      title: 'Central Learning Resources Hub',
      url: `${BASE_URL}resources/`,
      type: 'resource',
      category: 'Resources',
      tags: ['resources', 'video', 'drive', 'github', 'mind map', 'cheatsheets'],
      snippet: 'Unified directory of all course materials, Google Drive workbooks, YouTube masterclass, GitHub repository, and cheat sheets.'
    },
    {
      title: 'Obsidian to Website Publishing Guide',
      url: `${BASE_URL}obsidian-guide/`,
      type: 'guide',
      category: 'Vault Architecture',
      tags: ['obsidian', 'publishing', 'github actions', 'markdown', 'workflow'],
      snippet: 'Guide to the Obsidian-to-GitHub-to-Website static publishing pipeline, YAML frontmatter standards, callouts, and wikilink conventions.'
    }
  ];

  const searchEntries = database.allFiles.map(f => {
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
  }).concat(specialPages);

  fs.writeFileSync(
    path.join(DIST_DIR, 'search-index.json'),
    JSON.stringify(searchEntries, null, 2),
    'utf8'
  );
}

// Q. Copy Static Assets (CSS, JS, Images)
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
  buildStartHere();
  buildCurriculum();
  buildMindMap();
  buildLessons();
  buildConcepts();
  buildFormulas();
  buildPractice();
  buildDatasets();
  buildRevision();
  buildProjects();
  buildReference();
  buildResources();
  buildObsidianGuide();
  build404();
  buildSearchIndex();
  copyAssets();

  console.log('===========================================================');
  console.timeEnd('[BUILD COMPLETE]');
  console.log(`[SUCCESS] Platform generated in: ${DIST_DIR}`);
  console.log('===========================================================');
}

buildAll();


/**
 * Excel Zero to Hero — Site Verification & Integrity Test Suite
 * Validates generated static assets, internal links, HTML structure,
 * search index schema, and ensures zero broken references.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'dist');
const BASE_URL = '/COURSE-EXCEL-ZERO-TO-HERO/';

let totalChecks = 0;
let errors = 0;
let warnings = 0;

function check(condition, message) {
  totalChecks++;
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    errors++;
  }
}

function warn(condition, message) {
  if (!condition) {
    console.warn(`⚠️ [WARN] ${message}`);
    warnings++;
  }
}

console.log('===========================================================');
console.log(' RUNNING STATIC SITE VERIFICATION TEST SUITE');
console.log('===========================================================');

// 1. Check Core Files Existence
check(fs.existsSync(path.join(DIST_DIR, 'index.html')), 'Dashboard (index.html) must exist');
check(fs.existsSync(path.join(DIST_DIR, '404.html')), '404 page (404.html) must exist');
check(fs.existsSync(path.join(DIST_DIR, '.nojekyll')), '.nojekyll must exist for GitHub Pages');
check(fs.existsSync(path.join(DIST_DIR, 'search-index.json')), 'search-index.json must exist');
check(fs.existsSync(path.join(DIST_DIR, 'assets', 'styles.css')), 'assets/styles.css must exist');
check(fs.existsSync(path.join(DIST_DIR, 'assets', 'app.js')), 'assets/app.js must exist');
check(fs.existsSync(path.join(DIST_DIR, 'curriculum', 'index.html')), 'curriculum/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'practice', 'index.html')), 'practice/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'revision', 'index.html')), 'revision/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'formulas', 'index.html')), 'formulas/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'concepts', 'index.html')), 'concepts/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'projects', 'index.html')), 'projects/index.html must exist');
check(fs.existsSync(path.join(DIST_DIR, 'portfolio', 'index.html')), 'portfolio/index.html must exist');

// 2. Scan all HTML files
function getFiles(dir) {
  let list = [];
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      list = list.concat(getFiles(full));
    } else if (file.endsWith('.html')) {
      list.push(full);
    }
  });
  return list;
}

const htmlFiles = getFiles(DIST_DIR);
console.log(`[AUDIT] Scanning ${htmlFiles.length} generated HTML pages...`);
check(htmlFiles.length >= 150, `Expected at least 150 generated pages, got ${htmlFiles.length}`);

// 3. Inspect Link & Asset Integrity
let linkCheckCount = 0;
let brokenLinks = 0;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // Check valid HTML structure
  check(content.includes('<!DOCTYPE html>'), `${path.relative(DIST_DIR, file)} missing DOCTYPE`);
  check(content.includes('</html>'), `${path.relative(DIST_DIR, file)} unclosed html tag`);
  check(content.includes('assets/styles.css'), `${path.relative(DIST_DIR, file)} missing styles.css`);
  check(content.includes('assets/app.js'), `${path.relative(DIST_DIR, file)} missing app.js`);

  // Check for any unparsed Obsidian callout leaks
  const hasRawCallout = /> \[!(tip|note|warning|danger|abstract)/i.test(content);
  check(!hasRawCallout, `${path.relative(DIST_DIR, file)} has unparsed raw Obsidian callout`);

  // Check internal href links
  const hrefMatches = content.matchAll(/href="([^"#\?]+)"/g);
  for (const m of hrefMatches) {
    const href = m[1];
    if (href.startsWith(BASE_URL)) {
      linkCheckCount++;
      const relPath = href.slice(BASE_URL.length);
      let targetFile = path.join(DIST_DIR, relPath);

      if (!fs.existsSync(targetFile)) {
        if (fs.existsSync(path.join(targetFile, 'index.html'))) {
          // Valid directory route
        } else {
          brokenLinks++;
          if (brokenLinks <= 10) {
            console.error(`❌ Broken link in ${path.relative(DIST_DIR, file)}: ${href} (Resolved to ${targetFile})`);
          }
        }
      }
    }
  }
});

check(brokenLinks === 0, `Zero broken internal links expected. Found: ${brokenLinks}`);

// 4. Validate Search Index
const searchIndex = JSON.parse(fs.readFileSync(path.join(DIST_DIR, 'search-index.json'), 'utf8'));
check(Array.isArray(searchIndex), 'search-index.json must be an array');
check(searchIndex.length >= 150, `Search index should have at least 150 entries, got ${searchIndex.length}`);

const invalidEntries = searchIndex.filter(e => !e.title || !e.url || !e.type);
check(invalidEntries.length === 0, `All search entries must have title, url, type. Invalid: ${invalidEntries.length}`);

console.log('===========================================================');
console.log(`TOTAL CHECKS: ${totalChecks}`);
console.log(`LINKS AUDITED: ${linkCheckCount}`);
console.log(`ERRORS: ${errors}`);
console.log(`WARNINGS: ${warnings}`);
console.log('===========================================================');

if (errors > 0) {
  process.exit(1);
} else {
  console.log('✅ ALL SITE VERIFICATION TESTS PASSED SUCCESSFULLY!');
  process.exit(0);
}

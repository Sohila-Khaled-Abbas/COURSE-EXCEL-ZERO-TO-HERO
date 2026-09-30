/**
 * Excel Zero to Hero — Universal Client App Engine
 * Handles LocalStorage progress tracking, theme switching, global search,
 * 3D flashcards, quizzes, copy-to-clipboard, and responsive UI interactions.
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. THEME ENGINE
  // -------------------------------------------------------------------------
  const THEME_KEY = 'excel_zero_hero_theme';

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);
    updateThemeToggleIcons(initialTheme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    updateThemeToggleIcons(next);
    if (typeof initMermaidDiagrams === 'function') {
      initMermaidDiagrams();
    }
  }

  function updateThemeToggleIcons(theme) {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = theme === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // -------------------------------------------------------------------------
  // 2. LEARNING PROGRESS ENGINE (LOCALSTORAGE)
  // -------------------------------------------------------------------------
  const PROGRESS_KEY = 'excel_zero_hero_progress';
  const TOTAL_LESSONS = 38;
  const TOTAL_EXERCISES = 7;
  const TOTAL_FLASHCARDS = 25;

  function getProgress() {
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      return data ? JSON.parse(data) : {
        completedLessons: [],
        completedExercises: [],
        bookmarks: [],
        lastLesson: null,
        flashcardMastery: {}
      };
    } catch (e) {
      return {
        completedLessons: [],
        completedExercises: [],
        bookmarks: [],
        lastLesson: null,
        flashcardMastery: {}
      };
    }
  }

  function saveProgress(state) {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
      syncProgressUI();
    } catch (e) {
      console.warn('Could not save progress to localStorage', e);
    }
  }

  function isLessonCompleted(lessonId) {
    const state = getProgress();
    return state.completedLessons.includes(lessonId);
  }

  function toggleLessonCompleted(lessonId, lessonTitle, lessonUrl) {
    const state = getProgress();
    const index = state.completedLessons.indexOf(lessonId);
    if (index === -1) {
      state.completedLessons.push(lessonId);
    } else {
      state.completedLessons.splice(index, 1);
    }
    state.lastLesson = { id: lessonId, title: lessonTitle, url: lessonUrl };
    saveProgress(state);
    return index === -1;
  }

  function isBookmarked(itemId) {
    const state = getProgress();
    return state.bookmarks.some(b => b.id === itemId);
  }

  function toggleBookmark(item) {
    const state = getProgress();
    const index = state.bookmarks.findIndex(b => b.id === item.id);
    if (index === -1) {
      state.bookmarks.push(item);
    } else {
      state.bookmarks.splice(index, 1);
    }
    saveProgress(state);
    return index === -1;
  }

  function recordPageVisit() {
    const pageMeta = document.querySelector('meta[name="excel-page-id"]');
    if (pageMeta && pageMeta.getAttribute('data-type') === 'lesson') {
      const lessonId = pageMeta.getAttribute('content');
      const lessonTitle = document.title.split('—')[0].trim();
      const state = getProgress();
      state.lastLesson = { id: lessonId, title: lessonTitle, url: window.location.pathname };
      saveProgress(state);
    }
  }

  function syncProgressUI() {
    const state = getProgress();
    const completedCount = state.completedLessons.length;
    const pct = Math.min(100, Math.round((completedCount / TOTAL_LESSONS) * 100));

    // Update Header Progress Pill
    document.querySelectorAll('.header-progress-pct').forEach(el => {
      el.textContent = `${pct}%`;
    });
    document.querySelectorAll('.progress-mini-fill').forEach(el => {
      el.style.width = `${pct}%`;
    });

    // Update Dashboard Widgets
    const dashPct = document.getElementById('dash-pct-text');
    if (dashPct) dashPct.textContent = `${pct}%`;

    const dashCircle = document.getElementById('dash-circle-bar');
    if (dashCircle) {
      dashCircle.setAttribute('stroke-dasharray', `${pct}, 100`);
    }

    const countCompletedEl = document.getElementById('metric-completed-lessons');
    if (countCompletedEl) countCompletedEl.textContent = `${completedCount} / ${TOTAL_LESSONS}`;

    const countExercisesEl = document.getElementById('metric-mastered-exercises');
    if (countExercisesEl) countExercisesEl.textContent = `${state.completedExercises.length} / ${TOTAL_EXERCISES}`;

    const flashMasteredCount = Object.values(state.flashcardMastery).filter(v => v === 'mastered').length;
    const countFlashcardsEl = document.getElementById('metric-flashcards-mastered');
    if (countFlashcardsEl) countFlashcardsEl.textContent = `${flashMasteredCount} / ${TOTAL_FLASHCARDS}`;

    // Update Continue Learning CTA
    const continueBtn = document.getElementById('continue-learning-btn');
    const continueDesc = document.getElementById('continue-learning-desc');
    if (continueBtn) {
      if (state.lastLesson && state.lastLesson.url) {
        continueBtn.href = state.lastLesson.url;
        if (continueDesc) continueDesc.textContent = `Resume: ${state.lastLesson.title}`;
      } else {
        const firstLessonLink = document.querySelector('.first-lesson-link');
        if (firstLessonLink) {
          continueBtn.href = firstLessonLink.getAttribute('href');
          if (continueDesc) continueDesc.textContent = 'Start Module 1: Excel Interface & GUI';
        }
      }
    }

    // Update Lesson Page Buttons
    const pageMeta = document.querySelector('meta[name="excel-page-id"]');
    if (pageMeta) {
      const pageId = pageMeta.getAttribute('content');
      const isLesson = pageMeta.getAttribute('data-type') === 'lesson';

      const completeBtn = document.getElementById('btn-mark-complete');
      if (completeBtn && isLesson) {
        const done = state.completedLessons.includes(pageId);
        completeBtn.classList.toggle('active-completed', done);
        completeBtn.innerHTML = done
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Completed'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Mark as Complete';
      }

      const bookmarkBtn = document.getElementById('btn-bookmark');
      if (bookmarkBtn) {
        const bookmarked = state.bookmarks.some(b => b.id === pageId);
        bookmarkBtn.classList.toggle('active-bookmarked', bookmarked);
        bookmarkBtn.innerHTML = bookmarked
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Saved'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Bookmark';
      }
    }

    // Sync Checklist Badges in Curriculum
    document.querySelectorAll('[data-lesson-id]').forEach(el => {
      const lid = el.getAttribute('data-lesson-id');
      const isDone = state.completedLessons.includes(lid);
      const icon = el.querySelector('.completion-check-icon');
      if (icon) {
        icon.classList.toggle('completed', isDone);
        icon.innerHTML = isDone ? '✓' : '';
      }
    });

    // Render Saved Bookmarks List on Dashboard
    renderBookmarksList(state.bookmarks);
  }

  function renderBookmarksList(bookmarks) {
    const listContainer = document.getElementById('dashboard-bookmarks-list');
    if (!listContainer) return;

    if (!bookmarks || bookmarks.length === 0) {
      listContainer.innerHTML = '<p class="text-muted" style="font-size: 0.9rem; padding: 0.5rem 0;">No saved bookmarks yet. Click the "Bookmark" button on any lesson or formula to save it here for quick access.</p>';
      return;
    }

    listContainer.innerHTML = bookmarks.map(b => `
      <div class="bookmark-row" style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.8rem; background: var(--bg-surface); border: 1px solid var(--border-default); border-radius: var(--radius-md); margin-bottom: 0.5rem;">
        <a href="${b.url}" style="font-weight: 600; font-size: 0.9rem; color: var(--text-primary); text-decoration: none;">
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--brand-primary); margin-right: 0.5rem;">[${b.type || 'Lesson'}]</span>
          ${b.title}
        </a>
        <button class="remove-bookmark-btn icon-btn" data-id="${b.id}" style="width: 28px; height: 28px;" title="Remove Bookmark">×</button>
      </div>
    `).join('');

    listContainer.querySelectorAll('.remove-bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        const state = getProgress();
        state.bookmarks = state.bookmarks.filter(b => b.id !== id);
        saveProgress(state);
      });
    });
  }

  // -------------------------------------------------------------------------
  // 3. COPY BUTTONS & CODE INTERACTION
  // -------------------------------------------------------------------------
  function initCopyButtons() {
    document.querySelectorAll('.code-copy-btn, .formula-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetSelector = btn.getAttribute('data-clipboard-target');
        let textToCopy = '';

        if (targetSelector) {
          const el = document.querySelector(targetSelector);
          textToCopy = el ? el.textContent.trim() : '';
        } else {
          const container = btn.closest('.code-block-container, .formula-card');
          if (container) {
            const codeEl = container.querySelector('code, pre, .formula-syntax');
            textToCopy = codeEl ? codeEl.textContent.trim() : '';
          }
        }

        if (textToCopy) {
          try {
            await navigator.clipboard.writeText(textToCopy);
            const origText = btn.innerHTML;
            btn.innerHTML = 'Copied! ✓';
            btn.classList.add('btn-copied');
            setTimeout(() => {
              btn.innerHTML = origText;
              btn.classList.remove('btn-copied');
            }, 2000);
          } catch (err) {
            console.error('Clipboard copy failed', err);
          }
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 4. INTERACTIVE 3D FLASHCARDS ENGINE
  // -------------------------------------------------------------------------
  let flashcardsData = [];
  let currentCardIndex = 0;

  function initFlashcards() {
    const deck = document.getElementById('flashcard-deck');
    if (!deck) return;

    const dataEl = document.getElementById('flashcards-data');
    if (dataEl) {
      try {
        flashcardsData = JSON.parse(dataEl.textContent);
      } catch (e) {
        console.error('Failed to parse flashcard data', e);
      }
    }

    if (!flashcardsData || flashcardsData.length === 0) return;

    const cardContainer = document.getElementById('interactive-flashcard');
    const questionEl = document.getElementById('flashcard-question');
    const answerEl = document.getElementById('flashcard-answer');
    const numEl = document.getElementById('flashcard-current-num');
    const topicEl = document.getElementById('flashcard-topic');
    const prevBtn = document.getElementById('flashcard-prev-btn');
    const nextBtn = document.getElementById('flashcard-next-btn');
    const flipBtn = document.getElementById('flashcard-flip-btn');
    const shuffleBtn = document.getElementById('flashcard-shuffle-btn');
    const knowBtn = document.getElementById('flashcard-know-btn');
    const reviewBtn = document.getElementById('flashcard-review-btn');
    const masteryStat = document.getElementById('flashcard-mastery-stat');

    function renderCard(idx) {
      if (!flashcardsData[idx]) return;
      const card = flashcardsData[idx];

      cardContainer.classList.remove('is-flipped');
      questionEl.innerHTML = card.question;
      answerEl.innerHTML = card.answer;
      if (numEl) numEl.textContent = `Card ${idx + 1} of ${flashcardsData.length}`;
      if (topicEl) topicEl.textContent = card.topic || 'Excel Core';

      const state = getProgress();
      const status = state.flashcardMastery[card.id];
      if (cardContainer) {
        cardContainer.setAttribute('data-status', status || 'unseen');
      }

      updateMasteryStats();
    }

    function updateMasteryStats() {
      if (!masteryStat) return;
      const state = getProgress();
      const masteredCount = Object.values(state.flashcardMastery).filter(v => v === 'mastered').length;
      const pct = Math.round((masteredCount / flashcardsData.length) * 100);
      masteryStat.textContent = `Mastered: ${masteredCount} / ${flashcardsData.length} (${pct}%)`;
    }

    cardContainer.addEventListener('click', () => {
      cardContainer.classList.toggle('is-flipped');
    });

    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        cardContainer.classList.toggle('is-flipped');
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
        renderCard(currentCardIndex);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        renderCard(currentCardIndex);
      });
    }

    if (shuffleBtn) {
      shuffleBtn.addEventListener('click', () => {
        flashcardsData.sort(() => Math.random() - 0.5);
        currentCardIndex = 0;
        renderCard(currentCardIndex);
      });
    }

    if (knowBtn) {
      knowBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = flashcardsData[currentCardIndex];
        const state = getProgress();
        state.flashcardMastery[card.id] = 'mastered';
        saveProgress(state);
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        renderCard(currentCardIndex);
      });
    }

    if (reviewBtn) {
      reviewBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = flashcardsData[currentCardIndex];
        const state = getProgress();
        state.flashcardMastery[card.id] = 'review';
        saveProgress(state);
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        renderCard(currentCardIndex);
      });
    }

    // Keyboard support: Space to flip, Arrows for prev/next
    document.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (!document.getElementById('flashcard-deck')) return;

      if (e.code === 'Space') {
        e.preventDefault();
        cardContainer.classList.toggle('is-flipped');
      } else if (e.code === 'ArrowRight') {
        currentCardIndex = (currentCardIndex + 1) % flashcardsData.length;
        renderCard(currentCardIndex);
      } else if (e.code === 'ArrowLeft') {
        currentCardIndex = (currentCardIndex - 1 + flashcardsData.length) % flashcardsData.length;
        renderCard(currentCardIndex);
      }
    });

    renderCard(0);
  }

  // -------------------------------------------------------------------------
  // 5. INTERACTIVE SELF-CHECK QUIZZES
  // -------------------------------------------------------------------------
  function initQuizzes() {
    document.querySelectorAll('.quiz-card').forEach(quiz => {
      const options = quiz.querySelectorAll('.quiz-option-item');
      const submitBtn = quiz.querySelector('.quiz-submit-btn');
      const feedback = quiz.querySelector('.quiz-feedback-box');
      let selectedOption = null;

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (quiz.classList.contains('submitted')) return;
          options.forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          selectedOption = opt;
          if (submitBtn) submitBtn.disabled = false;
        });
      });

      if (submitBtn) {
        submitBtn.addEventListener('click', () => {
          if (!selectedOption) return;
          quiz.classList.add('submitted');
          const isCorrect = selectedOption.getAttribute('data-correct') === 'true';

          options.forEach(opt => {
            if (opt.getAttribute('data-correct') === 'true') {
              opt.classList.add('correct');
            } else if (opt === selectedOption) {
              opt.classList.add('incorrect');
            }
          });

          if (feedback) {
            feedback.classList.add('show');
            if (isCorrect) {
              feedback.className = 'quiz-feedback-box show feedback-correct';
              feedback.innerHTML = '<strong>Correct! 🎉</strong> ' + (feedback.getAttribute('data-explanation') || 'Well done, that is accurate.');
            } else {
              feedback.className = 'quiz-feedback-box show feedback-incorrect';
              feedback.innerHTML = '<strong>Not quite.</strong> ' + (feedback.getAttribute('data-explanation') || 'Review the lesson concept above.');
            }
          }
          submitBtn.style.display = 'none';
        });
      }
    });
  }

  // -------------------------------------------------------------------------
  // 6. GLOBAL SITE-WIDE SEARCH MODAL (Ctrl + K)
  // -------------------------------------------------------------------------
  let searchDatabase = null;
  let searchActiveIndex = -1;

  async function loadSearchIndex() {
    if (searchDatabase) return searchDatabase;
    const baseMeta = document.querySelector('meta[name="base-url"]');
    const baseUrl = baseMeta ? baseMeta.getAttribute('content') : '/';
    const indexUrl = `${baseUrl.replace(/\/$/, '')}/search-index.json`;

    try {
      const resp = await fetch(indexUrl);
      searchDatabase = await resp.json();
    } catch (e) {
      console.warn('Could not load search-index.json', e);
      searchDatabase = [];
    }
    return searchDatabase;
  }

  function initSearchModal() {
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('search-results');
    const triggers = document.querySelectorAll('.search-trigger-btn, [data-action="open-search"]');

    if (!modal || !input) return;

    function openModal() {
      modal.classList.add('open');
      input.value = '';
      resultsContainer.innerHTML = '<div class="search-empty-state">Type a keyword, formula name, or concept to search...</div>';
      searchActiveIndex = -1;
      setTimeout(() => input.focus(), 50);
      loadSearchIndex();
    }

    function closeModal() {
      modal.classList.remove('open');
      searchActiveIndex = -1;
    }

    triggers.forEach(btn => btn.addEventListener('click', openModal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        modal.classList.contains('open') ? closeModal() : openModal();
      } else if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });

    input.addEventListener('input', async () => {
      const query = input.value.trim().toLowerCase();
      if (!query) {
        resultsContainer.innerHTML = '<div class="search-empty-state">Type a keyword, formula name, or concept to search...</div>';
        return;
      }

      const db = await loadSearchIndex();
      const matches = db.filter(item => {
        return (item.title && item.title.toLowerCase().includes(query)) ||
          (item.category && item.category.toLowerCase().includes(query)) ||
          (item.tags && item.tags.some(t => t.toLowerCase().includes(query))) ||
          (item.snippet && item.snippet.toLowerCase().includes(query));
      }).slice(0, 15);

      if (matches.length === 0) {
        resultsContainer.innerHTML = `<div class="search-empty-state">No matching lessons, formulas, or concepts found for "<strong>${escapeHtml(query)}</strong>".</div>`;
        searchActiveIndex = -1;
        return;
      }

      resultsContainer.innerHTML = matches.map((item, idx) => `
        <a href="${item.url}" class="search-result-item ${idx === 0 ? 'selected' : ''}" data-index="${idx}">
          <div class="search-item-top">
            <span class="search-item-title">${escapeHtml(item.title)}</span>
            <span class="search-item-badge">${escapeHtml(item.category || item.type || 'Guide')}</span>
          </div>
          <div class="search-item-snippet">${escapeHtml(item.snippet || '')}</div>
        </a>
      `).join('');

      searchActiveIndex = 0;
    });

    input.addEventListener('keydown', (e) => {
      const items = resultsContainer.querySelectorAll('.search-result-item');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        searchActiveIndex = (searchActiveIndex + 1) % items.length;
        updateSelectedResult(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        searchActiveIndex = (searchActiveIndex - 1 + items.length) % items.length;
        updateSelectedResult(items);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (searchActiveIndex >= 0 && items[searchActiveIndex]) {
          items[searchActiveIndex].click();
        }
      }
    });

    function updateSelectedResult(items) {
      items.forEach((item, idx) => {
        item.classList.toggle('selected', idx === searchActiveIndex);
        if (idx === searchActiveIndex) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // -------------------------------------------------------------------------
  // 7. MODULE ACCORDION & MOBILE NAVIGATION
  // -------------------------------------------------------------------------
  function initModuleAccordions() {
    document.querySelectorAll('.module-card').forEach(card => {
      const header = card.querySelector('.module-header');
      if (header) {
        header.addEventListener('click', () => {
          card.classList.toggle('open');
        });
      }
    });
  }

  function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.app-sidebar');

    if (mobileBtn && sidebar) {
      mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('mobile-open');
      });

      document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== mobileBtn) {
          sidebar.classList.remove('mobile-open');
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 8. RESET PROGRESS MODAL
  // -------------------------------------------------------------------------
  function initResetProgress() {
    document.querySelectorAll('[data-action="reset-progress"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const confirmed = confirm('Are you sure you want to reset your local course progress? This will clear completed lessons, exercise marks, and flashcard mastery in this browser.');
        if (confirmed) {
          localStorage.removeItem(PROGRESS_KEY);
          syncProgressUI();
          alert('Progress has been reset.');
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // 9. LESSON PAGE ACTIONS (COMPLETE & BOOKMARK)
  // -------------------------------------------------------------------------
  function initPageActions() {
    const pageMeta = document.querySelector('meta[name="excel-page-id"]');
    if (!pageMeta) return;

    const pageId = pageMeta.getAttribute('content');
    const pageType = pageMeta.getAttribute('data-type');
    const pageTitle = document.title.split('—')[0].trim();
    const pageUrl = window.location.pathname;

    const completeBtn = document.getElementById('btn-mark-complete');
    if (completeBtn && pageType === 'lesson') {
      completeBtn.addEventListener('click', () => {
        toggleLessonCompleted(pageId, pageTitle, pageUrl);
      });
    }

    const bookmarkBtn = document.getElementById('btn-bookmark');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', () => {
        toggleBookmark({ id: pageId, title: pageTitle, url: pageUrl, type: pageType });
      });
    }
  }

  // -------------------------------------------------------------------------
  // 10. VIDEO CHAPTERS & YOUTUBE PLAYER INTERACTION
  // -------------------------------------------------------------------------
  function initVideoChapters() {
    const iframe = document.getElementById('main-course-iframe');
    const chapterButtons = document.querySelectorAll('.chapter-btn[data-start-seconds]');

    chapterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const seconds = btn.getAttribute('data-start-seconds');
        if (iframe && seconds !== null) {
          chapterButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          iframe.src = `https://www.youtube-nocookie.com/embed/uv1bxe2gdnU?start=${seconds}&autoplay=1`;
          const playerBox = document.getElementById('course-video-player');
          if (playerBox) {
            playerBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });
    });

    // Check URL parameters for ?t= or #chapter
    const urlParams = new URLSearchParams(window.location.search);
    const startSec = urlParams.get('t');
    if (startSec && iframe) {
      iframe.src = `https://www.youtube-nocookie.com/embed/uv1bxe2gdnU?start=${startSec}&autoplay=1`;
    }
  }

  // -------------------------------------------------------------------------
  // 11. STUDY PLANNER & MODULE BREAKDOWN ANALYTICS
  // -------------------------------------------------------------------------
  const PACE_KEY = 'excel_study_pace';

  function initStudyPlanner() {
    const paceButtons = document.querySelectorAll('.pace-option-btn');
    const savedPace = localStorage.getItem(PACE_KEY) || 'steady';

    paceButtons.forEach(btn => {
      const pace = btn.getAttribute('data-pace');
      btn.classList.toggle('active', pace === savedPace);

      btn.addEventListener('click', () => {
        paceButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem(PACE_KEY, pace);
        updatePlannerStats(pace);
      });
    });

    updatePlannerStats(savedPace);
  }

  function updatePlannerStats(pace) {
    const state = getProgress();
    const remaining = Math.max(0, TOTAL_LESSONS - state.completedLessons.length);
    const paceMap = { casual: 2, steady: 4, intensive: 7 };
    const perWeek = paceMap[pace] || 4;

    const weeksNeeded = Math.ceil(remaining / perWeek);
    const etaDate = new Date();
    etaDate.setDate(etaDate.getDate() + weeksNeeded * 7);

    const etaTextEl = document.getElementById('planner-eta-text');
    if (etaTextEl) {
      if (remaining === 0) {
        etaTextEl.innerHTML = '🎉 <strong>Curriculum Completed!</strong> You have finished all 38 lessons.';
      } else {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        etaTextEl.innerHTML = `Target Finish: <strong>${etaDate.toLocaleDateString(undefined, options)}</strong> (~${weeksNeeded} weeks at ${perWeek} lessons/wk)`;
      }
    }

    // Update module-by-module progress bars
    document.querySelectorAll('.module-progress-row[data-module-num]').forEach(row => {
      const modNum = row.getAttribute('data-module-num');
      const lessonIdsAttr = row.getAttribute('data-lesson-ids');
      if (lessonIdsAttr) {
        const lessonIds = lessonIdsAttr.split(',').map(s => s.trim()).filter(Boolean);
        const doneCount = lessonIds.filter(id => state.completedLessons.includes(id)).length;
        const pct = lessonIds.length > 0 ? Math.round((doneCount / lessonIds.length) * 100) : 0;

        const fill = row.querySelector('.module-progress-bar-fill');
        if (fill) fill.style.width = `${pct}%`;

        const stat = row.querySelector('.module-row-stat');
        if (stat) stat.textContent = `${doneCount}/${lessonIds.length} (${pct}%)`;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 12. DATASET FILTERS
  // -------------------------------------------------------------------------
  function initDatasetFilters() {
    const filterButtons = document.querySelectorAll('.dataset-filter-btn');
    const datasetCards = document.querySelectorAll('.dataset-card[data-domain]');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('btn-primary'));
        filterButtons.forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        const domain = btn.getAttribute('data-domain');
        datasetCards.forEach(card => {
          if (domain === 'all' || card.getAttribute('data-domain') === domain) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 13. MIND MAP VIEW TOGGLE
  // -------------------------------------------------------------------------
  function initMindmapToggles() {
    const toggleBtn = document.getElementById('toggle-mindmap-view-btn');
    const iframeWrap = document.getElementById('mindmap-iframe-container');
    const diagramWrap = document.getElementById('mindmap-diagram-container');

    if (toggleBtn && iframeWrap && diagramWrap) {
      toggleBtn.addEventListener('click', () => {
        const isIframeVisible = iframeWrap.style.display !== 'none';
        if (isIframeVisible) {
          iframeWrap.style.display = 'none';
          diagramWrap.style.display = 'block';
          toggleBtn.textContent = 'Switch to Interactive MindMeister Embed';
        } else {
          iframeWrap.style.display = 'block';
          diagramWrap.style.display = 'none';
          toggleBtn.textContent = 'Switch to High-Res Local Architecture Diagram';
        }
      });
    }
  }

  // -------------------------------------------------------------------------
  // 14. MERMAID DIAGRAM RENDERING & INTERACTIVE ENGINE
  // -------------------------------------------------------------------------
  let activeModalMermaidSource = '';

  function escapeHtmlLocal(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function initMermaidDiagrams() {
    if (typeof mermaid === 'undefined') {
      console.warn('[MERMAID] Library not loaded. Diagrams will remain as source.');
      return;
    }

    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const isDark = currentTheme === 'dark';

    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'loose',
        fontFamily: 'Outfit, Inter, system-ui, -apple-system, sans-serif',
        flowchart: {
          curve: 'basis',
          htmlLabels: true,
          padding: 18,
          nodeSpacing: 45,
          rankSpacing: 45,
          useMaxWidth: true
        },
        themeVariables: isDark ? {
          darkMode: true,
          fontFamily: 'Outfit, Inter, system-ui, sans-serif',
          fontSize: '13px',
          background: 'transparent',
          mainBkg: '#1e293b',
          nodeBorder: '#38bdf8',
          nodeTextColor: '#f8fafc',
          primaryColor: '#0f766e',
          primaryTextColor: '#f8fafc',
          primaryBorderColor: '#14b8a6',
          lineColor: '#94a3b8',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          clusterBkg: '#0f172a88',
          clusterBorder: '#334155',
          titleColor: '#38bdf8',
          edgeLabelBackground: '#0f172a'
        } : {
          darkMode: false,
          fontFamily: 'Outfit, Inter, system-ui, sans-serif',
          fontSize: '13px',
          background: 'transparent',
          mainBkg: '#ffffff',
          nodeBorder: '#0284c7',
          nodeTextColor: '#0f172a',
          primaryColor: '#ecfdf5',
          primaryTextColor: '#065f46',
          primaryBorderColor: '#10b981',
          lineColor: '#64748b',
          secondaryColor: '#f8fafc',
          tertiaryColor: '#f1f5f9',
          clusterBkg: '#f8fafcbb',
          clusterBorder: '#cbd5e1',
          titleColor: '#0369a1',
          edgeLabelBackground: '#ffffff'
        }
      });
    } catch (e) {
      console.error('[MERMAID INIT ERROR]', e);
    }

    const containers = document.querySelectorAll('.mermaid-block-container');
    if (!containers.length) return;

    containers.forEach((container, idx) => {
      const viewport = container.querySelector('.mermaid-viewport');
      if (!viewport) return;

      const rawEncoded = container.getAttribute('data-diagram-raw');
      let rawCode = '';
      if (rawEncoded) {
        try {
          rawCode = decodeURIComponent(rawEncoded);
        } catch (e) {
          rawCode = '';
        }
      }

      if (!rawCode) {
        const rawEl = container.querySelector('.mermaid');
        rawCode = rawEl ? rawEl.textContent.trim() : '';
      }

      if (!rawCode) return;

      const renderId = `mermaid_svg_${idx}_${Date.now()}`;

      try {
        mermaid.render(renderId, rawCode).then(({ svg }) => {
          viewport.innerHTML = svg;
          const svgEl = viewport.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
            svgEl.setAttribute('role', 'img');
            svgEl.setAttribute('aria-label', 'Course concept diagram');
          }
        }).catch(err => {
          console.warn('[MERMAID RENDER FAIL]', err);
          viewport.innerHTML = `
            <div class="mermaid-error-fallback">
              <div class="mermaid-error-header">
                <span>⚠️ Visual Diagram Rendering Fallback</span>
              </div>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0.5rem 0;">Mermaid syntax could not be rendered dynamically. You can inspect the structural definition below:</p>
              <pre class="mermaid-source-pre"><code>${escapeHtmlLocal(rawCode)}</code></pre>
            </div>
          `;
        });
      } catch (err) {
        console.warn('[MERMAID RENDER RUNTIME FAIL]', err);
        viewport.innerHTML = `
          <div class="mermaid-error-fallback">
            <div class="mermaid-error-header">
              <span>⚠️ Visual Diagram Rendering Fallback</span>
            </div>
            <pre class="mermaid-source-pre"><code>${escapeHtmlLocal(rawCode)}</code></pre>
          </div>
        `;
      }

      // Wire Copy button
      const copyBtn = container.querySelector('.mermaid-copy-btn');
      if (copyBtn && !copyBtn.dataset.wired) {
        copyBtn.dataset.wired = 'true';
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText(rawCode).then(() => {
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Copied!</span>
            `;
            setTimeout(() => {
              copyBtn.innerHTML = originalHTML;
            }, 2000);
          }).catch(err => console.error('Failed to copy diagram code:', err));
        });
      }

      // Wire Zoom / Fullscreen Modal button
      const zoomBtn = container.querySelector('.mermaid-zoom-btn');
      if (zoomBtn && !zoomBtn.dataset.wired) {
        zoomBtn.dataset.wired = 'true';
        zoomBtn.addEventListener('click', () => {
          openMermaidModal(viewport, rawCode);
        });
      }
    });

    initMermaidModalGlobal();
  }

  function openMermaidModal(viewport, rawCode) {
    const modal = document.getElementById('mermaid-modal');
    const content = document.getElementById('mermaid-modal-content');
    if (!modal || !content) return;

    activeModalMermaidSource = rawCode;
    content.innerHTML = viewport.innerHTML;

    const modalSvg = content.querySelector('svg');
    if (modalSvg) {
      modalSvg.style.maxWidth = 'none';
      modalSvg.style.width = '100%';
      modalSvg.style.height = 'auto';
    }

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeMermaidModal() {
    const modal = document.getElementById('mermaid-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  let mermaidModalWired = false;
  function initMermaidModalGlobal() {
    if (mermaidModalWired) return;
    mermaidModalWired = true;

    const modal = document.getElementById('mermaid-modal');
    const closeBtn = document.getElementById('mermaid-modal-close-btn');
    const copyBtn = document.getElementById('mermaid-modal-copy-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMermaidModal);
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeMermaidModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMermaidModal();
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (!activeModalMermaidSource) return;
        navigator.clipboard.writeText(activeModalMermaidSource).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = `<span>Copied!</span>`;
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
          }, 2000);
        });
      });
    }
  }

  // -------------------------------------------------------------------------
  // 15. INITIALIZATION
  // -------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    recordPageVisit();
    syncProgressUI();
    initCopyButtons();
    initFlashcards();
    initQuizzes();
    initSearchModal();
    initModuleAccordions();
    initMobileMenu();
    initResetProgress();
    initPageActions();
    initVideoChapters();
    initStudyPlanner();
    initDatasetFilters();
    initMindmapToggles();
    initMermaidDiagrams();
  });

})();

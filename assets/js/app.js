// Vibe Master Academy — interactive portal JS
// Nav highlight + progress + checklist + tooltips + copy + section tracking

(function () {
  'use strict';

  // === Glossary terms (for tooltips) ===
  // The canonical glossary is glossary.html. This dictionary mirrors essential terms
  // for inline tooltips. When a tooltip is shown, it includes a link to the full entry.
  const GLOSSARY = {
    'python': {
      title: 'Python',
      definition: 'שפת תכנות פופולרית, פשוטה לקריאה. ה-DSL הלא-רשמי של AI ו-data.'
    },
    'n8n': {
      title: 'n8n',
      definition: 'פלטפורמה ויזואלית לבניית workflows. מתחבר לכל API בעולם בגרירה ושחרור.'
    },
    'api': {
      title: 'API',
      definition: '"דלת" שתוכנה אחת פותחת בשבילך כדי שתוכנה אחרת תוכל לבקש ממנה דברים.'
    },
    'json': {
      title: 'JSON',
      definition: 'פורמט טקסט מובנה לחילופי מידע בין מערכות. כל ה-APIs כמעט מדברים JSON.'
    },
    'git': {
      title: 'Git',
      definition: 'מערכת ניהול גרסאות. שומרת היסטוריה של כל שינוי, ומסנכרנת בין מחשבים.'
    },
    'github': {
      title: 'GitHub',
      definition: 'שרת ענן לאחסון repositories. גם נותן GitHub Pages — אירוח חינמי לאתרים.'
    },
    'homebrew': {
      title: 'Homebrew (brew)',
      definition: 'מנהל החבילות של macOS. מתקין כלי פיתוח עם פקודה אחת: brew install.'
    },
    'terminal': {
      title: 'Terminal',
      definition: 'אפליקציית שורת פקודה במאק. שם אתה מקליד פקודות ישירות למחשב.'
    },
    'vscode': {
      title: 'VS Code',
      definition: 'עורך קוד חינמי של מיקרוסופט. הסטנדרט בתעשייה. תומך ב-Python דרך extension.'
    },
    'extension': {
      title: 'Extension',
      definition: 'תוסף שמוסיף יכולות לעורך הקוד. למשל extension של Python מוסיף ניתוח קוד והרצה.'
    },
    'script': {
      title: 'Script',
      definition: 'קובץ קוד שמכיל הוראות, מסתיים ב-.py עבור Python. מריצים אותו עם python3 filename.py.'
    },
    'variable': {
      title: 'משתנה (Variable)',
      definition: '"תיבה" שמכילה ערך. דוגמה: name = "Shai" יוצר משתנה בשם name שמכיל את הטקסט Shai.'
    },
    'type': {
      title: 'טיפוס (Type)',
      definition: 'הסוג של ערך. str לטקסט, int למספר שלם, float למספר עם נקודה, bool ל-True/False.'
    },
    'str': {
      title: 'str (String)',
      definition: 'טיפוס של מחרוזת — טקסט. מוקף בגרשיים: "Shai" או \'Shai\'.'
    },
    'int': {
      title: 'int (Integer)',
      definition: 'טיפוס של מספר שלם, ללא נקודה עשרונית. דוגמה: 35.'
    },
    'float': {
      title: 'float',
      definition: 'טיפוס של מספר עם נקודה עשרונית. דוגמה: 3.14.'
    },
    'bool': {
      title: 'bool (Boolean)',
      definition: 'טיפוס בוליאני — True או False בלבד. למצבי כן/לא.'
    },
    'function': {
      title: 'פונקציה (Function)',
      definition: 'בלוק קוד שניתן לקרוא לו שוב ושוב. print היא פונקציה מובנית.'
    },
    'print': {
      title: 'print',
      definition: 'פונקציה מובנית של Python שמדפיסה ערך למסך. דוגמה: print("Hello").'
    },
    'input': {
      title: 'input',
      definition: 'פונקציה שמחכה שהמשתמש יקליד משהו, ומחזירה את הטקסט שהוקלד.'
    },
    'comment': {
      title: 'הערה (Comment)',
      definition: 'טקסט בקוד ש-Python מתעלם ממנו. מתחיל ב-#. לזכור מה הקוד עושה.'
    },
    'commit': {
      title: 'Commit',
      definition: 'פעולה ב-Git שמתעדת שמירה של שינויים עם תיאור. כמו save עם רישום היסטוריה.'
    },
    'push': {
      title: 'Push',
      definition: 'פעולה ב-Git ששולחת commits מקומיים ל-GitHub כדי שיהיו נגישים ממחשבים אחרים.'
    }
  };

  // === Highlight current nav item ===
  function highlightNav() {
    const links = document.querySelectorAll('.site-nav a');
    const path = window.location.pathname;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (path.endsWith(href) || (href === '/' && path === '/'))) {
        link.classList.add('active');
      }
    });
  }

  // === Progress bar fill ===
  function fillProgress() {
    const bars = document.querySelectorAll('.progress__fill');
    bars.forEach(bar => {
      const pct = bar.dataset.pct || 0;
      bar.style.width = pct + '%';
    });
  }

  // === Checklist persistence ===
  function setupChecklist() {
    const items = document.querySelectorAll('.checklist li[data-id]');
    items.forEach(item => {
      const id = item.dataset.id;
      const key = 'vma-check-' + id;
      if (localStorage.getItem(key) === '1') {
        item.classList.add('checked');
      }
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        localStorage.setItem(key, item.classList.contains('checked') ? '1' : '0');
      });
    });
  }

  // === Tooltips on .term elements ===
  let tooltipEl = null;
  let activeTermEl = null;

  function showTooltip(termEl) {
    const termId = termEl.dataset.termId;
    const entry = GLOSSARY[termId];
    if (!entry) return;

    hideTooltip();

    tooltipEl = document.createElement('div');
    tooltipEl.className = 'tooltip';
    tooltipEl.innerHTML = `
      <div class="tooltip__title">${entry.title}</div>
      <div class="tooltip__body">${entry.definition}</div>
      <a class="tooltip__link" href="/vibe-master-academy/glossary.html#${termId}">למילון המלא →</a>
    `;
    document.body.appendChild(tooltipEl);

    const rect = termEl.getBoundingClientRect();
    const top = window.scrollY + rect.bottom + 8;
    const left = window.scrollX + rect.left;
    tooltipEl.style.top = top + 'px';
    tooltipEl.style.left = Math.max(8, Math.min(left, window.innerWidth - 296)) + 'px';

    activeTermEl = termEl;
  }

  function hideTooltip() {
    if (tooltipEl) {
      tooltipEl.remove();
      tooltipEl = null;
      activeTermEl = null;
    }
  }

  function setupTooltips() {
    const terms = document.querySelectorAll('.term[data-term-id]');
    terms.forEach(termEl => {
      termEl.addEventListener('mouseenter', () => showTooltip(termEl));
      termEl.addEventListener('mouseleave', (e) => {
        // Allow moving into tooltip without closing
        setTimeout(() => {
          if (tooltipEl && tooltipEl.matches(':hover')) return;
          hideTooltip();
        }, 100);
      });
      termEl.addEventListener('click', (e) => {
        e.preventDefault();
        if (activeTermEl === termEl) {
          hideTooltip();
        } else {
          showTooltip(termEl);
        }
      });
    });

    // Click outside closes tooltip
    document.addEventListener('click', (e) => {
      if (tooltipEl && !tooltipEl.contains(e.target) && !e.target.matches('.term')) {
        hideTooltip();
      }
    });
  }

  // === Copy code blocks ===
  function setupCopyButtons() {
    const buttons = document.querySelectorAll('.code-block__copy');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const block = btn.closest('.code-block');
        const code = block.querySelector('pre code') || block.querySelector('pre');
        if (!code) return;
        const text = code.textContent;
        navigator.clipboard.writeText(text).then(() => {
          const oldText = btn.textContent;
          btn.textContent = 'הועתק ✓';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = oldText;
            btn.classList.remove('copied');
          }, 1500);
        }).catch(() => {
          btn.textContent = 'שגיאה';
        });
      });
    });
  }

  // === Section complete tracking ===
  function setupSectionComplete() {
    const buttons = document.querySelectorAll('.section-complete-btn[data-section]');
    buttons.forEach(btn => {
      const sectionId = btn.dataset.section;
      const key = 'vma-section-' + sectionId;
      if (localStorage.getItem(key) === '1') {
        btn.classList.add('completed');
        btn.textContent = 'הושלם ✓';
        updateTocCompletion(sectionId);
      }
      btn.addEventListener('click', () => {
        const isCompleted = btn.classList.toggle('completed');
        localStorage.setItem(key, isCompleted ? '1' : '0');
        btn.textContent = isCompleted ? 'הושלם ✓' : btn.dataset.originalLabel || 'סיימתי חלק זה';
        if (isCompleted) updateTocCompletion(sectionId);
        else removeTocCompletion(sectionId);
      });
      // Store original label
      btn.dataset.originalLabel = btn.textContent;
    });
  }

  function updateTocCompletion(sectionId) {
    const tocItem = document.querySelector(`.lesson-toc__item[href="#${sectionId}"]`);
    if (tocItem) tocItem.classList.add('completed');
  }

  function removeTocCompletion(sectionId) {
    const tocItem = document.querySelector(`.lesson-toc__item[href="#${sectionId}"]`);
    if (tocItem) tocItem.classList.remove('completed');
  }

  // === Active TOC on scroll ===
  function setupActiveToc() {
    const sections = document.querySelectorAll('.lesson-section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.lesson-toc__item').forEach(item => {
            item.classList.toggle('active', item.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -50% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  // === Reading progress bar ===
  function setupReadingProgress() {
    const bar = document.querySelector('.reading-progress__fill');
    if (!bar) return;
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
      bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }

  // === Back to top button ===
  function setupBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'חזרה למעלה');
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleVisibility = () => {
      if (window.scrollY > 600) btn.classList.add('visible');
      else btn.classList.remove('visible');
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
  }

  // === Mobile menu (hamburger) ===
  function setupMobileMenu() {
    const header = document.querySelector('.site-header__inner');
    if (!header) return;

    const nav = header.querySelector('.site-nav');
    if (!nav) return;

    const toggle = document.createElement('button');
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'תפריט');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'site-nav');
    toggle.innerHTML = '<span class="menu-toggle__icon"></span>';
    header.appendChild(toggle);

    nav.id = 'site-nav';

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // === Init ===
  document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    fillProgress();
    setupChecklist();
    setupTooltips();
    setupCopyButtons();
    setupSectionComplete();
    setupActiveToc();
    setupReadingProgress();
    setupBackToTop();
    setupMobileMenu();
  });
})();

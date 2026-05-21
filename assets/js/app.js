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
    },
    'list': {
      title: 'List (רשימה)',
      definition: 'אוסף סדור של ערכים, בסוגריים מרובעים. דוגמה: clients = ["מנגו", "סופר ביץ\'"]. ניגשים לפי אינדקס.'
    },
    'dict': {
      title: 'Dict (מילון)',
      definition: 'אוסף של זוגות key-value, בסוגריים מסולסלים. דוגמה: {"name": "מנגו", "traffic": 45000}.'
    },
    'loop': {
      title: 'Loop (לולאה)',
      definition: 'חזרה על קוד מספר פעמים. ב-Python: for item in list: רץ פעם אחת על כל איבר.'
    },
    'index': {
      title: 'Index (אינדקס)',
      definition: 'המספר הסידורי של איבר ברשימה. Python מתחיל מ-0: list[0] הוא הראשון.'
    },
    'key': {
      title: 'Key (מפתח)',
      definition: 'השם של ערך בdict. ב-{"name": "מנגו"} — name הוא הkey, "מנגו" הוא הvalue.'
    },
    'http': {
      title: 'HTTP',
      definition: 'השפה בה דפדפנים ושרתים מדברים. כל קריאה ל-API היא HTTP request.'
    },
    'request': {
      title: 'Request (בקשה)',
      definition: 'הצד שאתה שולח. כולל method (GET/POST), URL, headers, ולפעמים body.'
    },
    'response': {
      title: 'Response (תגובה)',
      definition: 'מה ש-API מחזיר. כולל status code, headers, ו-body (בדרך כלל JSON).'
    },
    'status-code': {
      title: 'Status Code',
      definition: 'מספר תלת-ספרתי שמתאר מה קרה. 200 = הצלחה, 404 = לא נמצא, 500 = שגיאת שרת.'
    },
    'header': {
      title: 'Header',
      definition: 'מידע נוסף שנשלח עם בקשה. Authorization נושא את מפתח ה-API, Content-Type מסביר את הפורמט.'
    },
    'exception': {
      title: 'Exception (חריגה)',
      definition: 'שגיאה בזמן ריצה. ב-Python מטפלים בה עם try/except.'
    },
    'try-except': {
      title: 'try / except',
      definition: 'בלוק קוד שתופס שגיאות. הקוד ב-try רץ; אם יש שגיאה — except מטפל במקום לקרוס.'
    },
    'pip': {
      title: 'pip',
      definition: 'מנהל החבילות של Python. pip install requests מתקין ספרייה.'
    },
    'library': {
      title: 'Library (ספרייה)',
      definition: 'אוסף קוד מוכן. במקום לכתוב מאפס, מייבאים ספרייה ומשתמשים בפונקציות שלה.'
    },
    'branch': {
      title: 'Branch (ענף)',
      definition: 'גרסה מקבילה של הקוד. main הוא הענף הראשי. עובדים על ענף נפרד ואז ממזגים.'
    },
    'pull-request': {
      title: 'Pull Request (PR)',
      definition: 'בקשה למזג ענף לתוך main. גם המקום ל-code review לפני המיזוג.'
    },
    'workflow': {
      title: 'Workflow',
      definition: 'זרימת עבודה אוטומטית ב-n8n. סדרה של nodes (צעדים) מחוברים בחיצים. רץ כשטריגר מופעל.'
    },
    'node': {
      title: 'Node',
      definition: 'צעד יחיד ב-workflow. כל node עושה דבר אחד: HTTP, פילטור, שליחת מייל, וכו\'.'
    },
    'trigger': {
      title: 'Trigger (טריגר)',
      definition: 'ה-node הראשון. מפעיל את ה-workflow — Webhook, Cron, או Manual.'
    },
    'webhook': {
      title: 'Webhook',
      definition: 'URL ש-n8n מספק. כל קריאת HTTP אליו מפעילה את ה-workflow ומעבירה לו נתונים.'
    },
    'credential': {
      title: 'Credential (פרטי גישה)',
      definition: 'פרטי התחברות מוצפנים לשירות חיצוני. מאוחסנים מוצפנים ב-n8n.'
    },
    'cron': {
      title: 'Cron',
      definition: 'תזמון לרצות אוטומטית בזמנים קבועים. בn8n זה ה-Schedule Trigger.'
    },
    'zapier': {
      title: 'Zapier',
      definition: 'מתחרה של n8n. SaaS בלבד, קל יותר לnon-devs, יקר יותר, פחות גמיש.'
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

  // === Glossary search + filter ===
  function setupGlossary() {
    const searchInput = document.querySelector('.glossary-search__input');
    const countEl = document.querySelector('.glossary-search__count');
    const filterButtons = document.querySelectorAll('.glossary-filter');
    const terms = document.querySelectorAll('.glossary-grid .term');
    const emptyState = document.querySelector('.glossary-empty');
    if (!terms.length) return;

    let activeCategory = 'all';
    let query = '';

    const apply = () => {
      let visible = 0;
      terms.forEach(term => {
        const cat = term.dataset.category || '';
        const text = (term.textContent || '').toLowerCase();
        const matchCat = activeCategory === 'all' || cat === activeCategory;
        const matchText = !query || text.includes(query);
        const show = matchCat && matchText;
        term.classList.toggle('hidden', !show);
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible + ' מושגים';
      if (emptyState) emptyState.style.display = visible === 0 ? 'block' : 'none';
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        query = e.target.value.toLowerCase().trim();
        apply();
      });
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.dataset.category;
        apply();
      });
    });

    apply();
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
    setupGlossary();
  });
})();

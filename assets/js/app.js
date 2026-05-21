// Vibe Master Academy — minimal JS for nav highlighting + progress sync

(function () {
  'use strict';

  // Highlight current nav item based on URL
  function highlightNav() {
    const links = document.querySelectorAll('.site-nav a');
    const path = window.location.pathname;
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (path.endsWith(href) || (href === '/' && path === '/')) {
        link.classList.add('active');
      }
    });
  }

  // Progress bar fill (data-driven from data attribute)
  function fillProgress() {
    const bars = document.querySelectorAll('.progress__fill');
    bars.forEach(bar => {
      const pct = bar.dataset.pct || 0;
      bar.style.width = pct + '%';
    });
  }

  // Checklist persistence via localStorage
  function setupChecklist() {
    const items = document.querySelectorAll('.checklist li[data-id]');
    items.forEach(item => {
      const id = item.dataset.id;
      const storageKey = 'vma-check-' + id;
      if (localStorage.getItem(storageKey) === '1') {
        item.classList.add('checked');
      }
      item.addEventListener('click', () => {
        item.classList.toggle('checked');
        localStorage.setItem(
          storageKey,
          item.classList.contains('checked') ? '1' : '0'
        );
      });
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    highlightNav();
    fillProgress();
    setupChecklist();
  });
})();

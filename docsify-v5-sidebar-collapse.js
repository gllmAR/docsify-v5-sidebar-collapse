/*
 * docsify-sidebar-collapse (Docsify v5)
 * ---------------------------------
 * Drop‑in Docsify plugin that turns the default flat sidebar into a
 * collapsible tree. All folders are collapsed by default.
 *
 * Optional per‑site overrides can be set from `window.$docsify.sidebarCollapse`:
 *   {
 *     openLevel     : 1,      // auto‑expand headings ≤ this depth (default 1)
 *     persist       : true,   // remember open branches in sessionStorage
 *     scrollIntoView: true    // keep the active link centred
 *   }
 */

const CSS = `
.sidebar-nav li > ul {
  display: none;
  margin-left: .75em;
}
.sidebar-nav li.open > ul {
  display: block;
}
.sidebar-nav li.folder > a::before {
  content: '\\25B8'; /* ▸ */
  display: inline-block;
  margin-right: .25em;
  transition: transform .2s ease;
  cursor: pointer;
}
.sidebar-nav li.open.folder > a::before {
  transform: rotate(90deg);
}
.sidebar-nav li.folder > a {
  cursor: pointer;
}
`;

/** Inject a <style> once */
function injectStyle() {
  if (document.getElementById('dsc-style')) return;
  const style = document.createElement('style');
  style.id = 'dsc-style';
  style.textContent = CSS;
  document.head.appendChild(style);
}

function getOpts() {
  const d = (window.$docsify = window.$docsify || {});
  const user = d.sidebarCollapse || {};
  return {
    openLevel: 1,
    persist: true,
    scrollIntoView: true,
    ...user,
  };
}

/** Expand ancestors and (optionally) all nodes ≤ opts.openLevel */
function openToActive(opts) {
  const active = document.querySelector('.sidebar-nav .active');
  if (!active) return;
  
  let li = active.closest('li');
  while (li) {
    li.classList.add('open');
    if (opts.persist) li.dataset.opened = '1';
    li = li.parentElement.closest('li');
  }
  
  if (opts.scrollIntoView) {
    active.scrollIntoView({ block: 'center' });
  }
}

function restoreState() {
  document
    .querySelectorAll('.sidebar-nav li[data-opened="1"]')
    .forEach((li) => li.classList.add('open'));
}

function saveState() {
  const opened = Array.from(
    document.querySelectorAll('.sidebar-nav li.open')
  ).map((li) => li.dataset.path);
  sessionStorage.setItem('dsc-open', JSON.stringify(opened));
}

function applyPersistAttr() {
  const stored = JSON.parse(sessionStorage.getItem('dsc-open') || '[]');
  stored.forEach((path) => {
    const li = document.querySelector(`.sidebar-nav li[data-path="${path}"]`);
    if (li) li.dataset.opened = '1';
  });
}

function enhanceSidebar(hook, vm) {
  const opts = getOpts();
  injectStyle();

  // Rebuild each time Docsify renders the sidebar (after route change)
  hook.doneEach(() => {
    const root = document.querySelector('.sidebar-nav');
    if (!root) return;

    // Mark folders vs. leaf nodes and stash path
    root.querySelectorAll('li').forEach((li) => {
      const hasChildren = li.querySelector('ul');
      li.classList.toggle('folder', !!hasChildren);
      if (!li.dataset.path) {
        const a = li.querySelector('a');
        if (a) li.dataset.path = a.getAttribute('href');
      }
    });

    if (opts.persist) applyPersistAttr();
    openToActive(opts);
  });

  // Toggle on click (use event delegation)
  hook.ready(() => {
    const nav = document.querySelector('.sidebar-nav');
    if (!nav) return;
    
    nav.addEventListener('click', (ev) => {
      const link = ev.target.closest('a');
      if (!link) return;
      
      const li = link.parentElement;
      if (!li.classList.contains('folder')) return;
      
      // Prevent navigation for folder links
      ev.preventDefault();
      ev.stopPropagation();
      
      li.classList.toggle('open');
      if (opts.persist) {
        li.dataset.opened = li.classList.contains('open') ? '1' : '0';
        saveState();
      }
    });
  });
}

// Self‑register when imported as a side‑effect
if (typeof window !== 'undefined') {
  window.$docsify = window.$docsify || {};
  (window.$docsify.plugins = window.$docsify.plugins || []).push(enhanceSidebar);
}

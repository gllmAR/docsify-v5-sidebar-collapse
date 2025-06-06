/*
 * Docsify v5 Sidebar Collapse Plugin
 * ==================================
 * 
 * A modern, lightweight plugin that transforms Docsify's flat sidebar
 * into a collapsible tree navigation with smart auto-expansion.
 * 
 * Features:
 * - Collapsible navigation folders
 * - Auto-expansion to show current page location
 * - Persistent state across sessions
 * - Configurable depth levels
 * - Smooth animations
 * 
 * Usage:
 *   <script src="./docsify-v5-sidebar-collapse.js"></script>
 * 
 * Configuration (optional):
 *   window.$docsify.sidebarCollapse = {
 *     openLevel: 2,           // Auto-expand folders ≤ this depth
 *     persist: true,          // Remember state in sessionStorage
 *     scrollIntoView: true    // Scroll active item into view
 *   }
 * 
 * @version 1.0.0
 * @author Your Name
 * @license MIT
 */

/**
 * CSS styles for the sidebar collapse functionality
 * Creates visual indicators and controls visibility of nested elements
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
  padding: 2px;
  margin-left: -2px;
}
.sidebar-nav li.open.folder > a::before {
  transform: rotate(90deg);
}
.sidebar-nav li.folder > a {
  cursor: pointer;
}
`;

/**
 * Inject CSS styles into the document head
 * Only injects once, even if called multiple times
 */
function injectStyle() {
  if (document.getElementById('dsc-style')) return;
  const style = document.createElement('style');
  style.id = 'dsc-style';
  style.textContent = CSS;
  document.head.appendChild(style);
}

/**
 * Get configuration options from Docsify config
 * Merges user options with sensible defaults
 * @returns {Object} Configuration object
 */
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

/**
 * Expand ancestors to show current page location and auto-expand by openLevel
 * This ensures users can see where they are in the navigation hierarchy
 * @param {Object} opts - Configuration options
 */
function openToActive(opts) {
  const active = document.querySelector('.sidebar-nav .active');
  
  // First, expand all ancestors of the active page to show where user is
  if (active) {
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
  
  // Then, auto-expand folders based on openLevel setting
  if (opts.openLevel > 0) {
    expandByLevel(opts.openLevel, opts.persist);
  }
}

/**
 * Auto-expand folders up to a certain depth level
 * @param {number} maxLevel - Maximum depth to auto-expand
 * @param {boolean} persist - Whether to save state to sessionStorage
 */
function expandByLevel(maxLevel, persist = false) {
  const root = document.querySelector('.sidebar-nav');
  if (!root) return;
  
  function getDepth(li) {
    let depth = 0;
    let parent = li.parentElement;
    while (parent && parent !== root) {
      if (parent.tagName === 'UL') depth++;
      parent = parent.parentElement;
    }
    return depth;
  }
  
  root.querySelectorAll('li.folder').forEach((li) => {
    const depth = getDepth(li);
    if (depth < maxLevel) {
      li.classList.add('open');
      if (persist) li.dataset.opened = '1';
    }
  });
}

/**
 * Restore previously saved expand/collapse state from sessionStorage
 */
function restoreState() {
  document
    .querySelectorAll('.sidebar-nav li[data-opened="1"]')
    .forEach((li) => li.classList.add('open'));
}

/**
 * Save current expand/collapse state to sessionStorage
 */
function saveState() {
  const opened = Array.from(
    document.querySelectorAll('.sidebar-nav li.open')
  ).map((li) => li.dataset.path);
  sessionStorage.setItem('dsc-open', JSON.stringify(opened));
}

/**
 * Apply stored state attributes to sidebar elements
 */
function applyPersistAttr() {
  const stored = JSON.parse(sessionStorage.getItem('dsc-open') || '[]');
  stored.forEach((path) => {
    const li = document.querySelector(`.sidebar-nav li[data-path="${path}"]`);
    if (li) li.dataset.opened = '1';
  });
}

/**
 * Main function that enhances the sidebar with collapse functionality
 * @param {Object} hook - Docsify hook object
 * @param {Object} vm - Docsify VM instance
 */
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
      
      // Ensure all folders start collapsed (except those that will be opened)
      if (hasChildren) {
        li.classList.remove('open');
      }
    });

    // Apply persistence state first
    if (opts.persist) applyPersistAttr();
    
    // Then expand to show current location and apply openLevel
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
      
      // Check if click was on the triangle (::before pseudo-element)
      // We detect this by checking if the click was in the left margin area
      const rect = link.getBoundingClientRect();
      const clickX = ev.clientX - rect.left;
      
      // If clicked on triangle area (first ~20px), toggle folder
      if (clickX <= 20) {
        ev.preventDefault();
        ev.stopPropagation();
        
        li.classList.toggle('open');
        if (opts.persist) {
          li.dataset.opened = li.classList.contains('open') ? '1' : '0';
          saveState();
        }
      }
      // Otherwise, let the link navigate normally
    });
  });
}

// Self-register when imported as a side-effect
if (typeof window !== 'undefined') {
  window.$docsify = window.$docsify || {};
  (window.$docsify.plugins = window.$docsify.plugins || []).push(enhanceSidebar);
}

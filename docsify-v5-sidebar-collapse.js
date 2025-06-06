// docsify-v5-sidebar-collapse.js
// Docsify v5 plugin to enable collapsible sidebar sections
(function () {
  if (!window.Docsify) return;

  function toggleSection(event) {
    const header = event.target.closest('.sidebar-nav .app-sub-sidebar > p, .sidebar-nav > ul > li > p');
    if (!header) return;
    header.classList.toggle('collapsed');
    const next = header.nextElementSibling;
    if (next && next.tagName === 'UL') {
      next.style.display = next.style.display === 'none' ? '' : 'none';
    }
  }

  function collapseAll() {
    document.querySelectorAll('.sidebar-nav .app-sub-sidebar > ul, .sidebar-nav > ul > li > ul').forEach(function (ul) {
      ul.style.display = 'none';
    });
    document.querySelectorAll('.sidebar-nav .app-sub-sidebar > p, .sidebar-nav > ul > li > p').forEach(function (p) {
      p.classList.add('collapsed');
    });
  }

  function expandActiveAndTOC() {
    var active = document.querySelector('.sidebar-nav .active');
    while (active) {
      if (active.tagName === 'UL') {
        active.style.display = '';
      }
      if (active.previousElementSibling && active.previousElementSibling.tagName === 'P') {
        active.previousElementSibling.classList.remove('collapsed');
      }
      // If this is the active LI, expand its sub-UL (TOC)
      if (active.tagName === 'LI') {
        var subUL = active.querySelector('ul');
        if (subUL) {
          subUL.style.display = '';
        }
      }
      active = active.parentElement;
      if (active && active.classList.contains('sidebar-nav')) break;
    }
  }

  function addListeners() {
    document.querySelectorAll('.sidebar-nav .app-sub-sidebar > p, .sidebar-nav > ul > li > p').forEach(function (p) {
      p.style.cursor = 'pointer';
      p.addEventListener('click', toggleSection);
    });
  }

  function style() {
    var css = '.sidebar-nav p.collapsed:after { content: " ▶"; } .sidebar-nav p:not(.collapsed):after { content: " ▼"; }';
    var style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  window.$docsify = window.$docsify || {};
  var userHook = window.$docsify.sidebarCollapseHook;

  window.$docsify.plugins = [].concat(function (hook, vm) {
    hook.doneEach(function () {
      collapseAll();
      expandActiveAndTOC();
      addListeners();
      style();
      if (typeof userHook === 'function') userHook();
    });
  }, window.$docsify.plugins || []);
})();

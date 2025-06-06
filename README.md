# docsify-v5-sidebar-collapse

A Docsify v5 plugin to enable collapsible sidebar sections.

## Installation

1. Download or copy `docsify-v5-sidebar-collapse.js` into your project folder.
2. Add the following script tag to your `index.html` after loading Docsify:

```html
<script src="./docsify-v5-sidebar-collapse.js"></script>
```

## Usage

- By default, all sidebar sections will be collapsed.
- Clicking on a sidebar section header will expand/collapse its content.
- The active section will be expanded automatically.

## Configuration (optional)

You can add a custom hook by defining `window.$docsify.sidebarCollapseHook` before Docsify initialization:

```js
window.$docsify = {
  // ...other config
  sidebarCollapseHook: function () {
    // Custom code after sidebar collapse runs
  }
};
```

## Demo

Open `index.html` in your browser to see the plugin in action.

## License

MIT

# Godot+Docsify

Welcome to the test environment for the Docsify v5 Sidebar Collapse plugin!

- Use the sidebar to navigate and test collapsible folders.
- Try expanding/collapsing all levels.
- Check persistence and scroll-into-view features.

---


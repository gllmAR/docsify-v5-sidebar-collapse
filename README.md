# Docsify v5 Sidebar Collapse Plugin

Transform your Docsify sidebar into a collapsible tree navigation with smart auto-expansion to current page location.

## Features

- Collapsible sidebar sections with smooth animations
- Auto-expands to current page location on load
- Persistent state across page navigation
- Visual indicators (▸/▾ arrows)
- Zero dependencies, Docsify v5 compatible

## Installation

1. Download `docsify-v5-sidebar-collapse.js`
2. Add to your `index.html`:

```html
<script src="./docsify-v5-sidebar-collapse.js"></script>
```

## Setup

1. **Enable sidebar in Docsify**:
```javascript
window.$docsify = {
  loadSidebar: true,
  subMaxLevel: 3,
  // Plugin configuration (optional)
  sidebarCollapse: {
    autoExpand: true,
    maxDepth: 10
  }
};
```

2. **Create `_sidebar.md`**:
```markdown
* [Home](/)
* [Getting Started](/getting-started/)
  * [Installation](/getting-started/installation.md)
  * [Configuration](/getting-started/configuration.md)
* [Advanced](/advanced/)
  * [API Reference](/advanced/api.md)
```
    * [Advanced Example](/advanced/examples/advanced.md)
```

3. **Add the plugin script** and you're done!

## Configuration

Add optional settings to your Docsify config:

```javascript
window.$docsify = {
  sidebarCollapse: {
    autoExpand: true,    // Auto-expand to current page (default: true)
    maxDepth: 10,        // Max depth to expand (default: 10)
    persist: true        // Remember state (default: true)
  }
};
```

## How It Works

- Sections are collapsed by default
- Automatically expands path to current page
- Click folder names to toggle expand/collapse
- State persists across page navigation
- Visual arrows show expand/collapse state
/* Customize folder icons */
.sidebar-nav li.folder > a::before {
  content: '📁'; /* Use emoji instead of arrows */
}

.sidebar-nav li.open.folder > a::before {
  content: '📂';
}

## Custom Styling

Override default styles as needed:

```css
.sidebar-nav .folder-toggle {
  color: #42b983; /* Custom arrow color */
}

.sidebar-nav li > ul {
  margin-left: 1em; /* Adjust indentation */
}
```

## Troubleshooting

**Sidebar not appearing?**
- Set `loadSidebar: true` in Docsify config
- Ensure `_sidebar.md` exists

**Plugin not working?**
- Check console for errors
- Verify Docsify v5.x compatibility
- Load plugin after Docsify core script

## License

MIT License - see [LICENSE](LICENSE) file for details.


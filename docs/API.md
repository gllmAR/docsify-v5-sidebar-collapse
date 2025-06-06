# API Reference

## Configuration

```javascript
window.$docsify = {
  sidebarCollapse: {
    autoExpand: true,    // Auto-expand to current page (default: true)
    maxDepth: 10,        // Max depth to expand (default: 10)
    persist: true        // Remember state (default: true)
  }
};
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `autoExpand` | boolean | `true` | Auto-expand path to current page |
| `maxDepth` | number | `10` | Maximum depth to auto-expand |
| `persist` | boolean | `true` | Remember state in sessionStorage |

## CSS Classes

- `.folder-toggle` - Toggle arrows (▸/▾)
- `.sidebar-nav li.folder` - Folders with children
- `.sidebar-nav li.open` - Expanded folders
- `.sidebar-nav li > ul` - Nested lists (hidden by default)
- `.sidebar-nav li.open > ul` - Visible nested lists

### enhanceSidebar(hook, vm)
Main plugin function that enhances the sidebar with collapse functionality.

**Parameters:**
- `hook` - Docsify hook object
- `vm` - Docsify VM instance

### openToActive(opts)
Expands ancestors to show current page location and applies auto-expansion rules.

**Parameters:**
- `opts` - Configuration options object

### expandByLevel(maxLevel, persist)
Auto-expands folders up to a certain depth level.

**Parameters:**
- `maxLevel` - Maximum depth to auto-expand
- `persist` - Whether to save state to sessionStorage

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

# Troubleshooting Guide

## Common Issues

### Sidebar Not Appearing

**Problem**: The sidebar doesn't show up at all.

**Solutions**:
1. Ensure `loadSidebar: true` is set in your Docsify config
2. Check that `_sidebar.md` exists in your project root
3. Verify the sidebar file uses proper markdown list syntax
4. Make sure you're serving the files through HTTP(S), not file://

**Example of correct Docsify config**:
```javascript
window.$docsify = {
  loadSidebar: true,  // This is required!
  // ... other config
};
```

### Collapse Functionality Not Working

**Problem**: The sidebar appears but items don't collapse/expand when clicked.

**Solutions**:
1. Check browser console for JavaScript errors
2. Ensure you're using Docsify v5.x (plugin is not compatible with v4.x)
3. Verify the plugin script loads after Docsify core
4. Make sure there are no JavaScript conflicts with other plugins

**Check loading order**:
```html
<!-- Correct order -->
<script src="//cdn.jsdelivr.net/npm/docsify@5/lib/docsify.min.js"></script>
<script src="./docsify-v5-sidebar-collapse.js"></script>
```

### State Not Persisting

**Problem**: Expanded/collapsed state doesn't persist between page loads.

**Solutions**:
1. Check if `persist: true` is set in configuration
2. Verify sessionStorage is enabled in your browser
3. Clear browser storage and try again
4. Check for privacy/incognito mode which may block storage

**Configuration check**:
```javascript
window.$docsify = {
  sidebarCollapse: {
    persist: true  // Enable persistence
  }
};
```

### Icons Not Showing

**Problem**: The expand/collapse arrows don't appear.

**Solutions**:
1. Check if CSS is being overridden by your theme
2. Verify the plugin's CSS is loading
3. Try adding custom CSS to force the icons

**Custom CSS fix**:
```css
.sidebar-nav li.folder > a::before {
  content: '▶' !important;
  display: inline-block !important;
  margin-right: 0.25em !important;
}
```

### Deep Nesting Not Working

**Problem**: Very deep navigation levels don't collapse properly.

**Solutions**:
1. Check if your sidebar structure is too complex
2. Verify proper indentation in `_sidebar.md`
3. Consider simplifying the structure
4. Test with a smaller subset first

### Performance Issues

**Problem**: Sidebar becomes slow with many items.

**Solutions**:
1. Reduce the number of sidebar items
2. Use pagination or split content across multiple sections
3. Consider lazy loading for large documentation sites
4. Optimize your sidebar structure

## Browser-Specific Issues

### Safari Issues
- Some versions of Safari may have issues with CSS transforms
- Try disabling animations if you encounter problems
- Update to the latest Safari version

### Internet Explorer
- The plugin doesn't support Internet Explorer
- Users should upgrade to a modern browser
- Consider showing a browser upgrade notice

### Mobile Browsers
- Touch events should work correctly
- Test on actual devices, not just browser dev tools
- Consider mobile-specific styling adjustments

## Configuration Issues

### Conflicting Plugins

**Problem**: Other plugins interfere with the sidebar collapse.

**Solutions**:
1. Load the sidebar collapse plugin last
2. Check for conflicts in browser console
3. Test with minimal plugin configuration
4. Report conflicts to plugin maintainers

### Theme Compatibility

**Problem**: Your Docsify theme conflicts with the plugin.

**Solutions**:
1. Test with the default theme first
2. Add custom CSS to override theme styles
3. Check theme documentation for sidebar customization
4. Consider switching to a compatible theme

## Debugging Steps

### Step 1: Basic Verification
1. Open browser developer tools
2. Check Console tab for errors
3. Verify Docsify version is 5.x
4. Confirm plugin file loads successfully

### Step 2: Configuration Check
1. Verify `loadSidebar: true` is set
2. Check `_sidebar.md` exists and has correct syntax
3. Test with minimal configuration
4. Add console.log statements to verify options

### Step 3: CSS Inspection
1. Inspect sidebar elements in developer tools
2. Check if CSS classes are applied correctly
3. Look for conflicting styles
4. Verify plugin CSS is loaded

### Step 4: Network Analysis
1. Check Network tab for failed resource loads
2. Verify all scripts load successfully
3. Check for CORS issues
4. Ensure proper file serving

## Getting Help

### Before Reporting Issues
1. Try with a minimal reproduction case
2. Test with the latest version
3. Check existing issues on GitHub
4. Include browser/OS information

### Information to Include
- Docsify version
- Browser and version
- Complete Docsify configuration
- Sidebar structure (simplified)
- Console error messages
- Steps to reproduce

### Useful Debugging Code
```javascript
// Add this to check if plugin loaded
console.log('Docsify plugins:', window.$docsify.plugins);

// Check plugin configuration
console.log('Sidebar config:', window.$docsify.sidebarCollapse);

// Verify sidebar elements
console.log('Sidebar nav:', document.querySelector('.sidebar-nav'));
```

## Workarounds

### Temporary Fixes
If you need a quick fix while troubleshooting:

1. **Disable persistence temporarily**:
```javascript
window.$docsify = {
  sidebarCollapse: { persist: false }
};
```

2. **Use basic icons**:
```css
.sidebar-nav li.folder > a::before {
  content: '+';
}
.sidebar-nav li.open.folder > a::before {
  content: '-';
}
```

3. **Manual refresh**:
Clear browser storage and refresh the page to reset state.

### Alternative Solutions
If the plugin doesn't work for your use case:

1. Consider restructuring your documentation
2. Use Docsify's built-in features like pagination
3. Split large documentation into multiple sites
4. Use a different documentation generator if needed

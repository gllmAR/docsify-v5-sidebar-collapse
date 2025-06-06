# Examples

## Basic Setup

```javascript
window.$docsify = {
  loadSidebar: true,
  sidebarCollapse: {
    autoExpand: true,
    maxDepth: 3
  }
};
```

## Sidebar Structure

### Simple Structure
```markdown
<!-- _sidebar.md -->
* [Home](/)
* [Getting Started](/getting-started/)
  * [Installation](/getting-started/installation.md)
  * [Quick Start](/getting-started/quick-start.md)
* [API Reference](/api/)
  * [Authentication](/api/auth.md)
```

### Deep Structure
```markdown
<!-- _sidebar.md -->
* [Documentation](/docs/)
  * [Getting Started](/docs/getting-started/)
    * [Installation](/docs/getting-started/installation.md)
    * [Configuration](/docs/getting-started/configuration.md)
  * [Advanced](/docs/advanced/)
    * [Plugins](/docs/advanced/plugins/)
      * [Custom Plugins](/docs/advanced/plugins/custom.md)
```
    * [Custom Plugins](/docs/advanced/plugins/)
      * [Creating Plugins](/docs/advanced/plugins/creating.md)
      * [Plugin API](/docs/advanced/plugins/api.md)
    * [Deployment](/docs/advanced/deployment/)
      * [GitHub Pages](/docs/advanced/deployment/github-pages.md)
      * [Netlify](/docs/advanced/deployment/netlify.md)
* [Examples](/examples/)
  * [Basic Examples](/examples/basic/)
  * [Advanced Examples](/examples/advanced/)
```

## Configuration Scenarios

### Keep Everything Collapsed
```javascript
window.$docsify = {
  sidebarCollapse: {
    openLevel: 0,     // Don't auto-expand anything
    persist: false    // Start fresh each time
  }
};
```

### Auto-Expand Top Two Levels
```javascript
window.$docsify = {
  sidebarCollapse: {
    openLevel: 2,     // Auto-expand levels 1 and 2
    persist: true     // Remember user's manual expansions
  }
};
```

### Disable Persistence
```javascript
window.$docsify = {
  sidebarCollapse: {
    persist: false,   // Don't remember state
    scrollIntoView: false  // Don't auto-scroll
  }
};
```

## Custom Styling Examples

### Custom Folder Icons
```css
/* Use custom icons instead of arrows */
.sidebar-nav li.folder > a::before {
  content: '📁';
  margin-right: 0.5em;
  transition: none;
}

.sidebar-nav li.open.folder > a::before {
  content: '📂';
}
```

### Animated Icons
```css
/* Smooth rotating animation */
.sidebar-nav li.folder > a::before {
  content: '▶';
  transition: transform 0.3s ease;
  transform-origin: center;
}

.sidebar-nav li.open.folder > a::before {
  transform: rotate(90deg);
}
```

### Custom Indentation
```css
/* Increase indentation for nested items */
.sidebar-nav li > ul {
  margin-left: 1.5em;
  border-left: 1px solid #eee;
  padding-left: 0.5em;
}
```

### Hover Effects
```css
/* Add hover effects to folders */
.sidebar-nav li.folder > a:hover::before {
  color: #42b983;
}

.sidebar-nav li.folder > a:hover {
  background-color: #f8f9fa;
}
```

## Integration Examples

### With Search Plugin
```html
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
<script src="./docsify-v5-sidebar-collapse.js"></script>
```

### With Multiple Plugins
```html
<!-- Load Docsify core first -->
<script src="//cdn.jsdelivr.net/npm/docsify@5/lib/docsify.min.js"></script>

<!-- Load plugins -->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script>
<script src="./docsify-v5-sidebar-collapse.js"></script>
```

## Real-World Examples

### API Documentation Site
Perfect for large API documentation with multiple endpoints and methods:

```markdown
* [API Documentation](/api/)
  * [Authentication](/api/auth/)
    * [OAuth 2.0](/api/auth/oauth.md)
    * [API Keys](/api/auth/keys.md)
    * [JWT Tokens](/api/auth/jwt.md)
  * [User Management](/api/users/)
    * [Create User](/api/users/create.md)
    * [Update User](/api/users/update.md)
    * [Delete User](/api/users/delete.md)
  * [Project Management](/api/projects/)
    * [List Projects](/api/projects/list.md)
    * [Create Project](/api/projects/create.md)
```

### Software Documentation
Ideal for software documentation with tutorials, guides, and reference materials:

```markdown
* [Documentation](/docs/)
  * [Getting Started](/docs/getting-started/)
    * [Installation](/docs/getting-started/installation.md)
    * [Quick Start](/docs/getting-started/quick-start.md)
  * [Tutorials](/docs/tutorials/)
    * [Basic Tutorial](/docs/tutorials/basic.md)
    * [Advanced Tutorial](/docs/tutorials/advanced.md)
  * [Reference](/docs/reference/)
    * [API Reference](/docs/reference/api.md)
    * [Configuration](/docs/reference/config.md)
```

### Knowledge Base
Great for organizing help articles and guides:

```markdown
* [Help Center](/help/)
  * [Getting Started](/help/getting-started/)
  * [Account Management](/help/account/)
    * [Creating an Account](/help/account/create.md)
    * [Password Reset](/help/account/password.md)
  * [Troubleshooting](/help/troubleshooting/)
    * [Common Issues](/help/troubleshooting/common.md)
    * [Error Codes](/help/troubleshooting/errors.md)
```

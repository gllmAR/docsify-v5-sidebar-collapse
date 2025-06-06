# Contributing to Docsify v5 Sidebar Collapse Plugin

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

### Prerequisites
- Basic knowledge of JavaScript
- Familiarity with Docsify
- A modern web browser for testing

### Development Setup
1. Fork the repository
2. Clone your fork locally
3. Open `index.html` in a local web server
4. Make changes to `docsify-v5-sidebar-collapse.js`
5. Test your changes with the demo

### Local Development
```bash
# Clone the repository
git clone https://github.com/your-username/docsify-v5-sidebar-collapse.git
cd docsify-v5-sidebar-collapse

# Start a local server (choose one)
python3 -m http.server 3000
# or
npx serve .
# or
php -S localhost:3000

# Open http://localhost:3000 in your browser
```

## How to Contribute

### Reporting Bugs
1. Check existing issues first
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS information
   - Docsify version

### Suggesting Features
1. Check if the feature already exists
2. Create an issue with:
   - Clear description of the feature
   - Use case and benefits
   - Proposed implementation (if any)

### Code Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Development Guidelines

### Code Style
- Use modern JavaScript (ES6+)
- Follow existing code patterns
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions small and focused

### Testing
Before submitting changes, test:
- Basic expand/collapse functionality
- Persistence across page loads
- Different configuration options
- Various sidebar structures
- Multiple browsers

### Documentation
- Update README.md if needed
- Add examples for new features
- Update API documentation
- Include troubleshooting info

## File Structure

```
docsify-v5-sidebar-collapse/
├── docsify-v5-sidebar-collapse.js  # Main plugin file
├── index.html                      # Demo page
├── _sidebar.md                     # Demo sidebar
├── README.md                       # Main documentation
├── docs/                          # Additional documentation
│   ├── API.md                     # API reference
│   ├── EXAMPLES.md                # Usage examples
│   └── TROUBLESHOOTING.md         # Troubleshooting guide
└── various demo content files
```

## Plugin Architecture

### Core Components
1. **CSS Injection**: Adds necessary styles
2. **Configuration**: Handles user options
3. **State Management**: Persistence and restoration
4. **Event Handling**: Click events and navigation
5. **DOM Manipulation**: Adding classes and structure

### Key Functions
- `enhanceSidebar()`: Main plugin entry point
- `openToActive()`: Expands to current page
- `expandByLevel()`: Auto-expansion logic
- `getOpts()`: Configuration handling

## Testing Checklist

### Basic Functionality
- [ ] Sidebar loads correctly
- [ ] Folders collapse/expand on click
- [ ] Current page path is visible
- [ ] Visual indicators work (arrows)

### Configuration Options
- [ ] `openLevel` works correctly
- [ ] `persist` saves/restores state
- [ ] `scrollIntoView` scrolls properly

### Edge Cases
- [ ] Very deep nesting (5+ levels)
- [ ] Large number of items (100+)
- [ ] Special characters in paths
- [ ] Empty folders
- [ ] Single-item folders

### Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Integration
- [ ] Works with search plugin
- [ ] Compatible with themes
- [ ] No console errors
- [ ] Performance is acceptable

## Pull Request Guidelines

### Before Submitting
1. Ensure all tests pass
2. Update documentation
3. Add examples if needed
4. Check code style
5. Test in multiple browsers

### PR Description
Include:
- What the PR does
- Why it's needed
- How to test it
- Any breaking changes
- Screenshots if UI changes

### Review Process
1. Automated checks (if any)
2. Code review by maintainers
3. Testing feedback
4. Final approval and merge

## Code Examples

### Adding a New Feature
```javascript
// Example: Adding a new configuration option
function getOpts() {
  const d = (window.$docsify = window.$docsify || {});
  const user = d.sidebarCollapse || {};
  return {
    openLevel: 1,
    persist: true,
    scrollIntoView: true,
    newFeature: false,  // Add new option
    ...user,
  };
}
```

### Adding Event Handling
```javascript
// Example: Adding keyboard support
nav.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' || ev.key === ' ') {
    const link = ev.target.closest('a');
    if (link && link.parentElement.classList.contains('folder')) {
      ev.preventDefault();
      toggleFolder(link.parentElement);
    }
  }
});
```

## Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Steps
1. Update version in plugin header
2. Update CHANGELOG.md
3. Create release tag
4. Update documentation
5. Announce release

## Getting Help

### Discussion
- Use GitHub Discussions for questions
- Check existing issues and discussions
- Be respectful and constructive

### Contact
- GitHub Issues: Bug reports and features
- GitHub Discussions: General questions
- Email: For security issues only

## Recognition

Contributors will be:
- Listed in the README
- Credited in release notes
- Mentioned in documentation

Thank you for contributing to make this plugin better for everyone!

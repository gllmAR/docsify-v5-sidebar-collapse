# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-06-06

### Added
- Initial release of Docsify v5 Sidebar Collapse Plugin
- Collapsible navigation folders with visual indicators
- Auto-expansion to show current page location in navigation hierarchy
- Persistent state management using sessionStorage
- Configurable auto-expansion depth levels
- Smooth animations and transitions
- Event-driven folder toggle functionality
- Comprehensive documentation and examples
- API reference and troubleshooting guide
- Full JSDoc documentation in source code

### Features
- **Smart Navigation**: Automatically expands sidebar to show where the user currently is
- **Configurable Behavior**: Control auto-expansion levels, persistence, and scroll behavior
- **Visual Feedback**: Clear expand/collapse indicators with smooth animations
- **State Persistence**: Remembers user's expansion preferences across sessions
- **Zero Dependencies**: Pure JavaScript implementation, no external libraries required
- **Docsify v5 Optimized**: Built specifically for Docsify v5.x compatibility

### Configuration Options
- `openLevel`: Auto-expand folders up to specified depth (default: 1)
- `persist`: Remember expansion state in sessionStorage (default: true)
- `scrollIntoView`: Scroll active item into view (default: true)

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## [Unreleased]

### Planned Features
- Keyboard navigation support
- Custom icon configuration
- Animation speed control
- Accessibility improvements
- Performance optimizations for large sidebars

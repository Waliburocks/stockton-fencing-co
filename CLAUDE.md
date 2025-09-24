# Claude Code Configuration for Sacramento Fencing Co.

## Deployment Policy
- **Auto-deploy by default**: All code changes should be automatically committed and deployed to the live site unless explicitly noted otherwise
- This applies to all updates, fixes, optimizations, and new features
- Use git commit with appropriate messages followed by git push

## Testing Commands
- Build: `npm run build`
- Development: `npm run dev`
- Lint: (check package.json for specific lint commands)

## Project Structure
- Astro-based static site
- Main layout: `src/layouts/Layout.astro`
- Blog system with clickable teaser cards
- Performance-optimized with critical CSS inlining
- WCAG accessibility compliant color scheme

## Recent Optimizations
- Critical CSS inlining for performance
- Deferred script loading with requestAnimationFrame
- Accessibility color contrast fixes
- Internet Archive crawler permissions enabled
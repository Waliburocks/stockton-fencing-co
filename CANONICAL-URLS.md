# Canonical URLs Implementation - Sacramento Fencing Co.

## Overview
This document describes the canonical URL implementation for the Sacramento Fencing Co. website to prevent duplicate content issues and improve SEO.

## Implementation Details

### Layout Component (`src/layouts/Layout.astro`)
The layout component now accepts an optional `canonicalUrl` prop and includes intelligent normalization:

```astro
export interface Props {
	title: string;
	description?: string;
	canonicalUrl?: string;
}
```

### Automatic URL Normalization

The system automatically handles:
- **Trailing slash removal** (except for root `/`)
- **Common path variations** (`/index`, `/index.html`, `/home` → `/`)
- **Subdirectory normalization** (`/services/index` → `/services`)

### Canonical URLs by Page

| Page | Canonical URL | Status |
|------|---------------|--------|
| Homepage | `https://sacramento-fencing.co/` | ✅ Implemented |
| Services | `https://sacramento-fencing.co/services` | ✅ Implemented |
| Contact | `https://sacramento-fencing.co/contact` | ✅ Implemented |
| About | `https://sacramento-fencing.co/about` | ✅ Implemented |
| Locations | `https://sacramento-fencing.co/locations` | ✅ Implemented |
| Privacy | `https://sacramento-fencing.co/privacy` | ✅ Implemented |
| Terms | `https://sacramento-fencing.co/terms` | ✅ Implemented |

## SEO Benefits

### Duplicate Content Prevention
- Prevents indexing of multiple URL variations
- Consolidates page authority to canonical version
- Improves search engine crawl efficiency

### Social Media Integration
- Open Graph `og:url` uses canonical URL
- Twitter Card URLs are properly canonicalized
- Consistent sharing URLs across platforms

### Technical Features
- **URL normalization** handles common variations
- **HTTPS enforcement** for all canonical URLs
- **Trailing slash consistency** 
- **Query parameter handling** (future-ready)

## Usage Examples

### Explicit Canonical URL
```astro
<Layout title="Page Title" canonicalUrl="/custom-canonical">
```

### Auto-Generated Canonical URL
```astro
<Layout title="Page Title">
<!-- Uses automatic normalization -->
```

### External Canonical URL
```astro
<Layout title="Page Title" canonicalUrl="https://sacramento-fencing.co/preferred-url">
```

## Path Normalization Rules

```javascript
const canonicalPaths = {
	'/index': '/',
	'/index.html': '/',
	'/home': '/',
	'/services/index': '/services',
	'/services/index.html': '/services',
	'/contact/index': '/contact',
	'/contact/index.html': '/contact',
	'/about/index': '/about',
	'/about/index.html': '/about',
	'/locations/index': '/locations',
	'/locations/index.html': '/locations'
};
```

## Additional SEO Meta Tags

The implementation also includes:
- **Open Graph tags** with canonical URLs
- **Twitter Card tags** with canonical URLs
- **Robot directives** for optimal indexing
- **DNS prefetch** and **preconnect** for performance

## Validation

To validate canonical URLs are working:
1. View page source and check `<link rel="canonical">`
2. Verify Open Graph `og:url` matches canonical
3. Test URL variations redirect properly
4. Use Google Search Console to monitor indexing

## Maintenance

When adding new pages:
1. Add explicit `canonicalUrl` prop to Layout component
2. Update normalization rules if needed
3. Test URL variations
4. Update sitemap.xml with canonical URLs

## Notes

- All canonical URLs use HTTPS protocol
- Domain is consistently `sacramento-fencing.co`
- URLs are normalized to remove trailing slashes
- System is extensible for future URL patterns
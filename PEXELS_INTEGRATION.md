# Pexels API Integration Documentation

## Overview

This project includes a complete Pexels API integration that allows you to search, preview, and download high-quality stock images with proper attribution. The integration is designed specifically for the Stockton Fencing Co. website but can be adapted for other projects.

## Features

- ✅ **Image Search**: Search Pexels with filters for orientation, size, and color
- ✅ **Image Preview**: View detailed image information and validation for fencing websites
- ✅ **Batch Download**: Download images in multiple sizes with one click
- ✅ **Auto Attribution**: Automatic generation of proper Pexels attribution in multiple formats
- ✅ **Fencing-Specific**: Pre-configured search terms and validation for fencing businesses
- ✅ **Responsive Design**: Works on desktop and mobile devices
- ✅ **CORS-Free**: Server-side API endpoint avoids browser CORS issues

## Quick Start

### 1. Access the Image Manager

Navigate to `/admin/images` in your browser to access the Pexels image search interface.

### 2. Search for Images

- Use the search bar to find specific images
- Try pre-configured fencing terms like "wooden fence", "fence installation", etc.
- Apply filters for orientation, size, and color as needed

### 3. Preview and Validate

- Click any image to see detailed information
- Review recommendations and warnings for your specific use case
- Check suggested use cases (hero section, blog post, etc.)

### 4. Download and Attribute

- Download images in your preferred size
- Copy the auto-generated attribution text
- Use the attribution when publishing the image

## File Structure

```
src/
├── components/
│   └── PexelsImageSearch.jsx          # React component for image search UI
├── pages/
│   ├── admin/
│   │   └── images.astro               # Admin interface for image management
│   ├── api/
│   │   └── pexels.js                  # Server-side API endpoint
│   └── test-pexels.astro              # Simple test page
├── styles/
│   └── pexels-search.css              # Styles for the search interface
└── utils/
    └── pexels.js                      # Utility functions for Pexels integration
```

## API Configuration

Your Pexels API key is configured via environment variables for security.

**Setup Instructions:**

1. Create a `.env` file in your project root (already ignored by git)
2. Add your Pexels API key: `PEXELS_API_KEY=your_actual_key_here`
3. The API endpoint will automatically use this environment variable

**Important**: 
- Never commit API keys to public repositories
- The `.env` file is automatically ignored by git for security
- For production deployment, set the `PEXELS_API_KEY` environment variable in your hosting platform (Netlify, Vercel, etc.)

## Available Functions

### Search Functions

```javascript
import { searchPhotos, getCuratedPhotos, getPhotoById } from '../utils/pexels.js';

// Search for photos
const results = await searchPhotos('wooden fence', {
  orientation: 'landscape',
  size: 'large',
  color: 'brown',
  perPage: 15,
  page: 1
});

// Get curated photos
const curated = await getCuratedPhotos(15, 1);

// Get specific photo
const photo = await getPhotoById(12345);
```

### Attribution Functions

```javascript
import { generateAttribution } from '../utils/pexels.js';

// Generate HTML attribution
const htmlAttr = generateAttribution(photo, 'html');
// Result: Photo by <a href="...">John Doe</a> on <a href="...">Pexels</a>

// Generate text attribution
const textAttr = generateAttribution(photo, 'text');
// Result: Photo by John Doe on Pexels

// Generate markdown attribution
const markdownAttr = generateAttribution(photo, 'markdown');
// Result: Photo by [John Doe](...) on [Pexels](...)
```

### Download Functions

```javascript
import { downloadPhoto, createDownloadBlob } from '../utils/pexels.js';

// Prepare download (returns metadata)
const downloadInfo = await downloadPhoto(photo, 'large', 'my-fence-image', 'blog');

// Create downloadable blob
const blob = await createDownloadBlob(photo.src.large, 'fence-image.jpg');
```

### Validation Functions

```javascript
import { validateImageForFencing, getFencingSearchTerms } from '../utils/pexels.js';

// Validate image for fencing website use
const validation = validateImageForFencing(photo);
console.log(validation.suggestedUse);     // ['Hero section', 'Blog post', etc.]
console.log(validation.warnings);        // ['Image may be too vertical', etc.]
console.log(validation.recommendations); // ['Good for social media', etc.]

// Get suggested search terms
const terms = getFencingSearchTerms();
// Returns: ['wooden fence', 'vinyl fence', 'chain link fence', ...]
```

## API Endpoints

### GET /api/pexels

Server-side endpoint to proxy Pexels API requests and avoid CORS issues.

**Parameters:**

- `action` (required): `search`, `curated`, or `photo`
- `query` (for search): Search term
- `page` (optional): Page number (default: 1)
- `per_page` (optional): Results per page (default: 15, max: 80)
- `orientation` (optional): `landscape`, `portrait`, or `square`
- `size` (optional): `large`, `medium`, or `small`
- `color` (optional): Color filter
- `id` (for photo): Photo ID

**Examples:**

```
/api/pexels?action=search&query=wooden+fence&per_page=10
/api/pexels?action=curated&page=2
/api/pexels?action=photo&id=12345
```

## Image Size Guide

Pexels provides multiple sizes for each image:

- **original**: Full resolution (largest file)
- **large2x**: 2x large size for high-DPI displays
- **large**: Standard large size (good for hero sections)
- **medium**: Medium size (good for blog posts)
- **small**: Small size (good for thumbnails)
- **portrait**: Portrait orientation crop
- **landscape**: Landscape orientation crop
- **tiny**: Very small size (minimal bandwidth)

## Recommended Usage

### Hero Sections
- Use `large` or `large2x` sizes
- Prefer landscape orientation
- Minimum 1200px width recommended

### Blog Posts
- Use `medium` or `large` sizes
- Aspect ratio 1.2-1.8 works best
- Include proper alt text and attribution

### Thumbnails/Gallery
- Use `small` or `medium` sizes
- Square crops often work well
- Consider loading performance

### Social Media
- Use `medium` size
- Square or portrait orientation
- Include attribution in post caption

## Pexels License Guidelines

### ✅ What You Can Do

- Use images for commercial and personal projects
- Modify and edit the images
- Use images on websites, blogs, and social media
- Use images in marketing materials
- Download and use images without asking permission

### ❌ What You Cannot Do

- Sell unmodified images
- Use images to create competing stock photo services
- Use images in a way that suggests photographer endorsement
- Use identifiable people in images for commercial purposes without consent
- Distribute images as standalone downloads

### 🏷️ Attribution

- Attribution is not required but greatly appreciated
- When provided, use format: "Photo by [Photographer] on Pexels"
- Include photographer and Pexels links when possible
- This integration automatically generates proper attribution

## Troubleshooting

### Common Issues

1. **"API error: 429"**: Too many requests. Wait a moment and try again.
2. **"API error: 403"**: Invalid API key. Check the key in `/src/pages/api/pexels.js`.
3. **Component not loading**: Ensure React dependencies are installed and Astro config includes React integration.
4. **CORS errors**: Use the provided API endpoint instead of direct Pexels API calls.

### Testing

Visit `/test-pexels` to verify the API is working correctly. You should see a sample photo if everything is configured properly.

### Performance Tips

- Use appropriate image sizes for your use case
- Consider lazy loading for image galleries
- Cache frequently used search results if needed
- Optimize downloaded images for web use

## Security Considerations

- API key is stored server-side to prevent exposure
- All requests go through your domain's API endpoint
- No client-side API key exposure
- Attribution requirements are automatically handled

## Customization

### Adding New Search Terms

Edit the `getFencingSearchTerms()` function in `/src/utils/pexels.js` to add industry-specific search terms.

### Modifying Validation Rules

Update the `validateImageForFencing()` function to customize image validation for your specific needs.

### Styling Changes

Modify `/src/styles/pexels-search.css` to match your website's design system.

### Component Customization

The React component in `/src/components/PexelsImageSearch.jsx` can be customized for different use cases or integrated into other admin interfaces.

## Support

For Pexels API documentation and support:
- [Pexels API Documentation](https://www.pexels.com/api/documentation/)
- [Pexels License](https://www.pexels.com/license/)

For integration issues:
- Check the browser console for error messages
- Verify API endpoint is accessible at `/api/pexels`
- Ensure React dependencies are properly installed
- Test with the simple test page at `/test-pexels`
/**
 * Pexels API Integration Utility
 * Handles searching, downloading, and attribution for Pexels images
 * Uses local API endpoint to avoid CORS issues
 */

const API_BASE_URL = '/api/pexels';

/**
 * Search for photos on Pexels
 * @param {string} query - Search query
 * @param {number} perPage - Number of results per page (default: 15, max: 80)
 * @param {number} page - Page number (default: 1)
 * @param {string} orientation - 'landscape', 'portrait', or 'square' (optional)
 * @param {string} size - 'large', 'medium', or 'small' (optional)
 * @param {string} color - Color filter (optional)
 * @returns {Promise<Object>} Search results from Pexels API
 */
export async function searchPhotos(query, options = {}) {
  const {
    perPage = 15,
    page = 1,
    orientation = '',
    size = '',
    color = ''
  } = options;

  const params = new URLSearchParams({
    query,
    per_page: perPage.toString(),
    page: page.toString()
  });

  if (orientation) params.append('orientation', orientation);
  if (size) params.append('size', size);
  if (color) params.append('color', color);

  try {
    params.append('action', 'search');
    const response = await fetch(`${API_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching Pexels photos:', error);
    throw error;
  }
}

/**
 * Get curated photos from Pexels
 * @param {number} perPage - Number of results per page (default: 15, max: 80)
 * @param {number} page - Page number (default: 1)
 * @returns {Promise<Object>} Curated photos from Pexels API
 */
export async function getCuratedPhotos(perPage = 15, page = 1) {
  const params = new URLSearchParams({
    per_page: perPage.toString(),
    page: page.toString()
  });

  try {
    params.append('action', 'curated');
    const response = await fetch(`${API_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching curated photos:', error);
    throw error;
  }
}

/**
 * Get a specific photo by ID
 * @param {number} id - Photo ID
 * @returns {Promise<Object>} Photo data from Pexels API
 */
export async function getPhotoById(id) {
  try {
    const params = new URLSearchParams({
      action: 'photo',
      id: id.toString()
    });
    
    const response = await fetch(`${API_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching photo by ID:', error);
    throw error;
  }
}

/**
 * Download an image from Pexels and save it locally
 * @param {Object} photo - Photo object from Pexels API
 * @param {string} size - Size to download ('original', 'large2x', 'large', 'medium', 'small', 'portrait', 'landscape', 'tiny')
 * @param {string} filename - Local filename (without extension)
 * @param {string} folder - Local folder path (relative to public/images/)
 * @returns {Promise<Object>} Download result with local path and attribution
 */
export async function downloadPhoto(photo, size = 'large', filename, folder = 'pexels') {
  try {
    // Validate size parameter
    const validSizes = ['original', 'large2x', 'large', 'medium', 'small', 'portrait', 'landscape', 'tiny'];
    if (!validSizes.includes(size)) {
      throw new Error(`Invalid size parameter. Must be one of: ${validSizes.join(', ')}`);
    }

    // Get the appropriate URL for the size
    const imageUrl = photo.src[size];
    if (!imageUrl) {
      throw new Error(`Size '${size}' not available for this photo`);
    }

    // Determine file extension from URL
    const urlParts = imageUrl.split('.');
    const extension = urlParts[urlParts.length - 1].split('?')[0];
    const fullFilename = `${filename}.${extension}`;
    
    // Create the local path
    const localPath = `/images/${folder}/${fullFilename}`;
    const publicPath = `public${localPath}`;

    // Generate attribution text
    const attribution = generateAttribution(photo);

    return {
      success: true,
      photo: {
        id: photo.id,
        photographer: photo.photographer,
        photographer_url: photo.photographer_url,
        pexels_url: photo.url,
        src: photo.src,
        alt: photo.alt || `Photo by ${photo.photographer} on Pexels`
      },
      download: {
        source_url: imageUrl,
        local_path: localPath,
        public_path: publicPath,
        filename: fullFilename,
        size: size
      },
      attribution: attribution,
      usage_note: 'Remember to download the actual file using the provided source_url'
    };
  } catch (error) {
    console.error('Error preparing photo download:', error);
    throw error;
  }
}

/**
 * Generate proper attribution text for a Pexels photo
 * @param {Object} photo - Photo object from Pexels API
 * @param {string} format - Attribution format ('html', 'text', 'markdown')
 * @returns {string} Formatted attribution text
 */
export function generateAttribution(photo, format = 'html') {
  const photographer = photo.photographer;
  const photographerUrl = photo.photographer_url;
  const pexelsUrl = photo.url;

  switch (format) {
    case 'html':
      return `Photo by <a href="${photographerUrl}">${photographer}</a> on <a href="${pexelsUrl}">Pexels</a>`;
    
    case 'text':
      return `Photo by ${photographer} on Pexels`;
    
    case 'markdown':
      return `Photo by [${photographer}](${photographerUrl}) on [Pexels](${pexelsUrl})`;
    
    case 'alt':
      return photo.alt || `Photo by ${photographer} on Pexels`;
    
    default:
      return `Photo by ${photographer} on Pexels`;
  }
}

/**
 * Get popular search terms for fencing-related images
 * @returns {Array<string>} Array of suggested search terms
 */
export function getFencingSearchTerms() {
  return [
    'wooden fence',
    'vinyl fence',
    'chain link fence',
    'iron fence',
    'fence installation',
    'fence repair',
    'backyard fence',
    'privacy fence',
    'garden fence',
    'fence gate',
    'fence maintenance',
    'fence construction',
    'residential fence',
    'commercial fence',
    'fence contractor',
    'fence materials',
    'fence tools',
    'fence design',
    'picket fence',
    'security fence'
  ];
}

/**
 * Validate image for fencing website use
 * @param {Object} photo - Photo object from Pexels API
 * @returns {Object} Validation result with recommendations
 */
export function validateImageForFencing(photo) {
  const recommendations = [];
  const warnings = [];
  
  // Check image dimensions
  const aspectRatio = photo.width / photo.height;
  
  if (aspectRatio < 1.2) {
    warnings.push('Image is quite vertical - may not work well for hero sections');
  }
  
  if (aspectRatio > 2.5) {
    warnings.push('Image is very wide - may not work well for blog posts');
  }
  
  if (photo.width < 800) {
    warnings.push('Image resolution may be too low for large displays');
  }
  
  // Check alt text for fencing relevance
  const alt = photo.alt?.toLowerCase() || '';
  const fencingKeywords = ['fence', 'fencing', 'gate', 'barrier', 'privacy', 'security', 'yard', 'garden', 'backyard'];
  const hasRelevantKeywords = fencingKeywords.some(keyword => alt.includes(keyword));
  
  if (!hasRelevantKeywords) {
    recommendations.push('Consider if this image is relevant to fencing content');
  }
  
  // Provide usage recommendations
  if (aspectRatio >= 1.5 && aspectRatio <= 2.1) {
    recommendations.push('Good aspect ratio for hero sections and banners');
  }
  
  if (aspectRatio >= 1.2 && aspectRatio <= 1.8) {
    recommendations.push('Good aspect ratio for blog post featured images');
  }
  
  if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
    recommendations.push('Good aspect ratio for square social media posts');
  }
  
  return {
    isValid: warnings.length === 0,
    recommendations,
    warnings,
    aspectRatio: Math.round(aspectRatio * 100) / 100,
    resolution: `${photo.width} x ${photo.height}`,
    suggestedUse: getSuggestedUse(aspectRatio, photo.width)
  };
}

/**
 * Get suggested use cases for an image based on its properties
 * @param {number} aspectRatio - Image aspect ratio
 * @param {number} width - Image width
 * @returns {Array<string>} Suggested use cases
 */
function getSuggestedUse(aspectRatio, width) {
  const uses = [];
  
  if (aspectRatio >= 1.5 && aspectRatio <= 2.1 && width >= 1200) {
    uses.push('Hero section background');
    uses.push('Page header image');
  }
  
  if (aspectRatio >= 1.2 && aspectRatio <= 1.8 && width >= 800) {
    uses.push('Blog post featured image');
    uses.push('Service page image');
  }
  
  if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
    uses.push('Social media post');
    uses.push('Gallery thumbnail');
  }
  
  if (aspectRatio >= 0.6 && aspectRatio <= 1.4) {
    uses.push('Sidebar image');
    uses.push('Testimonial background');
  }
  
  if (width >= 400) {
    uses.push('Blog content image');
  }
  
  return uses.length > 0 ? uses : ['General content image'];
}

/**
 * Create a downloadable blob from image URL
 * @param {string} imageUrl - Image URL
 * @param {string} filename - Desired filename
 * @returns {Promise<string>} Download URL for the blob
 */
export async function createDownloadBlob(imageUrl, filename) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    
    return {
      downloadUrl: url,
      filename: filename,
      size: blob.size,
      type: blob.type
    };
  } catch (error) {
    console.error('Error creating download blob:', error);
    throw error;
  }
}

export default {
  searchPhotos,
  getCuratedPhotos,
  getPhotoById,
  downloadPhoto,
  generateAttribution,
  getFencingSearchTerms,
  validateImageForFencing,
  createDownloadBlob
};
// API endpoint for Pexels integration
// This handles server-side API calls to avoid CORS issues

const PEXELS_API_KEY = import.meta.env.PEXELS_API_KEY || process.env.PEXELS_API_KEY;
const PEXELS_BASE_URL = 'https://api.pexels.com/v1';

if (!PEXELS_API_KEY) {
  console.error('PEXELS_API_KEY environment variable is not set');
}

export async function GET({ url }) {
  const params = new URLSearchParams(url.search);
  const action = params.get('action');
  const query = params.get('query');
  const page = params.get('page') || '1';
  const perPage = params.get('per_page') || '15';
  const orientation = params.get('orientation') || '';
  const size = params.get('size') || '';
  const color = params.get('color') || '';
  const photoId = params.get('id');

  try {
    let apiUrl = '';
    let response;

    switch (action) {
      case 'search':
        if (!query) {
          return new Response(JSON.stringify({ error: 'Query parameter is required for search' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        const searchParams = new URLSearchParams({
          query,
          page,
          per_page: perPage
        });
        
        if (orientation) searchParams.append('orientation', orientation);
        if (size) searchParams.append('size', size);
        if (color) searchParams.append('color', color);
        
        apiUrl = `${PEXELS_BASE_URL}/search?${searchParams}`;
        break;

      case 'curated':
        const curatedParams = new URLSearchParams({
          page,
          per_page: perPage
        });
        apiUrl = `${PEXELS_BASE_URL}/curated?${curatedParams}`;
        break;

      case 'photo':
        if (!photoId) {
          return new Response(JSON.stringify({ error: 'Photo ID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        apiUrl = `${PEXELS_BASE_URL}/photos/${photoId}`;
        break;

      default:
        return new Response(JSON.stringify({ error: 'Invalid action parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
    }

    response = await fetch(apiUrl, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Add CORS headers to allow requests from the frontend
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Pexels API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch from Pexels API',
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle CORS preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
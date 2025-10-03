import { google } from 'googleapis';

/**
 * Google Search Console API endpoint
 * Fetches search analytics data including queries, clicks, impressions, and positions
 */
export async function GET({ request }) {
  try {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const endDate = url.searchParams.get('endDate') || new Date().toISOString().split('T')[0];
    const dimension = url.searchParams.get('dimension') || 'query'; // query, page, country, device, etc.

    // Check for credentials in environment variables
    const credentials = JSON.parse(import.meta.env.GOOGLE_SERVICE_ACCOUNT_JSON || '{}');
    const siteUrl = import.meta.env.GSC_SITE_URL || 'sc-domain:fencestockton.com';

    if (!credentials.client_email || !credentials.private_key) {
      return new Response(JSON.stringify({
        error: 'Missing Google Service Account credentials',
        setup: 'Add GOOGLE_SERVICE_ACCOUNT_JSON to .env file'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Initialize Google Auth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly']
    });

    const authClient = await auth.getClient();
    const searchconsole = google.searchconsole({ version: 'v1', auth: authClient });

    // Fetch search analytics data
    const response = await searchconsole.searchanalytics.query({
      siteUrl: siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [dimension],
        rowLimit: 1000,
        dataState: 'all'
      }
    });

    const rows = response.data.rows || [];

    // Transform data for dashboard
    const data = rows.map(row => ({
      keyword: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: (row.ctr * 100).toFixed(2),
      position: row.position.toFixed(1)
    }));

    // Calculate aggregate metrics
    const aggregateMetrics = {
      totalClicks: rows.reduce((sum, row) => sum + row.clicks, 0),
      totalImpressions: rows.reduce((sum, row) => sum + row.impressions, 0),
      avgPosition: rows.length > 0
        ? (rows.reduce((sum, row) => sum + row.position, 0) / rows.length).toFixed(1)
        : 0,
      avgCTR: rows.length > 0
        ? ((rows.reduce((sum, row) => sum + row.ctr, 0) / rows.length) * 100).toFixed(2)
        : 0
    };

    return new Response(JSON.stringify({
      success: true,
      dateRange: { startDate, endDate },
      metrics: aggregateMetrics,
      keywords: data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('GSC API Error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch Google Search Console data',
      message: error.message,
      setup: {
        step1: 'Create a Google Cloud Project',
        step2: 'Enable Google Search Console API',
        step3: 'Create Service Account and download JSON key',
        step4: 'Add service account email to GSC property',
        step5: 'Add GOOGLE_SERVICE_ACCOUNT_JSON to .env file',
        step6: 'Add GSC_SITE_URL to .env file (e.g., sc-domain:fencestockton.com)'
      }
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

#!/usr/bin/env node
// Migration script: Export data from Vercel/Supabase to Cloudflare KV format
// Usage: node scripts/migrate-to-cf.js [--dry-run]

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DRY_RUN = process.argv.includes('--dry-run');
const VERCEL_URL = process.env.VERCEL_URL || 'https://nikunjdhanani.com';
const ADMIN_KEY = process.env.ADMIN_KEY;

if (!ADMIN_KEY) {
  console.error('Error: ADMIN_KEY environment variable is required');
  process.exit(1);
}

async function fetchFromVercel(endpoint) {
  const url = `${VERCEL_URL}${endpoint}`;
  console.log(`Fetching: ${url}`);
  
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'x-admin-key': ADMIN_KEY,
        'Accept': 'application/json',
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  console.log('=== Cloudflare KV Migration Tool ===');
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'EXPORT'}`);
  console.log(`Source: ${VERCEL_URL}`);
  console.log('');

  const exportDir = path.join(__dirname, '..', 'migration-export');
  if (!DRY_RUN && !fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  // 1. Export Bookings
  console.log('--- Exporting Bookings ---');
  try {
    const bookingsData = await fetchFromVercel('/api/bookings');
    if (bookingsData.success && Array.isArray(bookingsData.data)) {
      console.log(`Found ${bookingsData.data.length} bookings`);
      if (!DRY_RUN) {
        fs.writeFileSync(
          path.join(exportDir, 'bookings.json'),
          JSON.stringify(bookingsData.data, null, 2)
        );
        console.log('Saved to migration-export/bookings.json');
      }
    } else {
      console.log('No bookings found or error:', bookingsData);
    }
  } catch (err) {
    console.error('Failed to export bookings:', err.message);
  }

  // 2. Export Reviews
  console.log('\n--- Exporting Reviews ---');
  try {
    const reviewsData = await fetchFromVercel('/api/reviews');
    if (reviewsData.success && Array.isArray(reviewsData.data)) {
      console.log(`Found ${reviewsData.data.length} reviews`);
      if (!DRY_RUN) {
        fs.writeFileSync(
          path.join(exportDir, 'reviews.json'),
          JSON.stringify(reviewsData.data, null, 2)
        );
        console.log('Saved to migration-export/reviews.json');
      }
    } else {
      console.log('No reviews found or error:', reviewsData);
    }
  } catch (err) {
    console.error('Failed to export reviews:', err.message);
  }

  // 3. Generate wrangler commands
  console.log('\n--- Cloudflare KV Import Commands ---');
  console.log('Run these commands after creating KV namespaces:\n');
  
  console.log('# Create namespaces (if not done):');
  console.log('wrangler kv:namespace create BOOKINGS_KV');
  console.log('wrangler kv:namespace create REVIEWS_KV');
  console.log('wrangler kv:namespace create SESSIONS_KV');
  console.log('');
  
  console.log('# Import data to KV:');
  if (!DRY_RUN) {
    console.log(`wrangler kv:key put --binding=BOOKINGS_KV "bookings:list" --path=migration-export/bookings.json`);
    console.log(`wrangler kv:key put --binding=REVIEWS_KV "reviews:list" --path=migration-export/reviews.json`);
  } else {
    console.log('# (Dry run - no files to import)');
    console.log('wrangler kv:key put --binding=BOOKINGS_KV "bookings:list" --path=<path-to-bookings.json>');
    console.log('wrangler kv:key put --binding=REVIEWS_KV "reviews:list" --path=<path-to-reviews.json>');
  }
  
  console.log('\n# Set secrets:');
  console.log('wrangler secret put ADMIN_KEY');
  console.log('wrangler secret put ADMIN_SESSION_SECRET');
  console.log('wrangler secret put SUPABASE_URL');
  console.log('wrangler secret put SUPABASE_SERVICE_ROLE_KEY');
  
  console.log('\n=== Migration Guide ===');
  console.log('1. Run this script to export data from Vercel');
  console.log('2. Create KV namespaces in Cloudflare');
  console.log('3. Import data using wrangler commands above');
  console.log('4. Deploy the worker: wrangler deploy');
  console.log('5. Update DNS to route api.nikunjdhanani.com to the worker');
  console.log('6. Test all endpoints');
  console.log('7. Update Next.js app to use new API domain');
}

main().catch(console.error);

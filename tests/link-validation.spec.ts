import { expect, test } from '@playwright/test';
import {
  ALL_EXTERNAL_LINKS,
  CRITICAL_LINKS,
  LINKS_NEED_VERIFICATION
} from '../src/config/stats';

// Configure to only run on Chromium since these are API tests
test.use({ 
  browserName: 'chromium' 
});

test.describe('Link Validation Tests - API Only', () => {
  
  test('CRITICAL: All business-critical links must be working', async ({ request }) => {
    console.log(`\n🚨 Testing ${Object.keys(CRITICAL_LINKS).length} critical business links...`);
    
    for (const [name, url] of Object.entries(CRITICAL_LINKS)) {
      console.log(`Testing critical link: ${name} - ${url}`);
      
      try {
        const response = await request.get(url, { timeout: 15000 });
        const status = response.status();
        
        console.log(`✅ ${name}: Status ${status}`);
        expect(status, `Critical link ${name} (${url}) must return 200`).toBe(200);
        
      } catch (error) {
        console.log(`❌ ${name}: Error - ${error instanceof Error ? error.message : String(error)}`);
        throw new Error(`Critical link ${name} (${url}) failed: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  });

  test('REPORT: Check all external links and report status', async ({ request }) => {
    console.log(`\n🔗 Testing ${Object.keys(ALL_EXTERNAL_LINKS).length} external links...`);
    
    const results = [];
    
    for (const [name, url] of Object.entries(ALL_EXTERNAL_LINKS)) {
      console.log(`Testing: ${name} - ${url}`);
      
      try {
        const response = await request.get(url, { 
          timeout: 10000,
          ignoreHTTPSErrors: true 
        });
        const status = response.status();
        const success = status >= 200 && status < 400; // Allow redirects
        
        results.push({ name, url, status, success });
        
        if (success) {
          console.log(`✅ ${name}: Status ${status}`);
        } else {
          console.log(`❌ ${name}: Status ${status}`);
        }
        
      } catch (error) {
        console.log(`❌ ${name}: Error - ${error instanceof Error ? error.message : String(error)}`);
        results.push({ 
          name, 
          url, 
          status: 'ERROR', 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }
    }

    // Summary
    const working = results.filter(r => r.success);
    const failing = results.filter(r => !r.success);
    
    console.log(`\n📊 Link Test Summary:`);
    console.log(`✅ Working: ${working.length}/${results.length}`);
    console.log(`❌ Failing: ${failing.length}/${results.length}`);
    
    if (failing.length > 0) {
      console.log(`\n❌ Failed links (need to be updated in stats.ts):`);
      failing.forEach(link => {
        console.log(`   • ${link.name}: ${link.url} (${link.status})`);
      });
    }

    // This test is for reporting only - always pass
    expect(true).toBeTruthy();
  });

  test('INFO: Check placeholder links that may not exist yet', async ({ request }) => {
    console.log(`\n⚠️  Testing ${Object.keys(LINKS_NEED_VERIFICATION).length} links that may need updates...`);
    
    const results = [];
    
    for (const [name, url] of Object.entries(LINKS_NEED_VERIFICATION)) {
      console.log(`Testing: ${name} - ${url}`);
      
      try {
        const response = await request.get(url, { timeout: 10000 });
        const status = response.status();
        const success = status === 200;
        
        results.push({ name, url, status, success });
        
        if (success) {
          console.log(`✅ ${name}: Exists - Status ${status}`);
        } else {
          console.log(`⚠️  ${name}: Status ${status} (may need to be created/updated)`);
        }
        
      } catch (error) {
        console.log(`⚠️  ${name}: Error - ${error instanceof Error ? error.message : String(error)} (may need to be created)`);
        results.push({ 
          name, 
          url, 
          status: 'ERROR', 
          success: false, 
          error: error instanceof Error ? error.message : String(error) 
        });
      }
    }

    // Summary for verification links (not strict requirements)
    const existing = results.filter(r => r.success);
    const needWork = results.filter(r => !r.success);
    
    console.log(`\n📊 Verification Links Summary:`);
    console.log(`✅ Already exist: ${existing.length}/${results.length}`);
    console.log(`⚠️  Need attention: ${needWork.length}/${results.length}`);
    
    if (needWork.length > 0) {
      console.log(`\n⚠️  Links that need to be created/updated in stats.ts:`);
      needWork.forEach(link => {
        console.log(`   • ${link.name}: ${link.url} (${link.status})`);
      });
    }

    // This test is informational only - always pass
    expect(true).toBeTruthy();
  });
}); 
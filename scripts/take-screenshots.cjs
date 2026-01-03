const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Configuration
const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, '../src/assets/screenshots');

// 4K with 2x scale = effective 3840x2160 (4K quality)
// For 8K, use width: 3840, height: 2160, deviceScaleFactor: 2
const VIEWPORT = {
  width: 1920,
  height: 1080,
  deviceScaleFactor: 2, // 2x for 4K quality
};

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeScreenshots() {
  console.log('🚀 Starting screenshot capture...\n');
  console.log(`📁 Output directory: ${SCREENSHOT_DIR}\n`);

  // Ensure screenshot directory exists
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    defaultViewport: VIEWPORT,
    args: [
      '--window-size=1920,1080',
      '--disable-gpu',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  try {
    // ===== STEP 1: Login =====
    console.log('📸 Step 1: Logging in...');
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle0', timeout: 30000 });
    await delay(2000);

    // Fill login form using placeholder text
    await page.waitForSelector('input[placeholder="Enter your email"]');
    await page.type('input[placeholder="Enter your email"]', 'demo@allync.com');
    await page.type('input[placeholder="Enter your password"]', 'demo123');
    await delay(500);

    // Click submit button
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 });
    console.log('   ✅ Logged in successfully!\n');

    // ===== STEP 2: Select Sector Page =====
    console.log('📸 Step 2: Capturing select-sector...');
    await page.goto(`${BASE_URL}/select-sector`, { waitUntil: 'networkidle0' });
    await delay(3000); // Wait for animations

    // Dismiss spotlight tour by pressing Escape
    await page.keyboard.press('Escape');
    await delay(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '01-select-sector.png'),
      type: 'png',
    });
    console.log('   ✅ Saved: 01-select-sector.png\n');

    // ===== STEP 3: Click on first active sector to proceed =====
    console.log('📸 Step 3: Capturing select-account...');

    // Click first active sector card (Gym & Fitness)
    const sectorCards = await page.$$('.cursor-pointer');
    if (sectorCards.length > 0) {
      await sectorCards[0].click();
      await delay(500);
      // Click again if tour appeared
      try {
        await sectorCards[0].click();
      } catch (e) {}
    }

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
    await delay(3000);

    // Dismiss spotlight tour
    await page.keyboard.press('Escape');
    await delay(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '02-select-account.png'),
      type: 'png',
    });
    console.log('   ✅ Saved: 02-select-account.png\n');

    // ===== STEP 4: Select Account Type =====
    console.log('📸 Step 4: Capturing module-selection...');

    // Click on Admin card (first option)
    const accountCards = await page.$$('.cursor-pointer');
    if (accountCards.length > 0) {
      await accountCards[0].click();
      await delay(500);
    }

    // Click Continue button
    const continueBtn = await page.$('button:has-text("Continue")');
    if (continueBtn) {
      await continueBtn.click();
    } else {
      // Alternative: find button with ChevronRight icon
      const buttons = await page.$$('button');
      for (const btn of buttons) {
        const text = await btn.evaluate(el => el.textContent);
        if (text && text.includes('Continue')) {
          await btn.click();
          break;
        }
      }
    }

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
    await delay(3000);

    // Dismiss spotlight tour
    await page.keyboard.press('Escape');
    await delay(1000);
    await page.keyboard.press('Escape');
    await delay(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '03-module-selection.png'),
      type: 'png',
    });
    console.log('   ✅ Saved: 03-module-selection.png\n');

    // ===== STEP 5: Dashboard =====
    console.log('📸 Step 5: Capturing dashboard...');

    // Click Continue to Dashboard button
    const dashboardBtn = await page.$$('button');
    for (const btn of dashboardBtn) {
      const text = await btn.evaluate(el => el.textContent);
      if (text && text.includes('Continue to Dashboard')) {
        await btn.click();
        break;
      }
    }

    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 10000 }).catch(() => {});
    await delay(4000);

    // Dismiss spotlight tour multiple times (4 steps)
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Escape');
      await delay(300);
    }
    await delay(500);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '04-dashboard.png'),
      type: 'png',
    });
    console.log('   ✅ Saved: 04-dashboard.png\n');

    console.log('🎉 All screenshots captured successfully!');
    console.log(`📁 Location: ${SCREENSHOT_DIR}`);

  } catch (error) {
    console.error('❌ Error taking screenshots:', error);
  } finally {
    await delay(2000);
    await browser.close();
  }
}

// Run the script
takeScreenshots();

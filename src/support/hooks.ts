import { Before, After, BeforeAll, AfterAll, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, request } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import reporter from 'cucumber-html-reporter';
import { World } from './world';

let browser: Browser;

const REPORTS_DIR = 'reports';
const SCREENSHOTS_DIR = join(REPORTS_DIR, 'screenshots');
const JSON_REPORT = join(REPORTS_DIR, 'cucumber-report.json');
const HTML_REPORT = join(REPORTS_DIR, 'cucumber-report.html');

BeforeAll(async () => {
  if (!existsSync(REPORTS_DIR)) {
    mkdirSync(REPORTS_DIR, { recursive: true });
  }
  if (!existsSync(SCREENSHOTS_DIR)) {
    mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

Before(async function (this: World) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL });
});

AfterStep(async function (this: World, { pickleStep }) {
  if (!this.page || this.page.isClosed()) {
    return;
  }

  const safeStepName = pickleStep.text.replace(/[^a-z0-9]+/gi, '_').toLowerCase();
  const fileName = `${Date.now()}_${safeStepName}.png`;
  const screenshotPath = join(SCREENSHOTS_DIR, fileName);

  const screenshot = await this.page.screenshot({ path: screenshotPath, fullPage: true });
  await this.attach(screenshot, 'image/png');
});

After(async function (this: World) {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.apiContext) await this.apiContext.dispose();
});

AfterAll(async () => {
  if (browser) {
    await browser.close();
  }

  reporter.generate({
    theme: 'bootstrap',
    jsonFile: JSON_REPORT,
    output: HTML_REPORT,
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: {
      browser: 'chromium',
      device: 'local',
      platform: `${process.platform} ${process.version}`
    }
  });
});

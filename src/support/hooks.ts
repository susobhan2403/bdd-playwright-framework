import { Before, After, BeforeAll, AfterAll, AfterStep } from '@cucumber/cucumber';
import { chromium, Browser, request } from 'playwright';
import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { World } from './world';

let browser: Browser;

const REPORTS_DIR = 'reports';
const SCREENSHOTS_DIR = join(REPORTS_DIR, 'screenshots');

BeforeAll(async () => {
  if (!existsSync(REPORTS_DIR)) {
    mkdirSync(REPORTS_DIR, { recursive: true });
  }
  if (!existsSync(SCREENSHOTS_DIR)) {
    mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  browser = await chromium.launch({ headless: process.env.HEADLESS === 'false' });
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

  if (this.response) {
    const responseHeaders = this.response.headers();
    const responseBody = await this.response.text();
    const formattedBody = (() => {
      try {
        return JSON.stringify(JSON.parse(responseBody), null, 2);
      } catch {
        return responseBody;
      }
    })();

    const responseDetails = [
      `API Response captured after step: ${pickleStep.text}`,
      `URL: ${this.response.url()}`,
      `Status: ${this.response.status()} ${this.response.statusText()}`,
      `Headers: ${JSON.stringify(responseHeaders, null, 2)}`,
      'Body:',
      formattedBody,
    ].join('\n');

    await this.attach(responseDetails, 'text/plain');
  }
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

});

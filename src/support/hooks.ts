import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, request } from 'playwright';
import { World } from './world';

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'false' });
});

Before(async function (this: World) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL });
});

After(async function (this: World) {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.apiContext) await this.apiContext.dispose();
});

AfterAll(async () => {
  await browser.close();
});
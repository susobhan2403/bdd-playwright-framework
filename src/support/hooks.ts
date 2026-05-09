import { Before, After, BeforeAll, AfterAll } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page, request, APIRequestContext } from 'playwright';
import { World } from './world';

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' });
});

Before(async function (this: World & IWorldOptions) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.apiContext = await request.newContext({ baseURL: process.env.API_BASE_URL });
});

After(async function (this: World & IWorldOptions) {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.apiContext) await this.apiContext.dispose();
});

AfterAll(async () => {
  await browser.close();
});
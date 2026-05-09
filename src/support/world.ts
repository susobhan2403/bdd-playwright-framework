import { setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page, APIRequestContext } from 'playwright';

export class World {
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  response: any;

  constructor() {
    this.response = null;
  }
}

setWorldConstructor(World);
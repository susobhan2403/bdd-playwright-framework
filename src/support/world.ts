import { IWorldOptions, setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { BrowserContext, Page, APIRequestContext, APIResponse } from 'playwright';

export class World extends CucumberWorld {
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  response: APIResponse | null;

  constructor(options: IWorldOptions) {
    super(options);
    this.response = null;
  }
}

setWorldConstructor(World);

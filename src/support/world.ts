import { IWorldOptions, setWorldConstructor, World as CucumberWorld } from '@cucumber/cucumber';
import { BrowserContext, Page, APIRequestContext } from 'playwright';

export class World extends CucumberWorld {
  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;
  response: any;

  constructor(options: IWorldOptions) {
    super(options);
    this.response = null;
  }
}

setWorldConstructor(World);

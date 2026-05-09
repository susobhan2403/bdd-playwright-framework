import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import config from '../config/env';
import { World } from '../support/world';

Given('I navigate to the application', async function (this: World) {
  await this.page.goto(config.BASE_URL);
});

Given('I navigate to path {string}', async function (this: World, path: string) {
  await this.page.goto(`${config.BASE_URL}${path}`);
});

Then('the page title should contain {string}', async function (this: World, title: string) {
  const pageTitle = await this.page.title();
  expect(pageTitle).toContain(title);
});

Then('the current URL should contain {string}', async function (this: World, urlPart: string) {
  const currentURL = this.page.url();
  expect(currentURL).toContain(urlPart);
});

Then('I should see text {string}', async function (this: World, text: string) {
  const pageContent = await this.page.content();
  expect(pageContent).toContain(text);
});
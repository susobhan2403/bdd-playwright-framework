import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecureAreaPage } from '../pages/SecureAreaPage';
import { World } from '../support/world';
import config from '../config/env';

Given('I am on the login page', async function (this: World) {
  const loginPage = new LoginPage(this.page);
  const title = await loginPage.getTitle();
  expect(title).toContain('Test Login');
});

When('I login with valid credentials from environment', async function (this: World) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.USERNAME, config.PASSWORD);
});

When('I login with invalid password from environment', async function (this: World) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(config.USERNAME, `${config.PASSWORD}_invalid`);
});

Then('I should see a flash message {string}', async function (this: World, expectedMessage: string) {
  const loginPage = new LoginPage(this.page);
  const flashMessage = await loginPage.getFlashMessage();
  expect(flashMessage).toContain(expectedMessage);
});

Then('I should be redirected to the secure area', async function (this: World) {
  const secureAreaPage = new SecureAreaPage(this.page);
  const isVisible = await secureAreaPage.isSecureAreaVisible();
  expect(isVisible).toBeTruthy();
});

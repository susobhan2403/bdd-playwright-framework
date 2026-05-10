import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { World } from '../support/world';
import config from '../config/env';

Given('I am on the login page', async function (this: World) {
  const loginPage = new LoginPage(this.page);
  const title = await loginPage.getTitle(); 
  expect(title).toContain('Swag Labs');
});

When('I login with valid credentials from environment', async function (this: World) {
  const loginPage = new LoginPage(this.page);
  console.debug(`Logging in with username: ${config.USERNAME} and password: ${config.PASSWORD}`);
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

Then('I should be redirected to the home page', async function (this: World) {
  const homePage = new HomePage(this.page);
  const isVisible = await homePage.isHomePageVisible();
  expect(isVisible).toBeTruthy();
});

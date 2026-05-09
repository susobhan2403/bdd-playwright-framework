import { Given, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { World } from '../support/world';

Given('I send a GET request to {string}', async function (this: World, endpoint: string) {
  this.response = await this.apiContext.get(endpoint);
});

Then('the response status code should be {int}', async function (this: World, expectedStatusCode: number) {
  expect(this.response).toBeTruthy();
  expect(this.response.status()).toBe(expectedStatusCode);
});

Then('the response body should contain {string}: {int}', async function (this: World, key: string, expectedValue: number) {
  const body = await this.response.json();
  expect(body[key]).toBe(expectedValue);
});

Then('the response body should contain {string}', async function (this: World, key: string) {
  const body = await this.response.json();
  expect(body[key]).toBeDefined();
});

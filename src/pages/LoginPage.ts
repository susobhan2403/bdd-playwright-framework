import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = '#submit';
  private flashMessage = '.show';

  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    return (await this.page.title()) ?? '';
  }

  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getFlashMessage(): Promise<string> {
    return (await this.page.textContent(this.flashMessage)) ?? '';
  }
}
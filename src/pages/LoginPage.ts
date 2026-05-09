import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  private usernameInput = '#username';
  private passwordInput = '#password';
  private loginButton = 'button[type="submit"]';
  private flashMessage = '#flash';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLoginPage(): Promise<void> {
    await this.navigateTo('/login');
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
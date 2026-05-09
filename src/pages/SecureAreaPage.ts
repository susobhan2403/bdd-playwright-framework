import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class SecureAreaPage extends BasePage {
  private logoutButton = '//a[contains(text(), "Log out")]';

  constructor(page: Page) {
    super(page);
  }

  async isSecureAreaVisible(): Promise<boolean> {
    return this.page.isVisible(this.logoutButton);
  }

  async logout(): Promise<void> {
    await this.page.click(this.logoutButton);
  }
}
import { Page } from 'playwright';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private titleText = '.title';

  constructor(page: Page) {
    super(page);
  }

  async isHomePageVisible(): Promise<boolean> {
    return this.page.isVisible(this.titleText);
  }

  // async logout(): Promise<void> {
  //   await this.page.click(this.logoutButton);
  // }
}
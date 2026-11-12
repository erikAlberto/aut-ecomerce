import { type Page, type Locator } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly accountMenu: Locator;
  readonly signInLink: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountMenu = page.getByTestId('nav-menu');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.cartLink = page.getByTestId('nav-cart');
  }
}

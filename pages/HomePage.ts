import { type Page, type Locator } from '@playwright/test';
import { productNamePattern } from '../helpers/textUtils';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly cartIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByTestId('search-query');
    this.searchButton = page.getByTestId('search-submit');
    this.cartIcon = page.getByTestId('nav-cart');
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
  }

  productCard(name: string): Locator {
    return this.page
      .getByTestId('product-name')
      .filter({ hasText: productNamePattern(name) });
  }

  async searchProduct(name: string): Promise<void> {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async openProduct(name: string): Promise<void> {
    await this.productCard(name).click();
  }
}

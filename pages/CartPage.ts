import { type Page, type Locator } from '@playwright/test';
import { productNamePattern } from '../helpers/textUtils';

export class CartPage {
  readonly page: Page;
  readonly continueShoppingButton: Locator;
  readonly proceedButton: Locator;
  readonly cartTotal: Locator;
  readonly itemRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingButton = page.getByTestId('continue-shopping');
    this.proceedButton = page.getByTestId('proceed-1');
    this.cartTotal = page.getByTestId('cart-total');
    this.itemRows = page
      .getByRole('row')
      .filter({ has: page.getByTestId('product-title') });
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
  }

  getRow(productName: string): Locator {
    return this.page.getByRole('row').filter({
      has: this.page
        .getByTestId('product-title')
        .filter({ hasText: productNamePattern(productName) }),
    });
  }
}

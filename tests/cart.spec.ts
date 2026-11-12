import { test, expect } from '../fixtures/test';

interface ProductData {
  name: string;
  price: number;
}

const data = require('../data/products.json') as { products: ProductData[] };

const QUANTITIES = [1, 2];

const usd = (amount: number): string => `$${amount.toFixed(2)}`;
const toCents = (amount: number): number => Math.round(amount * 100);

test('E3: agregar dos productos al carrito sin login', async ({ page, homePage, productPage, cartPage }) => {
  test.setTimeout(90_000);

  for (const [index, product] of data.products.entries()) {
    const quantity = QUANTITIES[index];

    await test.step(`producto: ${product.name} (cantidad ${quantity})`, async () => {
      await homePage.goto();
      await homePage.searchProduct(product.name);

      await expect(homePage.productCard(product.name)).toBeVisible();
      await homePage.openProduct(product.name);

      await expect(page).toHaveURL(/product\//);
      await expect(productPage.productName).toHaveText(product.name);
      await expect(productPage.unitPrice).toHaveText(product.price.toFixed(2));

      await productPage.setQuantity(quantity);
      await productPage.addToCart();
      await expect(productPage.toast.first()).toBeVisible();
    });
  }

  await test.step('carrito: dos filas, cantidades y total coherente', async () => {
    await homePage.cartIcon.click();
    await expect(page).toHaveURL(/checkout/);

    await expect(cartPage.itemRows).toHaveCount(2);

    let expectedTotalCents = 0;

    for (const [index, product] of data.products.entries()) {
      const quantity = QUANTITIES[index];
      const row = cartPage.getRow(product.name);

      await expect(row).toBeVisible();
      await expect(row.getByTestId('product-quantity')).toHaveValue(String(quantity));
      await expect(row.getByTestId('product-price')).toHaveText(usd(product.price));

      const lineCents = toCents(product.price) * quantity;
      await expect(row.getByTestId('line-price')).toHaveText(usd(lineCents / 100));

      expectedTotalCents += lineCents;
    }

    await expect(cartPage.cartTotal).toHaveText(usd(expectedTotalCents / 100));
  });
});

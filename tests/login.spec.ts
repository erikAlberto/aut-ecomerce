import { test, expect } from '../fixtures/test';

test('login con credenciales válidas redirige a My account', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page.getByTestId('page-title')).toHaveText('My account');
});

test('login con credenciales inválidas muestra error', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('customer@practicesoftwaretesting.com', 'wrong-password');
  await expect(loginPage.error).toBeVisible();
  await expect(loginPage.error).toContainText(/invalid/i);
});

test('E2: login con usuario creado por API muestra su nombre en el menú', async ({
  registeredUser,
  loginPage,
  header,
}) => {
  await test.step('login por UI', async () => {
    await loginPage.goto();
    await loginPage.login(registeredUser.email, registeredUser.password);
  });

  await expect(header.accountMenu).toHaveText(
    `${registeredUser.firstName} ${registeredUser.lastName}`,
  );
});

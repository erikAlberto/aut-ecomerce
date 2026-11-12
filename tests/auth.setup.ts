import { test as setup, expect } from '../fixtures/test';
import * as path from 'path';

const authFile = path.join(__dirname, '..', '.auth', 'user.json');

setup('login y guardar el estado de sesión en .auth/user.json', async ({ page, loginPage }) => {
  const email = process.env.AUTH_EMAIL;
  const password = process.env.AUTH_PASSWORD;

  expect(email, 'AUTH_EMAIL debe estar definido (.env o secrets de CI)').toBeTruthy();
  expect(password, 'AUTH_PASSWORD debe estar definido (.env o secrets de CI)').toBeTruthy();

  await loginPage.goto();
  await loginPage.login(email!, password!);

  await expect(page.getByTestId('page-title')).toHaveText('My account');

  await page.context().storageState({ path: authFile });
});

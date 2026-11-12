import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HeaderComponent } from '../pages/HeaderComponent';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { buildUser, type UserData } from '../helpers/userFactory';

export { expect };

const API_BASE_URL = 'https://api.practicesoftwaretesting.com';

export const test = base.extend<{
  loginPage: LoginPage;
  registerPage: RegisterPage;
  header: HeaderComponent;
  homePage: HomePage;
  productPage: ProductPage;
  cartPage: CartPage;
  registeredUser: UserData;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  header: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  registeredUser: async ({ request }, use) => {
    const user = buildUser();

    const response = await request.post(`${API_BASE_URL}/users/register`, {
      data: {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        phone: user.phone,
        dob: user.dob,
        address: {
          street: 'Hauptstrasse 1',
          house_number: user.houseNumber,
          city: 'Vienna',
          state: 'Vienna',
          country: user.country,
          postal_code: user.postalCode,
        },
      },
    });

    expect(response.status()).toBe(201);

    await use(user);
  },
});

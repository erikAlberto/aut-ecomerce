import { test, expect } from '../fixtures/test';
import { buildUser } from '../helpers/userFactory';

test('E1: registro completo redirige al login', async ({ page, registerPage }) => {
  const user = buildUser();

  await test.step('abrir formulario', async () => {
    await registerPage.goto();
  });

  await test.step('rellenar formulario', async () => {
    await registerPage.register(user);
  });

  await expect(registerPage.submitButton).toBeVisible();

  await test.step('dirección autocompletada por postcode lookup', async () => {
    await expect(registerPage.streetInput).not.toHaveValue('');
    await expect(registerPage.cityInput).not.toHaveValue('');
    await expect(registerPage.stateInput).not.toHaveValue('');
  });

  await test.step('enviar formulario', async () => {
    await registerPage.submit();
  });

  await expect(page).toHaveURL(/auth\/login/);
});

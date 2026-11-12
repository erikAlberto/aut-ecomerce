# Ecommerce — pruebas E2E con Playwright

Suite de pruebas end-to-end con Playwright con TypeScript 
Software under test: (https://practicesoftwaretesting.com). 
Los tests cubren:
registro, inicio de sesión y productos/carrito. 

## Requisitos

- Node.js 22 (la versión usada por CI) y npm.
- Acceso a Internet para abrir el sitio y su API.
- Chromium y Firefox instalados mediante Playwright.
- Credenciales de prueba para las variables `AUTH y REGISTER


## Instalación

Desde la raíz del proyecto:

En Windows:

```bash
npm ci
npx playwright install chromium firefox
```

En Linux, si faltan dependencias del sistema para los navegadores:

```bash
npx playwright install --with-deps chromium firefox
```

## Configuración

Copiar `.env.example` a `.env` y completar las cuatro variables:

```dotenv
REGISTER_EMAIL=correo-base@example.com
REGISTER_PASSWORD=contraseña-de-prueba
AUTH_EMAIL=cuenta-de-prueba@example.com
AUTH_PASSWORD=contraseña-de-prueba
```

## Comandos de ejecución

```bash
npx playwright test                         # setup, Chromium y Firefox
npx playwright test --project=chromium      # solo Chromium
npx playwright test --project=firefox       # solo Firefox
npx playwright test tests/register.spec.ts  # un archivo de pruebas
npx playwright show-report                  # abrir el reporte HTML más reciente
```

## Estructura del proyecto

```text
.github/workflows/playwright.yml  # CI: instala dependencias, ejecuta tests y publica el reporte
.env.example                     # plantilla de variables de entorno
data/products.json               # productos y precios esperados para el test del carrito
fixtures/test.ts                 # fixtures de Playwright, Page Objects y usuario registrado por API
helpers/userFactory.ts           # datos de usuario y correo con alias único
helpers/textUtils.ts             # utilidades para comparar nombres de productos
pages/                           # Page Objects: Login, Register, Header, Home, Product y Cart
tests/auth.setup.ts              # login de setup y generación de .auth/user.json
tests/register.spec.ts           # registro mediante la interfaz
tests/login.spec.ts              # login válido, inválido y con usuario creado por API
tests/cart.spec.ts               # agregar productos y comprobar cantidades y total
playwright.config.ts             # URL base, navegadores, locale, reintentos y reporter
```

## Mejoras posibles con más tiempo

- Reutilizar el estado de sesión en pruebas autenticadas y separar los comandos
  frecuentes mediante scripts npm.

# Link del video DEMO:

- https://drive.google.com/file/d/1MnE92iBBNn_9UILKznxAYi7dvjOgDTsK/view?usp=sharing

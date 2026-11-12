import { faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  password: string;
  country: string;
  postalCode: string;
  houseNumber: string;
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function buildUser(): UserData {
  const base = process.env.REGISTER_EMAIL!;
  const [local, domain] = base.split('@');

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dob: toIsoDate(faker.date.birthdate({ min: 18, max: 65, mode: 'age' })),
    phone: faker.string.numeric(9),
    email: `${local}+${Date.now()}@${domain}`,
    password: process.env.REGISTER_PASSWORD!,
    country: 'AT',
    postalCode: '0000',
    houseNumber: '45',
  };
}

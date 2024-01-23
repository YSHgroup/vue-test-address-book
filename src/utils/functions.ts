import type { ParamsType } from 'src/models';

function isObject(value: string | object | []) {
  return value && typeof value === 'object' && value.constructor === Object;
}

function isValidated(params: ParamsType) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const namePattern = /^[a-z]+$/i;
  const { firstName, lastName, email, phone } = params;
  if (!firstName || !lastName || !email || !phone) return false;
  const phoneTmp = phone.replace(/[-()\s]/g, '');

  return (() =>
    firstName.length >= 3 &&
    lastName.length >= 3 &&
    namePattern.test(firstName) &&
    namePattern.test(lastName) &&
    emailPattern.test(email) &&
    phoneTmp.length >= 10 &&
    phoneTmp.length <= 12)();
}

export { isObject, isValidated };

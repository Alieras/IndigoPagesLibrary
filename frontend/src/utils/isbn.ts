export function normalizeIsbn(isbn: string): string {
  return isbn.replace(/[-\s]/g, "");
}

export function isValidIsbn(isbn: string): boolean {
  const normalizedIsbn = normalizeIsbn(isbn);

  if (/^\d{13}$/.test(normalizedIsbn)) {
    return isValidIsbn13(normalizedIsbn);
  }

  if (/^\d{9}[\dX]$/.test(normalizedIsbn)) {
    return isValidIsbn10(normalizedIsbn);
  }

  return false;
}

function isValidIsbn13(isbn: string): boolean {
  let sum = 0;

  for (let index = 0; index < 12; index++) {
    const digit = Number(isbn[index]);

    sum += index % 2 === 0 ? digit : digit * 3;
  }

  const checkDigit = (10 - (sum % 10)) % 10;

  return checkDigit === Number(isbn[12]);
}

function isValidIsbn10(isbn: string): boolean {
  let sum = 0;

  for (let index = 0; index < 10; index++) {
    const character = isbn[index];

    const digit =
      character === "X"
        ? 10
        : Number(character);

    sum += digit * (10 - index);
  }

  return sum % 11 === 0;
}
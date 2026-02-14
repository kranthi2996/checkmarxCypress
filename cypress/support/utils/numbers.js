// Random string with DEFAULT length if min/max not provided
export function randomString(min = 1, max = 20) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const length =
    Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}


// Random number string with DEFAULT length
export function randomNumber(min = 1, max = 15) {
  const length =
    Math.floor(Math.random() * (max - min + 1)) + min;

  return Array.from({ length }, () =>
    Math.floor(Math.random() * 10)
  ).join('');
}

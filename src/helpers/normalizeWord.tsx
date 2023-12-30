export const normalizeName = (word: string | undefined) => {
  let normalized = word
  ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  : undefined;

  if (normalized === undefined) {
    return;
  }

  let result = '';

  for (let i = 0; i < normalized?.length; i++) {
    if (normalized[i] === '-' || normalized[i] === '_') {
      result += ' ';
    } else {
      result += normalized[i];
    }
  }

  return result;
}
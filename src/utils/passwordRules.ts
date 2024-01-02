type PassRules = {
  maxValue: number,
  minValue: number,
  minMessage: string,
  maxMessage: string,
};

export const passwordRules: PassRules = {
  maxValue: 20,
  minValue: 8,
  minMessage: 'Incorrect! Password must be at least 8 characters long',
  maxMessage: 'Incorrect! Password must be maximum of 20 characters long'
};
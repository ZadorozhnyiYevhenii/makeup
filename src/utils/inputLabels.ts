import { IUser } from "../types/IUser";

export const inputLabels: Omit<IUser, 'jwtToken'> = {
  firstName: 'Your name*',
  lastName: 'Your surname*',
  birthdayDate: 'Your birth date',
  phoneNumber: 'Your phone*',
  email: 'Your email*',
  password: 'Your password*',
}
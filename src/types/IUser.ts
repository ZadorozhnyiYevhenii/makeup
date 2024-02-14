import { IOrder } from "./IOrder";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  birthdayDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  jwtToken: string;
  shippingInfos: IOrder[];
  isEmailVerified: boolean;
};
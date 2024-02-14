import { IOrder } from "../types/IOrder";
import { IUser } from "../types/IUser";

export namespace UserInfoTitles {
  export const user: Partial<IUser | undefined> = {
    firstName: 'Your name*',
    lastName: 'Your surname*',
    birthdayDate: 'Your birth date',
    phoneNumber: 'Your phone*',
    email: 'Your email*',
    password: 'Your password*',
  };

  export const address: Partial<IOrder> = {
    city: 'Your city*',
    street: 'Your street*',
    paymentMethod: 'Your payment method*',
    house: 'Your house',
    region: 'Your region*',
    recipientFirstName: 'Your recipitent first name*',
    recipientLastName: 'Your recipient last name*',
    recipientPhoneNumber: 'Your recipient phone number*'
  };
};
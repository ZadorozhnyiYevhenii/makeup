import { CheckoutTitlesEnum } from "./checkoutTitlesEnums";


export namespace CheckoutTitles {
  export const Button = [
    { title: CheckoutTitlesEnum.Button.NEW_CUSTOMER, id: 1 },
    { title: CheckoutTitlesEnum.Button.REGULAR_CUSTOMER, id: 2 }
  ];

  export const SubTitle = [
    { title: CheckoutTitlesEnum.SubTitle.PERSONAL_INFO, id: 1 },
    { title: CheckoutTitlesEnum.SubTitle.DELIVERY_INFO, id: 2 }
  ];
};
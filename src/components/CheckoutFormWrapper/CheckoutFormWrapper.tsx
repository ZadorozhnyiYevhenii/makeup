import { useState } from "react";
import cn from 'classnames';
import { TabWrapper } from "../TabWrapper/TabWrapper";
import { CheckoutNewUserForm } from "../CheckoutNewUserForm/CheckoutNewUserForm";
import { CheckoutTitles } from "../../utils/checkoutTitles";
import { CheckoutTitlesEnum } from "../../utils/checkoutTitlesEnums";
import './CheckoutFormWrapper.scss';

export const CheckoutForm = () => {
  const [activeButton, setActiveButton] = useState(CheckoutTitlesEnum.Button.NEW_CUSTOMER);

  return (
    <div className="checkout-form">
      <ul className="checkout-form__buttons">
        {CheckoutTitles.Button.map(button => (
          <li key={button.id} className={cn("checkout-form__button-item", { 'active': activeButton === button.title })}>
            <button
              type="button"
              onClick={() => setActiveButton(button.title)}
              className={cn("checkout-form__button", { 'active': activeButton === button.title })}
            >
              {button.title}
            </button>
          </li>
        ))}
      </ul>
      <TabWrapper activeTab={activeButton === CheckoutTitlesEnum.Button.NEW_CUSTOMER}>
        <CheckoutNewUserForm />
      </TabWrapper>
      <TabWrapper activeTab={activeButton === CheckoutTitlesEnum.Button.REGULAR_CUSTOMER}>
        <div>qgqgq</div>
      </TabWrapper>
    </div>
  )
}
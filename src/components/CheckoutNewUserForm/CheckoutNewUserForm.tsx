import { useState } from "react";
import cn from 'classnames';
import { CheckoutTitles } from "../../utils/checkoutTitles";
import { TabWrapper } from "../TabWrapper/TabWrapper";
import { CheckoutTitlesEnum } from "../../utils/checkoutTitlesEnums";
import './CheckoutNewUserForm.scss';

export const CheckoutNewUserForm = () => {
  const [activePart, setActivePart] = useState(CheckoutTitlesEnum.SubTitle.PERSONAL_INFO);

  return (
    <div className="checkout-user-form">
      <ul className="checkout-user-form__list">
        {CheckoutTitles.SubTitle.map(subtitle => (
          <li
            key={subtitle.id}
            onClick={() => setActivePart(subtitle.title)}
            className={cn("checkout-user-form__item", { 'active': activePart === subtitle.title })}
          >
            <span className="checkout-user-form__number">{subtitle.id}</span>
            {subtitle.title}
          </li>
        ))}
      </ul>
      <div>
        <TabWrapper activeTab={activePart === CheckoutTitlesEnum.SubTitle.PERSONAL_INFO}>
          <div>
            dada
          </div>
        </TabWrapper>
        <TabWrapper activeTab={activePart === CheckoutTitlesEnum.SubTitle.DELIVERY_INFO}>
          <div>
            jrkjhr
          </div>
        </TabWrapper>
      </div>
    </div>
  )
}
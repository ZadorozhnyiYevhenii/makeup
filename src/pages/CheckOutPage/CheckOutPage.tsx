import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import cn from 'classnames';
import { CheckoutForm } from "../../components/CheckoutFormWrapper/CheckoutFormWrapper";
import { CartList } from "../../components/CartList/CartList";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './CheckoutPage.scss';

export const CheckOutPage = () => {
  const total = useAppSelector(state => state.cart.totalAmount);
  const [toggleTitle, setToggleTitle] = useState(false);

  const handleOpenCartList = () => {
    setToggleTitle(prev => !prev);
  };

  console.log(total)
  return (
    <div className="checkout">
      <div className="checkout__items">
        <div className={cn('checkout__title-container', {'active': toggleTitle })} onClick={handleOpenCartList}>
          <h3 className="checkout__title">Your order</h3>
          <KeyboardArrowDownIcon/>
        </div>
        {toggleTitle && <CartList />}
      </div>
      <div className="checkout__total">
        <span className="checkout__total-title">Total</span>
        <span className="checkout__total-value">{total}</span>
      </div>
      <CheckoutForm />
    </div>
  )
};
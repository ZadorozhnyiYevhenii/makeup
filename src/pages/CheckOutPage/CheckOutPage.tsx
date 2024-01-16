import { useEffect, useState } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setToggleTitle(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="checkout">
      <div className="checkout__content">
        <div className="checkout__cards">
          <div className={cn('checkout__title-container', { 'active': toggleTitle })} onClick={handleOpenCartList}>
            <h3 className="checkout__title">Your order</h3>
            <KeyboardArrowDownIcon />
          </div>
          {toggleTitle && <CartList />}
        </div>
        <div className="checkout__total">
          <span className="checkout__total-title">Total</span>
          <span className="checkout__total-value">{total} $</span>
        </div>
      </div>
      <div className="checkout__form">
        <CheckoutForm />
      </div>
    </div>
  )
};
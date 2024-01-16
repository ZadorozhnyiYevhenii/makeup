import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setTotalAmount } from "../../app/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';
import { CartList } from "../../components/CartList/CartList";
import './Cart.scss';

export const Cart: FC = () => {
  const { cart, counts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleMoveToCheckout = () => {
    if (!!cart) {
      navigate('/makeup/checkout');
    }
  };

  const close = () => {
    navigate(-1);
  };

  if (cart?.length === 0) {
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  }

  const totalValue = cart?.reduce((total, product) => {
    return total + product.price * counts[`${product.id}_${product.variationName}`];
  }, 0);

  useEffect(() => {
    dispatch(setTotalAmount(totalValue))
  }, [dispatch, totalValue]);

  useEffect(() => {
    document.body.style.overflow = !!cart?.length ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [cart]);

  return (
    <div className="cart">
      <div className="cart__wrapper">
        <h2 className="cart__title">Your Cart</h2>
        <button
          onClick={close}
          type="button"
          className="cart__back"
          data-testid="cart__back"
        >
          <ClearIcon />
        </button>
      </div>
      <div className="cart__list">
        <div className="cart__cartlist-wrapper">
          <CartList />
        </div>
        <div className="cart__total">
          <div className="cart__total-wrapper">
            <div className="cart__total-value">
              <strong>Total value:</strong>
            </div>
            <div className="cart__totalPrice">
              <strong data-testid="cart__totalPrice">{totalValue} $</strong>
            </div>
          </div>
          <button
            type="button"
            className="cart__checkout"
            onClick={handleMoveToCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

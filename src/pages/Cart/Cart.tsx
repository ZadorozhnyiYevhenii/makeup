import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCount, decrementCount, removeFromCart } from "../../app/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import './Cart.scss';

export const Cart: FC = () => {
  const { cart, counts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const close = () => {
    navigate(-1);
  };

  if (cart.length === 0) {
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  }

  const handleRemove = (productId: number) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncrementCount = (productId: number) => {
    dispatch(addCount(productId));
  };

  const handleDecrementCount = (productId: number) => {
    dispatch(decrementCount(productId));
  };

  const totalValue = cart.reduce((total, product) => {
    return total + product.price * counts[product.id];
  }, 0);

  useEffect(() => {
    document.body.style.overflow = cart.length > 0 ? "hidden" : "auto";
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
      <div className="cart__list" data-testid="cart__list">
        {cart.map((product) => (
          <div key={product.id} className="cart__item">
            <div className="cart__photo-container">
              <Link to="/" className="cart__link">
                <img
                  src={product.img[0]}
                  alt={`${product.name} img`}
                  className="cart__img"
                />
              </Link>
            </div>
            <div className="cart__container">
              <h3 className="cart__name">{product.name}</h3>
              <div className="cart__type">{product.type}</div>
              <div className="cart__count">{product.quantity} ml</div>
              <div className="cart__price">{product.price * counts[product.id]} $</div>
              <div className="cart__wrap">
                <div className="cart__control">
                  <div className="cart__button" onClick={() => handleDecrementCount(product.id)}><RemoveIcon /></div>
                  <span className="cart__quantity">{counts[product.id]}</span>
                  <div className="cart__button" onClick={() => handleIncrementCount(product.id)}><AddIcon /></div>
                </div>
                <div onClick={() => handleRemove(product.id)}><DeleteOutlineIcon /></div>
              </div>
            </div>
          </div>
        ))}
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
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

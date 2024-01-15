import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCount, decrementCount, removeFromCart } from "../../app/slices/cartSlice";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export const CartList = () => {
  const { cart, counts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemove = (productId: number, variationName: string) => {
    dispatch(removeFromCart({ productId, variationName }));
  };

  const handleAddCount = (productId: number, variationName: string) => {
    dispatch(addCount({ productId, variationName }));
  };

  const handleDecrementCount = (productId: number, variationName: string) => {
    dispatch(decrementCount({ productId, variationName }));
  };

  return (
    <div className="cart__items">
      {cart?.map((product) => (
        <div key={`${product.id}_${product.variationName}`}>
          <div className="cart__item">
            <div className="cart__photo-container">
              <Link to="/" className="cart__link">
                <img
                  src={product.images.map(i => i.imageLink)[0]}
                  alt={`${product.id} img`}
                  className="cart__img"
                />
              </Link>
            </div>
            <div className="cart__container">
              <h3 className="cart__name">{product.name}</h3>
              <div className="cart__type">{product.type}</div>
              <div className="cart__count">{product.variationName}</div>
              <div className="cart__price">
                {product.price * counts[`${product.id}_${product.variationName}`]} $
              </div>
              <div className="cart__wrap">
                <div className="cart__control">
                  <div className="cart__button" onClick={() => handleDecrementCount(product.id, product.variationName)}><RemoveIcon /></div>
                  <span className="cart__quantity">{counts[`${product.id}_${product.variationName}`]}</span>
                  <div className="cart__button" onClick={() => handleAddCount(product.id, product.variationName)}><AddIcon /></div>
                </div>
                <div onClick={() => handleRemove(product.id, product.variationName)}><DeleteOutlineIcon /></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
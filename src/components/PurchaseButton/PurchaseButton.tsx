import { FC } from "react"
import { IProd } from "../../types/IProduct"
import { useAppDispatch } from "../../app/hooks"
import { addToCart } from "../../app/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import './PurchaseButton.scss';

type Props = {
  product: IProd,
}

export const PurchaseButton: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBuy = () => {
    dispatch(addToCart(product));
    navigate('/makeup/cart');
  };

  return (
    <button
      type="button"
      onClick={handleBuy}
      className="purchase-button"
    >
      Buy
    </button>
  )
}
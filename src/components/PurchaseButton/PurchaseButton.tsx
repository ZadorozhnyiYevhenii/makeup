import { FC } from "react"
import { useAppDispatch } from "../../app/hooks"
import { addToCart } from "../../app/slices/cartSlice"
import { useNavigate } from "react-router-dom"
import './PurchaseButton.scss';
import { IProd } from "../../types/IProduct";

type Props = {
  product: IProd | undefined,
}

export const PurchaseButton: FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBuy = () => {
    if (product) {
      dispatch(addToCart(product));
      navigate('/makeup/cart');
    }
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
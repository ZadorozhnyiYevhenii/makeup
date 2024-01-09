import { FC } from "react"
import { useNavigate } from "react-router-dom"
import './PurchaseButton.scss';
import { IProd } from "../../types/IProduct";

type Props = {
  product: IProd | undefined,
  addToCart: (product: IProd) => void;
}

export const PurchaseButton: FC<Props> = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const handleBuy = () => {
    if (product) {
      addToCart(product);
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
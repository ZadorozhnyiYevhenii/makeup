import { FC } from "react";
import './TotalAmountOfProducts.scss';

type Props = {
  totalCount: number
}

export const TotalAmountOfProducts: FC<Props> = ({ totalCount }) => {
  return (
    <div className="totalAmount">{totalCount} products</div>
  )
};

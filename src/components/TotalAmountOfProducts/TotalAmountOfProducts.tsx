import { FC } from "react";
import './TotalAmountOfProducts.scss';

type Props = {
  totalCount: number | undefined
}

export const TotalAmountOfProducts: FC<Props> = ({ totalCount }) => {
  return (
    <div className="totalAmount">{totalCount} products</div>
  )
};

import { FC } from "react";
import { IProd } from "../../types/IProduct";
import './CategoryTitle.scss';

type Props = {
  products: IProd[] | undefined,
}

export const CategoryTitle:FC<Props> = ({
  products
}) => {
  return (
    <>
      {products?.map(product => (
        <h1 className="category-title" key={product.id}>{product.categories.map(prod => prod.name)}</h1>
      ))}
    </>
  )
}
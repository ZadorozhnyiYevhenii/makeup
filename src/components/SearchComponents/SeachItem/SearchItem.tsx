import { FC } from "react";
import { IProd } from "../../../types/IProduct";
import { ScrollTopLink } from "../../../helpers/scrollTopLink";
import { normalizeName } from "../../../helpers/normalizeWord";
import './SearchItem.scss';

type Props = {
  id: number;
  product: IProd;
  onClose: () => void;
}

export const SearchItem: FC<Props> = ({ id, product, onClose }) => {
  const normalizeStatus = normalizeName(product.productStatus);

  return (
    <div className="searchItem">
      <ScrollTopLink to={`/makeup/product/${id}`} onClose={onClose}>
        <div className="searchItem__photo" onClick={onClose}>
          <img
            src={product.productVariations[0].variationImage.imageLink}
            alt={product.name}
            className="searchItem__img"
          />
        </div>
      </ScrollTopLink>
      <div className="searchItem__container">
        <div>
          <ScrollTopLink to={`/makeup/product/${id}`} onClose={onClose}>
            <div className="searchItem__name">{product.name}</div>
            <div className="searchItem__brand">{product.brand.name}</div>
          </ScrollTopLink>
        </div>
        <div>
          <div className="searchItem__status">{normalizeStatus}</div>
          <div>{product.productVariations[0].variationDetails[0].price} $</div>
        </div>
      </div>
    </div>
  )
}
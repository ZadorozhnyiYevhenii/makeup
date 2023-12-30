import { FC } from "react"
import { IProd } from "../../types/IProduct"
import { SelectMenu } from "../SelectMenu/SelectMenu"
import { PurchaseButton } from "../PurchaseButton/PurchaseButton"
import { normalizeName } from "../../helpers/normalizeWord"
import { QueryComponent } from "../QueryComponent/QueryComponent"
import { ApolloError } from "@apollo/client"

type Props = {
  product: IProd | undefined,
  modalRef: React.MutableRefObject<HTMLDivElement | null>
  deliveryInfoOpened: () => void,
  showDeliveryInfo: boolean,
  loading:  boolean,
  error: ApolloError | undefined,
}

export const ProductCardInfo: FC<Props> = ({
  product,
  modalRef,
  deliveryInfoOpened,
  showDeliveryInfo,
  loading,
  error
}) => {
  const category = product?.categories.map(prod => prod.name);

  const price = product?.productVariations.map(prod => prod.variationDetails.map(pr => pr.price)[0])[0]

  const normalizeAvailability = normalizeName(product?.productStatus)

  return (
    <>
      <QueryComponent isLoading={loading} error={error} errorMessage="product info">
        <div className='product__description'>
          <h1 className='product__name'>{product?.name}</h1>
          <div className='product__type'>{category}</div>
        </div>
        <div className='product__container'>
          <div className='product__price'>
            {price} $
          </div>
          <div className='product__select'>
            <SelectMenu product={product} />
          </div>
          <div className='product__buy'>
            <PurchaseButton product={product} />
            <div className='product__info'>
              <div className='product__stock'>{normalizeAvailability ? 'In stock!' : ''}</div>
              <div className='product__code'>status:
                <br />
                <span className='product__number'> {normalizeAvailability}</span>
              </div>
            </div>
            <div
              className='product__delivery'
              onClick={deliveryInfoOpened}
              ref={modalRef}
            >
              <span>Free Delivery!</span>
              {showDeliveryInfo && (
                <div className='product__delivery-modal'>
                  0 грн - курьером MAKEUP. Минимальная сумма заказа - 169 грн.
                  <br />
                  "Укрпочта" - 0 грн при сумме заказа от 249 грн. Для заказов на сумму от 169 грн до 249 грн - доставка всего 13 грн.
                  <br />
                  Доставка другими перевозчиками — 0 грн. при заказе на сумму от 799 грн.
                  <br />
                  При выборе товара с флажком ЕС — бесплатно со склада в ЕС при сумме заказа от 890 грн
                </div>
              )}
            </div>
          </div>
        </div>
      </QueryComponent>
    </>
  )
}
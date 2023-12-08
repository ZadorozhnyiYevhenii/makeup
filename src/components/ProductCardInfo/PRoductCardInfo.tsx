import { FC } from "react"
import { IProd } from "../../types/IProduct"
import { SelectMenu } from "../SelectMenu/SelectMenu"

type Props = {
  product: IProd | undefined,
  modalRef: React.MutableRefObject<HTMLDivElement | null>
  deliveryInfoOpened: () => void,
  showDeliveryInfo: boolean
}

export const ProductCardInfo: FC<Props> = ({
  product,
  modalRef,
  deliveryInfoOpened,
  showDeliveryInfo
}) => {
  return (
    <>
      {product ? (
        <>
          <div className='product__description'>
            <h1 className='product__name'>{product?.name}</h1>
            <div className='product__type'>{product?.productType}</div>
          </div>
          <div className='product__container'>
            <div className='product__price'>
              {product?.price}
            </div>
            <div className='product__select'>
              <SelectMenu />
            </div>
            <div className='product__buy'>
              <div className='product__button'>Buy</div>
              <div className='product__info'>
                <div className='product__stock'>In stock!</div>
                <div className='product__code'>code:
                  <span className='product__number'> {product?.code}</span>
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
        </>
      ) : (
        <div>Error loading...</div>
      )}
    </>
  )
}
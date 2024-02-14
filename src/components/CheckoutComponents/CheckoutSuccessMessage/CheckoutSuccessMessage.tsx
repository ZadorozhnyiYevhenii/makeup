import { Link } from "react-router-dom"

export const CheckoutSuccessMessage = ({
  message
}: {
  message: string
}) => {
  return (
    <div className="checkout-user-form__modal">
      <p className="checkout-user-form__modal-message">{message}</p>
      <Link to={'/makeup'} className="checkout-user-form__modal-link">Shopping more</Link>
    </div>
  )
}
import { useAppSelector } from "../../app/hooks";

export const CheckOutPage = () => {
  const total = useAppSelector(state => state.cart.totalAmount)

  console.log(total)
  return (
    <>
        <div>ddada</div>
    </>
  )
};
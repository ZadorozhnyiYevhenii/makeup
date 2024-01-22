import { FC } from "react"
import { IProd } from "../../../types/IProduct"
import { UseFormRegister } from "react-hook-form"
import './AdminInputWithLabel.scss';

type Props = {
  label: string,
  name: keyof IProd,
  register: UseFormRegister<IProd>
  errorMessage?: string,
  defaultValue?: keyof IProd,
  required?: boolean
}

export const AdminInpuWithLabel: FC<Props> = ({
  label,
  name,
  register,
  errorMessage,
  defaultValue,
  required
}) => {
  const inputProps = {
    ...register(name, {
      required: required ? `${label} is required` : false,
    })
  }

  return (
    <div className="admin-input">
      {errorMessage ? (
        <div className="admin-input__label admin-input__label--warn">{errorMessage}</div>
      ) : (
        <label className="admin-input__label">{label}</label>
      )}
      <input {...inputProps} className="admin-input__input" defaultValue={defaultValue} />
    </div>
  )
}
import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { IUser } from "../../types/IUser";
import './InputWithLabel.scss';

type Props = {
  label: string,
  name: keyof IUser,
  register: UseFormRegister<IUser>
  errorMessage?: string,
  isEmail?: boolean,
  typeTel?: boolean
}

export const InputWithLabel: FC<Props> = ({
  label,
  name,
  register,
  errorMessage,
  isEmail,
}) => {
  const validateWithRules = {
    ...(name !== "birthDate" && {
      required: `${label} is required`,
    }),
    ...(isEmail && {
      pattern: {
        value: /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u,
        message: 'Please enter valid email'
      },
    })
  }

  return (
    <div className="register-input">
      <input
        type='text'
        {...register(name, validateWithRules)}
        className='register-input__input'
      />
      {errorMessage ? (
        <div className="register-input__label register-input__label--warn">{errorMessage}</div>
      ) : (
        <label className="register-input__label">{label}</label>
      )}
    </div>
  )
}
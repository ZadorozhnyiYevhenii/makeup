import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { IUser } from "../../types/IUser";
import './UserInputWithLabel.scss';
import { emailPattern } from "../../utils/emailPattern";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";
import { passwordRules } from "../../utils/passwordRules";

type Props = {
  label: string,
  name: keyof IUser,
  register: UseFormRegister<IUser>
  errorMessage?: string,
  isEmail?: boolean,
  isPassword?: boolean
}

export const UserInputWithLabel: FC<Props> = ({
  label,
  name,
  register,
  errorMessage,
  isEmail,
  isPassword
}) => {
  const { type, toggleIcon, togglePasswordIcon } = usePasswordToggle();

  const inputProps = {
    ...register(name, {
      ...(name !== 'birthdayDate' && {
        required: `${label} is required`,
      }),
      ...(isEmail && {
        pattern: {
          value: emailPattern.value,
          message: emailPattern.message,
        },
      }),
      ...isPassword && {
        minLength: {
          value: passwordRules.minValue,
          message: passwordRules.minMessage,
        },
        maxLength: {
          value: passwordRules.maxValue,
          message: passwordRules.maxMessage
        }
      }
    }),
    type: isPassword ? type : 'text',
    className: 'register-input__input',
  };

  return (
    <div className="register-input">
      <input {...inputProps} />
      {errorMessage ? (
        <div className="register-input__label register-input__label--warn">{errorMessage}</div>
      ) : (
        <label className="register-input__label">{label}</label>
      )}
      {isPassword && (
        <div className="register-input__toggle" onClick={togglePasswordIcon}>
          {toggleIcon}
        </div>
      )}
    </div>
  )
}

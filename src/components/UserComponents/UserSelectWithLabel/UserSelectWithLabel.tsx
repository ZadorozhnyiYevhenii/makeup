import { ChangeEvent, FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IUser } from "../../../types/IUser";
import { IOrder } from "../../../types/IOrder";

type Props<T extends FieldValues> = {
  label: string | undefined;
  name: keyof IUser | keyof IOrder;
  register: UseFormRegister<IUser | IOrder>;
  errorMessage?: string;
  renderOptions: (register: UseFormRegister<T>) => React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export const UserSelectWithLabel: FC<Props<any>> = ({
  label,
  name,
  register,
  errorMessage,
  renderOptions,
  onChange,
  value
}) => {
  const selectProps = {
    ...register(name, {
      required: `${label} is required`,
    })
  };

  return (
    <div className="admin-input">
      {errorMessage ? (
        <div className="admin-input__label admin-input__label--warn">{errorMessage}</div>
      ) : (
        <label className="admin-input__label">{label}</label>
      )}
      <select {...selectProps} className="admin-input__input" onChange={onChange} value={value}>
        {renderOptions(register)}
      </select>
    </div>
  );
};

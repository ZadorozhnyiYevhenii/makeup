import { ChangeEvent, FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IProd } from "../../types/IProduct";

type Props<T extends FieldValues> = {
  label: string;
  name: keyof IProd;
  register: UseFormRegister<IProd>;
  errorMessage?: string;
  renderOptions: (register: UseFormRegister<T>) => React.ReactNode;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export const AdminSelectWithLabel: FC<Props<any>> = ({
  label,
  name,
  register,
  errorMessage,
  renderOptions,
  onChange
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
      <select {...selectProps} className="admin-input__input" onChange={onChange}>
        {renderOptions(register)}
      </select>
    </div>
  );
};

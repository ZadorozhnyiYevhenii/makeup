import React, { memo, useState } from "react";
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import { CrossIcon } from "../../assets/CrossIcon";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
  onClose: () => void,
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const [type, setType] = useState('password');
  const [toggleIcon, setToggleIcon] = useState(<VisibilityOffIcon />);

  const togglePasswordVisibility = () => {
    setType((prevType) => prevType === 'password' ? 'text' : 'password');
    setToggleIcon((prevIcon) => prevIcon.type === VisibilityOffIcon ? <VisibilityIcon /> : <VisibilityOffIcon />);
  };

  return (
    <div className="login">
      <div className="login__top">
        <h2 className="login__title">Login to your personal account</h2>
        <div
          className="login__close"
          onClick={onClose}
        >
          <CrossIcon />
        </div>
      </div>
      <div className="login__wrapper">
        {/* атрибут action после появления апи! */}
        <form
          className="login__form"
        >
          <input 
            type="text"
            className="login__input"
            placeholder="E-mail"
          />
         <div className="login__password-container">
            <input
              type={type}
              className="login__password"
              placeholder="Password"
            />
            <div className="login__toggle" onClick={togglePasswordVisibility}>
              {toggleIcon}
            </div>
          </div>
          <button
            className="login__button"
          >
            Log in
          </button>
        </form>
      </div>
      <div className="login__last">
        <span className="login__lost">Forgot your password</span>
        <Link
          to="/makeup/register"
          className="login__register"
        >
          Registration
        </Link>
      </div>
    </div>
  )
}
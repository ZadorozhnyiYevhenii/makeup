import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import { CrossIcon } from "../../assets/CrossIcon";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

type Props = {
  onClose: () => void,
}

export const LoginForm: React.FC<Props> = memo(({ onClose }) => {
  const [type, setType] = useState('password');
  const [toggleIcon, setToggleIcon] = useState(<VisibilityOffIcon />);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const emailRef = useRef<HTMLInputElement | null>(null);

  const togglePasswordVisibility = () => {
    setType((prevType) => prevType === 'password' ? 'text' : 'password');
    setToggleIcon((prevIcon) => prevIcon.type === VisibilityOffIcon ? <VisibilityIcon /> : <VisibilityOffIcon />);
  };

  const emailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const emailOnFocus = () => {
    if (!email.includes('@')) {
      setError('Enter a valid email!');
      setEmail('');
    }
    setError('');
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const desktopWidth = window.innerWidth > 1023;

    if (desktopWidth && emailRef.current) {
      emailRef.current.focus();
    }
  }, [])

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
        <form
          onSubmit={onSubmit}
          className="login__form"
        >
          <div className="login__email-container">
          {error && <div className="login__error">{error}</div>}
          <input 
            type="text"
            className="login__input"
            placeholder="E-mail"
            value={email}
            onChange={emailCheck}
            onFocus={emailOnFocus}
            ref={emailRef}
          />
          </div>
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
  );
});
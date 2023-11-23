import React from "react";
import { Link } from 'react-router-dom';
import './LoginForm.scss';
import { CrossIcon } from "../../assets/CrossIcon";

export const LoginForm: React.FC = () => {
  return (
    <div className="login">
      <div className="login__top">
        <h2 className="login__title">Login to your personal account</h2>
        <CrossIcon />
      </div>
      <div className="login__wrapper">
        {/* атрибут action после появления апи! */}
        <form
          className="login__form"
        >
          <input 
            type="text"
            className="login__input"
          />
          <input
            type="password"
            className="login__input"
          />
          <button
            className="login__button"
          >
            Log in
          </button>
        </form>
      </div>
      <div>
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
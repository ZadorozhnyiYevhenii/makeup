import React, { useState } from 'react';
import './SubscribeForm.scss';

export const SubscribeForm = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <form action="" className={`subscribe ${isInputFocused ? 'focused' : ''}`}>
      <div className="subscribe__wrap">
        <div className='subscribe__title'>Be the first to know about sales and new products!</div>
        <div className="subscribe__content">
          <div className="subscribe__container">
            <input
              type="text"
              className='subscribe__input'
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <label className='subscribe__label'>Email</label>
          <button 
            type="submit"
            className="subscribe__button"
          >
            Subscribe
          </button>
          </div>
        </div>
        <ul className="subscribe__list">
          <li className="subscribe__item subscribe__item--fb"></li>
          <li className="subscribe__item subscribe__item--yt"></li>
          <li className="subscribe__item subscribe__item--tw"></li>
          <li className="subscribe__item subscribe__item--inst"></li>
        </ul>
      </div>
    </form>
  );
};

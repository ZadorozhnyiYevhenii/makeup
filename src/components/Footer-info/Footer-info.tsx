import { Link } from 'react-router-dom';
import './Footer-info.scss';

export const FooterInfo = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__phones">
          <a 
            href="tel:0440000000"
            className='footer__phone'
          >(044) 000 00 00</a>
          <a 
            href="tel:0800000000"
            className='footer__phone'
          >0(800) 00 00 00</a>
        </div>
        <div className="footer__time">Daily from 7:55 to 20:05</div>
        <div className="footer__call">Call back</div>
        <div className="footer__cooperation">Cooperate with us</div>
      </div>
      <div className='footer__wrap'>
        <div className='footer__cols'>
          <div className="footer__col">
            <h3 className='footer__title'>
              <Link to="makeup/delivery">Delivery</Link>
            </h3>
            <ul className='footer__list'>
              <li className='footer__item'>Payment Methods</li>
              <li className='footer__item'>About products</li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className='footer__title'>Beauty club</h3>
            <ul className='footer__list'>
              <li className='footer__item'>Terms of Use</li>
              <li className='footer__item'>Exchange and return</li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className='footer__title'>Articles</h3>
            <ul className='footer__list'>
              <li className='footer__item'>News</li>
            </ul>
          </div>
          <div className="footer__col">
            <h3 className='footer__title'>About us</h3>
            <ul className='footer__list'>
              <li className='footer__item'>Contacts</li>
              <li className='footer__item'>App</li>
              <li className='footer__item'>Affiliate program</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
import { AboutUs } from '../../AboutUs/AboutUs';
import { FooterInfo } from '../Footer-info/Footer-info';
import { FooterRights } from '../Footer-rights/Footer-rights';
import { SubscribeForm } from '../../SubscribeForm/SubscribeForm';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className='footer-container'>
      <AboutUs />
      <SubscribeForm />
      <FooterInfo />
      <FooterRights />
    </footer>
  )
} 
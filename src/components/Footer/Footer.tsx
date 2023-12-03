import { AboutUs } from '../AboutUs/AboutUs';
import { FooterInfo } from '../Footer-info/Footer-info';
import { SubscribeForm } from '../SubscribeForm/SubscribeForm';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer>
      <AboutUs />
      <SubscribeForm />
      <FooterInfo />
    </footer>
  )
} 
import NorthIcon from '@mui/icons-material/North';
import './BackToTopButton.scss';
import { memo, useEffect, useState } from 'react';
import cn from 'classnames';

export const BackToTopButton = memo(() => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0.5 * window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className={cn('backButton', {
        'backButton--none': !isVisible,
      })}
      onClick={scrollUp}
    >
      <NorthIcon />
    </div>
  )
});
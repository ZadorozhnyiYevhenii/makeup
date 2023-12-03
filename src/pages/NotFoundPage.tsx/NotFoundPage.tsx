import { useEffect } from 'react';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';

const UnderConstructionPage = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/makeup');
    }, 4000);

    return () => {
      clearTimeout(timer);
    }
  }, [nav])

  return (
    <div className='notfound'>
      <h1>Page under construction</h1>
      <p>Sorry, this page is not ready yet. We are working on it!</p>
    </div>
  );
};

export default UnderConstructionPage;

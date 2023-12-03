import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './404.scss';

export const ErrorPage = () => {
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      nav('/makeup');
    }, 5000);

    return () => {
      clearTimeout(timer);
    }
  }, [nav])

  return (
    <div className="error">
      <h1 className="error__title">404 Page/Not found</h1>
    </div>
  )
}
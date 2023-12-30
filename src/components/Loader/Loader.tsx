import './Loader.scss';

export const Loader = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner-container">
        <div className="spinner">
          <div className="spinner-circle spinner-top spinner-animation"></div>
        </div>
      </div>
    </div>
  );
};

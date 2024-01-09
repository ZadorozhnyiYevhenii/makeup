import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import WestIcon from '@mui/icons-material/West';
import './BreadCrumbs.scss';

type Props = {
  renderOptions: () => React.ReactNode
}

export const Breadcrums: FC<Props> = ({ renderOptions }) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  }

  return (
    <div className="breadcrumbs">
      <button
        type="button"
        onClick={onClick}
        className="breadcrumbs__button"
      >
        <WestIcon />
      </button>
      <ul className="breadcrumbs__list">
        <Link to='/makeup' className="breadcrumbs__item">MAKEUP</Link>
        {renderOptions()}
      </ul>
    </div>
  );
}

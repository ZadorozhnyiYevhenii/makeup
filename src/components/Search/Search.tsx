import React, { useState } from "react";
import { SearchIconHeader } from "../../assets/SearchIcon";
import { CrossIcon } from "../../assets/CrossIcon";
import './Search.scss';

type Props = {
  onCross: () => void,
}

export const SearchBar: React.FC<Props> = ({ onCross }) => {
  const [appliedQuery, setAppliedQuery] = useState('');


  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppliedQuery(event.target.value);
  };

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__icon">
          <SearchIconHeader />
        </div>
        <input
          type="text"
          className="search__input"
          value={appliedQuery}
          onChange={(e) => handleQueryChange(e)}
          placeholder="More than 100 000 goods"
        />
        <div
          onClick={onCross}
          className="search__cross"
        >
          <CrossIcon />
        </div>
      </div>
    </div>
  )
}
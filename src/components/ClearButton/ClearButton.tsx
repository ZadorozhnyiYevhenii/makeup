import React from "react";
import './ClearButton.scss';

interface ClearFilterButtonProps {
  onClick: () => void;
}

export const ClearFilterButton: React.FC<ClearFilterButtonProps> = ({ onClick }) => {
  return (
    <button className="clear-filter-button" onClick={onClick}>
      Clear Filters
    </button>
  );
};


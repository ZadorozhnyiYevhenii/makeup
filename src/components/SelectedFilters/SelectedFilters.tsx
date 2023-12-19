import { FC } from "react";
import './SelectedFilters.scss';

type Props = {
  onFilterRemove: (filter: string) => void,
  filters: string[],
}

export const SelectedFilters: FC<Props> = ({ onFilterRemove, filters }) => {
  return (
    <div className="selected-filters">
      <div className="selected-filters__list">
        {filters.map((filter) => (
          <div
            key={filter}
            className="selected-filters__item"
            onClick={() => onFilterRemove(filter)}
          >
            <span className="selected-filters__name">{filter}</span>
            <div
              className="selected-filters__button"
            >
              X
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
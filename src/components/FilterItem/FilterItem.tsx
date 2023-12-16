import { FC } from "react";
import './FilterItem.scss';

type Props = {
  isBlockOpen: boolean,
  handleFilterChange: (filter: string) => void,
  filterItems: string[],
  selectedfilter: string[]
}

export const FilterItem: FC<Props> = ({
  isBlockOpen,
  handleFilterChange,
  filterItems,
  selectedfilter
}) => {
  return (
    <>
      {isBlockOpen && (
        <div className="filter-item">
          {filterItems.map(item => (
            <label key={item} className="filter-item__label">
              <input
                type="checkbox"
                value={item}
                checked={selectedfilter.includes(item)}
                onChange={() => handleFilterChange(item)}
                className="filter-item__checkbox"
              />
              {item}
            </label>
          ))}
        </div>
      )}
    </>
  )
}
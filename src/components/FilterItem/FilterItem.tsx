import { FC } from "react";
import './FilterItem.scss';

type Props = {
  isBlockOpen: boolean,
  handleFilterChange: (filter: string) => void,
  filterItems: string[],
  selectedfilter: string[],
  productCount: Record<string, number>;
}

export const FilterItem: FC<Props> = ({
  isBlockOpen,
  handleFilterChange,
  filterItems,
  selectedfilter,
  productCount
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
                checked={selectedfilter.length > 0 && selectedfilter.includes(item)}
                onChange={() => handleFilterChange(item)}
                className="filter-item__checkbox"
              />
              {item} ({productCount[item] || 0})
            </label>
          ))}
        </div>
      )}
    </>
  )
}
import { FC } from 'react'
import './FilterButtons.scss'

type Props = {
  onFiltersOpen: () => void,
  onSortOpen: () => void,
}

export const FilterButtons: FC<Props> = ({
  onFiltersOpen,
  onSortOpen
}) => {
  return (
    <div className="filter">
      <div className="filter__mobile-buttons">
        <div className="filter__mobile-button" onClick={onFiltersOpen}>Filters</div>
        <div className="filter__mobile-button" onClick={onSortOpen}>Sort</div>
      </div>
    </div>
  )
}
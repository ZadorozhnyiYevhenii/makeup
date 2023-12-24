import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this line to extend Jest's expect
import { SelectedFilters } from './SelectedFilters';

describe('SelectedFilters', () => {
  const mockOnFilterRemove = jest.fn();

  const renderComponent = (filters: string[]) => {
    render(<SelectedFilters onFilterRemove={mockOnFilterRemove} filters={filters} />);
  };

  test('renders SelectedFilters component with filters', () => {
    const filters = ['Filter1', 'Filter2'];

    renderComponent(filters);

    filters.forEach((filter) => {
      expect(screen.getByText(filter)).toBeInTheDocument();
    });
  });

  test('handles filter removal correctly', () => {
    const filters = ['Filter1', 'Filter2'];

    renderComponent(filters);

    filters.forEach((filter) => {
      const filterItem = screen.getByText(filter);
      fireEvent.click(filterItem);

      expect(mockOnFilterRemove).toHaveBeenCalledWith(filter);
    });
  });
});

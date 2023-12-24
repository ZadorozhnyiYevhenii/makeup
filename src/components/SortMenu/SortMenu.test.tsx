import { render, screen } from "@testing-library/react";
import { SortOptions } from "../../utils/sortOptions";
import { SortMenu } from "./SortMenu";
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";

describe('Sort menu', () => {
  const mockOnClose = jest.fn();
  const mockOnSort = jest.fn();

  const renderComponent = (props = {}) => {
    render(
      <SortMenu
        onClose={mockOnClose}
        onSort={mockOnSort}
        isSortMenuOpen={true}
        selectedSortOption={SortOptions.BY_NAME}
        {...props}
      />
    );
  };

  test('hides background overlay when sort menu closed', () => {
    renderComponent({ isSortMenuOpen: false });

    expect(screen.getByTestId('background-overlay')).toHaveStyle('display: none');
  });

  test('calls onSort when option is clicked', () => {
    renderComponent();

    userEvent.click(screen.getByText(SortOptions.ASCENDING));
    expect(mockOnSort).toHaveBeenCalledWith(SortOptions.ASCENDING);
  })

  test('calls onClose when close button is clicked', () => {
    renderComponent();

    userEvent.click(screen.getByTestId('onClose-button'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('renders Sort menu with correct options and selected option', () => {
    renderComponent();

    expect(screen.getByText(SortOptions.BY_NAME)).toBeInTheDocument();
    expect(screen.getByText(SortOptions.ASCENDING)).toBeInTheDocument();
    expect(screen.getByText(SortOptions.DESCENDING)).toBeInTheDocument();
    expect(screen.getByText(SortOptions.BY_PRICE)).toBeInTheDocument();

    expect(screen.getByText(SortOptions.BY_NAME)).toHaveClass('sort__item--selected')
  })
});
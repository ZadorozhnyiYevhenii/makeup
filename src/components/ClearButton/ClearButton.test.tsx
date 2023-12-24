import { render, screen } from '@testing-library/react';
import { ClearFilterButton } from "./ClearButton";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

describe('Clear Button', () => {
  const mockOnClearButton = jest.fn();

  const renderComponent = () => {
    render(<ClearFilterButton onClick={mockOnClearButton} />);
  };

  test('calls onCLick when it is called', () => {
    renderComponent();

    const clearButton = screen.getByTestId('clear-filter-button');
    userEvent.click(clearButton);

    expect(mockOnClearButton).toHaveBeenCalled();
  });

  test('renders Clear filter button with correct text and className', () => {
    renderComponent();

    const clearButton = screen.getByTestId('clear-filter-button');

    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveClass('clear-filter-button')
  })
})
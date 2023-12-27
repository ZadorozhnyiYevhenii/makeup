import { screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { renderWithRouterAndStore } from "../../helpers/renderWithRouter";
import { Cart } from "./Cart";

describe('Cart Component', () => {
    test('render cart list correctly', () => {
      renderWithRouterAndStore(<Cart />, 'cart');

      const cartItem = screen.getByTestId('cart__list');
      expect(cartItem).toBeInTheDocument();
    });
  });
import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ProductSlider } from './ProductSlider';
import { renderWithRouter } from '../../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event';

const component = <ProductSlider title="Test Title" />;

describe('ProductSlider', () => {
  test('renders the correct title', () => {
    renderWithRouter(component)
    const titleElement = screen.getByText('Test Title');
    expect(titleElement).toBeInTheDocument();
  });

  test('enables the next button when not on the last slide', () => {
    renderWithRouter(component)
    const nextButton = screen.getByTestId('next-slide');
    expect(nextButton).not.toBeDisabled();
  });

  test('renders the correct number of product items that equal 8', () => {
    renderWithRouter(component);
    const productItems = screen.getAllByTestId('productSlider__item');
    expect(productItems).toHaveLength(8);
  });

  test('clicking the next button increments the slide index', () => {
    renderWithRouter(component);
  
    const nextButton = screen.getByTestId('next-slide');
    const productSliderList = screen.getByTestId('productSlider__list');
  
    const initialTransformStyle = productSliderList.style.transform;
  
    userEvent.click(nextButton);
  
    const updatedTransformStyle = productSliderList.style.transform;
  
    expect(updatedTransformStyle).not.toEqual(initialTransformStyle);
  });
  
  test('clicking the prev button on first slide index change nothing', () => {
    renderWithRouter(component);
  
    const prevButton = screen.getByTestId('prev-slide');
    const productSliderList = screen.getByTestId('productSlider__list');
    
    const initialTransformStyle = productSliderList.style.transform;
  
    userEvent.click(prevButton);
  
    const updatedTransformStyle = productSliderList.style.transform;
  
    expect(updatedTransformStyle).toEqual(initialTransformStyle);
  });

  test('clicking the next button and then prev button', () => {
    renderWithRouter(component);

    const prevButton = screen.getByTestId('prev-slide');
    const nextButton = screen.getByTestId('next-slide');
    const productSliderList = screen.getByTestId('productSlider__list');

    const initialTransformStyle = productSliderList.style.transform;

    userEvent.click(nextButton);
    userEvent.click(prevButton);

    const updatedTransformStyle = productSliderList.style.transform;

    expect(updatedTransformStyle).toEqual(initialTransformStyle);
  })
});

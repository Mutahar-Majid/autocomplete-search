import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchInput from './SearchInput';

//! Unit Testing for SearchInput Component
// The SearchInput component is responsible for rendering the search input field and displaying suggestions.

const mockProps = {
  searchTerm: '',
  handleInputChange: jest.fn(),
  suggestions: [
    { id: 1, title: 'Book One' },
    { id: 2, title: 'Book Two' },
  ],
  handleSuggestionClick: jest.fn(),
};

describe('SearchInput', () => {
  test('renders without crashing', () => {
    render(<SearchInput {...mockProps} />);
  });

  test('calls handleInputChange on input change', () => {
    const { getByPlaceholderText } = render(<SearchInput {...mockProps} />);
    const input = getByPlaceholderText('Search for a book...');
    fireEvent.change(input, { target: { value: 'Book' } });
    expect(mockProps.handleInputChange).toHaveBeenCalled();
  });

  test('displays suggestions when available', () => {
    const { getByText } = render(<SearchInput {...mockProps} />);
    expect(getByText('Book One')).toBeInTheDocument();
    expect(getByText('Book Two')).toBeInTheDocument();
  });
});
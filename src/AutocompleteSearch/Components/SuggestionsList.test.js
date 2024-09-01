import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SuggestionsList from './SuggestionsList';

//! Unit Testing for SuggestionsList Component
// The SuggestionsList component displays a list of search suggestions.

const mockSuggestions = [
  { id: 1, title: 'Book One' },
  { id: 2, title: 'Book Two' },
];

const mockHandleSuggestionClick = jest.fn();

describe('SuggestionsList', () => {
  test('renders without crashing', () => {
    render(<SuggestionsList suggestions={mockSuggestions} handleSuggestionClick={mockHandleSuggestionClick} />);
  });

  test('displays the correct number of suggestions', () => {
    const { getAllByRole } = render(<SuggestionsList suggestions={mockSuggestions} handleSuggestionClick={mockHandleSuggestionClick} />);
    expect(getAllByRole('listitem').length).toBe(2);
  });

  test('calls handleSuggestionClick on suggestion click', () => {
    const { getByText } = render(<SuggestionsList suggestions={mockSuggestions} handleSuggestionClick={mockHandleSuggestionClick} />);
    fireEvent.click(getByText('Book One'));
    expect(mockHandleSuggestionClick).toHaveBeenCalledWith(mockSuggestions[0]);
  });
});
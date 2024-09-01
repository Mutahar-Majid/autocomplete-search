import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AutocompleteSearch from './AutocompleteSearch';

//! Integration Testing
// This test suite covers the integration of the AutocompleteSearch component with its child components.

const mockData = {
  titles: {
    1: 'Book One',
    2: 'Book Two',
    3: 'Book Three',
  },
  summaries: [
    { id: 1, summary: 'This is the summary of Book One.' },
    { id: 2, summary: 'This is the summary of Book Two.' },
    { id: 3, summary: 'This is the summary of Book Three.' },
  ],
  authors: [
    { book_id: 1, author: 'Author One' },
    { book_id: 2, author: 'Author Two' },
    { book_id: 3, author: 'Author Three' },
  ],
};

describe('AutocompleteSearch', () => {
  test('renders without crashing', () => {
    render(<AutocompleteSearch data={mockData} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('displays suggestions based on search term', () => {
    render(<AutocompleteSearch data={mockData} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Book' } });

    expect(screen.getByText('Book One')).toBeInTheDocument();
    expect(screen.getByText('Book Two')).toBeInTheDocument();
    expect(screen.getByText('Book Three')).toBeInTheDocument();
  });

  test('displays no suggestions when search term is empty', () => {
    render(<AutocompleteSearch data={mockData} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '' } });

    expect(screen.queryByText('Book One')).not.toBeInTheDocument();
    expect(screen.queryByText('Book Two')).not.toBeInTheDocument();
    expect(screen.queryByText('Book Three')).not.toBeInTheDocument();
  });

  test('handles suggestion click', () => {
    render(<AutocompleteSearch data={mockData} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Book' } });

    fireEvent.click(screen.getByText('Book One'));
    expect(screen.getByText('by Author One')).toBeInTheDocument();
    expect(screen.getByText('This is the summary of Book One.')).toBeInTheDocument();
  });
});
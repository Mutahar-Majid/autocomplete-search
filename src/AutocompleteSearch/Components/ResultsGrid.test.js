import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultsGrid from './ResultsGrid';

//! Unit Testing for ResultsGrid Component
// The ResultsGrid component displays a grid of book cards.
const mockBooks = [
  { id: 1, title: 'Book One', author: 'Author One', summary: 'Summary One' },
  { id: 2, title: 'Book Two', author: 'Author Two', summary: 'Summary Two' },
];

describe('ResultsGrid', () => {
  test('renders without crashing', () => {
    render(<ResultsGrid selectedBooks={[]} />);
  });

  test('displays the correct number of book cards', () => {
    const { getAllByText } = render(<ResultsGrid selectedBooks={mockBooks} />);
    expect(getAllByText(/by Author/).length).toBe(2);
  });

  test('displays book details correctly', () => {
    const { getByText } = render(<ResultsGrid selectedBooks={mockBooks} />);
    expect(getByText('Book One')).toBeInTheDocument();
    expect(getByText('by Author One')).toBeInTheDocument();
    expect(getByText('Summary One')).toBeInTheDocument();
  });
});
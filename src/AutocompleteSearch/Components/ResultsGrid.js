import React, { useState } from 'react';
import ViewMore from '../../Shared/ViewMoreComponent';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <div className="book-content">
        <h3 className="book-title">📚 {book.title}</h3>
        <p className="book-author">by {book.author}</p>
        <ViewMore text={book.summary} />
      </div>
    </div>
  )
}

const ResultsGrid = ({ selectedBooks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the paginated books
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = selectedBooks.slice(startIndex, startIndex + itemsPerPage);

  // Calculate total pages
  const totalPages = Math.ceil(selectedBooks.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      {!!selectedBooks.length && <h2>Books added to list</h2>}
      <div className="results-grid">
        {paginatedBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination-controls">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ResultsGrid
import React, { useEffect, useRef, useCallback } from 'react';
import { FixedSizeList as List } from 'react-window';
import checkMark from '../../Assets/check-mark.svg';
import addCircle from '../../Assets/add-circle.svg';

const SuggestionsList = ({
  suggestions,
  handleSuggestionClick,
  selectedBooks,
  searchTerm,
  isOpen,
  setIsOpen,
}) => {
  const suggestionsRef = useRef(null);

  const selectedBookIds = selectedBooks.map((book) => book.id);

  const handleClickOutside = useCallback((event) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  useEffect(() => {
    if (searchTerm.length) {
      setIsOpen(true);
    }
  }, [searchTerm]);

  const Row = ({ index, style }) => {
    const suggestion = suggestions[index];
    const isSelected = selectedBookIds.includes(suggestion.id);
    return (
      <li
        key={suggestion.id}
        className={`suggestion-item ${isSelected ? 'selected' : ''}`}
        onClick={() => !isSelected && handleSuggestionClick(suggestion)}
        style={{ ...style, padding: '10px', boxSizing: 'border-box' }}
      >
        <span className='title'>{suggestion.title}</span>
        <img
          src={isSelected ? checkMark : addCircle}
          alt='selection status'
          width={24}
          className='status-icon'
        />
      </li>
    );
  };

  const itemSize = 34;
  const height = itemSize * 5;

  return isOpen && (
    <div className={`suggestions-list ${isOpen ? 'open' : ''}`} ref={suggestionsRef}>
      {!!searchTerm?.length && !suggestions.length ? (
        <li className='suggestion-item no-results'>
          No results found for{' '}
          <strong>
            "
            {searchTerm.length > 25
              ? searchTerm.slice(0, 25) + '...'
              : searchTerm}
            "
          </strong>
        </li>
      ) : !!suggestions.length  && (
        <List
          height={height}
          itemCount={suggestions.length}
          itemSize={itemSize}
          width={'100%'}
        >
          {Row}
        </List>
      )}
    </div>
  );
};

export default SuggestionsList;
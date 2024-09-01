import React, { useState, useEffect } from 'react';
import SearchInput from './Components/SearchInput';
import ResultsGrid from './Components/ResultsGrid';
import { debounce } from '../Utils/RateLimiters';
import './AutocompleteSearch.css';

const getFilteredSuggestions = ({ data, searchTerm }) => {
  return data.summaries
    .map((summary) => ({
      id: summary.id,
      title: data.titles[summary.id],
      count: (summary.summary.match(new RegExp(searchTerm, 'gi')) || []).length,
    }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count)
}

const AutocompleteSearch = ({ data }) => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  useEffect(() => {
    handleSuggestions()
  }, [searchTerm, data]);

  const handleSuggestions = () => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = getFilteredSuggestions({data, searchTerm})
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    debounce(() => {
      setSearchTerm(e.target.value);
    }, 300)();
  };

  const handleSuggestionClick = (suggestion) => {
    const book = {
      id: suggestion.id,
      title: suggestion.title,
      summary: data.summaries.find((s) => s.id === suggestion.id).summary,
      author: data.authors.find((a) => a.book_id === suggestion.id).author,
    };

    setSelectedBooks((prevBooks) => [...prevBooks, book]);
  };
  const handleOutsideClick = () => {
    setSuggestions([]);
    setQuery('')
  }

  return (
    <div className="autocomplete-container">
      <SearchInput
        searchTerm={searchTerm}
        query={query}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
        selectedBooks={selectedBooks}
        handleSuggestionClick={handleSuggestionClick}
        handleOutsideClick={handleOutsideClick}
      />
      <ResultsGrid selectedBooks={selectedBooks} />
    </div>
  );
};

export default AutocompleteSearch;
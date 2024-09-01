import React from 'react';
import AutocompleteSearch from './AutocompleteSearch/AutocompleteSearch';
import { useFetchData } from './Utils/CustomHooks';
import './App.css';

const App = () => {
  const { data, error, loading } = useFetchData('/Data.json');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <section className='main-container'>
      <h1 className="header-title">Book Search</h1>
      <h3 className="header-subtitle">Search and add books to your list</h3>
      {data  && <AutocompleteSearch data={data} />}
    </section>
  );
};

export default App;
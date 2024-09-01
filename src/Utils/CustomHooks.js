import { useState, useEffect } from 'react';

const cache = {};
const cacheOrder = [];

const checkCache = (url) => {
  if (cache[url]) {
    // Move the accessed URL to the end to mark it as recently used
    const index = cacheOrder.indexOf(url);
    if (index > -1) {
      cacheOrder.splice(index, 1);
      cacheOrder.push(url);
    }
    return cache[url];
  }
  return null;
};

const updateCache = (url, data) => {
  cache[url] = data;
  cacheOrder.push(url);

  // Ensure the cache only keeps the top 5 results
  if (cacheOrder.length > 5) {
    const oldestUrl = cacheOrder.shift();
    delete cache[oldestUrl];
  }
};

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedData = checkCache(url);
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        updateCache(url, jsonData);
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  return { data, error, loading };
};

export { useFetchData };
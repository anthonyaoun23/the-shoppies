import { useState, useEffect, useCallback } from "react";

import { getAllByName } from "services/omdb";

import "styles/App.css";
import searchIcon from "assets/icons/search.svg";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  });

  return debouncedValue;
}

function App() {
  const [movieQuery, setMovieQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [queryResults, setQueryResults] = useState(0);

  const debouncedSearchTerm = useDebounce(movieQuery, 500);

  const handleResponse = useCallback((response, cb) => {
    const getResults = {
      error() {
        return {
          error: true,
          data: [],
          total: 0,
        };
      },

      content() {
        return {
          data: response.Search.map((movie) => ({
            ...movie,
          })),
          error: false,
          total: Number(response.totalResults),
        };
      },
    };

    const resultsType = response.Search ? "content" : "error";

    cb(getResults[resultsType]());
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);

      getAllByName(debouncedSearchTerm).then((response) => {
        handleResponse(response, ({ data, error, total }) => {
          setMovieList(data);
          setIsError(error);
          setQueryResults(total);
          console.log(data);
        });
        setIsLoading(false);
      });
    }
  }, [debouncedSearchTerm, handleResponse]);

  const handleChange = ({ target }) => {
    setMovieList([]);
    setQueryResults(0);
    setIsError(false);
    setMovieQuery(String(target.value).trim());
  };

  return (
    <div className="app">
      <header className="app-header">The Shoppies 2021</header>
      <main>
        <section className="search-container">
          <div className="icon-search">
            <img src={searchIcon} className="icon" alt="Search Icon" />
          </div>

          <input
            onChange={handleChange}
            className="input"
            type="text"
            placeholder="Search for a movie"
            value={movieQuery}
            autoFocus
            required
          />
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;

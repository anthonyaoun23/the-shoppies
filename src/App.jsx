import { useState, useEffect, useCallback } from "react";

import "styles/App.css";
import searchIcon from "assets/icons/search.svg";
import iconHeart from "assets/icons/heart-empty.svg";
import iconHeartFull from "assets/icons/heart-full.svg";

import { getAllByName } from "services/omdb";

const renderMovieCards = ({
  Title,
  Year,
  Poster,
  imdbID,
  isCardLiked = false,
  handle = console.log,
}) => {
  return (
    <article className="movie-l">
      <img src={Poster} alt={`${Title}Movie Poster`} />
      <div>
        <h3>{Title}</h3>
        <p>{Year}</p>
        <button>Nominate</button>
      </div>
    </article>
  );
};

const MovieList = ({ query, movies }) => (
  <div className="movie-list">
    <h2>Results for {query}</h2>
    <div>
      {movies &&
        movies.map(
          ({
            Title,
            Year,
            Poster,
            imdbID,
            isNominated = false,
            handle = console.log,
          }) => (
            <article className="item">
              <img src={Poster} alt={`${Title} Movie Poster`} />
              <h3>{Title}</h3>
              <p>{Year}</p>
              <button>Nominate</button>
            </article>
          )
        )}
    </div>
  </div>
);
const NominationList = ({ movies }) => (
  <div className="nomination-list">
    <h2>Nominations</h2>
    {movies &&
      movies.map(
        ({
          Title,
          Year,
          Poster,
          imdbID,
          isCardLiked = false,
          handle = console.log,
        }) => (
          <article className="card">
            <img src={Poster} alt={`${Title} Movie Poster`} />
            <div>
              <h3>{Title}</h3>
              <p>{Year}</p>
              <button>Remove</button>
            </div>
          </article>
        )
      )}
  </div>
);

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
      <main className="app-content">
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
        <section className="lists-container">
          <MovieList query={movieQuery} movies={movieList}></MovieList>
          <NominationList></NominationList>
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;

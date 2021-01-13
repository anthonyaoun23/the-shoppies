import { useState, useEffect, useCallback } from "react";

import "styles/App.css";
import searchIcon from "assets/icons/search.svg";

import { getAllByName } from "services/omdb";
import MoviesNominatedStorage from "services/moviesNominatedStorage";

const MovieCard = ({
  title,
  year,
  poster,
  imdbId,
  isNominated = false,
  handleNomination = console.log,
}) => {
  const [isMovieNominated, setIsMovieNominated] = useState(isNominated);

  const handle = () => {
    setIsMovieNominated(!isMovieNominated);
    handleNomination(title, imdbId, year, poster);
  };

  return (
    <article className="item" key={imdbId}>
      <div className="item-content">
        <img src={poster} alt={`${title} Movie Poster`} />
        <div className="item-heading">
          <h3>{title}</h3>
          <p>{year}</p>
        </div>
      </div>
      {isMovieNominated && <p>Remove from nominations</p>}
      {!isMovieNominated && (
        <button onClick={handle} className="item-button">
          Nominate
        </button>
      )}
    </article>
  );
};

const MovieList = ({ query, movies, handleNominate }) => (
  <div className="movie-list">
    <h2>Results for {query}</h2>
    {movies &&
      movies.map(
        ({
          title,
          year,
          poster,
          imdbId,
          isNominated = false,
          handleNomination = console.log,
        }) => (
          <MovieCard
            key={imdbId}
            title={title}
            year={year}
            poster={poster}
            imdbId={imdbId}
            isNominated={isNominated}
            handleNomination={handleNominate}
          ></MovieCard>
        )
      )}
  </div>
);
const NominationList = ({ movies, handleNominate }) => (
  <div className="nomination-list">
    <h2>Nominations</h2>
    {movies &&
      movies.map(
        ({ title, year, poster, imdbId, handleNomination = console.log }) => (
          <MovieCard
            key={imdbId}
            title={title}
            year={year}
            poster={poster}
            imdbId={imdbId}
            isNominated={true}
            handleNomination={handleNominate}
          ></MovieCard>
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
  const [moviesNominated, setMoviesNominated] = useState([]);
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
          data: response.Search.map(({ Title, Year, Poster, imdbID }) => ({
            title: Title,
            year: Year,
            poster: Poster,
            imdbId: imdbID,
            isNominated: MoviesNominatedStorage.has(imdbID),
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
    if (MoviesNominatedStorage.getAll())
      setMoviesNominated(MoviesNominatedStorage.getAll());
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

  const handleNominate = (title, imdbId, year, poster) => {
    if (MoviesNominatedStorage.has(imdbId)) {
      MoviesNominatedStorage.remove(imdbId);
      setMoviesNominated(
        moviesNominated.filter((movie) => imdbId !== movie.imdbId)
      );
    } else {
      MoviesNominatedStorage.add({ title, imdbId, year, poster });
      setMoviesNominated([...moviesNominated, { title, imdbId, year, poster }]);
    }
  };

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
          <MovieList
            handleNominate={handleNominate}
            query={movieQuery}
            movies={movieList}
          ></MovieList>
          <NominationList
            handleNominate={handleNominate}
            movies={moviesNominated}
          ></NominationList>
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;

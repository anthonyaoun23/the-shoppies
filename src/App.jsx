import { useState, useEffect, useCallback } from "react";

import "styles/App.css";
import searchIcon from "assets/icons/search.svg";

import { getAllByName } from "services/omdb";
import MoviesNominatedStorage from "services/moviesNominatedStorage";
import MovieList from "components/MovieList";
import NominationList from "components/NominationList";

import useDebounce from "hooks/useDebounce";

const App = () => {
  const [movieQuery, setMovieQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [moviesNominated, setMoviesNominated] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
    console.log("yup");
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
    MoviesNominatedStorage.has(imdbId)
      ? MoviesNominatedStorage.remove(imdbId)
      : MoviesNominatedStorage.add({ title, imdbId, year, poster });

    const newMoviesNominated = MoviesNominatedStorage.getAll();
    setMoviesNominated(newMoviesNominated);
  };

  const handleChange = ({ target }) => {
    setMovieList([]);
    setQueryResults(0);
    setIsError(false);
    setMovieQuery(String(target.value).trim());
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>The Shoppies 2021</h1>
      </header>
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
            nominatedIds={new Set(moviesNominated.map((movie) => movie.imdbId))}
          ></MovieList>
          <NominationList
            handleNominate={handleNominate}
            movies={moviesNominated}
          ></NominationList>
        </section>
      </main>
      <footer>
        Made with 💚 &nbsp;by{" "}
        <a
          className="footer-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://aaoun.com"
        >
          Anthony Aoun
        </a>
      </footer>
    </div>
  );
};

export default App;

import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import searchIcon from "assets/icons/search.svg";

import { getAllByName } from "services/omdb";
import MoviesNominatedStorage from "services/moviesNominatedStorage";
import Banner from "components/Banner";
import MovieList from "components/MovieList";
import NominationList from "components/NominationList";

import useDebounce from "hooks/useDebounce";
import Layout from "components/layout/Layout";
import SearchBar from "components/SearchBar";

const App = () => {
  const [movieQuery, setMovieQuery] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [moviesNominated, setMoviesNominated] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = useState(false);

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
    setIsError(false);
    setMovieQuery(String(target.value).trim());
  };

  return (
    <Layout>
      <Wrapper>
        {moviesNominated.length === 5 && <Banner />}
        <ContentWrapper>
          <SearchWrapper>
            <SearchBar onChange={handleChange} value={movieQuery} />
            <MovieList
              handleNominate={handleNominate}
              movies={movieList}
              nominatedIds={
                new Set(moviesNominated.map((movie) => movie.imdbId))
              }
            ></MovieList>
          </SearchWrapper>
          <NominationList
            handleNominate={handleNominate}
            movies={moviesNominated}
          ></NominationList>
        </ContentWrapper>
      </Wrapper>
    </Layout>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const SearchWrapper = styled.div`
  padding: 20px;
  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);
  border-radius: 20px;
`;

export default App;

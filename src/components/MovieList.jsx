import styled from "styled-components";

import MovieCard from "components/MovieCard";

const MovieList = ({ movies, handleNominate, nominatedIds }) => (
  <Wrapper>
    {movies &&
      movies.map(
        ({ title, year, poster, imdbId, handleNomination = console.log }) => (
          <MovieCard
            key={imdbId}
            title={title}
            year={year}
            poster={poster}
            imdbId={imdbId}
            isNominated={nominatedIds.has(imdbId)}
            handleNomination={handleNominate}
            disabled={nominatedIds.size === 5}
          ></MovieCard>
        )
      )}
  </Wrapper>
);

export default MovieList;

const Wrapper = styled.div`
  display: grid;
  gap: 8px;
  max-height: 580px;
  width: 100%;
  margin-top: 20px;
  overflow: hidden scroll;
`;

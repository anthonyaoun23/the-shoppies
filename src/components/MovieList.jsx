import MovieCard from "components/MovieCard";

const MovieList = ({ query, movies, handleNominate, nominatedIds }) => (
  <div className="movie-list">
    <h2>Results for {query}</h2>
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
          ></MovieCard>
        )
      )}
  </div>
);

export default MovieList;

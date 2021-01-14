import MovieCard from "components/MovieCard";

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

export default NominationList;

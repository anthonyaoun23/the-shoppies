const MovieCard = ({
  title,
  year,
  poster,
  imdbId,
  isNominated = false,
  handleNomination = console.log,
}) => {
  return (
    <article className="item" key={imdbId}>
      <div className="item-content">
        <img src={poster} alt={`${title} Movie Poster`} />
        <div className="item-heading">
          <h3>{title}</h3>
          <p>{year}</p>
          {isNominated && (
            <button
              onClick={(_) => handleNomination(title, imdbId, year, poster)}
              className="item-button-remove"
            >
              Remove from nominations
            </button>
          )}
        </div>
      </div>
      {!isNominated && (
        <button
          onClick={(_) => handleNomination(title, imdbId, year, poster)}
          className="item-button"
        >
          Nominate
        </button>
      )}
    </article>
  );
};

export default MovieCard;

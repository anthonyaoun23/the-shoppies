import styled from "styled-components";

import ActionButton from "components/buttons/ActionButton";

const MovieCard = ({
  title,
  year,
  poster,
  imdbId,
  isNominated = false,
  handleNomination = console.log,
  action,
  disabled,
}) => {
  return (
    <Result className="item" key={imdbId}>
      <img src={poster} alt={`${title} Movie Poster`} />
      <ResultContent>
        <ResultTextWrapper>
          <Title>{title}</Title>
          <Year>{year}</Year>
        </ResultTextWrapper>
        <ActionButton
          nominate={!isNominated}
          disabled={disabled}
          onClick={(_) => handleNomination(title, imdbId, year, poster)}
        ></ActionButton>
      </ResultContent>
      {/*
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
      {!isNominated && (
        <button
          onClick={(_) => handleNomination(title, imdbId, year, poster)}
          className="item-button"
        >
          Nominate
        </button>
      )} */}
    </Result>
  );
};

export default MovieCard;

const Result = styled.article`
  width: 100%;
  transition: all 0.8s cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
  display: grid;
  grid-template-columns: 80px auto;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
  color: white;
  > img {
    width: 80px;
    height: 120px;
    object-fit: cover;
  }
  :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 0px 0.5px inset;
  }
`;

const ResultContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ResultTextWrapper = styled.div`
  > * {
    margin: 0;
    padding: 0;
  }
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 24px;
  line-height: 140%;
`;

const Year = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 130%;
`;

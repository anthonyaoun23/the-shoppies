import styled from "styled-components";

import MovieCard from "components/MovieCard";

const NominationList = ({ movies, handleNominate }) => (
  <Wrapper>
    <Title>Your Nominations</Title>
    <ProgressBar>
      <Progress width={`${(movies.length / 5) * 100}%`} />
    </ProgressBar>
    <MoviesWrapper>
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
    </MoviesWrapper>
  </Wrapper>
);

export default NominationList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;

  background: rgba(15, 14, 71, 0.3);
  box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(40px);

  border-radius: 20px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 11px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 3px;
`;

const Progress = styled.div`
  min-width: 1%;
  width: ${(props) => props.width};
  position: relative;
  float: left;
  height: 100%;
  background: linear-gradient(
    91.4deg,
    rgb(47, 184, 255) 0%,
    rgb(158, 236, 217) 100%
  );
  box-shadow: rgba(147, 231, 221, 0.3) 0px 20px 40px;
  border-radius: 50px;
`;

const Title = styled.p`
  font-weight: 500;
  font-size: 24px;
  line-height: 140%;
  color: white;
  margin: 0 0 8px;
`;

const MoviesWrapper = styled.div`
  display: grid;
  gap: 8px;
  max-height: 580px;
  width: 100%;
  margin-top: 20px;
  overflow: hidden scroll;
`;

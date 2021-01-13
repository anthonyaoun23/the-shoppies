import Storage from "utils/localStorage";

const moviesNominatedStorage = Storage("@aaoun/moviesNominated");

const add = (movieInfo) => {
  const moviesNominatedList = moviesNominatedStorage.get();
  moviesNominatedStorage.set([...moviesNominatedList, { ...movieInfo }]);
};

const remove = (imdbIdMovie) => {
  const moviesNominatedList = moviesNominatedStorage.get();
  const moviesListUpdated = moviesNominatedList.filter(
    ({ imdbId }) => imdbId !== imdbIdMovie
  );

  moviesNominatedStorage.set(moviesListUpdated);
};

const has = (id) => {
  const moviesNominatedList = moviesNominatedStorage.get();
  return moviesNominatedList.some(({ imdbId }) => imdbId === id);
};

const getAll = () => moviesNominatedStorage.get();

export default {
  remove,
  getAll,
  has,
  add,
};

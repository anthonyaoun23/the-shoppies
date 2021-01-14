import Storage from "utils/localStorage";

const moviesNominatedStorage = Storage("@aaoun/moviesNominated");

const moviesNominatedService = {
  add: (movieInfo) => {
    const moviesNominatedList = moviesNominatedStorage.get();
    moviesNominatedStorage.set([...moviesNominatedList, { ...movieInfo }]);
  },

  remove: (imdbIdMovie) => {
    const moviesNominatedList = moviesNominatedStorage.get();
    const moviesListUpdated = moviesNominatedList.filter(
      ({ imdbId }) => imdbId !== imdbIdMovie
    );

    moviesNominatedStorage.set(moviesListUpdated);
  },

  has: (id) => {
    const moviesNominatedList = moviesNominatedStorage.get();
    return moviesNominatedList.some(({ imdbId }) => imdbId === id);
  },

  getAll: () => moviesNominatedStorage.get(),
};

export default moviesNominatedService;

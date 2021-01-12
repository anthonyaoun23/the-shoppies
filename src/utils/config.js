const API_KEY = process.env.REACT_APP_OMDB_API_KEY;

const config = (baseUrl = "") => (cb) => cb(baseUrl, API_KEY);

export default config;

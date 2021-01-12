import config from "utils/config";
import request from "utils/request";
import objToQueryString from "utils/objToQueryString";

const http = config("http://www.omdbapi.com");

export const getAllByName = (movieName, paramsObj = {}) => {
  const queryParams = objToQueryString(paramsObj);

  return http((baseUrl, apiKey) =>
    request(`${baseUrl}/?s=${movieName}&apiKey=${apiKey}&${queryParams}`)
  );
};

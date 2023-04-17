const BASE_URL = 'https://api.tvmaze.com';

const apiGet = async qryStr => {
  const response = await fetch(`${BASE_URL}${qryStr}`);
  const body = await response.json();
  return body;
};

export const searchForShows = searchQry =>
  apiGet(`/search/shows?q=${searchQry}`);

export const searchForPeople = searchQry =>
  apiGet(`/search/people?q=${searchQry}`);

export const getShowById = showId => apiGet(`/shows/${showId}`);
// export const getShowById = showId => apiGet(`/shows/${showId}`);
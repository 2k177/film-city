const BASE_URL = 'https://api.tvmaze.com';

const apiGet = async qryStr => {
  const response = await fetch(`${BASE_URL}${qryStr}`);
  const body = await response.json();
  return body;
};

const searchForShows = searchQry => apiGet(`/search/shows?q=${searchQry}`);

export default searchForShows;

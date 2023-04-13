import { useState } from 'react';
import searchForShows from './api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);

  const onSearchInputChange = ev => {
    // console.log(ev.target.value);
    setSearchStr(ev.target.value);
  };

  const onSearch = async ev => {
    try {
      setApiDataError(null);
      ev.preventDefault();
      const result = await searchForShows(searchStr);
      setApiData(result);
      console.log(result);
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApi = () => {
    if (apiDataError) {
      return <div>Error has occured: {apiDataError.message}</div>;
    }
    if (apiData) {
      return apiData.map(data => (
        <div key={data.show.id}>{data.show.name}</div>
      ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <button type="submit">search</button>
      </form>
      <div>{renderApi()}</div>
    </div>
  );
};

export default Home;

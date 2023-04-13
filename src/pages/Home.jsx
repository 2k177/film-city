import { useState } from 'react';
import { searchForShows, searchForPeople } from './api/tvmaze';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  const [apiData, setApiData] = useState(null);
  const [apiDataError, setApiDataError] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  console.log(searchOption);
  const onSearchInputChange = ev => {
    // console.log(ev.target.value);
    setSearchStr(ev.target.value);
  };
  const onRadioChange = ev => {
    // console.log(ev.target.value);
    setSearchOption(ev.target.value);
  };

  const onSearch = async ev => {
    try {
      setApiDataError(null);
      ev.preventDefault();

      if (searchOption === 'shows') {
        const result = await searchForShows(searchStr);
        setApiData(result);
        // console.log(result);
      } else {
        const result = await searchForPeople(searchStr);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
    }
  };

  const renderApi = () => {
    if (apiDataError) {
      return <div>Error has occured: {apiDataError.message}</div>;
    }
    if (apiData) {
      return apiData[0].show
        ? apiData.map(data => <div key={data.show.id}>{data.show.name}</div>)
        : apiData.map(data => (
            <div key={data.person.id}>{data.person.name}</div>
          ));
    }
    return null;
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <label>
          shows
          <input
            type="radio"
            name="search-option"
            value="shows"
            checked={searchOption === 'shows'}
            onChange={onRadioChange}
          />
        </label>

        <label>
          actors
          <input
            type="radio"
            name="search-option"
            value="actors"
            checked={searchOption === 'actors'}
            onChange={onRadioChange}
          />
        </label>

        <button type="submit">search</button>
      </form>
      <div>{renderApi()}</div>
    </div>
  );
};

export default Home;

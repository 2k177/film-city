import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchForShows, searchForPeople } from './api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorGrid';
import { TextCenter } from '../components/common/TextCenter';

const Home = () => {
  const [filter, setFilter] = useState(null);

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['shows', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    // ⬇️ disabled as long as the filter is empty
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApi = () => {
    if (apiDataError) {
      return <TextCenter>Error has occured: {apiDataError.message}</TextCenter>;
    }
    if (apiData?.length === 0) {
      return <TextCenter>No Results found...</TextCenter>;
    }
    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }
    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>{renderApi()}</div>
    </div>
  );
};

export default Home;

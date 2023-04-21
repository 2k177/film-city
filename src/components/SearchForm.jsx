import { useState } from 'react';
import { useShowsState } from '../lib/useShowState';

const SearchForm = ({ onSearch }) => {
  const [searchStr, setSearchStr] = useState('');
  const [searchOption, setSearchOption] = useState('shows');
  const [showState, dispatchShowState] = useShowsState();

  // 1) mounts
  // 2) rerender
  // 2.5) Logic before next rerender
  // 3) unmount

  const onSearchInputChange = ev => {
    console.log(ev.target.value);
    showState.includes(ev.target.value);
    const content = ev.target.value;
    dispatchShowState({ type: 'content', content });
    setSearchStr(ev.target.value);
  };

  const onRadioChange = ev => {
    setSearchOption(ev.target.value);
  };

  const onSubmit = ev => {
    ev.preventDefault();

    const options = {
      q: searchStr,
      searchOption,
    };

    onSearch(options);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={showState} onChange={onSearchInputChange} />

      <label>
        Shows
        <input
          type="radio"
          name="search-option"
          value="shows"
          checked={searchOption === 'shows'}
          onChange={onRadioChange}
        />
      </label>

      <label>
        Actors
        <input
          type="radio"
          name="search-option"
          value="actors"
          checked={searchOption === 'actors'}
          onChange={onRadioChange}
        />
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;

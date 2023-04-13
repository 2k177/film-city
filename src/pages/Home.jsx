import { useState } from 'react';

const Home = () => {
  const [searchStr, setSearchStr] = useState('');
  console.log(searchStr);
  const onSearchInputChange = ev => {
    // console.log(ev.target.value);
    setSearchStr(ev.target.value);
  };

  return (
    <div>
      <div>{searchStr}</div>
      <button
        type="button"
        onClick={() => {
          setSearchStr('Danusha');
        }}
      >
        Click me
      </button>
      <input type="text" value={searchStr} onChange={onSearchInputChange} />
    </div>
  );
};

export default Home;

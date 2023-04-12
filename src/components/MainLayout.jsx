import { Outlet } from 'react-router-dom';
import Navs from './Navs';
import AppTitle from './AppTitle';

const Mainlayout = () => {
  return (
    <div>
      <Navs />
      <AppTitle />
      <Outlet />
    </div>
  );
};

export default Mainlayout;

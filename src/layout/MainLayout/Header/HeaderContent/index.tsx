// import { useMemo } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project import
import Search from './Search';
import Clusters from './Clusters/Clusters';
// import Message from './Message';
import Profile from './Profile';
// import Notification from './Notification';
import MobileSection from './MobileSection';
// import MegaMenuSection from './MegaMenuSection';

import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/MainLayout/Drawer/DrawerHeader';

// type
import { LAYOUT_CONST } from 'types/config';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
  const { menuOrientation } = useConfig();

  const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  // const megaMenu = useMemo(() => <MegaMenuSection />, []);

  return (
    <>
      {menuOrientation === LAYOUT_CONST.HORIZONTAL_LAYOUT && !downLG && <DrawerHeader open={true} />}
      {!downLG && <Clusters />}
      {!downLG && <Search />}
      {/* {!downLG && megaMenu} */}
      {/* {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

      <Notification />
      <Message /> */}
      {!downLG && <Profile />}
      {downLG && <MobileSection />}
    </>
  );
};

export default HeaderContent;

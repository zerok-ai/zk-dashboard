import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { TeamOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

type Props = {
  closeMenu: () => void;
};

const SettingTab = ({ closeMenu }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
    switch (index) {
      case 1:
        navigate('users');
        break;
      case 2:
        navigate('api-keys');
        break;
    }
    closeMenu();
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <TeamOutlined />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <SecurityScanOutlined />
        </ListItemIcon>
        <ListItemText primary="API Keys" />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;

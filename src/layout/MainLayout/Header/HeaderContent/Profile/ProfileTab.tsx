import { useState } from 'react';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { EditOutlined, LogoutOutlined, QuestionCircleOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

interface Props {
  handleLogout: () => void;
  closeMenu: () => void;
}

const ProfileTab = ({ handleLogout, closeMenu }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <EditOutlined />
        </ListItemIcon>
        <ListItemText primary="Edit Profile" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event: React.MouseEvent<HTMLDivElement>) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Support" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={handleLogout}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default ProfileTab;

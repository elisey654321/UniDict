import { AppBar, UserMenu, Logout } from 'react-admin';
import { Typography } from '@mui/material';

export const MyAppBar = (props) => (
  <AppBar {...props} userMenu={<MyUserMenu />}>
    <Typography variant="h6" color="inherit" sx={{ flex: 1 }}>
      UniDict Admin
    </Typography>
  </AppBar>
);

const MyUserMenu = () => (
  <UserMenu>
    <Logout />
  </UserMenu>
);
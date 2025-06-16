import { Menu } from 'react-admin';
import PeopleIcon from '@mui/icons-material/People';

export const MyMenu = () => (
  <Menu>
    <Menu.Item
      to="/users"
      primaryText="Пользователи"
      leftIcon={<PeopleIcon />}
    />
  </Menu>
);
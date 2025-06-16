import { Layout as RaLayout } from 'react-admin';
import { MyAppBar } from './AppBar';
import { MyMenu } from './Menu';

export const Layout = (props) => (
  <RaLayout {...props} appBar={MyAppBar} menu={MyMenu} />
);
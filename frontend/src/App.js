import { Admin, Resource } from 'react-admin';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import { UserList, UserEdit, UserCreate } from './resources/users';
import { LoginPage } from './components/LoginPage';
import { Layout } from './layout';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={LoginPage}
    layout={Layout}
    requireAuth
  >
    <Resource 
      name="users" 
      list={UserList} 
      edit={UserEdit}
      create={UserCreate}
    />
  </Admin>
);

export default App;
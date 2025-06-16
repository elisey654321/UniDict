import {
  List,
  Datagrid,
  TextField,
  EmailField,
  DateField,
  EditButton,
  DeleteButton,
  Filter,
  SearchInput,
} from 'react-admin';

// Фильтры для списка (поиск, дополнительные фильтры)
const UserFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn placeholder="Поиск по имени или email" />
  </Filter>
);

export const UserList = (props) => (
  <List {...props} filters={<UserFilter />} perPage={25}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <EmailField source="email" label="Email" />
      <DateField source="createdAt" label="Дата создания" showTime />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
import { Show, SimpleShowLayout, TextField, EmailField, DateField } from 'react-admin';

export const UserShow = (props) => (
  <Show {...props} title="Просмотр пользователя">
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Имя" />
      <EmailField source="email" label="Email" />
      <DateField source="createdAt" label="Дата создания" showTime />
    </SimpleShowLayout>
  </Show>
);
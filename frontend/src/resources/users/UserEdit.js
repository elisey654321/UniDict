import { Edit, SimpleForm, TextInput, DateInput, required, email } from 'react-admin';

export const UserEdit = (props) => (
  <Edit {...props} title="Редактирование пользователя">
    <SimpleForm>
      <TextInput disabled source="id" label="ID" />
      <TextInput source="name" label="Имя" validate={[required()]} />
      <TextInput
        source="email"
        label="Email"
        type="email"
        validate={[required(), email()]}
      />
      <DateInput disabled source="createdAt" label="Дата создания" />
    </SimpleForm>
  </Edit>
);
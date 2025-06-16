import { Create, SimpleForm, TextInput, required, email } from 'react-admin';

export const UserCreate = (props) => (
  <Create {...props} title="Создание пользователя">
    <SimpleForm>
      <TextInput 
        source="name" 
        label="Имя" 
        validate={[required()]} 
      />
      <TextInput
        source="email"
        label="Email"
        type="email"  // Указываем тип поля
        validate={[required(), email()]}  // Добавляем валидацию email
      />
    </SimpleForm>
  </Create>
);
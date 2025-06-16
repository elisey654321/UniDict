import { Login, LoginForm } from 'react-admin';
import { Card, CardContent, Box } from '@mui/material';

const CustomLoginForm = () => (
  <Box sx={{ minWidth: 300 }}>
    <Card>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>  {/* Закрывающий тег Card был добавлен */}
  </Box>
);

export const LoginPage = () => (
  <Login>
    <CustomLoginForm />
  </Login>
);
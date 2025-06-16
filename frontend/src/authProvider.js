// src/authProvider.js
export const authProvider = {
    login: async ({ username, password }) => {
        const request = new Request('http://localhost:8000/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error('Неверные учетные данные');
        }
        const { token } = await response.json();
        localStorage.setItem('token', token);
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('token') 
            ? Promise.resolve() 
            : Promise.reject();
    },
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve(),
};
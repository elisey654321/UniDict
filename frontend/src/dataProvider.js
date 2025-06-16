// src/dataProvider.js
import { fetchUtils } from 'react-admin';

const apiUrl = 'http://localhost:8000';

const httpClient = (url, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    });
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    
    return fetchUtils.fetchJson(url, {
        ...options,
        headers,
    });
};

export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        
        const query = {
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            sort: JSON.stringify([field, order]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`;
        
        return httpClient(url).then(({ json }) => ({
            data: json.data,
            total: json.total,
        }));
    },
    // ... остальные методы (getOne, create, update, delete)
};
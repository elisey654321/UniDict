import React from 'react';

export default function ItemList({ items }) {
  return (
    <table border="1" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.type}</td>
            <td>{JSON.stringify(item.data)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
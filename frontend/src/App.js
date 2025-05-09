import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import AddItem from './components/AddItem';

function App() {
  const [items, setItems] = useState([]);

  // Загрузка данных при старте
  useEffect(() => {
    fetch('http://localhost:8000/items/')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>UniDict Admin</h1>
      <AddItem onAdd={newItem => setItems([...items, newItem])} />
      <ItemList items={items} />
    </div>
  );
}

export default App;
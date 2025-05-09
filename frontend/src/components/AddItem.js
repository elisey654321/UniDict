import React, { useState } from 'react';

export default function AddItem({ onAdd }) {
  const [form, setForm] = useState({ id: '', type: '', data: '{}' });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: form.id,
        type: form.type,
        data: JSON.parse(form.data)
      })
    })
      .then(res => res.json())
      .then(data => onAdd(data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="ID"
        value={form.id}
        onChange={(e) => setForm({...form, id: e.target.value})}
      />
      <input
        placeholder="Type"
        value={form.type}
        onChange={(e) => setForm({...form, type: e.target.value})}
      />
      <textarea
        placeholder='{"name": "value"}'
        value={form.data}
        onChange={(e) => setForm({...form, data: e.target.value})}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
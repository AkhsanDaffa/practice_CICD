import { useState, useEffect } from 'react'
import './App.css' // Pastikan CSS bawaan tetap ada biar rapi

function App() {
  const [todos, setTodos] = useState([])
  const [newTask, setNewTask] = useState('')
  const API_URL = 'http://103.181.142.253:3100';

  // 1. Fetch data dari API saat load
  useEffect(() => {
    fetch(`${API_URL}/todos`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch data");
        return res.json();
      })
      .then(data => {
        // Cek apakah data benar-benar Array?
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error("Data bukan array:", data);
          setTodos([]); // Set array kosong biar gak error
        }
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setTodos([]); // Set array kosong jika fetch gagal
      })
  }, [])

  // 2. Kirim data ke API
  const addTodo = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    if (!newTask) return;

    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: newTask })
      });
      const item = await res.json();
      setTodos([...todos, item]); // Update UI langsung
      setNewTask('');
    } catch (err) {
      console.error("Error adding task:", err);
    }
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Fullstack To-Do List (Live dari VPS) 🚀</h1>

      {/* Form Input */}
      <form onSubmit={addTodo} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          placeholder="Input tugas baru..."
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Simpan
        </button>
      </form>

      {/* List Data */}
      <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
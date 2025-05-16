import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookForm from './components/BookForm';
import BookTable from './components/BookTable';
import Navbar from './components/Navbar';
import GenresList from './components/GenresList'; // ✅ Import the new component

export default function App() {
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    bookName: '',
    author: '',
    releaseDate: '',
    genreId: '',
    readCheck: false,
    _id: null
  });

  useEffect(() => {
    fetchGenres();
    fetchBooks();
  }, []);

  const fetchGenres = async () => {
    const res = await fetch('/api/genres');
    const data = await res.json();
    setGenres(data);
  };

  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form._id ? 'PUT' : 'POST';
    const url = form._id ? `/api/books/${form._id}` : '/api/books';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    setForm({
      bookName: '',
      author: '',
      releaseDate: '',
      genreId: '',
      readCheck: false,
      _id: null
    });
    fetchBooks();
  };

  const handleEdit = (book) => {
    setForm({ ...book, genreId: book.genreId._id });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    fetchBooks();
  };

  return (
      <Router>
        <Navbar />
        <div className="container mt-5">
          <Routes>
            <Route
                path="/"
                element={
                  <>
                    <h1 className="mb-4">Your Library</h1>
                    <BookForm
                        form={form}
                        genres={genres}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />
                    <BookTable
                        books={books}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                  </>
                }
            />
            <Route path="/genres" element={<GenresList genres={genres} />} />
          </Routes>
        </div>
      </Router>
  );
}

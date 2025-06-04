import React, { useState } from 'react';
import BookDetailsModal from './BookDetailsModal';

export default function GenresList({ genres }) {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeBook, setActiveBook] = useState(null);
    const [newGenreName, setNewGenreName] = useState('');
    const [localGenres, setLocalGenres] = useState(genres);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [genreToDelete, setGenreToDelete] = useState(null);

    const handleGenreClick = async (genre) => {
        setSelectedGenre(genre);
        const res = await fetch(`/api/genres/book?genreId=${genre._id}`);
        const data = await res.json();
        setBooks(data);
    };

    const toggleReadCheck = async (book) => {
        const updatedBook = { ...book, readCheck: !book.readCheck };
        await fetch(`/api/books/${book._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedBook)
        });
        if (selectedGenre) handleGenreClick(selectedGenre);
    };

    const openModal = (book) => {
        setActiveBook(book);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveBook(null);
    };

    const handleAddGenre = async () => {
        if (!newGenreName.trim()) return;
        const res = await fetch('/api/genres', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ genreName: newGenreName.trim() })
        });
        const data = await res.json();
        console.log('RESPONSE FROM BACKEND:', data); // 👈 Tohle přidej
        setLocalGenres([...localGenres, data]);
        setNewGenreName('');
    };

    const confirmDeleteGenre = (genre) => {
        setGenreToDelete(genre);
        setDeleteModalVisible(true);
    };

    const handleDeleteGenre = async () => {
        if (!genreToDelete) return;

        await fetch(`/api/genres/${genreToDelete._id}`, {
            method: 'DELETE'
        });

        setLocalGenres(localGenres.filter(g => g._id !== genreToDelete._id));
        if (selectedGenre && selectedGenre._id === genreToDelete._id) {
            setSelectedGenre(null);
            setBooks([]);
        }

        setDeleteModalVisible(false);
        setGenreToDelete(null);
    };

    const sortedGenres = [...localGenres].sort((a, b) =>
        a.genreName.localeCompare(b.genreName)
    );

    return (
        <div>
            <h2 className="mb-4">Genres</h2>

            {/* Add Genre Input */}
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Add new genre"
                    value={newGenreName}
                    onChange={(e) => setNewGenreName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleAddGenre}>
                    Add Genre
                </button>
            </div>

            <ul className="list-group mb-4">
                {sortedGenres.map((genre) => (
                    <li
                        key={genre._id}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            selectedGenre && selectedGenre._id === genre._id ? 'active' : ''
                        }`}
                    >
                        <span
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleGenreClick(genre)}
                        >
                            {genre.genreName}
                        </span>
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => confirmDeleteGenre(genre)}
                        >
                            🗑️ Delete
                        </button>
                    </li>
                ))}
            </ul>

            {selectedGenre && (
                <div>
                    <h4 className="mb-3">Books in "{selectedGenre.genreName}"</h4>
                    {books.length > 0 ? (
                        <ul className="list-group">
                            {books.map((book) => (
                                <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{book.bookName}</strong> by {book.author}
                                    </div>
                                    <div className="btn-group">
                                        <button
                                            className={`btn rounded-3 btn-sm ${book.readCheck ? 'btn-success' : 'btn-outline-secondary'}`}
                                            onClick={() => toggleReadCheck(book)}
                                        >
                                            {book.readCheck ? '✅ Read' : '📖 Not read'}
                                        </button>
                                        <button
                                            className="btn btn-sm btn-info ms-2 rounded-3"
                                            onClick={() => openModal(book)}
                                        >
                                            ℹ️ Info
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="alert alert-info">No books in this genre.</div>
                    )}
                </div>
            )}

            <BookDetailsModal book={activeBook} visible={showModal} onClose={closeModal} />

            {/* Modal pro potvrzení smazání */}
            {deleteModalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setDeleteModalVisible(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete the genre "
                                    <strong>{genreToDelete?.genreName}</strong>"?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setDeleteModalVisible(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteGenre}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

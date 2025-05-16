import React, { useState } from 'react';
import BookDetailsModal from './BookDetailsModal'; // no subfolder now

export default function GenresList({ genres }) {
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeBook, setActiveBook] = useState(null);

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

    const sortedGenres = [...genres].sort((a, b) =>
        a.genreName.localeCompare(b.genreName)
    );

    return (
        <div>
            <h2 className="mb-4">Genres</h2>
            <ul className="list-group mb-4">
                {sortedGenres.map((genre) => (
                    <li
                        key={genre._id}
                        className={`list-group-item list-group-item-action ${
                            selectedGenre && selectedGenre._id === genre._id ? 'active' : ''
                        }`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleGenreClick(genre)}
                    >
                        {genre.genreName}
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
        </div>
    );
}

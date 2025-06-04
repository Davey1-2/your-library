import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BookTable({ books, onEdit, onDelete, onToggleRead }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const confirmDelete = (id) => {
        setSelectedBookId(id);
        setShowConfirm(true);
    };

    const handleConfirmDelete = () => {
        if (selectedBookId) {
            onDelete(selectedBookId);
            setShowConfirm(false);
            setSelectedBookId(null);
        }
    };

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Book</th>
                    <th>Author</th>
                    <th>Release Date</th>
                    <th>Genre</th>
                    <th>Read</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book._id}>
                        <td>{book.bookName}</td>
                        <td>{book.author}</td>
                        <td>{new Date(book.releaseDate).toLocaleDateString()}</td>
                        <td>{book.genreId?.genreName}</td>
                        <td>
                            <button
                                className={`btn btn-sm ${book.readCheck ? 'btn-success' : 'btn-outline-secondary'}`}
                                onClick={() => onToggleRead(book)}
                            >
                                {book.readCheck ? '✔️ Read' : '❌ Not Read'}
                            </button>
                        </td>
                        <td>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(book)}>Edit</button>
                            <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(book._id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showConfirm && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this book?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
                                <button className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

import React from 'react';

export default function BookDetailsModal({ book, visible, onClose }) {
    if (!book) return null;

    return (
        <div
            className={`modal fade ${visible ? 'show d-block' : ''}`}
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
            <div className="modal-dialog">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">Book Details</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p><strong>Title:</strong> {book.bookName}</p>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Release Date:</strong> {new Date(book.releaseDate).toLocaleDateString()}</p>
                        <p><strong>Genre:</strong> {book.genreId.genreName}</p>
                        <p><strong>Status:</strong> {book.readCheck ? 'Read ✅' : 'Not read 📖'}</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

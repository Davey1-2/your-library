import React from 'react';

export default function BookTable({ books, onEdit, onDelete }) {
    return (
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
                    <td>{book.genreId.genreName}</td>
                    <td>{book.readCheck ? '✔️' : '❌'}</td>
                    <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => onEdit(book)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => onDelete(book._id)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

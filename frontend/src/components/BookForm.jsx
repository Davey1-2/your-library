import React from 'react';

export default function BookForm({ form, genres, onChange, onSubmit }) {
    return (
        <form onSubmit={onSubmit} className="mb-4">
            <div className="row">
                <div className="col-md-3">
                    <input type="text" name="bookName" className="form-control" placeholder="Book Name" value={form.bookName} onChange={onChange} required />
                </div>
                <div className="col-md-3">
                    <input type="text" name="author" className="form-control" placeholder="Author" value={form.author} onChange={onChange} required />
                </div>
                <div className="col-md-2">
                    <input type="date" name="releaseDate" className="form-control" value={form.releaseDate} onChange={onChange} required />
                </div>
                <div className="col-md-2">
                    <select name="genreId" className="form-control" value={form.genreId} onChange={onChange} required>
                        <option value="">Select Genre</option>
                        {[...genres]
                            .sort((a, b) => a.genreName.localeCompare(b.genreName))
                            .map(g => (
                                <option key={g._id} value={g._id}>{g.genreName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-md-1 d-flex align-items-center">
                    <input type="checkbox" name="readCheck" checked={form.readCheck} onChange={onChange} /> Read
                </div>
                <div className="col-md-1">
                    <button className="btn btn-primary w-100" type="submit">{form._id ? 'Update' : 'Add'}</button>
                </div>
            </div>
        </form>
    );
}

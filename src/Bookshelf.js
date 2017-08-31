import React from 'react';
// import PropTypes from 'prop-types';
import Book from './Book';
import './App.css';

function Bookshelf({ title, books, onUpdate }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book item={book} onUpdate={onUpdate} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default Bookshelf;

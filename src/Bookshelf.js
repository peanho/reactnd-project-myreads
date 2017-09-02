import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';
import './App.css';

function Bookshelf({ title, whenEmptyMsg, books, onUpdate }) {
  const style = {
    color: 'rgba(150, 150, 150, 0.5)',
    fontSize: '2rem',
    fontWeight: '700',
    minHeight: '260px'
  };
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length ? (
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book item={book} onUpdate={onUpdate} />
              </li>
            ))}
          </ol>
        ) : (
          <div style={style}>{whenEmptyMsg}</div>
        )}
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  whenEmptyMsg: PropTypes.string,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Bookshelf;

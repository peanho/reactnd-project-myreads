import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import './App.css';

function Bookshelves({ shelves, onUpdate }) {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          { shelves.map( shelf => (
            <Bookshelf
              key={shelf.id}
              title={shelf.title}
              whenEmptyMsg={shelf.whenEmptyMsg}
              books={shelf.books}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Bookshelves.propTypes = {
  shelves: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    whenEmptyMsg: PropTypes.string,
    books: PropTypes.array.isRequired
  })).isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default Bookshelves;

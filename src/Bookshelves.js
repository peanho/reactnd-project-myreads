import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Bookshelf from './Bookshelf';
import './App.css';

class Bookshelves extends Component {

  filterByShelf = shelf => {
    return this.props.books.byShelf[shelf]
      .map(bookId => this.props.books.byId[bookId]);
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf title="Currently Reading"
              books={this.filterByShelf('currentlyReading')}
              onUpdate={this.props.onUpdate} />
            <Bookshelf title="Want to Read"
              books={this.filterByShelf('wantToRead')}
              onUpdate={this.props.onUpdate} />
            <Bookshelf title="Read"
              books={this.filterByShelf('read')}
              onUpdate={this.props.onUpdate} />

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Bookshelves;

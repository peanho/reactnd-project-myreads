import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
// import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import './App.css';



class BookSearch extends Component {

  state = {
    query: '',
    books: []
  }

  /*
   * TODO: Add visual feedback while waiting for response
   */
  handleChange = (event) => {
    const query = event.target.value || '';
    if (this.state.query !== query) {
      this.setState({query});
      query.length && this.search(query);
    }
  }

  search = term => {
    BooksAPI.search(term)
      .then(books => {
        return books.map( book => this.props.books[book.id] || {
          ...book,
          shelf: 'none'
        });
      })
      .then(books => this.setState( { books } ));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <Debounce time="500" handler="onChange">
              <input type="text"
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
            </Debounce>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.length > 0 && this.state.books.map(it => (
              <li key={it.id}>
                <Book item={it} onUpdate={this.props.onUpdate} />
              </li>)
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookSearch;

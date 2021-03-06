import React from 'react';
import { Route } from 'react-router-dom';
import Bookshelves from './Bookshelves';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import {
  ADD_BOOK_TO_SHELF,
  REMOVE_BOOK_FROM_SHELF,
  MOVE_BOOK_BETWEEN_SHELVES
} from './actions';
import './App.css';

/**
 * A fixed set of shelves since the API doesn't return
 * the shelves titles.
 */
const shelves = {
  byId: {
    currentlyReading: {
      title: 'Currently Reading',
      whenEmptyMsg: "Time to start reading a book..."
    },
    wantToRead: {
      title: 'Want to Read',
      whenEmptyMsg: "Go search for a book to read!"
    },
    read: {
      title: 'Read',
      whenEmptyMsg: "Let's finish one at least."
    }
  },
  allIds: ['currentlyReading', 'wantToRead', 'read']
};

/**
 * A reducer shamelessly inspired by the article:
 * "You Might Not Need Redux" from Dan Abramov.
 */
const books = (state = [], action) => {
  switch (action.type) {
    case REMOVE_BOOK_FROM_SHELF:
      return state.filter(it => it.id !== action.book.id);
    case ADD_BOOK_TO_SHELF:
      return state.concat({
          ...action.book,
          shelf: action.shelf
        });
    case MOVE_BOOK_BETWEEN_SHELVES:
      return state.map(book => {
        if (book.id !== action.book.id) {
          return book;
        } else {
          return {
            ...action.book,
            shelf: action.shelf
          };
        }
      });
    default:
      return state;
  }
}

const store = (state = { booksOnShelves: [] }, action) => ({
  booksOnShelves: books(state.booksOnShelves, action)
});

const mapStateToShelves = shelves => state => shelves.allIds.map(shelf => (
  {
    id: shelf,
    ...shelves.byId[shelf],
    books: state.booksOnShelves.filter(book => book.shelf === shelf)
  }
));

const mapStateToBooksById = ({ booksOnShelves }) => booksOnShelves.reduce((byId, book) => {
  byId[book.id] = book;
  return byId;
}, {});

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { booksOnShelves: [] };
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => ({ booksOnShelves: books }))
      .then(store => this.setState(store));
  }

  update = ( action ) => {
    const { book, shelf } = action;
    BooksAPI.update(book, shelf)
      .then(shelves => this.setState(prevState => store(prevState, action)));
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelves
            shelves={mapStateToShelves(shelves)(this.state)}
            onUpdate={this.update}
          />
        )}
        />
        <Route path="/search" render={() => (
          <BookSearch
            books={mapStateToBooksById(this.state)}
            onUpdate={this.update} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp;

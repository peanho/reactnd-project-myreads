import React from 'react';
import { Route } from 'react-router-dom';
import Bookshelves from './Bookshelves';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: {
        byId: {},
        byShelf: {
          "currentlyReading": [],
          "wantToRead": [],
          "read": []
        }
      }
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const store = books.reduce((store, book) => {
        store.byId[book.id] = book;
        if (store.byShelf.hasOwnProperty(book.shelf)) {
          store.byShelf[book.shelf].push(book.id);
        } else {
          store.byShelf[book.shelf] = [book.id];
        }
        return store;
      }, {byId: {}, byShelf: {}});
      return {
        books: store
      };
    }).then(state => this.setState(state));
  }

  update = (book, shelf) => {
    BooksAPI.update(book, shelf).then(shelves => {
      this.setState((prevState, props) => ({
        ...prevState,
        books: {
          byId: {
            ...prevState.books.byId,
            [book.id]: {
              ...prevState.books.byId[book.id],
              shelf
            }
          },
          byShelf: shelves
        }
      }));
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Bookshelves books={this.state.books} onUpdate={this.update} />
        )}/>
        <Route path="/search" render={() => (
          <BookSearch books={this.state.books} onUpdate={this.update} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;

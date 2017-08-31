import React from 'react';
import { Route } from 'react-router-dom';
import Bookshelves from './Bookshelves';
import BookSearch from './BookSearch';
import * as BooksAPI from './BooksAPI';
import './App.css'

/**
 * A fixed shelves object since the API doesn't return
 * the shelves titles.
 */
const shelves = {
  byId: {
    currentlyReading: {
      title: 'Currently Reading'
    },
    wantToRead: {
      title: 'Want to Read'
    },
    read: {
      title: 'Read'
    }
  },
  allIds: ['currentlyReading', 'wantToRead', 'read']
};

const store = (state = { booksOnShelves: [] }, action) => {
  switch (action.type) {
    case 'REMOVE':
      return {
        booksOnShelves: state.booksOnShelves.filter(it => it.id !== action.book.id)
      };
    case 'ADD':
      return {
        booksOnShelves: state.booksOnShelves.concat({
          ...action.book,
          shelf: action.shelf
        })
      };
    case 'MOVE':
      return {
        booksOnShelves: state.booksOnShelves.map(book => {
          if (book.id !== action.book.id) {
            return book;
          } else {
            return {
              ...action.book,
              shelf: action.shelf
            };
          }
        })
      };
    default:
      return state;
  }
}

const mapStateToShelves = shelves => state => shelves.allIds.map(shelf => (
  {
    id: shelf,
    title: shelves.byId[shelf].title,
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

  /**
   * TODO: handle response error
   */
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

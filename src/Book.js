import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Book extends Component {

  handleChange = event => {
    const shelf = event.target.value;
    const book = this.props.item;
    const prevShelf = book.shelf;
    if (shelf === 'none') { // remove book from shelf
      this.props.onUpdate({ type: 'REMOVE', book, shelf });
    } else if (prevShelf === 'none') {
      this.props.onUpdate({ type: 'ADD', book, shelf });
    } else {
      this.props.onUpdate({ type: 'MOVE', book, shelf });
    }
  }

  render() {
    const { item } = this.props;
    const { title, imageLinks, authors, shelf } = item;
    const style = {
      width: 128,
      height: 193,
      backgroundImage: `url(${imageLinks.thumbnail})`
    };
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style} />
          <div className="book-shelf-changer">
            <select defaultValue={shelf} onChange={this.handleChange} >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {authors &&
          <div className="book-authors">{authors.join(", ")}</div>
        }
      </div>
    )
  }
}

export default Book;

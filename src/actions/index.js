export const ADD_BOOK_TO_SHELF = 'ADD_BOOK_TO_SHELF';
export const REMOVE_BOOK_FROM_SHELF = 'REMOVE_BOOK_FROM_SHELF';
export const MOVE_BOOK_BETWEEN_SHELVES = 'MOVE_BOOK_BETWEEN_SHELVES';

export function addBookToShelf(book, shelf) {
  return {
    type: ADD_BOOK_TO_SHELF,
    book,
    shelf
  };
}

export function removeBookFromShelf(book, shelf) {
  return {
    type: REMOVE_BOOK_FROM_SHELF,
    book,
    shelf
  };
}

export function moveBookBetweenShelves(book, shelf) {
  return {
    type: MOVE_BOOK_BETWEEN_SHELVES,
    book,
    shelf
  };
}

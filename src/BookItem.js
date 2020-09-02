import React from 'react';

const BookItem = ({book, changeBookStatus}) => {

  const formatAuthors = () => {
    if (book.authors) {
      return book.authors.join(', ');
    }

    return book.authors;
  }

  return (
    <div className="book">
      <div className="book-top">
        {book.imageLinks && 
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
        }
        <div className="book-shelf-changer">
          <select value={book.shelf} onChange={changeBookStatus(book)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">
        {formatAuthors()}
      </div>
    </div>
  );
}
 
export default BookItem;
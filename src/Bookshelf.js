import React from 'react';
import BookItem from './BookItem';

const Bookshelf = ({books, shelf, changeBookStatus}) => {

  return ( 
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}><BookItem book={book} changeBookStatus={changeBookStatus} /></li>
          ))}
        </ol>
      </div>
    </div>
  );
}
 
export default Bookshelf;
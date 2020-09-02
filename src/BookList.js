import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

const BookList = ({booksByShelf, changeBookStatus, clearSearch}) => {
  return ( 
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Bookshelf books={booksByShelf('currentlyReading')} shelf={'Currently Reading'}  changeBookStatus={changeBookStatus} />
          <Bookshelf books={booksByShelf('wantToRead')} shelf={'Want to Read'}  changeBookStatus={changeBookStatus} />
          <Bookshelf books={booksByShelf('read')} shelf={'Read'} changeBookStatus={changeBookStatus} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" onClick={clearSearch}><button>Add a book</button></Link>
      </div>
    </div>
   );
}

export default BookList;
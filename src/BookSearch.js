import React from 'react';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';

const BookSearch = ({changeBookStatus, searchText, searchResults, searchBook, clearSearch}) => {

  return ( 
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" onClick={clearSearch}><button className="close-search"></button></Link>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input type="text" placeholder="Search by title or author" value={searchText} onChange={searchBook} />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map(book => (
            <BookItem 
              key={book.id} 
              book={book}
              changeBookStatus={changeBookStatus} />
          ))}
        </ol>
      </div>
    </div>
  );

}

 
export default BookSearch;
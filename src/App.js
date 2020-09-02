import React, { Component } from 'react'
import { getAll, update, search } from './BooksAPI'
import './App.css'
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import updateItem from 'immutability-helper';

class BooksApp extends Component {
  state = {
    showSearchPage: false,
    books: [],
    searchResults: [],
    searchText: ''
  }

  componentDidMount() {
    getAll().then(books => {
      this.setState(() => ({ books: books }));
    });
  }

  booksByShelf = (shelf) => {
    return this.state.books.filter(book => book.shelf === shelf);
  }

  searchBook = e => {
    e.persist();
    const searchQuery = e.target.value;

    this.setState(() => ({searchText: searchQuery}));
      search(searchQuery)
        .then(books => {
          if (books && !books.error) {

            this.setState(prevState => {
              const bookshelfIds = prevState.books.map(book => book.id);

              books.forEach(book => {
                if (bookshelfIds.includes(book.id)) {
                  const matchingBook = prevState.books.find(shelfBook => shelfBook.id === book.id);
                  book.shelf = matchingBook.shelf;
                } else {
                  book.shelf = 'none';
                }
              }) 

              return { searchResults: books }
            });
          } else {
            this.setState(() => ({searchResults: []}));
          }
        });
  }

  changeBookStatus = book => {
    return e => {
      e.persist();
      const shelf = e.target.value;

      update(book, shelf)
        .then(() => {
          this.setState(prevState => {
            const bookOnShelf = prevState.books.find(bookItem => bookItem.id === book.id);
            const bookOnShelfCopy = Object.assign({}, bookOnShelf);
            bookOnShelfCopy.shelf = shelf;

            if (bookOnShelf) {
              const updatedBooks = updateItem(
                prevState.books, 
                {$splice: [[[prevState.books.indexOf(bookOnShelf)], 1, bookOnShelfCopy]] }
              );

              return { books: updatedBooks };
            } else {

              book.shelf = shelf;

              return { 
                books: updateItem(
                  prevState.books,
                  {$push: [book] }
                )
              }
            }

          });
        });
    }
  }

  render() {
    const { searchText, searchResults } = this.state;

    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <BookSearch changeBookStatus={this.changeBookStatus} searchText={searchText} searchResults={searchResults} searchBook={this.searchBook} clearSearch={() => this.setState({searchResults: [], searchText: ''})} />
        )} />
        <Route exact path="/" render={() => (
          <BookList booksByShelf={this.booksByShelf} changeBookStatus={this.changeBookStatus} />
        )} />
      </div>
    )
  }
}

export default BooksApp

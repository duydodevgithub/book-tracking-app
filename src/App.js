import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from "react-router-dom"
import { Route } from "react-router-dom"
import Shelf from "./Shelf";
import Search from "./Search";


class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({books});
    })
  }

  getShelfBooks(shelfName){
    return this.state.books.filter((b) => b.shelf === shelfName)
  }

  changeShelf(book, newShelf) {
    BooksAPI.update(book, newShelf).then(() => {
      book.shelf = newShelf;
      this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([ book ])
      }));
  });
  }

  render() {
    return (
      <div className="app">
      {/*listen to route /search */}
          <Route
            path="/search"
            render={() => (
              <div className="search-books">
              <div className="search-books-bar">
              <Link  to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
            )}
          />
      {/*listen to route / */}
          <Route exact path="/" render={() => 
            (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                {/*contains shelf compnent */}
                  <div>
                  <Shelf
                    title="Currently Reading"
                    books={this.getShelfBooks("currentlyReading")}
                    changeShelf={this.changeShelf}
                  />
                  <Shelf
                    title="Want To Read"
                    books={this.getShelfBooks("wantToRead")}
                    changeShelf={this.changeShelf}
                  />
                  <Shelf
                    title="Read"
                    books={this.getShelfBooks("read")}
                    changeShelf={this.changeShelf}
                  />
                  </div>
                </div>

                <div className="open-search">
                  <Link
                    to="/search"
                  >Add a book</Link>
                </div>
              </div>
            )
          } />
          <Route path="/search" render={({ history }) => (
            <Search
                books={this.state.searchBooks}
                updateQuery={this.updateQuery}
                changeShelf={this.changeShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp

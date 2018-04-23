import React, { Component } from "react";
import ShelfChanger from "./ShelfChanger";

class Book extends Component{
    render(){
        const { book } = this.props;
        return(
            <div className="book" id={book.id}>
                <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                    <ShelfChanger
                        book={book}
                        changeShelf={this.props.changeShelf}/>
                </div>
                <div className="book-title">{book.name}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    }
}

export default Book;
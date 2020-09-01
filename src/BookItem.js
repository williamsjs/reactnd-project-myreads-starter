import React from 'react';

const BookItem = ({imgLinks, status, title, authors}) => {
  return ( 
    <div className="book">
      <div className="book-top">
        {imgLinks && 
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imgLinks.thumbnail}")` }}></div>
        }
        <div className="book-shelf-changer">
          <select value={status}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors}
      </div>
    </div>
  );
}
 
export default BookItem;
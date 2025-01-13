import React, { useEffect, useState } from "react";
import axios from "../api";
import "./BookList.css";

const BookList = ({ onEdit, onDelete }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/books");
        setBooks(response.data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <table className="book-list">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.publicationYear}</td>
            <td>{book.availabilityStatus ? "Yes" : "No"}</td>
            <td>
              <button onClick={() => onEdit(book)}>Edit</button>
              <button onClick={() => onDelete(book._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BookList;

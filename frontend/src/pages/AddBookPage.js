import React, { useState } from "react";
import axios from "../api";
import "./AddBookPage.css";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/books", { title, author, publicationYear: year });
      setMessage("Book added successfully!");
      setTitle("");
      setAuthor("");
      setYear("");
    } catch (error) {
      console.error("Error adding book:", error);
      setMessage("Failed to add the book. Please try again.");
    }
  };

  return (
    <div className="add-book-page">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          type="text"
          placeholder="Enter Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter Publication Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AddBookPage;

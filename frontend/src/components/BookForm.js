import React, { useState } from "react";
import axios from "../api";

const BookForm = ({ book, onSuccess }) => {
  const [formData, setFormData] = useState(book || { title: "", author: "", publicationYear: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await axios.put(`/books/${book._id}`, formData);
      } else {
        await axios.post("/books", formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={formData.publicationYear}
        onChange={(e) => setFormData({ ...formData, publicationYear: e.target.value })}
        required
      />
      <button type="submit">{book ? "Update" : "Add"} Book</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "20px auto" },
};

export default BookForm;

import React, { useState } from "react";
import BookList from "../components/BookList";
import BookForm from "../components/BookForm";

const ManageBooksPage = () => {
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => setEditingBook(book);

  const handleDelete = async (id) => {
    // Implement delete functionality
  };

  return (
    <div>
      {editingBook ? (
        <BookForm book={editingBook} onSuccess={() => setEditingBook(null)} />
      ) : (
        <BookList onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default ManageBooksPage;

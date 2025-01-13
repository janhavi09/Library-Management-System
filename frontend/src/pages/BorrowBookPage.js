import React, { useState } from "react";
import axios from "../api";
import "./BorrowBookPage.css";

const BorrowBookPage = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("borrow");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `/books/${bookId}/${action}`;
      await axios.post(endpoint, { userId });
      setMessage(`Book ${action}ed successfully!`);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="borrow-page">
      <h2>{action === "borrow" ? "Borrow a Book" : "Return a Book"}</h2>
      <form onSubmit={handleSubmit} className="borrow-form">
        <input
          type="text"
          placeholder="Enter Book ID"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <select value={action} onChange={(e) => setAction(e.target.value)}>
          <option value="borrow">Borrow</option>
          <option value="return">Return</option>
        </select>
        <button type="submit">
          {action === "borrow" ? "Borrow Book" : "Return Book"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default BorrowBookPage;

import React, { useState } from "react";
import axios from "../api";

const BorrowBookForm = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [action, setAction] = useState("borrow");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = `/books/${bookId}/${action}`;
      await axios.post(endpoint, { userId });
      alert("Operation successful");
    } catch (error) {
      console.error("Error borrowing/returning book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
      />
      <select value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="borrow">Borrow</option>
        <option value="return">Return</option>
      </select>
      <button type="submit">{action === "borrow" ? "Borrow" : "Return"} Book</button>
    </form>
  );
};

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px", margin: "20px auto" },
};

export default BorrowBookForm;

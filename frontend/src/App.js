import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import ManageBooksPage from "./pages/ManageBooksPage";
import BorrowBookPage from "./pages/BorrowBookPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/manage-books" element={<ManageBooksPage />} />
        <Route path="/borrow-book" element={<BorrowBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;

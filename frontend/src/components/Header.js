import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => (
  <nav className="header">
    <h1>Library Management System</h1>
    <div className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/add-book">Add Book</Link>
      <Link to="/manage-books">Manage Books</Link>
      <Link to="/borrow-book">Borrow/Return</Link>
    </div>
  </nav>
);

export default Header;

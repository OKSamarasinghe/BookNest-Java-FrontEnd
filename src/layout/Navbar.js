import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid justify-content-between">
          <Link className="navbar-brand" to="/">
            Book Store Management System
          </Link>
          <div className="d-flex gap-2">
            <Link className="btn btn-outline-light" to="/">
              Home
            </Link>
            <Link className="btn btn-outline-light" to="/users">
              Users
            </Link>
            <Link className="btn btn-outline-light" to="/books">
              Books
            </Link>
            <Link className="btn btn-outline-light" to="/orders">
              Orders
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

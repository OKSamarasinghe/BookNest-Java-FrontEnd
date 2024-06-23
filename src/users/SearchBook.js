import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/book/books?name=${searchTerm}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error searching for books:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/book/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleBack = () => {
    window.location.href = "/"; // Redirect to the root page
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex align-items-end justify-content-end">
          <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-danger" onClick={handleBack}>Back</button> {/* Changed color to red */}
        </div>
      </div>

      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Book Name</th>
            <th scope="col">ISBN</th>
            <th scope="col">Author Name</th>
            <th scope="col">Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <th scope="row">{index + 1}</th>
              <td>{book.name}</td>
              <td>{book.isbn}</td>
              <td>{book.author}</td>
              <td>{book.price}</td>
              <td>
                <Link
                  className="btn btn-primary mx-2"
                  to={`/viewbook/${book.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/editbook/${book.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchBook;

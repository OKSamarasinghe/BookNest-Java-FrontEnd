import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Book() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:8081/book/books");
    setBooks(result.data);
  };

  const deleteBook = async (id) => {
    await axios.delete(`http://localhost:8081/book/books/${id}`);
    loadBooks();
  };

  const handleExit = () => {
    // Redirect to the root page
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Books</h2>
        <div className="mb-3 d-flex justify-content-center">
          <Link className="btn btn-primary mb-3 me-2" to="/addbook">
            Add Book
          </Link>
          <button className="btn btn-danger mb-3" onClick={handleExit}>Back</button> {/* Added mb-3 class */}
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Book Name</th>
              <th scope="col">ISBN</th>
              <th scope="col">Author Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th> {/* Added quantity header */}
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
                <td>{book.quantity}</td> {/* Added quantity column */}
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewbook/${book.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editbook/${book.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteBook(book.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

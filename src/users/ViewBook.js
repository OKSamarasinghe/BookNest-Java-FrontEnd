import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewBook() {
  const [book, setBook] = useState({
    id: "",
    name: "",
    isbn: "",
    author: "",
    price: "",
    quantity: "" // Add quantity field
  });

  const { id } = useParams();

  useEffect(() => {
    loadBook();
  }, []);

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8081/book/books/${id}`);
    setBook(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Book Details</h2>

          <div className="card">
            <div className="card-header">
              Details of book id: {book.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {book.name}
                </li>
                <li className="list-group-item">
                  <b>ISBN:</b> {book.isbn}
                </li>
                <li className="list-group-item">
                  <b>Author:</b> {book.author}
                </li>
                <li className="list-group-item">
                  <b>Price:</b> {book.price}
                </li>
                <li className="list-group-item">
                  <b>Quantity:</b> {book.quantity}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/books"}>
            Back to Books
          </Link>
        </div>
      </div>
    </div>
  );
}

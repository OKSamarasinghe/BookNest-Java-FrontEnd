import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState({
    name: "",
    isbn: "",
    author: "",
    price: "",
    quantity: "" // Add quantity field
  });

  const { name, isbn, author, price, quantity } = book;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    // Restrict input for bookName and author to only allow letters
    if (name === "name" || name === "author") {
      updatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }
    // Restrict input for isbn, price, and quantity to only allow numbers
    else if (name === "isbn" || name === "price" || name === "quantity") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }

    setBook({ ...book, [name]: updatedValue });
  };

  useEffect(() => {
    loadBook();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!name || !isbn || !author || !price || !quantity) {
      alert("Please fill all details.");
      return;
    }
    await axios.put(`http://localhost:8081/book/books/${id}`, book);
    navigate("/books");
  };

  const loadBook = async () => {
    const result = await axios.get(`http://localhost:8081/book/books/${id}`);
    setBook(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Book Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ISBN" className="form-label">
                ISBN No
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ISBN No"
                name="isbn"
                value={isbn}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter author name"
                name="author"
                value={author}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={!name || !isbn || !author || !price || !quantity}>
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/books">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

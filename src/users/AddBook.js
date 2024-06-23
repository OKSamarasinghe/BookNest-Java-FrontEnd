import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddBook() {
  let navigate = useNavigate();

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
      updatedValue = value.replace(/[^a-zA-Z]/g, "");
    }

    // Restrict input for isbn, price, and quantity to only allow numbers
    if (name === "isbn" || name === "price" || name === "quantity") {
      updatedValue = value.replace(/\D/g, "");
    }

    setBook({ ...book, [name]: updatedValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8081/book/books", book);
    navigate("/books");
  };

  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      isbn.trim() !== "" &&
      author.trim() !== "" &&
      price.trim() !== "" &&
      quantity.trim() !== "" // Validate quantity field
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Book</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="bookName" className="form-label">
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
              <label htmlFor="isbn" className="form-label">
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
              <label htmlFor="author" className="form-label">
                Author
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book author name"
                name="author"
                value={author}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
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
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary" disabled={!isFormValid()}>
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

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddOrder() {
  let navigate = useNavigate();

  const [order, setOrder] = useState({
    username: "",
    bookName: "",
    quantity: "",
    isbn: "",
    price: ""
  });

  const [bookNames, setBookNames] = useState([]);
  const [isValidBook, setIsValidBook] = useState(true);
  const [isValidISBN, setIsValidISBN] = useState(true);
  const [isValidPrice, setIsValidPrice] = useState(true);
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { username, bookName, quantity, isbn, price } = order;

  useEffect(() => {
    axios.get("http://localhost:8081/book/books/names")
      .then(response => {
        setBookNames(response.data);
      })
      .catch(error => {
        console.error("Error fetching book names:", error);
      });
  }, []);

  const onInputChange = async (e) => {
    const { name, value } = e.target;

    // Validate input according to the field name
    if (name === "username" || name === "bookName") {
      // Allow only letters and spaces, or clear the input field if it doesn't match
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) {
        setOrder({ ...order, [name]: "" }); // Clear the input field
        setErrorMessage("");
        return;
      }
    } else if (name === "quantity") {
      // Allow only numbers, or clear the input field if it doesn't match
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        setOrder({ ...order, [name]: "" }); // Clear the input field
        setErrorMessage("Only numbers are allowed.");
        return;
      }
    }

    setOrder({ ...order, [name]: value });
  
    if (name === "username") {
      await checkUsernameExistence(value);
    } else if (name === "bookName") {
      const isValid = bookNames.includes(value);
      setIsValidBook(isValid);
      setErrorMessage(isValid ? "" : "");
      if (isValid) {
        const isbn = await getIsbnByBookName(value);
        if (isbn !== null) {
          setOrder((prevOrder) => ({ ...prevOrder, isbn: isbn }));
          setIsValidBook(true);
          const availableQty = await getAvailableQuantity(value);
          setAvailableQuantity(availableQty);
        } else {
          setIsValidBook(false);
          setAvailableQuantity("");
        }
        const bookPrice = await getPriceByName(value);
        if (bookPrice !== null) {
          setOrder((prevOrder) => ({ ...prevOrder, price: bookPrice }));
          setIsValidPrice(true);
        } else {
          setIsValidPrice(false);
        }
      } else {
        setAvailableQuantity("");
        setIsValidPrice(false);
        setOrder((prevOrder) => ({ ...prevOrder, isbn: "" }));
      }
    } else if (name === "quantity") {
      const enteredQuantity = parseInt(value);
      const availableQuantityInt = parseInt(availableQuantity);
      if (enteredQuantity > availableQuantityInt) {
        setErrorMessage("Quantity exceeds available stock.");
      } else {
        setErrorMessage("");
      }
    } else if (name === "price" && value === "") {
      setOrder((prevOrder) => ({ ...prevOrder, price: "" }));
      setIsValidPrice(true);
    } else if (value === "") {
      switch (name) {
        case "username":
          setIsValidUsername(true);
          break;
        case "bookName":
          setIsValidBook(true);
          setErrorMessage("");
          break;
        default:
          break;
      }
    }
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isValidBook) {
      setErrorMessage("Book does not exist.");
      return;
    }

    if (!isValidISBN) {
      setErrorMessage("ISBN does not exist in the book database.");
      return;
    }

    if (!isValidPrice) {
      setErrorMessage("Price does not exist in the book database.");
      return;
    }

    if (!isValidUsername) {
      setErrorMessage("This username does not exist.");
      return;
    }

    if (errorMessage) {
      return;
    }

    try {
      await axios.post("http://localhost:8082/order/orders", order);
      navigate("/orders");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    }
  };

  const getIsbnByBookName = async (bookName) => {
    try {
      const response = await axios.get(`http://localhost:8081/book/books/isbn`, {
        params: {
          name: bookName
        }
      });
      const isbn = response.data;
      setIsValidISBN(isbn !== null);
      setErrorMessage(isbn ? "" : "ISBN does not exist in the book database.");
      return isbn;
    } catch (error) {
      console.error("Error checking ISBN existence:", error);
      setIsValidISBN(false);
      setErrorMessage("Error checking ISBN existence. Please try again.");
      return null;
    }
  };

  const getPriceByName = async (bookName) => {
    try {
      const response = await axios.get(`http://localhost:8081/book/books/price`, {
        params: {
          name: bookName
        }
      });
      const price = response.data;
      setIsValidPrice(typeof price === 'number' && price >= 0);
      setErrorMessage(price !== null ? "" : "Price does not exist in the book database.");
      return price;
    } catch (error) {
      console.error("Error fetching book price:", error);
      setIsValidPrice(false);
      setErrorMessage("Error fetching book price. Please try again.");
      return null;
    }
  };

  const getAvailableQuantity = async (bookName) => {
    try {
      const response = await axios.get(`http://localhost:8081/book/books/quantity`, {
        params: {
          name: bookName
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching available quantity:", error);
      return "";
    }
  };

  const checkUsernameExistence = async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/user/users/username/${username}`);
      const exists = response.data;
      setIsValidUsername(exists);
      if (!exists) {
        setErrorMessage("");
      } else {
        setErrorMessage("");
      }
      return exists;
    } catch (error) {
      console.error("Error checking Username existence:", error);
      setIsValidUsername(false);
      setErrorMessage("");
      return false;
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add New Order</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="UserName" className="form-label">
                User Name
              </label>
              <div className="input-group">
                <input
                  type={"text"}
                  className={`form-control ${!isValidUsername ? "is-invalid" : ""}`}
                  placeholder="Enter user name"
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/SearchUser")}
                >
                  Search
                </button>
              </div>
              {!isValidUsername && <div className="invalid-feedback">This username does not exist.</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="BookName" className="form-label">
                Book Name
              </label>
              <div className="input-group">
                <input
                  type={"text"}
                  className={`form-control ${(!isValidBook && errorMessage === "") ? "is-invalid" : ""}`}
                  placeholder="Enter book name"
                  name="bookName"
                  value={bookName}
                  onChange={(e) => {
                    onInputChange(e);
                    getAvailableQuantity(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => navigate("/SearchBook")}
                >
                  Search
                </button>
              </div>
              {(!isValidBook && errorMessage === "") && <div className="invalid-feedback">{errorMessage}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="AvailableQuantity" className="form-label">
                Available Quantity
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Available quantity"
                name="availableQuantity"
                value={availableQuantity}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
                Quantity
              </label>
              <input
                type={"text"}
                className={`form-control ${errorMessage ? "is-invalid" : ""}`}
                placeholder="Enter quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
              {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="ISBN" className="form-label">
                ISBN
              </label>
              <input
                type={"text"}
                className={`form-control ${!isValidISBN ? "is-invalid" : ""}`}
                placeholder="Enter ISBN"
                name="isbn"
                value={isbn}
                readOnly={true}
                onChange={(e) => {
                  onInputChange(e);
                  getIsbnByBookName(e.target.value);
                }}
              />
              {!isValidISBN && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="UnitPrice" className="form-label">
                Unit Price
              </label>
              <input
                type="text"
                className={`form-control ${!isValidPrice ? "is-invalid" : ""}`}
                placeholder="Enter unit price"
                name="price"
                value={price}
                onChange={(e) => {
                  onInputChange(e);
                  getPriceByName(e.target.value);
                }}
                readOnly
              />
              {!isValidPrice && errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={!username || !bookName || !quantity || !isbn || !price || !isValidBook || !isValidPrice || errorMessage}
            >
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/orders">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

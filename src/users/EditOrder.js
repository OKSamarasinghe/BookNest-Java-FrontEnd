import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditOrder() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState({
    username: "",
    bookName: "",
    quantity: "",
    isbn: "",
    price: ""
  });

  const { quantity } = order;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  useEffect(() => {
    loadOrder();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8082/order/orders/${id}`, order);
    navigate("/orders");
  };

  const loadOrder = async () => {
    const result = await axios.get(`http://localhost:8082/order/orders/${id}`);
    setOrder(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Order</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                name="username"
                value={order.username} // Fixed value
                readOnly // Make it read-only
              />
            </div>
            <div className="mb-3">
              <label htmlFor="BookName" className="form-label">
                BookName
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book name"
                name="bookName"
                value={order.bookName} // Fixed value
                readOnly // Make it read-only
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="ISBN" className="form-label">
                ISBN No
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ISBN No"
                name="isbn"
                value={order.isbn} // Fixed value
                readOnly // Make it read-only
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter price"
                name="price"
                value={order.price} // Fixed value
                readOnly // Make it read-only
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={!quantity}
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

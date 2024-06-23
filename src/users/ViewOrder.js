import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewOrder() {
  const [order, setOrder] = useState({
    id: "",
    username: "",
    bookName: "",
    quantity: "",
    isbn: "",
    price: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    const result = await axios.get(`http://localhost:8082/order/orders/${id}`);
    setOrder(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Order Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Order ID: {order.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Username:</b> {order.username}
                </li>
                <li className="list-group-item">
                  <b>Book Name:</b> {order.bookName}
                </li>
                <li className="list-group-item">
                  <b>Quantity:</b> {order.quantity}
                </li>
                <li className="list-group-item">
                  <b>ISBN:</b> {order.isbn}
                </li>
                <li className="list-group-item">
                  <b>Price:</b> {order.price}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to="/orders">
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

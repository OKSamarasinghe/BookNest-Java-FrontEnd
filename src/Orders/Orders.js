import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const result = await axios.get("http://localhost:8082/order/orders");
      setOrders(result.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:8082/order/orders/${id}`);
    loadOrders();
  };

  const handleExit = () => {
    // Redirect to the root page
    window.location.href = "/";
  };

  return (
    <div className="container">
      <div className="py-4">
        <h2>Orders</h2>
        <div className="mb-3">
          <Link className="btn btn-primary me-2" to="/addorder">
            Add Order
          </Link>
          <button className="btn btn-danger" onClick={handleExit}>Back</button>
        </div>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Book Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">ISBN</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Total Price</th> {/* New column for Total Price */}
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <th scope="row">{index + 1}</th>
                <td>{order.username}</td>
                <td>{order.bookName}</td>
                <td>{order.quantity}</td>
                <td>{order.isbn}</td>
                <td>{order.price}</td>
                <td>{(parseFloat(order.quantity) * parseFloat(order.price)).toFixed(2)}</td> {/* Calculate and display total price */}
                <td>
                  <Link className="btn btn-primary mx-2" to={`/vieworder/${order.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/editorder/${order.id}`}>
                    Edit
                  </Link>
                  <button className="btn btn-danger mx-2" onClick={() => deleteOrder(order.id)}>
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

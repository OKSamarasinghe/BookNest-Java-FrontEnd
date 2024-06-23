import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchOrder = () => {
  const [searchType, setSearchType] = useState("User Name");
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState([]);

  const handleSearch = async () => {
    try {
      let response;
      if (searchType === "User Name") {
        response = await axios.get(`http://localhost:8082/order/orders?username=${searchValue}`);
      } else if (searchType === "Book Name") {
        response = await axios.get(`http://localhost:8082/order/orders?bookName=${searchValue}`);
      }
      setOrders(response.data);
    } catch (error) {
      console.error("Error searching for orders:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8082/order/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleBack = () => {
    window.location.href = "/"; // Redirect to the root page
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-md-6">
          <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
            <option value="User Name">User Name</option>
            <option value="Book Name">Book Name</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder={`Enter ${searchType}`}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-flex align-items-center justify-content-end">
          <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-danger" onClick={handleBack}>Back</button>
        </div>
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
            <th scope="col">Total Price</th>
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
              <td>{(parseFloat(order.quantity) * parseFloat(order.price)).toFixed(2)}</td>
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
  );
};

export default SearchOrder;

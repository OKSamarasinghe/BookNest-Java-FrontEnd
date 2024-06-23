import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchUser = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/user/users?name=${name}`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error searching for users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/user/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
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
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <button className="btn btn-primary me-2" onClick={handleSearch}>Search</button>
          <button className="btn btn-danger" onClick={handleBack}>Back</button>
        </div>
      </div>

      <table className="table border shadow">
        <thead>
          <tr>
            <th scope="col">S.N</th>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  className="btn btn-primary mx-2"
                  to={`/viewuser/${user.id}`}
                >
                  View
                </Link>
                <Link
                  className="btn btn-outline-primary mx-2"
                  to={`/edituser/${user.id}`}
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => deleteUser(user.id)}
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

export default SearchUser;

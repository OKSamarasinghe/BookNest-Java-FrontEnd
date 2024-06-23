import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [validEmail, setValidEmail] = useState(true);

  const { name, username, email } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    // Restrict input for name and username to only allow letters
    if (name === "name" || name === "username") {
      setUser({ ...user, [name]: value.replace(/[^a-zA-Z]/g, "") });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail) {
      alert("Wrong email format. Please enter a valid email.");
      return;
    }
    await axios.post("http://localhost:8080/user/users", user);
    navigate("/users");
  };

  // Validate email format and enable/disable submit button
  const handleEmailValidation = (e) => {
    const emailValue = e.target.value;
    if (validateEmail(emailValue)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const isFormValid = () => {
    return name.trim() !== "" && username.trim() !== "" && email.trim() !== "";
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Username" className="form-label">
                Username
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your username"
                name="username"
                value={username}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                E-mail
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your e-mail address"
                name="email"
                value={email}
                onChange={(e) => {
                  onInputChange(e);
                  handleEmailValidation(e);
                }}
              />
              {!validEmail && (
                <p className="text-danger">Please Enter Valid Email </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={!validEmail || !isFormValid()}
            >
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/users">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

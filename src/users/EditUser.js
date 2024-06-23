import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [validEmail, setValidEmail] = useState(true);
  const [formValid, setFormValid] = useState(false);

  const { name, username, email } = user;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name" || name === "username") {
      // Restrict input for name and username to only allow letters
      setUser({ ...user, [name]: value.replace(/[^a-zA-Z]/g, "") });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    validateForm();
  }, [user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail) {
      alert("Wrong email format. Please enter a valid email.");
      return;
    }
    if (!formValid) {
      alert("Please fill in all details.");
      return;
    }
    await axios.put(`http://localhost:8080/user/users/${id}`, user);
    navigate("/users");
  };

  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/user/users/${id}`);
      setUser(result.data);
      handleEmailValidation(result.data.email);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = (email) => {
    if (validateEmail(email)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };

  const validateForm = () => {
    if (name && username && email && validEmail) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>

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
                  handleEmailValidation(e.target.value);
                }}
              />
              {!validEmail && (
                <p className="text-danger">Wrong email format.</p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary"
              disabled={!validEmail || !formValid}
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

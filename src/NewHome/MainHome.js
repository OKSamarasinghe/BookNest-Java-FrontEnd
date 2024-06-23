import React from "react";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <h1 className="display-4 text-center mb-5">Welcome to Book Store </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <img src="https://images.pexels.com/photos/4861363/pexels-photo-4861363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="Users" />
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Manage users of the system.</p>
              <Link to="/SearchUser" className="btn btn-primary">Search Users</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <img src="https://images.pexels.com/photos/3952095/pexels-photo-3952095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="Books" />
            <div className="card-body">
              <h5 className="card-title">Books</h5>
              <p className="card-text">Manage books available in the store.</p>
              <Link to="/SearchBook" className="btn btn-primary">Search Books</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <img src="https://images.pexels.com/photos/4855378/pexels-photo-4855378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" alt="Orders" />
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <p className="card-text">View and manage customer orders.</p>
              <Link to="/SearchOrder" className="btn btn-primary">Search Orders</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainHome;

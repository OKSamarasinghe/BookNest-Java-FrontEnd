import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import MainHome from "./NewHome/MainHome";

import Home from "./pages/Home";
import Book from "./bookPg/Book";
import Orders from "./Orders/Orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import ViewUser from "./users/ViewUser";
import AddBook from "./users/AddBook";
import EditBook from "./users/EditBook";
import ViewBook from "./users/ViewBook";
import AddOrder from "./users/AddOrder";
import EditOrder from "./users/EditOrder";
import ViewOrder from "./users/ViewOrder";
import SearchUser from "./users/SearchUser";
import SearchBook from "./users/SearchBook";
import SearchOrder from "./users/SearchOrder";





function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<MainHome />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/users" element={<Home />} />
          <Route exact path="/books" element={<Book />} />
          <Route exact path="/adduser" element={<AddUser />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/addbook" element={<AddBook />} />
          <Route exact path="/editBook/:id" element={<EditBook />} />
          <Route exact path="/viewBook/:id" element={<ViewBook />} />
          <Route exact path="/addorder" element={<AddOrder />} />
          <Route exact path="/editOrder/:id" element={<EditOrder />} />
          <Route exact path="/viewOrder/:id" element={<ViewOrder />} />
          <Route exact path="/SearchUser" element={<SearchUser />} />
          <Route exact path="/SearchBook" element={<SearchBook />} />
          <Route exact path="/SearchOrder" element={<SearchOrder />} />



        </Routes>
      </Router>
    </div>
  );
}

export default App;

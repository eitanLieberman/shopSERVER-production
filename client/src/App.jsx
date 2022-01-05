import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import AdminPanel from "./pages/AdminPanel";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import React, { Fragment } from "react";
const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route path="/products/:category" element={<ProductList />} />

        <Route path="/product/:id" element={<Product />} />

        <Route path="/cart" element={user ? <Cart /> : <Navigate to="/" />} />

        <Route path="/success" element={<Success />} />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        {user && user.isAdmin && (
          <Route path="/AdminPanel" element={<AdminPanel />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

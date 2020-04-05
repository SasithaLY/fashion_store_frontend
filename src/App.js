import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./shared/components/navigation/MainHeader";
import Footer from "./shared/components/footer/Footer";
import Home from "./home/pages/home";
import Checkout from "./payment/pages/Checkout";
import Register from "./user/pages/register";
import UploadProducts from "./Components/Upload Products/uploadProducts";
import SingleIProductDetails from "./Components/Products/singleIProductDetails";

const App = () => {
  return (
    <div className="main-container">
      <div>
        <Router>
          <Switch>
            <Route path="/addProduct" exact>
              <UploadProducts />
            </Route>
            <Route path="/" exact>
              <Header />
              <Home />
            </Route>
            <Route path="/products" exact>
              <Header />
              <h2>Add products page here</h2>
            </Route>
            <Route path="/products/:id" exact>
              <Header />
              <SingleIProductDetails />
            </Route>
            <Route path="/cart" exact>
              <Header />
              <h2>Add cart page here</h2>
            </Route>
            <Route path="/order" exact>
              <Header />
              <h2>Add order page here</h2>
            </Route>
            <Route path="/checkout" exact>
              <Header />
              <Checkout />
            </Route>
            <Route path="/contact" exact>
              <Header />
              <h2>Add contact page here</h2>
            </Route>
            <Route path="/about" exact>
              <Header />
              <h2>Add about page here</h2>
            </Route>
            <Route path="/login" exact>
              <Header />
              <h2>Add login page here</h2>
            </Route>
            <Route path="/register" exact>
              <Header />
              <Register />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>

      <div className="cusfooter">
        <Footer />
      </div>
    </div>
  );
};

export default App;

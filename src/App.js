import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./shared/components/navigation/MainHeader";
import Footer from "./shared/components/footer/Footer";
import Home from "./home/pages/home";
import Payment from './payment/pages/Payment';
import Checkout from './payment/pages/Checkout';

const App = () => {
  return (
    <div className="main-container">

      <div>
        <Router>
          <Switch>
            <Route path="/addProduct" exact>
              <h1>Add Products</h1>
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
              <h2>Add products page here</h2>
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
              <h2>Add register page here</h2>
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

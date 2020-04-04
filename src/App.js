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
<<<<<<< HEAD
import Register from "./user/pages/Register";
=======
import UploadProducts from "./Components/Upload Products/uploadProducts";
>>>>>>> b113599a628d232019f308374dc75f446deac12b

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
<<<<<<< HEAD
              <Register></Register>
=======
              <Header />
              <h2>Add register page here</h2>
>>>>>>> b113599a628d232019f308374dc75f446deac12b
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

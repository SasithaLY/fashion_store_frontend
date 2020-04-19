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
import Payment from './payment/pages/Payment';
import Cart from "./cart/cart";
import UploadProducts from "./Components/Upload Products/uploadProducts";
import UploadCategories from "./Components/UploadCategories/UploadCategories";
import Login from "./user/pages/Login";
import Profile from "./user/pages/Profile";
import Checkout from "./payment/pages/Checkout";
import SingleIProductDetails from "./Components/Products/singleIProductDetails";
import Register from "./user/pages/register";
import UploadProductsMultiple from "./Components/Upload Products/uploadProductsMultiple";
import AllProductsByCategory from "./Components/Products/AllProductsByCategory";
import AllProducts from "./Components/Products/AllProducts";



const App = () => {
  return (
    <div className="main-container">
      <div>
        <Router>
          <Switch>
            <Route path="/addProduct" exact>
              <UploadProducts />
            </Route>
            <Route path="/addCategory" exact>
              <UploadCategories />
            </Route>
            <Route path="/" exact>
              <Header />
              <Home />
            </Route>
            <Route path="/allProducts/:categoryId" exact>
              <Header />
              <AllProductsByCategory />
            </Route>
            <Route path="/products/:id" exact>
              <Header />
              <SingleIProductDetails />
            </Route>
            <Route path="/cart" exact>
              <Header />
              <Cart/>
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
              <Login></Login>
            </Route>
            <Route path="/register" exact>
              <Header />
              <Register></Register>
            </Route>
            <Route path="/profile" exact>
              <Header />
              <Profile></Profile>
            </Route>
            <Route path="/uploadMultiple" exact>
              <UploadProductsMultiple />
            </Route>
            <Route path="/allProducts" exact>
              <Header />
              <AllProducts />
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

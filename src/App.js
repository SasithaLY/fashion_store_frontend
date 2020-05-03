import React from "react";
import {
  BrowserRouter,
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
import Login from "./user/Pages/Login";
import Profile from "./user/Pages/Profile";
import Checkout from "./payment/pages/Checkout";
import SingleIProductDetails from "./Components/Products/singleIProductDetails";
import Register from "./user/Pages/Register";
import Dashboard from "./user/adminPages/Dashboard"
import UploadCategories from "./Components/UploadCategories/UploadCategories";
import UploadProductsMultiple from "./Components/Upload Products/uploadProductsMultiple";
import AllProductsByCategory from "./Components/Products/AllProductsByCategory";
import AllProducts from "./Components/Products/AllProducts";
import UpdateProduct from "./Components/Update/UpdateProduct";
import ProductsByAdmin from "./Components/Products/ProductsByAdmin";

import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"

const App = () => {
  return (
    <div className="main-container">
      <div>
        <BrowserRouter>

          <Header />

          <Switch>
            <Route path="/addProduct" exact>
              <UploadProducts />
            </Route>

            <Route path="/addCategory" exact>
              <UploadCategories />
            </Route>

            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/allProducts/:categoryId" exact>
              <AllProductsByCategory />
            </Route>

            <Route path="/products/:id" exact>
              <SingleIProductDetails />
            </Route>

            <Route path="/cart" exact>
              <Cart />
            </Route>

            <Route path="/order" exact>
              <h2>Add order page here</h2>
            </Route>

            <Route path="/checkout" exact>
              <Checkout />
            </Route>

            <Route path="/contact" exact>
              <h2>Add contact page here</h2>
            </Route>

            <Route path="/about" exact>
              <h2>Add about page here</h2>
            </Route>

            <Route path="/signin" exact>
              <Login></Login>
            </Route>

            <Route path="/signup" exact>
              <Register></Register>
            </Route>

            {/* private routes */}

            <PrivateRoute path="/user/profile" exact component={Profile} />

            {/* admin routes */}

            <AdminRoute path="/admin/dashboard" exact component={Dashboard} />

            <Route path="/uploadMultiple" exact>
              <UploadProductsMultiple />
            </Route>

            <Route path="/allProducts" exact>
              <AllProducts />
            </Route>

            <Route path="/storeManager/updateProducts/:productId" exact>
              <UpdateProduct />
            </Route>

            <Route path="/storeManager/allProducts/" exact>
              <ProductsByAdmin />
            </Route>

            <Redirect to="/" />

          </Switch>
        </BrowserRouter>
      </div>

      <div className="cusfooter">
        <Footer />
      </div>
    </div>
  );
};

export default App;

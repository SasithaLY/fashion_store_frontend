import React from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Header from "./shared/components/navigation/MainHeader";
import Footer from "./shared/components/footer/Footer";

import Login from "./user/pages/Login";
import Register from "./user/pages/register";
import Profile from "./user/pages/Profile";
import EditProfile from "./user/pages/EditProfile"

import AddManager from "./user/Admin/AddManager";
import AddAdmin from "./user/Admin/AddAdmin";

import Home from "./home/pages/home";
import Cart from "./cart/cart";
import WishList from "./wishList/wishList";
import UploadProducts from "./Components/Upload Products/uploadProducts";
import Checkout from "./payment/pages/Checkout";
import SingleIProductDetails from "./Components/Products/singleIProductDetails";
import Dashboard from "./user/Admin/Dashboard";
import UploadCategories from "./Components/UploadCategories/UploadCategories";
import UploadProductsMultiple from "./Components/Upload Products/uploadProductsMultiple";
import AllProductsByCategory from "./Components/Products/AllProductsByCategory";
import AllProducts from "./Components/Products/AllProducts";
import UpdateProduct from "./Components/Update/UpdateProduct";
import ProductsByAdmin from "./Components/Products/ProductsByAdmin";
import Orders from "./order/admin/orders";
import OrdersHistory from "./order/user/orderHistory";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import StoreManagerRoute from "./auth/StoreManagerRoute";
import NormalRoute from "./auth/NormalRoute";
import OrderHistory from "./order/user/orderHistory";
import Locations from "./locations/Locations";

const App = () => {
  return (
    <div className="main-container">
      <div>
        <BrowserRouter>
          <Switch>
            <NormalRoute path="/" exact component={Home} />
            <NormalRoute path="/cart" exact component={Cart} />
            <NormalRoute path="/signin" exact component={Login} />
            <NormalRoute path="/signup" exact component={Register} />

            {/* PRODUCTS AND CATEGORIES */}

            <NormalRoute path="/allProducts" exact component={AllProducts} />             
            <NormalRoute path="/allProducts/search/:keyWord" exact component={AllProducts} />             
            <NormalRoute path="/allProducts/:categoryId" exact component={AllProductsByCategory} />              
            <NormalRoute path="/products/:id" exact component={SingleIProductDetails} />
              
            {/* PRODUCTS AND CATEGORIES */}

            {/* private routes */}

            <PrivateRoute path="/user/profile" exact component={Profile} />
            <PrivateRoute path="/user/editProfile/:userId" exact component={EditProfile}/>
            <PrivateRoute path="/checkout" exact component={Checkout} />
            <PrivateRoute path="/user/orderHistory" exact component={OrderHistory} />
            <PrivateRoute path="/wishList" exact component={WishList} />


            {/* admin routes */}

            <AdminRoute path="/admin/dashboard" exact component={Dashboard}/>           
            <AdminRoute path="/admin/user/profile" exact component={Profile}/>           
            <AdminRoute path="/admin/orders" exact component={Orders} />
            <AdminRoute path="/admin/addManager" exact component={AddManager} />
            <AdminRoute path="/admin/addAdmin" exact component={AddAdmin} />
            <AdminRoute path="/addProduct" exact component={UploadProducts} />
            <AdminRoute path="/admin/locations" exact component={Locations} />

            {/* PRODUCTS AND CATEGORIES */}
            
            <AdminRoute path="/addCategory" exact component={UploadCategories}/>
            <AdminRoute path="/uploadMultiple" exact component={UploadProductsMultiple} />

            {/* PRODUCTS AND CATEGORIES */}
            

            {/* STORE MANAGER PRIVILEGES */}
            <StoreManagerRoute path="/admin/orders" exact component={Orders} />
            <StoreManagerRoute path="/storeManager/updateProducts/:productId" exact component={UpdateProduct}/>
            <StoreManagerRoute path="/storeManager/allProducts" exact component={ProductsByAdmin}/>

            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;

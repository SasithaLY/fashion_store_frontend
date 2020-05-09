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

import Login from "./user/Pages/Login";
import Register from "./user/Pages/Register";
import Profile from "./user/Pages/Profile";
import EditProfile from "./user/Pages/EditProfile"

import AddManager from "./user/Admin/AddManager";
import AddAdmin from "./user/Admin/AddAdmin";

import Home from "./home/pages/home";
import Cart from "./cart/cart";
import WishList from "./wishList/wishList";
import UploadProducts from "./Components/Upload Products/uploadProducts";
import Checkout from "./payment/pages/Checkout";
import SingleIProductDetails from "./Components/Products/singleIProductDetails";
import Dashboard from "./user/Admin/Dashboard"
import UploadCategories from "./Components/UploadCategories/UploadCategories";
import UploadProductsMultiple from "./Components/Upload Products/uploadProductsMultiple";
import AllProductsByCategory from "./Components/Products/AllProductsByCategory";
import AllProducts from "./Components/Products/AllProducts";
import UpdateProduct from "./Components/Update/UpdateProduct";
import ProductsByAdmin from "./Components/Products/ProductsByAdmin";
import Orders from "./order/admin/orders"

import PrivateRoute from "./auth/PrivateRoute"
import AdminRoute from "./auth/AdminRoute"
import ManagerRoute from "./auth/ManagerRoute"



const App = () => {
    return (
        <div className="main-container">
            <div>
                <BrowserRouter>

                    <Switch>

                        <Route path="/" exact>
                            <Header />
                            <Home/>
                        </Route>

                        <Route path="/cart" exact>
                            <Header />
                            <Cart/>
                        </Route>

                        <Route path="/order" exact>
                            <Header />
                            <h2>Add order page here</h2>
                        </Route>

                        <Route path="/contact" exact>
                            <Header />
                            <h2>Add contact page here</h2>
                        </Route>

                        <Route path="/about" exact>
                            <Header />
                            <h2>Add about page here</h2>
                        </Route>

                        <Route path="/signin" exact>
                            <Header />
                            <Login></Login>
                        </Route>

                        <Route path="/signup" exact>
                            <Header />
                            <Register></Register>
                        </Route>

                        {/* private routes */}

                        <PrivateRoute path="/user/profile" exact component={Profile}/>

                        <PrivateRoute path="/user/editProfile/:userId" exact component={EditProfile}/>

                        <PrivateRoute path="/checkout" exact component={Checkout}/>

                        {/* admin routes */}

                        <AdminRoute path="/admin/dashboard" exact component={Dashboard}/>
                        <AdminRoute path="/admin/orders" exact component={Orders}/>

                        <AdminRoute path="/admin/addManager" exact component={AddManager}/>

                        <AdminRoute path="/admin/addAdmin" exact component={AddAdmin}/>

                        {/* PRODUCTS AND CATEGORIES */}
                        <Route path="/addProduct" exact>
                            <UploadProducts/>
                        </Route>

                        <Route path="/addCategory" exact>
                            <UploadCategories/>
                        </Route>

                        <Route path="/allProducts" exact>
                            <Header />
                            <AllProducts/>
                        </Route>

                        <Route path="/allProducts/search/:keyWord" exact>
                            <Header />
                            <AllProducts/>
                        </Route>

                        <Route path="/allProducts/:categoryId" exact>
                            <Header />
                            <AllProductsByCategory/>
                        </Route>

                        <Route path="/products/:id" exact>
                            <Header />
                            <SingleIProductDetails/>
                        </Route>
                        {/* PRODUCTS AND CATEGORIES */}


                        {/* STORE MANAGER PRIVILEGES */}
                        <Route path="/storeManager/updateProducts/:productId" exact>
                            <UpdateProduct/>
                        </Route>

                        <Route path="/storeManager/allProducts" exact>
                            <ProductsByAdmin/>
                        </Route>

                        <Route path="/uploadMultiple" exact>
                            <UploadProductsMultiple/>
                        </Route>
                        {/* STORE MANAGER PRIVILEGES */}


                        <Redirect to="/"/>

                    </Switch>
                </BrowserRouter>
            </div>

            <div className="cusfooter">
                <Footer/>
            </div>
        </div>
    );
};

export default App;

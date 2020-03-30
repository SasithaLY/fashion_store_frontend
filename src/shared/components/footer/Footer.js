import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer class="page-footer font-small bg-dark pt-4">
      <div class="container-fluid text-center text-md-left">
        <div class="row">
          <div class="col-md-6 mt-md-0 mt-3">
            <h5 class="text-uppercase">FASHION STORE</h5>
            <p>Company Description</p>
          </div>

          <hr class="clearfix w-100 d-md-none pb-3" />

          <div class="col-md-3 mb-md-0 mb-3">
            <h5 class="text-uppercase">USEFUL LINKS</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#!">Home</a>
              </li>
              <li>
                <a href="#!">My Account</a>
              </li>
              <li>
                <a href="#!">Products</a>
              </li>
              <li>
                <a href="#!">Shopping Cart</a>
              </li>
            </ul>
          </div>

          <div class="col-md-3 mb-md-0 mb-3">
            <h5 class="text-uppercase">INFORMATION</h5>

            <ul class="list-unstyled">
              <li>
                <a href="#!">About Us</a>
              </li>
              <li>
                <a href="#!">Contact Us</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div class="footer-copyright text-center py-3">
        © 2020 Copyright:
        <a href="#"> {process.env.REACT_APP_COMPANY}</a>

       
            <a href="#">
              <i className="fab fa-facebook-f icon-white mx-3"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram icon-white mx-3"></i>
            </a>

            <a href="#">
              <i className="fab fa-twitter icon-white mx-3"></i>
            </a>
          
      </div>
      
    </footer>
  );
};

export default Footer;

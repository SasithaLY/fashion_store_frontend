import React from "react";
import { MDBFooter, MDBBtn, MDBIcon } from "mdbreact";

const AdminFooter = () => {
  return (
    <MDBFooter
      color="blue"
      className="text-center font-small bg-dark cus-page-footer"
    >
      <p className="footer-copyright mb-0 py-3 text-center">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href=""> CodeIgniters </a>
      </p>
    </MDBFooter>
  );
};

export default AdminFooter;

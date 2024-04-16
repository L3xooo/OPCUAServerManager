import React from "react";
import {Github, Instagram, Linkedin} from "react-bootstrap-icons";

const Footer = () => {

  return (
    <footer className="bg-dark py-3 px-5 mb-0 mt-4">
      <ul className="nav justify-content-center border-bottom border-light pb-3 mb-3 text-light">
        <li className="nav-item"><a href="#" className="nav-link px-2 py-0 text-light" style={{ fontSize: "24px" }}><Github/></a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 py-0 text-light" style={{ fontSize: "24px" }}><Instagram/></a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2 py-0 text-light" style={{ fontSize: "24px" }}><Linkedin/></a></li>
      </ul>
      <p className="text-center text-light mb-0">&copy; 2024 Peter Likavec</p>
    </footer>
  );
};   

export default Footer;
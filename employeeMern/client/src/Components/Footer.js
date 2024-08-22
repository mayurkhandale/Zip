import React from "react";
import logo from "../Assets/coder.png";
import './comman.css'

const Footer = () => {
  let year=new Date().getFullYear()
  return (
    <div className="footer">
      <div className="footer-img footer-comman">
        <img src={logo} />
      </div>
      <div className="footer-comman">
        <h3>Get In Touch</h3>
        <div className="icon-list"> 
          <span><a href=""><i class="fa fa-instagram"></i></a></span>
          <span><a href=""> <i class="fa fa-whatsapp"></i></a></span>
          <span><a href=""><i class="fa fa-facebook"></i></a> </span>
          <span> <a href=""><i class="fa fa-twitter"></i></a></span>
        </div>
      </div>
      <div className="footer-comman">
        <p>Programmer: A machine that turns coffee into code.</p>
        <p><i class=" fa fa-solid fa-copyright"></i> {year}  All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

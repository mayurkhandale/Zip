import React ,{useState}from "react";
import logo from "../Assets/coder.png";
import "./comman.css";
import { AppBar, Button, TextField, Autocomplete, MenuItem, Select, Alert,TextareaAutosize } from '@mui/material';
import axios from "axios";
import { json } from "react-router-dom";
const Footer = () => {
  const [data,setData]=useState({
    to:"",
    subject:"",
    message:""

  })


  const SendToMail=async()=>{
   console.log('trigger')
   try{
    const respose=await axios.post(`http://localhost:4000/sendemail`,data)

   }catch(error){
     console.log(error,'20')
   }
  }
  const handleChange=(e)=>{
    const {value,name}=e.target
  console.log(name,value,'19::')
  setData((prev)=>({
    ...prev,
    [name]:value
  }))
  }
  let year = new Date().getFullYear();
  return (
    <div className="main-footer">
      <h2 className="contact-us">CONTACT US</h2>
      <div className="footer">
        <div className="footer-img footer-comman">
          {/* <img src={logo} /> */}
          <div>
            <TextField id="standard-basic" label="To"  variant="standard" name='to' value={data.to} onChange={handleChange}
          type='email' />
          </div>
          <TextField id="standard-basic" label="Subject" variant="standard" name="subject" value={data.subject} onChange={handleChange}
            /><br/>
             <textarea placeholder="message"  name="message" value={data.message} minLength={3} onChange={handleChange}></textarea>
             <br/>
          <Button variant="outlined" sx={{ margin: '30px' }} onClick={SendToMail}>
           Submit
      </Button>
        </div>
        <div className="footer-comman">
          <h3>Get In Touch</h3>
          <div className="icon-list">
            <span>
              <a href="https://www.instagram.com/">
                <i class="fa fa-instagram"></i>
              </a>
            </span>
            <span>
              <a href="https://web.whatsapp.com/">
                {" "}
                <i class="fa fa-whatsapp"></i>
              </a>
            </span>
            <span>
              <a href="https://www.facebook.com/">
                <i class="fa fa-facebook"></i>
              </a>{" "}
            </span>
            <span>
              {" "}
              <a href="https://twitter.com/?lang=en">
                <i class="fa fa-twitter"></i>
              </a>
            </span>
          </div>
        </div>
        <div className="footer-comman">
          <p>Programmer: A machine that turns coffee into code.</p>
          <p className="all-reserved">
            <i class=" fa fa-solid fa-copyright"></i> {year} All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

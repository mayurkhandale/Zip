import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  Autocomplete,
  Stack,
  InputLabel,
  MenuItem,
  Select,
  Alert,
} from "@mui/material";
import { json } from "react-router-dom";
let URl = "http://localhost:4000/login";
function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [token,setToken]=useState('')
  const {username,password}=data
  console.log(username,password,token,'24::')
  const {login}=useAuth()

  const handleChange = (e) => {
   const {name,value}=e.target;
   setData({
    ...data,
    [name]:value
   })
  };
  const handeleKeyDown=(e)=>{
    if(e.key=="Enter"){
      login(data.username,data.password)
    }

  }
  const handleLogin=async()=>{
   console.log('hii')
   try{
    const response=await axios.post(URl,data);
    
    let credential=JSON.parse(response.config.data);
    console.log(credential.username,credential.password,'43::');
    localStorage.setItem('token',response.data.token);
    setToken(response.data.token)
    login(credential.username,credential.password)
   
    // login(credential.username,credential.password);
   }catch(error){
    console.log(error,'42::')
   }
  }
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2, // Adds space between each child element
      width: '300px',
      margin: '0 auto', // Centers the box horizontally
      paddingTop: '50px', // Adds some top padding
    }}
    >
      <div>
        <TextField
          id="standard-basic"
          label="User Name Email"
          variant="standard"
          name="username"
          value={data.username}
          onChange={handleChange}
          type="email"
          onKeyDown={handeleKeyDown}
          style={{
            width:'100%'
        }}
        />
      </div>
      <div>
        <TextField
          id="standard-basic"
          label="password"
          variant="standard"
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
          onKeyDown={handeleKeyDown}
          style={{
            width:'100%'
        }}
        />
      </div>

     <div style={{display:'flex',justifyContent:'center'}}>
     {/* <Button variant="outlined" sx={{ width:'100%', maxWidth:'150px'}} onClick={() =>login(data.username,data.password)} >
        Login
      </Button> */}
      <Button variant="outlined" sx={{ width:'100%', maxWidth:'150px'}} onClick={handleLogin} >
        Login
      </Button>
     </div>
     <div className='triangle'></div>
    </Box>
   
  );
}

export default Login;

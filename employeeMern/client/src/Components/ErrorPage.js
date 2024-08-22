import React, { useState } from "react";
import {Button,Grid,Box } from '@mui/material'
import {useNavigate} from  'react-router-dom'
import Login from "./Login";
const ErrorPage = () => {
  const [flag,setFlag]=useState(false);
  const navigate=useNavigate()
  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={"column"}
   >{
    flag ?  <Login/> :<><h2>Access Denied. You need to sign in to access this page.</h2>
    <Button variant="outlined" sx={{ margin: "30px" }} onClick={() =>setFlag(!flag)}>
     Sign In
    </Button></>
   }
      
     
    </Box >
  );
};

export default ErrorPage;

import React from "react";
import {Button} from '@mui/material'
import {useNavigate} from  'react-router-dom'
const ErrorPage = () => {
  const navigate=useNavigate()
  return (
    <>
      <h2>Access Denied. You need to sign in to access this page.</h2>
      <Button variant="outlined" sx={{ margin: "30px" }} onClick={() =>navigate('/login')}>
       Sign In
      </Button>
    </>
  );
};

export default ErrorPage;

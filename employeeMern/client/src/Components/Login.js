import React, { useState } from "react";
import { useAuth } from "./AuthContext";
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
function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const {login}=useAuth()

  const handleChange = (e) => {
   const {name,value}=e.target;
   setData({
    ...data,
    [name]:value
   })
  };
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
          label="User Name"
          variant="standard"
          name="username"
          value={data.username}
          onChange={handleChange}
          type="text"
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
        />
      </div>

     <div>
     <Button variant="outlined" sx={{ margin: "30px" }} onClick={() =>login(data.username,data.password)}>
        Login
      </Button>
     </div>
    </Box>
  );
}

export default Login;

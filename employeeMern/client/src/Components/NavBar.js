import React ,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import App from "../App";
import { useAuth } from "./AuthContext";
import "./navbar.css";
import logo from "../Assets/mr.jpg";
function NavBar() {
  const { login, isAuthenticated, logOut } = useAuth();
  const [data,setData]=useState({id:1,family:null});
  console.log(data,'11::')
  console.log(login(), isAuthenticated, "10::");
  useEffect(()=>{
   setData(prev=>({
    ...prev,
    family:'ipad'
   }))
  },[])
  return (
    <div className="nav-stick">
      <AppBar position="sticky">
        <Toolbar>
          <img src={logo} alt="Image Not there" className="logo" />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MERN CRUD App
          </Typography>
          <div className="navbar-list">
            <Button color="inherit" component={Link} to="/write">
              Create
            </Button>
            <Button component={Link} color="inherit" to="/read">
              Read
            </Button>
            <Button color="inherit" component={Link} to="/update">
              Update
            </Button>
            <Button component={Link} color="inherit" to="/delete">
              Delete
            </Button>
            {isAuthenticated ? (
              <Button color="inherit" onClick={() => logOut()}>
                Log Out
              </Button>
            ) : (
              <Button component={Link} color="inherit" to="/login">
                Sing In
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;

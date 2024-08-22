import React from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import App from '../App';
import { useAuth } from './AuthContext';
import './navbar.css'
import logo from '../Assets/mr.jpg'
function NavBar() {
    const {login,isAuthenticated,logOut}=useAuth();
    console.log(login(),isAuthenticated,'10::')
    return (
        <div className='nav-stick'>
            <AppBar position="sticky">
                <Toolbar><img src={logo} alt='Image Not there' className="logo"/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mern CRUD App
                    </Typography>
                    <div>
                        <Button color="inherit" component={Link} to='/write'>Create</Button>
                        <Button component={Link} color="inherit" to='/read'>Read</Button>
                        <Button color="inherit" component={Link} to='/update'>Update</Button>
                        <Button component={Link} color="inherit" to='/delete'>Delete</Button>
                        {isAuthenticated ?<Button  color="inherit" onClick={()=>logOut()}>Log Out</Button>:<Button component={Link} color="inherit" to='/login'>Sing In</Button>}
                        
                    </div>

                </Toolbar>
            </AppBar>

        </div>
    )
}

export default NavBar
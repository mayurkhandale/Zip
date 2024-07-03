import React,{createContext,useContext,useState} from 'react';
import { useNavigate } from 'react-router-dom';
const AuthContext=createContext();

export const AuthProvider=({children})=>{
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  const navigate=useNavigate();
  const logOut=()=>{
    setIsAuthenticated(false);
  };
 const login=(username,password)=>{
  console.log(username,'trigger',password)
    if(username=="mayur" && password=="mayur@123"){
      console.log('1111')
        setIsAuthenticated(true);
        navigate('/read')
    }else{
      setIsAuthenticated(false)
      navigate('/error')
      
    }
   

  }
  return(
    <AuthContext.Provider value={{isAuthenticated,login,logOut}}>
     {children}
    </AuthContext.Provider>
  )
}

export const useAuth=()=>useContext(AuthContext)
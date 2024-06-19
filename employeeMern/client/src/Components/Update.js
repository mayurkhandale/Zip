import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './comman.css';
import noRecord from '../Assets/norecord.png'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
let URl = 'http://localhost:4000/read'
function Update() {
  const [employee, setEmployee] = useState([]);
  console.log(employee, '66::')
  const navigate=useNavigate();
  let getDatafromServer = async () => {
    try{
      let response = await axios.get(URl)
      console.log(response, '8::')
      if (response.data.data) {
        setEmployee(response.data.data)
      }
    }catch(error){
      console.log(error,'18::')
    }
  }
  useEffect(() => {
    getDatafromServer()
  }, [])

  const updateUser=(user)=>{
    console.log(user,'26::');
    navigate('/Write',{state:{data:user,flag:true}})  
  }
  return (
    <div>
      <Typography variant="h3" alignCenter component="div" sx={{ flexGrow: 1, textAlign: 'center', p: 2, color: '#ff000057' }}>
        Update Employee Records
      </Typography>
      {
        employee.length ?
      
      <TableContainer component={Paper} className='table-container'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead className="sticky-header">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employee && employee.map((items, key) => {
              return (
                <TableRow
                  key={items.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{items.id}</TableCell>
                  <TableCell>{items.name}</TableCell>
                  <TableCell>{items.lastName}</TableCell>
                  <TableCell>{items.age}</TableCell>
                  <TableCell>{items.desg}</TableCell>
                  <TableCell>{items.salary}</TableCell>
                  <TableCell>  <img src={`data:image/jpeg;base64,${items.image.buffer}`} alt="Employee" className="logo"/></TableCell>
                  <TableCell><Button variant="outlined" color="secondary" onClick={()=>updateUser(items)}>Update</Button></TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>:
      <img src={noRecord} alt='no Recor Found' className='norecord' />
          }

    </div>
  )
}

export default Update
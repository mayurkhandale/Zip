import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comman.css'
import noRecord from '../Assets/norecord.png'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, CircularProgress, Box,Stack,Pagination } from '@mui/material';
let URl = 'http://localhost:4000/read'
function Delete() {
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage=5;
  const [page, setPage] =useState(1);
  const sliceStart = (page - 1) * itemsPerPage;
  const sliceEnd = sliceStart + itemsPerPage;
  console.log(employee, '66::')
  let getDatafromServer = async () => {
    try {
      let response = await axios.get(URl)
      console.log(response, '8::')
      if (response.data.data) {
        setEmployee(response.data.data)
        setTimeout(() => {
          setIsLoading(false)
        }, 3000)
      }
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getDatafromServer()
  }, [])
  const handleDelete = async (data) => {
    console.log('delete', data)
    let deleteURL = `http://localhost:4000/delete/${data._id}`;
    try {
      let response = await axios.delete(deleteURL);
      console.log(response, '22::');
      getDatafromServer()

    } catch (error) {
      console.log(error, '244::')
    }
  }

  function renderImg() {

    setTimeout(() => {
      return (
        <img src={noRecord} alt='no Recor Found' className='norecord' />
      )
    }, 3000)

  }
  const handleChange = (event, value) => {
    setPage(value);
  };


  return (
    <div>
      <Typography variant="h3" alignCenter component="div" sx={{ flexGrow: 1, textAlign: 'center', p: 2, color: '#ff000057' }}>
        Delete Employee Records
      </Typography>
      {
        isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> :
          employee.length ? <TableContainer component={Paper} className='table-container'>
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
                {employee.length && employee.slice(sliceStart,sliceEnd).map((items, key) => {
                  return (
                    <TableRow
                      key={items.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell  scope="row">{items.id}</TableCell>
                      <TableCell>{items.name}</TableCell>
                      <TableCell>{items.lastName}</TableCell>
                      <TableCell>{items.age}</TableCell>
                      <TableCell>{items.desg}</TableCell>
                      <TableCell>{items.salary}</TableCell>
                      <TableCell className="zoomable-image">  <img src={`data:image/jpeg;base64,${items.image.buffer}`} alt="Employee" className="logo" /></TableCell>
                      <TableCell><Button variant="outlined" color="error" onClick={() => handleDelete(items)}>Delete</Button></TableCell>
                    </TableRow>
                  )
                })
                }
              </TableBody>

            </Table>
            <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination
              count={Math.ceil(employee.length / 5)}
              page={page}
              onChange={handleChange}
            />
          </Stack>
          </TableContainer> : <img src={noRecord} alt='no Recor Found' className='norecord' />
      }


    </div>
  )
}

export default Delete
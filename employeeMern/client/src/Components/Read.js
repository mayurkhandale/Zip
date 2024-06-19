import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import './comman.css';
import noRecord from '../Assets/norecord.png'
let URl = 'http://localhost:4000/read';
function Read() {
    const [employee, setEmployee] = useState([]);

    console.log(employee, '66::')
    let getDatafromServer = async () => {
        try {
            let response = await axios.get(URl)
            console.log(response, '8::')
            if (response.data.data) {
                setEmployee(response.data.data)
            }
        } catch (error) {
            console.log(error,'19::')
        }

    }
    useEffect(() => {
        getDatafromServer()
        // fetch('http://localhost:4000/read').then(res=>res).then(response=>{
        //     console.log(response,'26::')
        // })
    }, [])

    return (
        <div>

            <Typography variant="h3" alignCenter component="div" sx={{ flexGrow: 1, textAlign: 'center', p: 2, color: '#ff000057' }}>
                Employee Recordss
            </Typography>
            {employee.length ?
                <TableContainer component={Paper} className="table-container" >

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead className="sticky-header">
                            <TableRow >
                                <TableCell >Id</TableCell>
                                <TableCell >Name</TableCell>
                                <TableCell >Last Name</TableCell>
                                <TableCell >Age</TableCell>
                                <TableCell >Designation</TableCell>
                                <TableCell >Salary</TableCell>
                                <TableCell >Image</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employee.map((items, key) => {
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
                                        <TableCell>  <img src={`data:image/jpeg;base64,${items.image.buffer}`} alt="Employee" className="logo" /></TableCell>

                                    </TableRow>
                                )
                            })}
                        </TableBody>

                    </Table>

                </TableContainer> :
                <img src={noRecord} alt='no Recor Found' className='norecord' />
            }
        </div>
    )
}

export default Read
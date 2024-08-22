import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation ,useNavigate} from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AdComponent from './AdComponent';
import { AppBar, Toolbar, Typography, Button, TextField, Box, Autocomplete, Stack, InputLabel, MenuItem, Select, Alert } from '@mui/material';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
function Write() {
  const location = useLocation();
  const navigate=useNavigate()
  console.log(location, location.state, location.state?.flag, '19::')
  let userData = location.state?.flag ? location.state.data : {
    id: '',
    name: '',
    lastName: "",
    age: "",
    desg: '',
    salary: '',
    image: ""
  }
  const [data, setData] = useState(userData)
  console.log(data,'52')
  const [isSubmit, setSubmit] = useState(true);
  const list = [
    {
      id: 1, desg: "python developer",
    },
    {
      id: 2, desg: "React Js developer",
    },
    {
      id: 3, desg: "Angular developer",
    },
    {
      id: 4, desg: "Business Analysis",
    },
    {
      id: 5, desg: "Dot Net developer",
    },
    {
      id: 6, desg: "C# developer",
    },
    {
      id: 7, desg: "React Native developer",
    },
    {
      id: 8, desg: "Dot Net developer",
    },
    {
      id: 9, desg: "Java developer",
    },
    {
      id: 10, desg: "Data  Analysis",
    },
    {
      id: 11, desg: "Ui Developer",
    },
    {
      id: 12, desg: "HR Executive",
    },
    {
      id: 13, desg: "Mern Stack",
    },
    {
      id: 14, desg: "Mean Stack",
    },
    

  ]
  const defaultProps = {
    options: list,
    getOptionLabel: (option) => option.desg
  }

  console.log(data, '64')

  const handleChange = (e, val) => {
    if (val == null) {
      setData({
        ...data
      })
    }

    console.log(val, '14::')
    if (e.target.files) {
      setData({
        ...data,
        image: e.target.files[0]
      })
    }

    else {

      const { value, name } = e.target

      setData({
        ...data,
        [name]: value
      })
    }
  }
// const dataaa=()=>{
//   console.log(d)
// }
  const handelPost = async () => {

    console.log('hiii')
    try {
      if (isSubmit) {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data))
        console.log(data, '105:');
        formData.append('image', data.image);
        console.log(formData,'122::')
        if (location.state?.flag) {
          console.log('update', '103::')
          let respose = await axios.put(`http://localhost:4000/update/${data._id}`, formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          if (respose.data) {
            alert(respose.data.message)
          }
        } else {

          console.log('create', '103::')
          let respose = await axios.post('http://localhost:4000/write', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          console.log(respose, '106')
          if (respose.data) {
            alert(respose.data )
          }
        }

        setData({
          id: '',
          name: '',
          lastName: "",
          age: "",
          desg: '',
          salary: '',
          image: ""
        })

      } else {
        alert('please fill all fields')
      }

    } catch (error) {
      console.log(error, '30')

    }
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0], 'uploaded')

  }
  const checkValidation = () => {
    for (let x in data) {
      if (data[x] === '' || data[x] === null || data[x] == undefined) {
        setSubmit(false);

      } else {
        setSubmit(true)
      }
    }
  }
  useEffect(() => {
    checkValidation()
  }, [data])
  return (
    <div className="App">
      {/* <Typography variant="h3" sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
      Employee CRUD App
    </Typography> */}
      <Typography variant="h3" alignCenter component="div" sx={{ flexGrow: 1, textAlign: 'center', p: 2, color: '#ff000057' }}>
        {location.state?.flag ?'Update':'Create'} Employee Account
      </Typography>
      <AdComponent adContent="<p>Buy this amazing product!</p>" />
      <Box
        component="form"
        sx={{
          m: 1,
        }}
        noValidate
        autoComplete="off"
      ><div>
          {/* <Alert severity="success">Data Added Succesfully....</Alert> */}
          <div>
            <TextField id="standard-basic" label="Id" variant="standard" name='id' value={data.id}
              onChange={handleChange} type='number' />
          </div>
          <TextField id="standard-basic" label="Name" variant="standard" name="name" value={data.name}
            onChange={handleChange} />
        </div>
        <div>
          <TextField id="standard-basic" label="Last Name" variant="standard" name="lastName" value={data.lastName}
            onChange={handleChange} />
        </div>
        <div>
          <TextField id="standard-basic" label="Age" variant="standard" name="age" value={data.age}
            onChange={handleChange} type='number' />
        </div>

        <div>


          <InputLabel id="demo-simple-select-label">Designation</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
           
            value={data.desg}
            displayEmpty
            label="desg"
            name="desg"
            onChange={handleChange}
          ><MenuItem value="">
          Select the value
        </MenuItem>
            {
              list.map(item => {
                return (
                  <MenuItem key={item.id} value={item.desg}>{item.desg}</MenuItem>
                )
              })
            }

          </Select>
        </div>
        <div>
          <TextField id="standard-basic" label="Salary" name="salary" variant="standard" value={data.salary}
            onChange={handleChange} type='number' />
        </div>
        <div>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            sx={{ mt: 1 }}
          >
            Upload files
            <VisuallyHiddenInput type="file" onChange={handleChange} />
          </Button>
        </div>
      </Box>


  
      <Button variant="outlined" sx={{ margin: '30px' }} onClick={handelPost}>
        {location.state?.flag ? 'Update User' : 'Sign Up'}
      </Button>
      <Button variant="outlined" sx={{ margin: '30px' }} onClick={()=>navigate('/login')}>
        Sign In
      </Button>
     

    </div>
  )
}

export default Write
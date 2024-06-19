import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Read from './Components/Read';
import Write from './Components/Write';
import Update from './Components/Update';
import Delete from './Components/Delete';
import NoPageFound from './Components/NoPageFound';
import { styled } from '@mui/material/styles';
import './App.css';
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
function App() {

  return (
    <div>
      <NavBar />
     
      <Routes>
        <Route path='/' element={<Write />} />
        <Route path='Write' element={<Write />} />
        <Route path='read' element={<Read />} />
        <Route path='update' element={<Update />} />
        <Route path='delete' element={<Delete />} />
        <Route path='*' element={<NoPageFound />} />

      </Routes>
    </div>
  );
}

export default App;

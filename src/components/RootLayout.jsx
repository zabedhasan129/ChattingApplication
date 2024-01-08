import React from 'react'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';



const RootLayout = () => {

 


return (
  <>
  <Grid container spacing={2}>
    <Grid item xs={2}>
    <Sidebar/>
    </Grid>
    <Grid item xs={10}>
    <Outlet/>
    </Grid>
  </Grid>
  </>
)
}

export default RootLayout  
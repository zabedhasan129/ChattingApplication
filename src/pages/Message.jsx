import React from 'react'
import Grid from '@mui/material/Grid';
import Friend from '../components/Friend'
import MyGroups from '../components/MyGroups';
import Msg from '../components/Msg';



const Message = () => {
  
  return (
    <>
  <Grid container spacing={2}>
    <Grid item xs={4}>
    <MyGroups/>
    <Friend/>
    </Grid>
    <Grid item xs={8}>
    <Msg/>
    </Grid>
  </Grid>
  </>
  )
}

export default Message
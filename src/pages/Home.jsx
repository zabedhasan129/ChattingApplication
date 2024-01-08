import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import FriendRequest from '../components/Friendrequest';
import Friend from '../components/Friend';
import MyGroups from '../components/MyGroups';
import UserList from '../components/UserList';
import BlockedUser from '../components/BlockedUser';




const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let dispatch = useDispatch()
  
  let data = useSelector((state)=> state.logedUser.value)
  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])
   
  
  return (

    <>
    <Grid container spacing={2}>
      <Grid item xs={4}>
      <GroupList/>
      <FriendRequest/>
      </Grid>
      <Grid item xs={4}>
      <Friend/>
      <MyGroups/>
      </Grid>
      <Grid item xs={4}>
      <UserList/>
      <BlockedUser/>
      </Grid>
    </Grid>

    </>   
  )
}

export default Home
import React from 'react'
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let handlelogout = ()=>{
    signOut(auth).then(() => {
      navigate("/login")
     })
  }
  return (
    <Button onClick={handlelogout} variant="contained">Logout</Button>
  )
}

export default Home
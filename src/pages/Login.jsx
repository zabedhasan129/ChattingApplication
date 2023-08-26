import React from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  let navigate = useNavigate()
  const auth = getAuth();
  let [formData,setFormData] = useState({
    email:"",
    password:""
   })
    let handlechange =(e)=>{
      setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    
  }

  let handleLogin = ()=>{
    console.log(formData.email);
    console.log(formData.password);
    signInWithEmailAndPassword(auth,formData.email,formData.password).then((userCredential) => {
      console.log(userCredential);
      let user = userCredential.user
      
      if (user.emailVerified) {
        navigate('/home')
        console.log("donenevigator")
      }
      else{
        toast.error('🦄 Please verify your email for login', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      
      }
    })
  }
  
  return (
    <div className='registration'>
        <div className='left'>
            <div className='textContainer'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <TextField onChange={handlechange} name='email'className='inputCss' type='Email' id="outlined-basic" label="Email" variant="outlined" />
            <TextField onChange={handlechange} name='password'className='inputCss' type='password' id="outlined-basic" label="Password" variant="outlined" />
            <Button onClick={handleLogin} className='regbtn' variant="contained">Sign In</Button>
            <p>Don’t have an account ? <Link to="/" className='focus'>Sign up</Link></p>
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Login
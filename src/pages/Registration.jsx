import React, { useState } from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import Alert from '@mui/material/Alert';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { RotatingLines } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Registration = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  
 let [formData,setformdata] = useState({
  fullname:"",
  email:"",
  password:""
 })
 
 let [fullnameError,setfullNameError] = useState("")
 let [emailError,setEmailError] = useState("")
 let [passwordError,setPasswordError] = useState("")
 let [load,setload] = useState(false)

 let[open,setopen]= useState()

 let handlechange =(e)=>{
    setformdata({
      ...formData,
      [e.target.name]: e.target.value
    })
    setfullNameError("")
    setEmailError("")
    setPasswordError("")
  }
  
  let handleregistration =()=>{
    
    if(!formData.fullname){
      setfullNameError("Fullname Required")
    }else if(!formData.email){
      setEmailError("Email Required")
    }else if(!formData.password){
      setPasswordError("Password Required")
    }
    
    if(formData.fullname && formData.email && formData.password){
      
      
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if(!pattern.test(formData.email)){
        setEmailError("Invalid Email")
      }
      if(formData.fullname.length < 3){
        setfullNameError("Fullname must be 3 charectar")
      }
      if(!re.test(formData.password)){
        setPasswordError("Password not strong")
      }
      setload(true)
      createUserWithEmailAndPassword(auth, formData.email, formData.password).then(()=>{

        sendEmailVerification(auth.currentUser).then(()=>{
          setformdata({
            fullname:"",
            email:"",
            password:""
          })
          setload(false)
          toast.success('🦄 Registration Done Please verify your email', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
           setTimeout(()=>{
            navigate("/login")
            },1000)
        })
        

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode.includes("email")){
          setEmailError("AlReady eKber doNe")
          toast.error('Email Already Exsists', {
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
        setload(false)
      });
        
    }
  }
  
    return (
    <div className='registration'>
        <div className='left'>
            <div className='textContainer'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <TextField onChange={handlechange} name='fullname' className='inputCss' type='text' id="outlined-basic" label="Full Name" variant="outlined" value={formData.fullname}/>
            {fullnameError && <Alert variant="filled" severity="error">{fullnameError}</Alert>}
            <TextField onChange={handlechange} name='email' className='inputCss' type='Email' id="outlined-basic" label="Email" variant="outlined" value={formData.email}/>
            {emailError && <Alert variant="filled" severity="error">{emailError}</Alert>}
            <div>
            <TextField onChange={handlechange} name='password' className='inputCss' type={open?"text":'password'} id="outlined-basic" label="Password" variant="outlined" value={formData.password}/>
            {open?
            <AiFillEye onClick={()=>setopen(false)} className='eye'/>
            :
            <AiFillEyeInvisible onClick={()=>setopen(true)} className='eye'/>}
            </div>
            {passwordError && <Alert variant="filled" severity="error">{passwordError}
            </Alert>}
            {load
            ?
            <Button claslaste='regbtn' variant="contained">
            <RotatingLines
            strokeColor="white"
            strokeWidth="2"
            animationDuration="0.75"
            width="20"
            visible={true}/>
            </Button>
            :
            <Button onClick={handleregistration} claslaste='regbtn' variant="contained">Sign Up
            </Button>
            }
            <p>Already have an account ? <Link to="/Login" className='focus'>Sign In</Link></p>
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg" />
        </div>
    </div>
  )
}

export default Registration
import React,{useEffect} from 'react'
import bg from "../assets/registrationbg.png"
import Image from '../components/Image'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getDatabase, ref, set,push } from "firebase/database";
import { useState } from "react"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logedUser } from '../slices/userslice';
import { useDispatch,useSelector } from 'react-redux';



const Login = () => {
  let navigate = useNavigate()
  const db = getDatabase();
  let dispatch = useDispatch()
  
  let data = useSelector((state)=> state.logedUser.value)
  useEffect(()=>{
    if(data){
      navigate('/home')
    }
  },[])



  
  const auth = getAuth();
  const provider = new GoogleAuthProvider();


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
    // console.log(formData.email);
    // console.log(formData.password);
    signInWithEmailAndPassword(auth,formData.email,formData.password).then((user) => {
      // console.log(user);
      // let user = userCredential.user
      
      // if (user.user.emailVerified) {
        navigate('/home') 
        dispatch(logedUser(user.user))
        localStorage.setItem("user",JSON.stringify(user.user))
      // }
      // else{
      //   toast.error('🦄 Please verify your email for login', {
      //     position: "top-right",
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: "light",
      //     });
      
      // }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      if (errorCode.includes("wrong-password")) {
        toast("Wrong Password!");
      }
      if (errorCode.includes("user-not-found")) {
        toast("Email does't matched!");
      }
    })
  }
         

  let handleGoogleLogin =()=>{
    signInWithPopup(auth, provider).then((user)=>{
      navigate("/home")
      dispatch(logedUser(user.user))
      localStorage.setItem("user",JSON.stringify(user.user))
      set(push(ref(db, 'users')), {
        username: user.user.displayName,
        email: user.user.email,
        profile_picture : user.user.photoURL
      });
    })
    // concole.log("done")
  }
  return (
    <div className='registration'>
        <div className='left'>
            <div className='textContainer'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <Button onClick={handleGoogleLogin} className='regbtn' variant="contained">Google Sign In</Button>
            <TextField onChange={handlechange} name='email'className='inputCss' type='Email' id="outlined-basic" label="Email" variant="outlined" />
            <TextField onChange={handlechange} name='password'className='inputCss' type='password' id="outlined-basic" label="Password" variant="outlined" />
            <Button onClick={handleLogin} className='regbtn' variant="contained">Sign In</Button>
            <p>Don’t have an account ? <Link to="/" className='focus'>Sign up</Link></p>
            <p>Forgot password <Link to="/ForgotPassword" className='focus'>Click Here</Link></p>
            
            </div>
        </div>
        <div className='right'>
            <Image src={bg} className="bg"/>
        </div>
    </div>
  )
}

export default Login
import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { Link,useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
  const auth = getAuth();
let  [email,setemail] = useState("")
let navigate = useNavigate()



 
let handleforgotpassword = () => {
  sendPasswordResetEmail(auth,email).then(() => {
      toast("Password reset email sent! check email");
      navigate('/login')
  }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode && errorCode.includes('invalid-email')) {
          toast("User not exists!");
      }
  })
}


return (
    <div className='forgotpage'>
        <div className='forgotbox'>
          <h3>Forgot Password</h3>
          <TextField onChange={(e)=>setemail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" /><br />
          <Button onClick={handleforgotpassword} variant="contained">Click</Button>
          <Button onClick={() => navigate('/login')} variant="contained">Back</Button>
          
        </div>
    </div>
  )
}

export default ForgotPassword 
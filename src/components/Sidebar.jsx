import React, { useState } from 'react'
import {AiFillHome, AiFillMessage, AiFillSetting, AiOutlineLogout} from 'react-icons/ai'
import {IoIosNotifications} from 'react-icons/io'
import { Link } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logedUser } from '../slices/userslice';
import { activeChat } from '../slices/activeChatSlice';

const Sidebar = () => {
    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    

    let userInfo = useSelector((state)=>state.logedUser.value)
    let [url,setUrl] = useState("home")


    let handlelogout = ()=>{
        signOut(auth).then(() => {
          dispatch(logedUser(null))
          dispatch(activeChat(null))
          localStorage.removeItem('user')
          navigate("/login")
         })
      }  



    return (
    <div className='sidebar'>
        <img className='sidebarImg'src={userInfo.photoURL}/>
        <h1>{userInfo.displayName}</h1>
        <ul>
          <li onClick={()=>setUrl("home")} className={url=="home"&&"active"}>
              <Link to="/home"><AiFillHome className='icon'/></Link>
          </li>
          <li onClick={()=>setUrl("message")} className={url=="message"&&"active"}>
              <Link to="/message"><AiFillMessage className='icon'/></Link>
          </li>
          <li onClick={()=>setUrl("notification")} className={url=="notification"&&"active"}> 
              <Link to="/notification"><IoIosNotifications className='icon'/></Link>
          </li>
          <li onClick={()=>setUrl("setting")} className={url=="setting"&&"active"}> 
              <Link to="/setting"><AiFillSetting className='icon'/></Link>
              </li>
          <li onClick={()=>handlelogout(setUrl("logout"))} className={url=="logout"&&"active"}>
            <Link to="/logout"><AiOutlineLogout className='icon'/></Link>
          </li>
        </ul>
    </div>
  )
}

export default Sidebar
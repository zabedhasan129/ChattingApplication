import React, { useEffect, useState } from 'react'
import ulimg from "../assets/img3.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();
  let userInfo = useSelector((state)=>state.logedUser.value) //Data collect from redux................
  
  let[userslist,setUserslist] = useState([]) //VariAble......................
  let [reclist,setreclist] = useState([])



  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {
    //Array Start
    let arr = []
      snapshot.forEach(item=>{
        if(userInfo.uid != item.key){
        arr.push({...item.val(),userid: item.key})
       }
      })
      setUserslist(arr)
      //Array End
   });
},[])

  

  let handleFriendrequest = (info)=>{
    // console.log("who send",userInfo.uid,userInfo.displayName)
    // console.log(info)
    set(push(ref(db, 'friendrequest/')), {
      whosend: userInfo.displayName,
      whosendid: userInfo.uid,
      whorecived: info.username,
      whorecivedid: info.userid
    });
    
  }

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest');
    onValue(friendrequestRef, (snapshot) => {
      
      let arr = [];
      snapshot.forEach(item=>{
          // console.log('isd:',item.val().recivedid+item.val().sendid)
          arr.push(item.val().whorecivedid+item.val().whosendid)
        
        })
      setreclist(arr)
      });
    },[])

    
    
    // let handlecancle =(item)=>{
    //   console.log(item.frid)

    //   remove(ref(db, 'friendrequest/'+item.frid))
    // }

  



  return (
    <div className='box'>
      <h3>UserList</h3>
      {userslist.map(item=>(
        <div className='list'>
        <img src={ulimg}/>
        <div className='ulp'>
        <h4>{item.username}</h4> 
        {/* <p>{item.email}</p> */}
        <p>Hi Guys, Wassup!</p>
        </div>
        {/* friendrequest send */}
        {reclist.includes(item.userid+userInfo.uid) || reclist.includes(userInfo.uid+item.userid) ?
        <Button variant="contained" color='error'>p</Button>
        :
        <Button onClick={()=>handleFriendrequest(item)} variant="contained">+</Button>}

        {/* Cancle */}
        
        <Button onClick={()=>handlecancle(item)} variant="contained" color='error'>D</Button>

        </div>
      ))}
      
   
      
    </div>
    
  )
}

export default UserList
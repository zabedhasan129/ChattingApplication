import React, { useEffect, useState } from 'react'
import fimg from "../assets/img1.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const Friendrequest = () => {
  const db = getDatabase();
  let data = useSelector((state)=> state.logedUser.value)
  
  let [reclist,setreclist] = useState([])

  useEffect(()=>{
  const friendrequestRef = ref(db, 'friendrequest');
  onValue(friendrequestRef, (snapshot) => {
    
    let arr = []
    snapshot.forEach(item=>{
      // console.log(item.val().WhoRecived)
      // console.log(data.uid)
      if(item.val().whorecivedid == data.uid){
        arr.push({...item.val(), frid:item.key})
      }
     
    })
    setreclist(arr)
    
    });
  },[])

  let handledelete =(item)=>{
    // console.log(item.frid)
    // console.log(item)
    remove(ref(db, 'friendrequest/'+item.frid))
  }

  let handleaccept =(item)=>{
    console.log("kdfksd",item)
    set(push(ref(db, 'friends/')),{
      ...item,
          
      }).then(()=>{
      remove(ref(db, 'friendrequest/'+item.frid))
    })
  }
  
 
return (
    <div className='box'>
      <h3>FriendRequest</h3>
      {reclist.map(item=>(
        <div className='list'>
        <img src={fimg}/>
        <div>
        <h4>{item.whosend}</h4>
        <p>Dinner!</p>
        </div>
        <Button onClick={()=>handleaccept(item)} variant="contained">A</Button>
        <Button onClick={()=>handledelete(item)} variant="contained" color='error'>D</Button>
      </div>
      ))}
      
     
     
    </div> 
  )
}

export default Friendrequest
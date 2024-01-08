import React, { useEffect, useState } from 'react'
import buimg from "../assets/img3.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUser = () => { 
  const db = getDatabase();
  let data = useSelector((state)=> state.logedUser.value)
  let [blocklist,setblocklist] = useState([])
  
  useEffect(()=>{
    const BlockRef = ref(db, 'block');
    onValue(BlockRef, (snapshot) => {
        
        let arr = []
        snapshot.forEach(item=>{
          // console.log(item.val().WhoRecived)
          // console.log(data.uid)
          // if(item.val().whorecivedid == data.uid){ 
          
          arr.push({...item.val(), bid:item.key}) 
          
          // }
         
        })
        setblocklist(arr)
        
        });
    },[])

    let handleunblock =(item)=>{
      console.log("bolckakibvai")
      set(push((ref(db, "friends"))), {
       whorecived: data.displayName,
       whorecivedid: data.uid,
       whosend: item.blockname,
       whosendid: item.blockid
       
      }).then(()=>{
          remove(ref(db,'block/'+item.bid))
          console.log("delete akib vai")
        })


      // set(push(ref(db, 'friends/')), {
      //  blockmarse: data.displayname,
      //  blockmarseid: data.uid,
      //  blockkhaisename: item.blockname,
      //  blockkhaiseid: item.blockid
      // });
      // .then(()=>{
      //   remove(ref(db,'block/'+item.bid))
      //   console.log("delete") 
      // })
    } 




  return (
    <div className='box'>
      <h3>BlockedUser</h3>
      {blocklist.map(item=>(
       <div className='list'>
       <img src={buimg}/>
       <h4>{item.blockid == data.uid? item.blockbyname:item.blockname}</h4>
       {item.blockid == data.uid?
       <Button variant="contained" color='error'>Block</Button>
       :
       <Button onClick={()=>handleunblock(item)} variant="contained">Unblock</Button>}
       
       </div> 
      ))}
     
    </div>
  )
}

export default BlockedUser
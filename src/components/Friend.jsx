import React, { useEffect, useState } from 'react'
import fndsimg from "../assets/img2.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { activeChat } from '../slices/activeChatSlice';


const Friend = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.logedUser.value)
  let [friendlist, setfriendlist] = useState([])
  let dispatch = useDispatch()
  // let [reclist, setreclist] = useState([])

  // useEffect(() => {
  //   const friendrequestRef = ref(db, 'friendrequest');
  //   onValue(friendrequestRef, (snapshot) => {

  //     let arr = []
  //     snapshot.forEach(item => {
  //       // console.log(item.val().WhoRecived)
  //       // console.log(data.uid)




  //       if (item.val().whorecivedid == data.uid) {
  //         arr.push({ ...item.val(), frid: item.key })
  //       }

  //     })
  //     setreclist(arr)
  //     // console.log(setreclist)
  //   });
  // }, [])

  useEffect(() => {
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {

      let arr = []
      snapshot.forEach(item => {
        // console.log(item.val().WhoRecived)
        // console.log(data.uid)
        // if(item.val().whorecivedid == data.uid){
        // }
        arr.push({ ...item.val(), fid: item.key })

      })
      setfriendlist(arr)
      console.log(setreclist)
    });

  }, [])

  let handleblock = (item) => {

    if (item.whosendid == data.uid) {

      set(push(ref(db, 'block/')), {
        blockid: item.whorecivedid,
        blockname: item.whorecived,
        bolckbyid: item.whosendid,
        blockbyname: item.whosend

      }).then(() => {
        remove(ref(db, 'friends/' + item.fid))
      })
    }
    else {
      set(push(ref(db, 'block/')), {
        blockid: item.whosendid,
        blockname: item.whosend,
        bolckbyid: item.whorecivedid,
        blockbyname: item.whorecived
      }).then(() => {
        remove(ref(db, 'friends/' + item.fid))
      })
    }

  }


  let handleChat = (item) => {
    if (data.uid == item.whosendid) {
      dispatch(activeChat({
        type: 'single',
        activechatid: item.whorecivedid,
        activechatname: item.whorecived
      }))

    }
    else {
      dispatch(activeChat({
        type: 'single',
        activechatid: item.whosendid,
        activechatname: item.whosend
      }))

    }
    console.log(item,"hasan al zabed")
  }



  return (
    <div className='box'>
      <h3>Friend</h3>
      {friendlist.map(item => (
        <div className='list' onClick={() => handleChat(item)}>
          <img src={fndsimg} />
          <div>
            <h4>{item.whosendid == data.uid ? item.whorecived : item.whosend}</h4>
            <p>Dinner!</p>
          </div>
          <p>Today, 8:56pm</p>
          {item.whosendid == data.uid ?
            <Button variant="contained">Friend</Button>
            :
            <Button onClick={() => handleblock(item)} variant="contained" color='error'>Block</Button>}
        </div>
      ))}


    </div>
  )
}

export default Friend
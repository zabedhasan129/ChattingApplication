import React, { useEffect, useState } from 'react'
import bg from "../assets/registrationbg.png"
import ModalImage from "react-modal-image";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EmojiPicker from 'emoji-picker-react';
import { CiFaceSmile } from "react-icons/ci";
import { useSelector, useDispatch } from 'react-redux';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";





const Msg = () => {
  const db = getDatabase();

  let data = useSelector((state) => state.activeChat.value)
  console.log(data)
  let userdata = useSelector((state) => state.logedUser.value)
  console.log(userdata)
  let [show, setShow] = useState(false)
  let [msg, setMsg] = useState("")
  let [msgList, setMsgList] = useState([])


  let handleMszSend = () => {
    if (data.type == 'single') {
      set(push(ref(db, 'singleMsg')), {
        whosendid: userdata.uid,
        whosend: userdata.displayName,
        whorecivedid: data.activechatid,
        whorecived: data.activechatname,
        SmS: msg
      });
      console.log("single msz done")
    }
    else {
      console.log("Group Msz Click")
    }
  }



  useEffect(() => {
    const singleMsg = ref(db, 'singleMsg');
    onValue(singleMsg, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if((item.val().whosendid == userdata.uid && item.val().whorecivedid == data.activechatid) || 
          (item.val().whosendid == data.activechatid && item.val().whorecivedid == userdata.uid))
          {
          // arr.push({...item.val(),mszid:item.key})
          arr.push(item.val())
          }
      

      })
      setMsgList(arr)

    });
  }, [data.activechatid])


  return (
    <div className='messagebox'>
      <h1>{data.activechatname}</h1>
      <div className='container'>
        {msgList.map((item) => (
          item.whosendid == userdata.uid ?
            <p className='sendmessage'>{item.SmS}</p>
            :
            <p className='recivemessage'>{item.SmS}</p>

        ))}


        {/* <div className='sendAudio'>
          <audio controls></audio>
        </div>
        <div className='reciveAudio'>
          <audio controls></audio>
        </div>
        <div className='sendVideo'>
          <video controls></video>
        </div>
        <div className='reciveVideo'>
          <video controls></video>
        </div> */}
      </div>


      <div className='messagefiled'>
        <TextField onChange={(e) => setMsg(e.target.value)} id="outlined-basic" label="Outlined" variant="outlined" />
        <CiFaceSmile onClick={() => setShow(!show)} className='smile' />
        <Button onClick={()=>handleMszSend()} className='mszbtn' variant="contained">Send</Button>
        {show &&
          <div className='emojiHolder'>
            <EmojiPicker />
          </div>
        }
      </div>

    </div>
  )
}

export default Msg
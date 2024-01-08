import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import gimg from "../assets/img.png"
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




const GroupList = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.logedUser.value)
  let [GroupList, setGroupList] = useState([])
  let [GrList, setGrList] = useState([])

  const [open, setOpen] = useState(false);
  const [gname, setGname] = useState("");
  const [gtag, setGtag] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    const groupRef = ref(db, 'group');
    onValue(groupRef, (snapshot) => {

      let arr = []
      snapshot.forEach(item => {
        // console.log(item.val().WhoRecived)
        // console.log(data.uid)
        if (item.val().adminid != data.uid) {
          arr.push({ ...item.val(), gid: item.key })
        }

      })
      setGroupList(arr)
      // console.log()
    });

  }, [])

  useEffect(() => {
    const groupRef = ref(db, 'grouprequest');
    onValue(groupRef, (snapshot) => {

      let arr = []
      snapshot.forEach(item => {
        // console.log(item.val().WhoRecived)
        // console.log(data.uid)
        if (item.val().whosendid == data.uid) {
          arr.push(item.val().whosendid + item.val().gid)
        }

      })
      setGrList(arr)
      // console.log()
    });

  }, [])

  let handleCreateGroup = () => {
    console.log(gname, gtag)

    set(push((ref(db, "group"))), {
      groupname: gname,
      grouptag: gtag,
      adminid: data.uid,
      adminname: data.displayName

    }).then(() => {
      setOpen(false)
    })
  }

  let handleGroupJoin = (item) => {
    console.log("data", item)
    set(push((ref(db, "grouprequest"))), {
      ...item,
      whosendid: data.uid,
      whosendname: data.displayName

    })

  }

  let handleCancle = (item) => {
    console.log("cancle data", item)
    const groupRef = ref(db, 'grouprequest');
    let did = ""
    onValue(groupRef, (snapshot) => {
      snapshot.forEach(gitem => {

        if (item.gid == gitem.val().gid) {
          did = gitem.key
        }

      }).then(()=>{
        remove(ref(db, 'group/' + item.gid))
      })
      
    })
  }





  return (
    <div className='box'>
      <h3>GroupList</h3>
      ******************
      <br />
      <Button onClick={handleOpen} variant="contained">Create Group</Button>
      <br />
      <br />
      {GroupList.map(item => (
        <div className='list'>
          <img src={gimg} />
          <div>
            <h4>{item.groupname}</h4>
            <p>Hi Guys, Wassup!</p><br />
          </div>

          {GrList.includes(data.uid + item.gid)
            ?
            <>
              <Button variant="contained" color='success'>p</Button>
              <Button onClick={() => handleCancle(item)} variant="contained" color='error'>C</Button>
            </>
            :
            <Button onClick={() => handleGroupJoin(item)} variant="contained">J</Button>

          }

        </div>
      ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            <TextField onChange={(e) => setGname(e.target.value)} id="outlined-basic" label="Group name" variant="outlined" />
            <br />
            <br />
            <TextField onChange={(e) => setGtag(e.target.value)} id="outlined-basic" label="Group Tag" variant="outlined" />
            <br />
            <br />
            <Button onClick={handleCreateGroup} variant="contained">Join</Button>

          </Typography>
        </Box>
      </Modal>

    </div>
  )
}

export default GroupList
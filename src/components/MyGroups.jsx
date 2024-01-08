import React, { useEffect, useState } from 'react'
import mgimg from "../assets/img.png"
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import { activeChat } from '../slices/activeChatSlice';






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


const MyGroups = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.logedUser.value)
  let dispatch = useDispatch()

  let [myGroupList, setmyGroupList] = useState([])

  const [gname, setGname] = useState("")
  const [open, setOpen] = useState("");
  const [grList, setGrList] = useState([])
  const handleOpen = (item) => {
    setGname(item.groupname)
    console.log("ginfo",item)
    const mygroupRef = ref(db, 'grouprequest');
    onValue(mygroupRef, (snapshot) => {

      let arr = []
      snapshot.forEach(gitem => {
        if(data.uid == gitem.val().adminid
        && item.gid == gitem.val().gid){
          arr.push(gitem.val())
        }

       
      })
      setGrList(arr)
    });
    setOpen(true)
  };


  const handleClose = () => setOpen(false);

  useEffect(() => {
    const mygroupRef = ref(db, 'group');
    onValue(mygroupRef, (snapshot) => {

      let arr = []
      snapshot.forEach(item => {
        // console.log(item.val().WhoRecived)
        // console.log(data.uid)
        if (item.val().adminid == data.uid) {
          arr.push({...item.val(),gid:item.key})
        }


      })
      setmyGroupList(arr)
      // console.log()
    });

  }, [])


  let handleChat =(item)=>{
    console.log("mygroups data",item)
    if (data.uid == item.whosendid) {
      // console.log(item.whosend)
      dispatch(activeChat({
        type: 'group',
        activechatid: item.gid,
        activechatname: item.groupname
       
      }))

    }
    else {
      // console.log(item.whosend)
      dispatch(activeChat({
        type: 'group',
        activechatid: item.gid,
        activechatname: item.groupname
      }))
      
    }
  }



  return (

    // Fitst portion
    <div className='box'>
      <h3>My Groups</h3>
      {/* <Button onClick={handleOpen} variant="contained"></Button> */}
      {myGroupList.map(item => (
        <div className='list' onClick={()=>handleChat(item)}>
          <img src={mgimg} />
          <h4>{item.groupname}</h4>
          {/* <p>Hi Guys, Wassup!</p><br/> */}
          <p>Today, 2:31pm</p>
          <Button onClick={() => handleOpen(item)} variant="contained">rl</Button>
          <Button variant="contained">ml</Button>
        </div>
      ))}


      {/* second portion */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            These People Wants to join {gname} Group
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              {grList.map(item => (
                <>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.whosendname}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.whosendname}
                          </Typography>
                          {` Wants to join ${gname} Group`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />

                </>

              ))}



            </List>
          </Typography>
        </Box>
      </Modal>
    </div>


  )
}

export default MyGroups
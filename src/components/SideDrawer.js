import { Box, Divider, Tooltip,Typography } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Avatar from '@mui/joy/Avatar';
import { ChatState } from '../context/ProviderChat';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserList from './UserList';

function SideDrawer() {
  const Navigate = useNavigate()
  const [loadingChat,setloadingChat]=useState()
  const [loading,setLoading]=useState()
  const [search,setSearch]=useState("")
  const [searchResult,setSearchResult]=useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user,setSelectedChat,chat,setChat} = ChatState()

  const logoutHandler =()=>{
    localStorage.removeItem("userInfo")
    Navigate('/')
  }



  const [Open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);

  };
  
  const handleDrawerClick = (event) => {
    event.stopPropagation();
  };


  const handleSearch = async()=>{
    if(!search){
   toast.warning("please enter somthing in search")
      
    }

    try{
      setLoading(true)
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },

      }
     
      const {data} = await axios.get(`/api/user?search=${search}`,config)
      setLoading(false)
      setSearchResult(data)
    }catch(err){
      toast.error('faild to load search');
      setLoading(false)
 
    }
  }

  const accessChat=async(userId)=>{
    try {
      setloadingChat(true)
        const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },
      }
      const {data} = await axios.post('/api/chat',{userId},config)

      if(!chat.find((c)=>c._id === data._id)) setChat([data,...chat]);
      console.log(data)
      setSelectedChat(data)
      setloadingChat(false)
      toggleDrawer(false)(); // Close the drawer
      
    } catch (error) {
      toast.error("error fetch chat")
      console.log("eror",error)
    }
      
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onMouseDown={handleDrawerClick}>
      <List>
        {["Search Users"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
          

        ))}
      </List>
      
      <div>
        <List className='d-flex ms-3'>
        <Input placeholder='Search by name and user'
        value={search}
        maxRows={2}
        onChange={(e)=>setSearch(e.target.value)}
        >
        </Input>
        <Button onClick={handleSearch} className='custom-button'>
          Go
        </Button>
        </List>
     
        {loading?
        <ChatLoading/>
        :(
          searchResult?.map((user)=>(
            <UserList
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />
          ))
        )

  
        }
      </div>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );



  return (
    <>
      <Box
      display={"flex"}
      justifyContent={'space-between'}
      alignItems={"center"}
      bgcolor={"white"}
      width={"100%"}
      p={"5px 10px 5px 10px"}  
      border={"5px"}    
      >
        <Tooltip title="Search Users to Chat" placement="top">
          <ButtonGroup variant="text" aria-label="Basic button group">
            <Button className='text-dark' onClick={toggleDrawer(true)}>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Typography
              sx={{
                display: { base: 'none', md: 'flex' },
                textTransform: 'lowercase', // Transform text to lowercase
                marginLeft: 1 // Add some margin to separate text from icon
              }}
             >    
             search user
             </Typography>       
             </Button>
             <Drawer open={Open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
          </ButtonGroup>
       </Tooltip>
       <text className='fs-2 ' fontFamily='Work-sans'>ChatMe</text>
       <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <CircleNotificationsIcon className='fs-2'/>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: 'top',
        }}
        transformOrigin={{
          vertical: 'top',
        }}
      >
      </Menu>
      {/* //profile */}
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <Avatar alt={user.name} src={user.pic} /></Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ProfileModel user={user}>
        {/* <MenuItem onClick={handleClose}>My profile</MenuItem>    */}
        </ProfileModel>
        <Divider/>
        <MenuItem onClick={logoutHandler}>Logout</MenuItem>
      </Menu> 
    </div>
      </Box>

      
      <ToastContainer theme='colored' autoClose={2000} position='top-left'/>
    </>
    
  )
}

export default SideDrawer
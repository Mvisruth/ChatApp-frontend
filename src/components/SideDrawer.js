import { Box, Divider, Tooltip,Typography } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Avatar from '@mui/joy/Avatar';
import { ChatState } from '../context/ProviderChat';
import { MenuDivider } from '@chakra-ui/react';
import ProfileModel from './ProfileModel';



function SideDrawer() {
  const [search,setSearch]=useState("")
  const [searchResult,serSearchResult]=useState([])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const {user} = ChatState()

  return (
    <div>
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
            <Button className='text-dark'>
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
        <ProfileModel>
        <MenuItem onClick={handleClose}>My profile</MenuItem>
        </ProfileModel>
        <Divider/>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu> 
    </div>
      </Box>
    </div>
    
  )
}

export default SideDrawer
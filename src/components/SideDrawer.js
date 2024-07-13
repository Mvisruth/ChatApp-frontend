import { Box, Tooltip,Typography } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


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
        onClick={handleClick}
      >
        <CircleNotificationsIcon className='fs-2'/>
      </Button>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
      </Box>
    </div>
    
  )
}

export default SideDrawer
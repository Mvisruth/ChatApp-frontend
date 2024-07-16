import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ChatState } from '../context/ProviderChat';
import { Box } from '@mui/material';
// import { Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import ChatLoading from './ChatLoading';
import { Stack } from 'react-bootstrap';




function MyChats() {
  const [loggedUser,setLoggedUser]=useState()
  const {selectedChat,user,setSelectChat,chat,setChat} = ChatState()

  const fetchChat = async()=>{
    try {
      const config={
        headers:{
          Authorization:`Bearer ${user.token}`,
        }
      }
      const {data} = await axios.get("/api/chat",config)
      setChat(data)
    } catch (error) {
      toast.error("error occured")
      
    }
  }
  useEffect(()=>{
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChat()
  },[])
  
  return (
    <Box
    sx={{
      display: { xs: selectedChat ? 'none' : 'flex', md: 'flex' },
      flexDirection: 'column',
      alignItems: 'center',
      p: 3,
      bgcolor: 'white',
      width: { xs: '100%', md: '31%' },
      height:{xs:"600px"},
      borderRadius: 'lg',
      borderWidth: '1px',
      borderColor: 'grey.300',
      boxSizing: 'border-box',
    }}
  >
        <Box
      sx={{
        pb: 3,
        px: 3,
        fontSize: { xs: '28px', md: '30px' },
        fontFamily: 'Work Sans',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      My Chat
      <Button
      
      
      sx={{
        display: 'flex',
        fontSize: { xs: '17px', md:'10px', lg:'17px' },
        backgroundColor: 'green',
        color: 'white',
        '&:hover': {
          backgroundColor: 'darkgreen',
        },
      }}
      endIcon={<AddIcon/>}>
      New Group Chat
    </Button>
    </Box>

   <Box
   d={"flex"}
   flexDirection={"column"}
   p={3}
   bg="#F8F8F8"
   w="100%"
   h={"100%"}
   borderRadius={"lg"}
   overflow={"hidden"}
   >
    {chat?(
      <Stack overflow='scroll'> 
         {chat.map((chat)=>{
          <Box>
            
          </Box>
         })}
      </Stack>

    ):(
      <ChatLoading/>
    )}
   </Box>

  </Box>
  )
}

export default MyChats

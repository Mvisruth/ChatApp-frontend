import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ChatState } from '../context/ProviderChat';
import { Box, Typography, Stack} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { getSender } from '../Config/ChatLogic';
import {Button} from 'react-bootstrap';
import GroupChatModal from './GroupChatModal';


function MyChats() {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, user, setSelectedChat, chat, setChat } = ChatState();

  const fetchChat = useCallback(async () => {
    if (user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log("Fetched chats:", data); // Debug log
      setChat(data);
    } catch (error) {
      toast.error("Error occurred while fetching chats");
    }
  }, [user, setChat]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(userInfo);
    fetchChat();
  }, []);

  if (!loggedUser || !chat) {
    return <ChatLoading />; // Add a loading state
  }

  return (
    <Box className="ms-3"
      display={{ base : selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      bgcolor='white'
      w={"100%"}// 
      height={'520px'}
      marginTop={5}
      borderRadius='16px'
      borderWidth='4px'
      p={2}
      boxShadow={5} 

    >
      <Box
        paddingBottom={3}
        // className='fs-1'
        borderRadius='lg'
        fontSize={{ base : '28px', md: '30px', xs:"12px"}}
        fontFamily='Work sans'
        display='flex'
        w={'100%'}
        justifyContent='space-between'
        alignItems='center'      
        p={2}
        maxHeight={"100px"}
       
      >
        My Chats
        <GroupChatModal>
        <Button 
          display='flex'
          className='ms-3 btn btn-success'
          fontSize={{ base : '17px', md: '10px', lg: '17px',xs:"" }}
          endIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupChatModal>
      </Box> 

      <Box
        display='flex'
        flexDirection='column' 
        padding={3}
        bgcolor='#F8F8F8'
        width='100%'
        paddingLeft={3}
        paddingRight={2}
        borderRadius='16px'
        overflowY='hidden'
        maxHeight='50vh'
        
      >
        {chat ? (
          <Stack spacing={2} sx={{ overflowY:'scroll' }}>
            {chat.map((chat) => {
              console.log("Rendering chat item:",chat); // Debug log
              return (
                <Box
                  onClick={()=>setSelectedChat(chat)}
                  cursor='pointer'
                  bgcolor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  borderRadius='12px'
                  key={chat._id}
                  paddingLeft={3}
                  p={2}
                >
                  <Typography fontSize="small" className=''>
                    {!chat.isGroupChat?(
                     getSender(loggedUser,chat.users)
                    ):chat.chatName}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}

export default MyChats;

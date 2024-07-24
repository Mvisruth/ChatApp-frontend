import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ChatState } from '../context/ProviderChat';
import { Box, Typography, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { getSender } from '../Config/ChatLogic';
import { Button } from 'react-bootstrap';
import GroupChatModal from './GroupChatModal';

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, user, setSelectedChat, chat, setChat } = ChatState();

  const fetchChat = useCallback(async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      // console.log("Fetched chats:", data); // Debug log
      setChat(data);
    } catch (error) {
      toast.error("Error occurred while fetching chats");
    }
  }, [user,setChat]);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, [fetchAgain,fetchChat]);

  // useEffect(() => {
  //   console.log("Updated chats state:", chat); // Debug log for chats state
  // }, [chat]);

  if (!loggedUser || !chat) {
    return <ChatLoading />; // Add a loading state
  }

  return (
    <Box className="ms-3"
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection='column'
      alignItems='center'
      bgcolor='white'
      w={"100%"}
      height={'520px'}
      marginTop={5}
      borderRadius='16px'
      borderWidth='4px'
      p={2}
      boxShadow={5}
    >
      <Box
        paddingBottom={3}
        borderRadius='lg'
        fontSize={{ base: '28px', md: '30px', xs: "12px" }}
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
            fontSize={{ base: '17px', md: '10px', lg: '17px', xs: "" }}
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
          <Stack spacing={2} sx={{ overflowY: 'scroll' }}>
            {chat.map((chatItem) => {
              // console.log("Rendering chat item:", chatItem); // Debug log
              return (
                <Box
                  onClick={() => setSelectedChat(chatItem)}
                  cursor='pointer'
                  bgcolor={selectedChat === chatItem ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chatItem ? "white" : "black"}
                  borderRadius='12px'
                  key={chatItem._id}
                  paddingLeft={3}
                  p={2}
                >
                  <Typography fontSize="small" className=''>
                    {!chatItem.isGroupChat
                    ? getSender(loggedUser,chatItem.users)
                     :chatItem.chatName}
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

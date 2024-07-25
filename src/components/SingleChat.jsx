import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ProviderChat';
import { Box, IconButton, Typography } from '@mui/material';
import { VscArrowLeft } from "react-icons/vsc";
import { getSender } from '../Config/ChatLogic';
import ProfileModel from './ProfileModel';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import { Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { toast } from 'react-toastify';
import ScrollableChat from './ScrollableChat';
import { io } from 'socket.io-client';
//seckot

const ENDPOINT = "http://127.0.0.1:5000"
var socket,selectedChatCompare




function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected,setSocketConnected]=useState()
  const [typing,setTyping]=useState(false)
  const [istyping,setIsTyping]=useState(false)
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: { 
          Authorization: `Bearer ${user.token}`
        }
      }; 
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
      console.log("Fetched Messages: ", data);
      setMessage(data);
      setLoading(false); 
      socket.emit('join chat',selectedChat._id)

    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.warning("Error occurred while fetching messages");
      setLoading(false); 
    }
  }; 


//socket
useEffect(()=>{
  socket = io(ENDPOINT)
  socket.emit("setup",user)
  socket.on('connection',()=>setSocketConnected(true));
  socket.on('typing',()=>setIsTyping(true))
  socket.on('stop typing',()=>setIsTyping(false))

},[])




  useEffect(() => {
    fetchMessages();

    selectedChatCompare= selectedChat;
  }, [selectedChat]);

  useEffect(()=>{
  socket.on('message received',(newMessageRecieved)=>{
    if(!selectedChatCompare|| selectedChatCompare._id !== newMessageRecieved.chat._id){
      //give notification
    }else{
      setMessage([...message,newMessageRecieved])
    }
  })
  })

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`
          }
        };
        setNewMessage("");
        const { data } = await axios.post('/api/message', {
          content: newMessage,
          chatId: selectedChat._id
        }, config);

        socket.emit('new message',data)
        console.log("Sent Message: ", data);
        setMessage([...message, data]);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  }






  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            w="100%"
            fontFamily="Work Sans"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            {/* <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<VscArrowLeft />}
              onClick={() => setSelectedChat(null)}
            /> */}
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSender(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal 
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            // alignItems="center"
            p={3}
            bgcolor="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
            maxHeight="90%"
          >
            {loading ? (
              <Spinner animation="border" role="status" size="xl">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="message">
                {<ScrollableChat message={message} />}
              </div>
            )}

            <InputGroup className="mt-4">
              <Form.Control
                onKeyDown={sendMessage} 
                isRequired 
                placeholder="Enter a Message"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={typingHandler}
                value={newMessage}
              />
            </InputGroup>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Typography fontSize="3xl" pb={3} fontFamily="Work Sans">
            Click on a User to Start Chatting
          </Typography>
        </Box>
      )}
    </>
  );
}

export default SingleChat;




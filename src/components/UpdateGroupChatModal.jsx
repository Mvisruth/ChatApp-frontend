import React from 'react'
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Box, ButtonBase, FormControl, Input } from '@mui/material';
import { ChatState } from '../context/ProviderChat';
import UserBadgeItem from './UserBadgeItem';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import UserList from './UserList';
import { toast } from 'react-toastify';


function UpdateGroupChatModal({fetchAgain,setFetchAgain,fetchMessages}) {
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {selectedChat,setSelectedChat,user}=ChatState()
    const [groupName,setgroupName]=useState()
    const [search,setsearch]=useState("")
    const [searchResult,setsearchResult]=useState([])
    const [loading,setloading]=useState(false)
    const [renameLoading,setrenameLoading]=useState(false)

    
  const handleRemove =async(user1)=>{ 

  if(selectedChat.groupAdmin._id !== user._id && user1._id !== user._id)
   {
  toast.warning("only admin can remove")
  return
  }
  try {
    setloading(true)
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    }
    const {data} = await axios.put('/api/chat/groupremove',
      {
        chatId:selectedChat._id,
        userId:user1._id
      },config
    )
    user1._id===user._id?setSelectedChat():setSelectedChat(data)
    setFetchAgain(!fetchAgain)
    fetchMessages()
    setloading(false)
} catch (error) {
  // toast.warning("error",error)
}
}

    const handleSearch =async(query)=>{
      setsearch(query)
      if (!query) {
        return;
    }
    try {
        setrenameLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            }
        };
        const { data } = await axios.get(`/api/user?search=${search}`,config);
        console.log(data)
        
        setloading(false)
        setsearchResult(data)
    } catch (err) {
        console.error('Error:', err);
        setrenameLoading(false);
    }
};

    
   
    const handleRename = async() => {
        if (!groupName) {
            return;
        }
        try {
            setrenameLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            };
            const { data } = await axios.put('/api/chat/rename',
               {
                chatId: selectedChat._id,
                chatName: groupName,
                }, config);
            
            setSelectedChat(data); // Update selectedChat state with new data
            setFetchAgain(!fetchAgain); // Trigger fetch again if needed
            setrenameLoading(false);
        } catch (err) {
            console.error('Error renaming chat:', err);
            setrenameLoading(false);
        }
        setgroupName(""); // Clear input field after renaming
    };
    
    const handleAddUser = async (user1) => {
      if (selectedChat.users.find((u) => u._id === user1._id)) {
        toast.warning("User already in the group");
        return;
      }
    
      if (selectedChat.groupAdmin._id !== user._id) {
        toast.warning("Only admin can add users");
        return; // Add return to stop further execution
      }
    
      try {
        setloading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
    
        const { data } = await axios.put(
          '/api/chat/groupadd',
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
    
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages()
        setloading(false);
      } catch (error) {
        setloading(false);
        console.error("Error occurred while adding user:", error); // Log the error
        // toast.error("An error occurred while adding the user");
      }
    };
    
    

  return (
    <Box
    

    >
    <Button 
     justifyContent={"flex-end"}
    d={{base:"flex"}}
     variant="primary" 
     onClick={handleShow}>   
    <IoEye />
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedChat.chatName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Box width={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
            {selectedChat.users.map((u)=>(
                <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={()=>handleRemove(u)}
                
                />
            ))}
        </Box>

        <FormControl display={"flex"}>
            <Input
            placeholder='Chat Name'
            ml={3}
            value={groupName}
            onChange={(e)=>setgroupName(e.target.value)}
            />
            
            
            <button className='mt-1'
            variant="solid"
            colorSchema="teal"
            ml={1}
            isloading={renameLoading}
            onClick={handleRename}
            >
            update 
           </button> 
        </FormControl>
        
        <FormControl className='ms-5'>
            <Input
            placeholder='Add user to Group'
            mb={3}
            onChange={(e)=>handleSearch(e.target.value)}
            >          
            </Input>
        </FormControl>
        {loading?(
          <Spinner/>
        ):(
          searchResult?.map((user)=>(
            <UserList
            key={user._id}
            user={user}
            handleFunction={()=>handleAddUser(user)}/>
          ))
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button className='me-3' variant="danger" onClick={()=>handleRemove(user)}>
          Leave
        </Button>
      </Modal.Footer>
    </Modal>
  </Box>
  )
}

export default UpdateGroupChatModal
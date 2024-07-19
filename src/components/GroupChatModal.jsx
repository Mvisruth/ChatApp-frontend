import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChatState } from '../context/ProviderChat';
import {  Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserList from './UserList';

function GroupChatModal({children}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [GroupChatName,setGroupChatName]=useState([])
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch]=useState([])
    const [searchResult,setSearchResult]=useState([])
    const [loading,setLoading]=useState([])
    const {user,chat,setChat} = ChatState()

    const handleSearch = async(query) => {
    
        setSearch(query)
        if(!query){
            return
        }
        try {
            setLoading(true)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,          
                },
            }
            const {data} = await axios.get(`/api/user?search=${search}`,config)
            console.log(data)
            setLoading(false)
            setSearchResult(data)
        } catch (error) {
            toast.warning("error occured")
            console.log(error)
            
        }
    } 
  
    const handleSubmit = () => {

    }
    
    const handleGroup = () => {

    }

  return (
    
    <>
    
    <span variant="primary" onClick={handleShow}>
      {children}
    </span>

    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Create Group Chat</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
          <Form.Group>
            <Form.Label>Chat Name</Form.Label>
            <Form.Control type="text" placeholder="Enter chat name"
            onChange={(e)=>setGroupChatName(e.target.value)} />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Add User</Form.Label>
            <Form.Control type="text" placeholder="Add user"
            onChange={(e)=>handleSearch(e.target.value)} />
          </Form.Group>
          
     </Form>
     {/* seleted users */}
     
  <div className='mt-3'>
      {loading ?(<div>loading</div>):(
       searchResult ?.slice(0,4).map((user)=>(
          <UserList
          key={user._id} 
          user={user} 
          handleFunction={()=>handleGroup(user)}
          />
        ))
       )}
  </div>
    </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Chat
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default GroupChatModal
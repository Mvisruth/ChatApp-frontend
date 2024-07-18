import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChatState } from '../context/ProviderChat';
import { FormControl} from 'react-bootstrap';
import {  Form } from 'react-bootstrap';
function GroupChatModal({children}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [GroupChatName,setGroupChatName]=useState([])
    const [selectedUsers,setSelectedUsers] = useState([])
    const [search,setSearch]=useState([])
    const [searchResult,setSearchResult]=useState([])
    const [loading,setLoading]=useState([])
    const {user,chats,setChat} = ChatState
    console.log(GroupChatName)

    const handleSearch = () => {

    }

  return (
    
    <>
    
    <span variant="primary" onClick={handleShow}>
      {children}
    </span>

    <Modal show={show} onHide={handleClose}>
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
     {/* render searched users */}
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default GroupChatModal
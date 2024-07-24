import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ChatState } from '../context/ProviderChat';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserList from './UserList';
import { Box } from '@mui/material';
import UserBadgeItem from './UserBadgeItem';
import 'react-toastify/dist/ReactToastify.css';

function GroupChatModal({ children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chat, setChat } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.warning("Error occurred while searching for users");
      console.error(error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.warning("Please fill all the fields");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/chat/group',
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChat([data, ...chat]);
      handleClose();
      toast.success("New Group Chat Created", {
        autoClose: 2000,
        position: "top-center",
      });
    } catch (error) {
      toast.error('Failed to create chat');
      console.error(error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(
    selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.warning("User already added");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

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
              <Form.Control
                type="text"
                placeholder="Enter chat name"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add user"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Box w="100%" display="flex" flexWrap="wrap">
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={user._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              /> 
            ))}
          </Box>
          <div className="mt-3">
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult?.slice(0, 4).map((user) => (
                <UserList
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
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
  );
}

export default GroupChatModal;

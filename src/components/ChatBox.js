import React from 'react';
import { ChatState } from '../context/ProviderChat';
import { Box } from '@mui/material';
function ChatBox() {
  const { selectedChat } = ChatState();

  return (
    <Box 
     
     >
      SingleChat
    </Box>
  );
}

export default ChatBox;

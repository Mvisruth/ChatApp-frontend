import React from 'react';
import { ChatState } from '../context/ProviderChat';
import { Box } from '@mui/material';
import SingleChat from './SingleChat';

function ChatBox({fetchAgain,setFetchAgain}) {
  const { selectedChat } = ChatState();
  return (
    <Box 
      d={{ base: selectedChat ? 'flex':'none', md: 'flex' }}
      alignItems="center"
      flexDirection="column"
      p={3} // Padding
      bgcolor={"white"}
      width={{ base:'100%', md:'68%' }} // Adjusted width for base and md screens
      borderRadius="lg"
      borderWidth="1px"
      // height={"80%"}
      // marginTop={8}
    >
     <SingleChat 
     fetchAgain={fetchAgain}
     setFetchAgain={setFetchAgain}
     />
    </Box>
  );
}

export default ChatBox;

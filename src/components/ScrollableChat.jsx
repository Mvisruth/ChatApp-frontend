import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin } from '../Config/ChatLogic'
import { ChatState } from '../context/ProviderChat'
import { Tooltip } from '@mui/material'
import { Avatar } from '@mui/joy'

function ScrollableChat({message}) {
    const {user} = ChatState()

  return (
    
    <ScrollableFeed>
        {message && message.map((m,i)=>(
            
            <div style={{ display: "flex", alignItems: "center" }} key={m._id}>
            {(isSameSender(message, m, i, user._id) || isLastMessage(message, i, user._id)) && (
              <Tooltip title={m.sender.name} placement='bottom-start'>
                <Avatar
                  alt={m.sender.name}
                  src={m.sender.pic }
                />
              </Tooltip>
            )}
            <span
              style={{
                background: `${m.sender._id === user._id ? "#BEE3F8" : '#B9F5D0'}`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                wordBreak: "break-word",
                display: "inline-block",
                marginLeft:isSameSenderMargin(message,m,i,user._id)
            }}
            >
              {m.content}
            </span>
          </div>
          
            
        ))}
    </ScrollableFeed>
  )
  
}

// console.log("Message data:", messages);
// console.log("Sender:", m.sender);
// console.log("User ID:", user._id);


export default ScrollableChat
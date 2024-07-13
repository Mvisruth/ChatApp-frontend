
import React from 'react'
import { ChatState } from '../context/ProviderChat'
import { Box } from '@mui/material'
import SideDrawer from '../components/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

function Chatpage() {
  const {user} = ChatState()

  return (
 
<div className='Chatpage-background' style={{width:"100%"}}>
{user && <SideDrawer/>}
<Box
display={"flex"}
justifyContent={'space-between'}
w={"100%"}
h={'91.5vh%'}
p={"10px"}
>
  {user && <MyChats/>}
  {user && <ChatBox/>}

</Box>

</div>    

  )
}

export default Chatpage


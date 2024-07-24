
import React, { useState } from 'react'
import { ChatState } from '../context/ProviderChat'
import { Box } from '@mui/material'
import SideDrawer from '../components/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

function Chatpage() {
  const {user} = ChatState()
  const [fetchAgain,setFetchAgain]=useState(false)

  return (
 
<div className='Chatpage-background' style={{width:"100%"}}>
{user && <SideDrawer/>}
<Box
display={"flex"}
justifyContent={'space-between'}
width={"100%"}
height={'91.5vh'}// 
p={"10px"} 
>
  {user && (<MyChats fetchAgain={fetchAgain}/> )}
  {user &&(<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}

</Box>

</div>    

  )
}

export default Chatpage


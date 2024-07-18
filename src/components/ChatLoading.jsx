import React from 'react'
import { Stack } from 'react-bootstrap'
import Skeleton from '@mui/material/Skeleton';

function ChatLoading() {
  return (

    <Stack  >
     <Skeleton animation={false} height={'45px'}  />
     <Skeleton animation={false} height={'45px'}  />
     <Skeleton animation={false} height={'45px'}  />
     <Skeleton animation={false} height={'45px'}  />
     <Skeleton animation={false}  height={'45px'} />
     <Skeleton animation={false} height={'45px'}  />


    </Stack>
  )
}

export default ChatLoading
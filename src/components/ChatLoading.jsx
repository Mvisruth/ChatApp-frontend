import React from 'react'
import { Stack } from 'react-bootstrap'
import Skeleton from '@mui/material/Skeleton';

function ChatLoading() {
  return (

    <Stack  >
     <Skeleton animation={false}  />
     <Skeleton animation={false} />
     <Skeleton animation={false} />
     <Skeleton animation={false} />
     <Skeleton animation={false} />
     <Skeleton animation={false} />


    </Stack>
  )
}

export default ChatLoading
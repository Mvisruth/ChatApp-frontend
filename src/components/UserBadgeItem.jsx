import { Box } from '@mui/material'
import React from 'react'
import { IoIosClose } from "react-icons/io";


function UserBadgeItem({user,handleFunction}) {
  return (
    <Box
    px={2}
    py={1}
    borderRadius={"15px"}
    m={1}
    mb={2}
    variant={"solid"}
    fontSize={"12"}
    backgroundColor="purple"
    color={"white"}
    cursor="pointer"
    onClick={handleFunction}
    >
    {user.name}
     <IoIosClose pl={1} />

    </Box>
  )
}

export default UserBadgeItem
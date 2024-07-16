import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const UserList = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        '&:hover': {
          backgroundColor: '#38B2AC',
          color: 'white'
        },
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        color: 'black',
        px: 2,
        py: 2,
        mb: 2,
        borderRadius: 'lg'
      }}
    >
      <Avatar
        sx={{ mr: 2, width: 'sm', height: 'sm' }}
        alt={user.name}
        src={user.pic}
      />
      <Box>
        <Typography variant="body1">{user.name}</Typography>
        <Typography variant="body2" fontSize="small">
          <b>Email:</b> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserList;

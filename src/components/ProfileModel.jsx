import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Image } from 'react-bootstrap';

const ProfileModel = ({user,children}) => {

    // const [isOpen,onOpen,onClose] =React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };


   const [open, setOpen] = React.useState(false);   
  return (
    <>
    {children}
    <React.Fragment>
      <Button  className='text-dark'    onClick={handleClickOpen}>
       my profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className='w-100 p-2'
      >
        <DialogTitle
        fontFamily="work sans"
        d="flex"
        justifyContent={"center"}
        width={"100%"}
        textAlign={'center'}
        >{user.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Image 
          className='image-container'
         boderRadius="full"
         boxSize="150px"
         src={user.pic}
         alt={user.name}
         />
         <DialogContentText 
         className='mt-3'
         textAlign={'center'}
         >
          Email: {user.email}
         </DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </>
  )
}

export default ProfileModel
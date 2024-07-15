import React from 'react'

const ProfileModel = ({user,children}) => {

    const [isOpen,onOpen,onClose] =React.useState(false);
  return (
    <div>{children}</div>
  )
}

export default ProfileModel
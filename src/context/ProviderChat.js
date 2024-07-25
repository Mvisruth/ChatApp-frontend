import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ChatContext = createContext()

const ChatProvider =({children})=>{
    
    const [user,setUser]=useState()
    const [selectedChat,setSelectedChat]=useState()
    const [chat,setChat]=useState([])
    const navigate = useNavigate()
   const [notification,setNotification]=useState([])

    
//navigate function to condition render
    useEffect(()=>{
   const userInfo = JSON.parse(localStorage.getItem("userInfo"))
   setUser(userInfo)

   if(!userInfo)
    {
        navigate('/') 
    }
    },[navigate])
///register
    
   

   return(<ChatContext.Provider value={{user,setUser,selectedChat,setSelectedChat,chat,setChat,notification,setNotification}}>{children}</ChatContext.Provider>
   );
}; 

export const ChatState = ()=>{
 return  useContext(ChatContext)
}

console.log(ChatState)



export default ChatProvider;
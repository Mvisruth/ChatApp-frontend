import React, { useState } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import { FaEyeSlash,FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import  {useNavigate} from 'react-router-dom';




function Homepage({register}) {
  const RegisterForm = register?true:false


  const [show,setShow]=useState(false)
  const [name,setName]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [confirmpassword,setConfirmpassword]=useState()
  const [pic,setPic]=useState()
  const navigate = useNavigate();


  const handleClick=()=>setShow(!show)


//
  // const handleRegister = ()=>{
  //   setLoading(true)
  //   if( !name || !email || !password|| !confirmpassword)
  //     {
  //         toast.error("please filled the form")
  //     }
  //     setLoading(false)
  // }
  //
  const postDetails= async (pics)=>{
    if(!pics){
      toast.warning("please select an image")
      return

    }
    
    if(pics.type === 'image/jpeg'|| pics.type ==='image/png'){
      const data = new FormData()
      data.append("file",pics)
      data.append("upload_preset","chat-app")
      data.append("cloud_name","visruth")
   try{ const response = await  fetch('https://api.cloudinary.com/v1_1/visruth/image/upload',{
        method:'post',
        body:data,
      })
      const result = await  response.json()
      setPic(result.url.toString());
      console.log(result);
    }catch(err){
          console.log("Error uploading image:",err);
        }
      


    }
    else{
      toast.error("please select an image")

    }

  }
///




/// submit function register

const submitHandler = async () => {
  try {
    if ( !name ||!email || !password || !confirmpassword) {
      toast.error('Please fill all fields');
      return;
    }

    if (password !== confirmpassword) {
      toast.warning('Passwords do not match');
      return;
    }

    const userData = {
      name,
      email,
      password,    
      pic,
      // Add other fields as needed
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await axios.post('/api/user/register',userData,config);
    console.log(userData)
    console.log('Registration successful:',response.data);
    console.log(response.data)
    toast.success('Registration successful');
    localStorage.setItem("userInfo",JSON.stringify(response.data))
    setTimeout(()=>{
      navigate('/chat')

    },3000)
  } catch (error) {
    console.error('Registration error:',error);
    toast.error('Registration failed');
  } 
};




//submit function login
const loginHandler =async()=>{
  try{
  if(!email || !password){
    toast.error('Please fill all fields');
    return

    
  }
  const Data = {
    name,
    email,
    password,    
    pic,
    // Add other fields as needed
  };

  const Config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await axios.post('/api/user/login',Data,Config)
  console.log('Login successfuly:',response.data)
  console.log(response.data)
  toast.success('Login successful');
  localStorage.setItem("userInfo",JSON.stringify(response.data))
  setTimeout(()=>{
    navigate('/chat')

  },3000)
} catch (error) {
  console.error('Registration error:',error);
  toast.error('please enter vaild input');
} 

  
}




  return (
    
    <>
          <MDBContainer fluid>
            
      
            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
              <MDBCol col='12'>
              <h1 className='text-center fs-1 text-white '>Chat Me</h1>
  
                <MDBCard  className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                  <MDBCardBody  className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
      
                    <h2 className="fw-bold mb-2 text-uppercase">
                      {RegisterForm?"Register":"Login" }</h2>
                    <p className="text-white-50 mb-4">Please enter your login and password!</p>
      
                   {  register && <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='name'  onChange={(e)=>setName(e.target.value)}  id='formControlLg' type='name' size="" required  />}
                    <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='Email address' value={email} onChange={(e)=>setEmail(e.target.value)}  id='formControlLg' type='email' size="" required  />
                    <div className='d-flex w-100'>
                      <MDBInput wrapperClass='mb-3  w-100' labelClass='text-white'  placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} id='formControlLg' type={show?'password':'text'} size="" required />
                      <Button className='text-light bg-dark' onClick={handleClick} >
                      {show?<FaEyeSlash/>:(<FaEye/>)}
                      </Button>
                      </div>
                      
                    
                     {register && //&& trueth
                     <div className='d-flex w-100  '>
                        <MDBInput wrapperClass=' mb-3 w-100' labelClass='text-white'  placeholder='confirm Password' onChange={(e)=>setConfirmpassword(e.target.value)} id='formControlLg' type={show?'password':'text'} size="" required />
                        <Button className='text-light bg-dark' onClick={handleClick} >
                        {show?<FaEyeSlash/>:(<FaEye/>)}
                         </Button>
                         
                     </div>
                     }
                   {register && <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='' onChange={(e)=>postDetails(e.target.files[0])}  id='formControlLg' type='file' size="" required   />}  
  
  
                  
                  
                 { register ? 
                    
                    <Button   variant="contained" disableElevation
                    onClick={submitHandler}
                    className='lg  mb-2 w-100'> 
                     signup
                    </Button>:

                    <Button   variant="contained" disableElevation
                    onClick={loginHandler}
                    className='lg  mb-2 w-100'> 
                    sigin
                   </Button>
                  
                }
  
                     {register? "":<Button   variant="contained" disableElevation 
                    className='lg bg-danger mb-2 w-100' onClick={()=>{
                      setEmail("guest@example.com")
                      setPassword("123456")
                    }}> 
                     Get Guest User Credentials
                     </Button>}
  
                    <p className="small pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                    <div>
                      {register?<p className="mb-0">you have already account? <a href="/" class="text-white-100 fw-bold">Sign in</a></p>:
                       <p className="mb-0">Don't have an account? <a href="/register" class="text-white-100 fw-bold">Sign up</a></p>
                      }
  
                      
      
                    </div>
                  </MDBCardBody>
                </MDBCard>
      
              </MDBCol>
            </MDBRow>
      
          </MDBContainer>
          <ToastContainer theme='colored' autoClose={2000} position='top-center'/>
       </>
      );
    }
    
    

export default Homepage
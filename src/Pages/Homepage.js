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

function Homepage({register}) {
  const RegisterForm = register?false:true
  const [show,setShow]=useState(false)
  // const [name,setName]=useState()
  // const [email,setEmail]=useState()
  // const [confirmpassword,setConfirmpassword]=useState()
  // const [password,setPassword]=useState()
  // const [pis,setPic]=useState()
  return (
    
    
      
        <MDBContainer fluid>
          
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
            <h1 className='text-center fs-1'>Chat Me</h1>

              <MDBCard  className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody  className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {RegisterForm?"Register":"Login" }                  </h2>
                  <p className="text-white-50 mb-5">Please enter your login and password!</p>
    
                  <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='Email address' id='formControlLg' type='email' size="" required  />
             



                  <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='password' id='formControlLg' type='password' size="" required
                   />
                
                   {register && //&& truethly operater
                   <div className='d-flex w-100  '>
                      <MDBInput wrapperClass=' mb-3 w-100' labelClass='text-white'  placeholder='confirm Password' id='formControlLg' type={show?'password':'text'} size="" required />
                       
                      <Button className='text-light bg-dark' onClick={()=>setShow(!show)}> 
                      {show?<FaEyeSlash/>:(<FaEye/>)}
                      </Button>
                    </div>}

                 {register && <MDBInput wrapperClass='mb-3 mx-5 w-100' labelClass='text-white'  placeholder='Email address' id='formControlLg' type='file' size="" required accept='image/*'  /> }


                
                   <Button   variant="contained" disableElevation
                  className='lg  mb-2 w-100'> 
                   sign
                   </Button>
                  <p className="small pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                  <div>
                    {register?<p className="mb-0">you have already account? <a href="/" class="text-white-100 fw-bold">Sign in</a></p>:
                     <p className="mb-0">Don't have an account? <a href="/register" class="text-white-100 fw-bold">Sign Up</a></p>
                    }

                    
    
                  </div>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
    }
    
    

export default Homepage
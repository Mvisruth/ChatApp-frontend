import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Homepage({ register }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [pic, setPic] = useState('');
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const postDetails = async (pics) => {
    if (!pics) {
      toast.warning('Please select an image');
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'visruth');
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/visruth/image/upload', {
          method: 'post',
          body: data,
        });
        const result = await response.json();
        setPic(result.url.toString());
      } catch (err) {
        console.log('Error uploading image:', err);
      }
    } else {
      toast.error('Please select a valid image');
    }
  };

  const submitHandler = async () => {
    try {
      if (!name || !email || !password || !confirmpassword) {
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
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('/api/user/register', userData, config);
      toast.success('Registration successful');
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    }
  };

  const loginHandler = async () => {
    try {
      if (!email || !password) {
        toast.error('Please fill all fields');
        return;
      }

      const Data = {
        email,
        password,
      };

      const Config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post('/api/user/login', Data, Config);
      toast.success('Login successful');
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      setTimeout(() => {
        navigate('/chat');
        
      }, 3000);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    }
  };
///navigate function to condition render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) navigate('/register');
  }, [navigate]);


  

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className='Homepage-background d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <h1 className='text-center fs-1 text-white'>Chat Me</h1>

            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className="fw-bold mb-2 text-uppercase">
                  {register ? 'Register' : 'Login'}
                </h2>
                <p className="text-white-50 mb-4">Please enter your {register ? 'registration' : 'login'} details!</p>

                {register && (
                  <MDBInput
                    wrapperClass='mb-3 mx-5 w-100'
                    labelClass='text-white'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text'
                    required
                  />
                )}
                <MDBInput
                  wrapperClass='mb-3 mx-5 w-100'
                  labelClass='text-white'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  required
                />
                <div className='d-flex w-100'>
                  <MDBInput
                    wrapperClass='mb-3 w-100'
                    labelClass='text-white'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={show ? 'text' : 'password'}
                    required
                  />
                  <Button className='text-light bg-dark' onClick={handleClick}>
                    {show ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>

                {register && (
                  <div className='d-flex w-100'>
                    <MDBInput
                      wrapperClass='mb-3 w-100'
                      labelClass='text-white'
                      placeholder='Confirm Password'
                      value={confirmpassword}
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      type={show ? 'text' : 'password'}
                      required
                    />
                  </div>
                )}

                {register && (
                  <MDBInput
                    wrapperClass='mb-3 mx-5 w-100'
                    labelClass='text-white'
                    placeholder='Profile Picture'
                    onChange={(e) => postDetails(e.target.files[0])}
                    type='file'
                    required
                  />
                )}

                {register ? (
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={submitHandler}
                    className='lg mb-2 w-100'
                  >
                    Sign Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    disableElevation
                    onClick={loginHandler}
                    className='lg mb-2 w-100'
                  >
                    Sign In
                  </Button>
                )}

                {!register && (
                  <Button
                    variant="contained"
                    disableElevation
                    className='lg bg-danger mb-2 w-100'
                    onClick={() => {
                      setEmail('guest@example.com');
                      setPassword('123456');
                    }}
                  >
                    Get Guest User Credentials
                  </Button>
                )}

                <p className="small pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                <div>
                  {register ? (
                    <p className="mb-0">Already have an account? <a href="/" className="text-white-100 fw-bold">Sign In</a></p>
                  ) : (
                    <p className="mb-0">Don't have an account? <a href="/register" className="text-white-100 fw-bold">Sign Up</a></p>
                  )}
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

export default Homepage;

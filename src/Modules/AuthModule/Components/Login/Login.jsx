import React from 'react'
import { Col } from 'react-bootstrap';
// import { useOutletContext } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../services/validation';
import { USER_URLS} from '../../../../services/api/apiURLs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../services/api/index';
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';

export default function Login() {

 const colProps = { md: 8, lg: 6, xl: 5 };

 const[showPassword, setShowPassword] = useState(false);

 const {saveUserData} = useContext(AuthContext);

 const{register, formState:{errors,isSubmitting}, handleSubmit}= useForm();
 let navigate = useNavigate();

 const onSubmit=async(data)=>{

  try {
    let response= await axiosInstance.post(USER_URLS.LOGIN,data);
    localStorage.setItem("token",response?.data?.token);
    saveUserData();

    console.log(response);
    toast.success('Welcome to PMS!',
    {
      autoClose: 3000,
    })
    navigate('/dashboard');


  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to login",
    { autoClose: 3000
    });
s
  }
 }

  return (
    <>
     <Col {...colProps} className=" p-3 rounded-3 formBg text-white">



     <Form onSubmit={handleSubmit(onSubmit)} className='mx-5 my-3'>
        <AuthHeader subtitle={'welcome to PMS'} title={'Login'}/>

      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='textHeader'>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter your E-mail"
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
      </Form.Group>

      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className='textHeader'>Password</Form.Label>

        <div className='password-wrapper'>
        <Form.Control  type={showPassword ? 'text':'password'} placeholder="Enter your password"
        {...register('password',PASSWORD_VALIDATION)} />
        <span className='eye-icon' onClick={()=> setShowPassword(!showPassword)}>
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </span>
        </div>
        {errors.password && <small className='text-danger d-block mt-1'>{errors.password.message}</small>}
      </Form.Group>

      <div className="links d-flex justify-content-between my-3">
        <Link className='text-decoration-none text-white' to="/register">Register Now?</Link>
        <Link className='text-decoration-none text-white' to="/forget-pass">Forget Password?</Link>
      </div>

      <Button disabled={isSubmitting} type='submit' className='w-100 mt-4 Auth-btn'>
      {isSubmitting ?(
          <>
          Login
          <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
          </>
        ):('Login')}
      </Button>
    </Form>

    </Col>
    </>
  )
}

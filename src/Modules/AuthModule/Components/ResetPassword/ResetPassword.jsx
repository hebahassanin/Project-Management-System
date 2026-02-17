import React from 'react'
import { Col } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION, REQUIRED_VALIDATION } from '../../../../services/validation';
import axiosInstance from '../../../../services/api/index.js';
import { USER_URLS, baseURL } from '../../../../services/api/apiURLs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import axios from 'axios';

export default function ResetPassword() {
  const colProps = { md: 8, lg: 6, xl: 5 };

 const[showPassword, setShowPassword] = useState(false);
 const[showConfirmPassword, setShowConfirmPassword] = useState(false);

 const{register, formState:{errors,isSubmitting}, handleSubmit,watch}= useForm();
 
 let navigate = useNavigate();
  const onSubmit = async (data) => {
  try {
    // await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset",data)
    await axiosInstance.post(USER_URLS.RESET,data)

    toast.success("Password reset successfully!", {
      autoClose: 3000,
    });

    navigate("/dashboard");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Failed to reset password",
      {
        autoClose: 3000,
      }
    );
  }
};


  return (
    <>
      <Col {...colProps} className=" p-3 rounded-3 formBg text-white">
     <Form onSubmit={handleSubmit(onSubmit)} className='mx-5 my-3'>
        <AuthHeader subtitle={'welcome to PMS'} title={'Reset Password'}/>  

      <Form.Group className="custom-input mb-3" controlId="exampleForm.Email">
        <Form.Label className='textHeader'>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter your E-mail" 
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
      </Form.Group>

       <Form.Group className="custom-input mb-3" controlId="exampleForm.OTPVerification">
        <Form.Label className='textHeader'>OTP Verification</Form.Label>
        <Form.Control type="text" placeholder="Enter Verification Code" 
        {...register('seed',REQUIRED_VALIDATION)} />
        {errors.seed && <small className='text-danger d-block mt-1'>{errors.seed.message}</small>}
      </Form.Group>

      <Form.Group className="custom-input mb-3" controlId="exampleForm.Password">
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

       <Form.Group className="custom-input mb-3" controlId="exampleForm.confirmPassword">
        <Form.Label className='textHeader'>Confirm Password</Form.Label>

        <div className='password-wrapper'>
        <Form.Control  type={showConfirmPassword ? 'text':'password'} placeholder="Confirm your password"
        {...register('confirmPassword',{...PASSWORD_VALIDATION,validate :value=> value === watch('password')||"Confirm password must match the password."} )} />
        <span className='eye-icon' onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
        </span>
        </div>
        {errors.confirmPassword && <small className='text-danger d-block mt-1'>{errors.confirmPassword.message}</small>}
      </Form.Group>  
       <Button disabled={isSubmitting} type='submit' className='w-100 mt-4 Auth-btn'>
            {isSubmitting ?(
                <>
                Save
                <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
                </>
              ):('Save')}
            </Button>
    </Form>
           
    </Col>
    </>
  )
}


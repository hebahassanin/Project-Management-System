import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { USER_URLS } from '../../../../services/api/apiURLs.js';
import axiosInstance from '../../../../services/api/index.js';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button, Col ,Form} from 'react-bootstrap';
import { EMAIL_VALIDATION} from '../../../../services/validation';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader.jsx';




export default function ForgetPassword() {
   const colProps = { md: 8, lg: 6, xl: 5 };

 const{register, formState:{errors,isSubmitting}, handleSubmit}= useForm();
 let navigate = useNavigate();

 const onSubmit=async(data)=>{

  try {
    let response= await axiosInstance.post(USER_URLS.RESET_REQUEST,data);
    console.log(response);
    toast.success('ready to reset your password',
    {
      autoClose: 3000,
    })
    navigate('/reset-pass');

    
  } catch (error) {
    const userMessage = error?.response?.data?.additionalInfo?.response
      ? "Cannot send reset email: please contact support."
      : error?.response?.data?.message || "Failed to send request";

    toast.error(userMessage, { autoClose: 5000 });

    
  }
 }
  return (
    <>
    <Col {...colProps} className=" p-3 rounded-3 formBg text-white">
      <Form onSubmit={handleSubmit(onSubmit)} className='mx-5 my-3'>
        <AuthHeader subtitle={'welcome to PMS'} title={'Forget Password'}/> 

      <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label className='textHeader'>E-mail</Form.Label>
        <Form.Control type="email" placeholder="Enter your E-mail" 
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
      </Form.Group>
        <Button disabled={isSubmitting} type='submit' className='w-100 mt-4 Auth-btn'>
            {isSubmitting ?(
                <>
                Verify
                <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
                </>
              ):('Verify')}
        </Button>
    </Form>
     </Col>
      
    </>
  )
}

import axios from 'axios';
import React, { useState } from 'react'
import { Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {EMAIL_VALIDATION, NAME_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION } from '../../../../services/validation';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import { USER_URLS, baseURL } from '../../../../services/api/apiURLs';
import { useNavigate } from 'react-router-dom';
import profileImg from "../../../../assets/images/profileImg.png";
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
export default function Register() {
   const colProps = { md: 12, lg: 10, xl: 8};
    const[showPassword, setShowPassword] = useState(false);
    
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [profileImage, setProfileImage] = useState(null);
const [profileImageError, setProfileImageError] = useState(false);

   
    const{register, formState:{errors,isSubmitting}, handleSubmit,setValue,watch}= useForm();
    const navigate = useNavigate();
    const handleProfileImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setProfileImage(file);
    setValue('profileImage', file); 
    setProfileImageError(false);
  }
};
  const onSubmit=async(data)=>{
      if (!profileImage) {
    setProfileImageError(true);
    return;
  }

  const formData = new FormData();

  
  formData.append('profileImage', profileImage);

  

  Object.keys(data).forEach((key) => {
  if (key !== 'profileImage') {
    formData.append(key, data[key]);
  }
});

    try {
    let response= await axios.post(`${baseURL}${USER_URLS.REGISTER}`,formData);
   
    console.log(response);
    toast.success('success register')
   
    navigate('/verify-account');

    
  } catch (error) {
    toast.error(error.response.data.message);
    
  }
}
  return (
    <>
         <Col {...colProps} className=" p-3 rounded-3 formBg text-white">
    
     
    
         <Form onSubmit={handleSubmit(onSubmit)} className='mx-5 my-3'>
            <AuthHeader subtitle={'welcome to PMS'} title={   <>
      <span className="c-underline">C</span>reate New Account
    </>}/>  
         
<div className="text-center ">
  <Form.Label htmlFor="profileImage">
    <img
      src={
        profileImage
          ? URL.createObjectURL(profileImage)
          : profileImg
      }
      alt="profile"
      width={90}
      height={90}
      className="rounded-circle"
      style={{ cursor: "pointer" }}
    />
  </Form.Label>

  <Form.Control
    type="file"
    id="profileImage"
    accept="image/*"
    hidden
    isInvalid={profileImageError}
    
    onChange={handleProfileImageChange}
  />

  {profileImageError && (
    <div className="text-danger mt-1">
      Profile image is required
    </div>
  )}
</div>

          <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
             <div className="row">
          <div className="col-6">
             <Form.Label className='textHeader'>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" 
            {...register('userName',NAME_VALIDATION)} />
            {errors.userName && <small className='text-danger d-block mt-1'>{errors.userName.message}</small>}
          </div>
          <div className="col-6">
              <Form.Label className='textHeader'>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Enter your E-mail" 
        {...register('email',EMAIL_VALIDATION)} />
        {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
          </div>
        </div>
           
          </Form.Group>
          <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
             <div className="row">
          <div className="col-6">
            <Form.Label className='textHeader'>Country </Form.Label>
            <Form.Control type="text" placeholder="Enter your country" 
            {...register('country',{
      required:'country name is required'})} />
            {errors.country && <small className='text-danger d-block mt-1'>{errors.country.message}</small>}
            </div>
            <div className="col-6">
            <Form.Label className='textHeader'>Phone Number </Form.Label>
                   
                    <Form.Control type="text" placeholder="Enter your phone number" 
        {...register('phoneNumber',PHONE_VALIDATION)} />
        {errors.phoneNumber && <small className='text-danger d-block mt-1'>{errors.phoneNumber.message}</small>}
        </div>
        </div>

          </Form.Group>
    
          <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlTextarea1">
            <div className="row">
             <div className="col-6">
            <Form.Label className='textHeader'>Password</Form.Label>
    
            <div className='password-wrapper'>
            <Form.Control  type={showPassword ? 'text':'password'} placeholder="Enter your Password"
            {...register('password',PASSWORD_VALIDATION)} />
            <span className='eye-icon' onClick={()=> setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
            </div>
            {errors.password && <small className='text-danger d-block mt-1'>{errors.password.message}</small>}
            </div>
            <div className="col-6">
               <Form.Label className='textHeader'>Confirm Password</Form.Label>
    
            <div className='password-wrapper'>
            <Form.Control  type={showConfirmPassword ? 'text':'password'} placeholder="Confirm New Password"
            {...register('confirmPassword',{...PASSWORD_VALIDATION,validate :value=> value === watch('password')||"Confirm password must match the password."})} />
            <span className='eye-icon' onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
            </div>
            {errors.confirmPassword && <small className='text-danger d-block mt-1'>{errors.confirmPassword.message}</small>}
          </div>
          </div>
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



import React from 'react'
import useToggle from '../../../../hooks/useToggle';
import { Col, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { PASSWORD_VALIDATION } from '../../../../services/validation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import {  USER_URLS } from '../../../../services/api/apiURLs';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import { toast } from 'react-toastify';
import axiosInstance from '../../../../services/api';
import { useNavigate } from 'react-router-dom';




export default function ChangePassword() {
  let{register,handleSubmit,formState:{errors,isSubmitting},watch}=useForm();
 const navigate= useNavigate();
  const passwordValue= watch("newPassword");


   const colProps = { md: 8, lg: 6, xl: 5 };
  const[firstPass,toggleFirstPass]=useToggle();
  const[secondPass,toggleSecondPass]=useToggle();
  const[thirdPass,toggleThirdPass]=useToggle();

const onSubmit= async(data)=>{

  try {
      let response=await axiosInstance.put(USER_URLS.CHANGE_PASSWORD,data);
     toast.success('password change successfuly',
        {
          autoClose: 3000,
        })
        navigate('/login');
    console.log(response);

  } catch (error) {
   toast.error(error.response?.data.message||"there is an error")
  }
}
return(
    <>
<Col {...colProps} className=" p-1 rounded-3 formBg text-white" >
   <Form onSubmit={handleSubmit(onSubmit)} className="mx-5 my-3">
     <AuthHeader subtitle={'welcome to PMS'} title={'Change Password'}/>
        <Form.Group className="custom-input mb-2" controlId="formBasicPassword">
       <div className='password-wrapper'>
        <Form.Label className='textHeader my-1'>old password</Form.Label>
         <Form.Control type={firstPass ? 'text':'password'} placeholder="Enter your Old Password"
        {...register("oldPassword",PASSWORD_VALIDATION)} />
          <InputGroup.Text className ="eyeicon text-white bg-transparent"

        onClick={toggleFirstPass}
        >
          {firstPass? <FaEye/>:<FaEyeSlash/>}
        </InputGroup.Text>
       </div>

      </Form.Group>
       {errors.oldPassword && <small className='text-danger d-block '>{errors.oldPassword.message}</small>}
         <Form.Group className="custom-input mb-2" controlId="formBasicPassword">
       <div className='password-wrapper'>
        <Form.Label className='textHeader my-1'>New Password</Form.Label>
         <Form.Control type={secondPass ? "text":"password"} placeholder="Enter your New Password"
        {...register("newPassword",PASSWORD_VALIDATION)} />
         <InputGroup.Text className="eyeicon text-white bg-transparent"

        onClick={toggleSecondPass}
        >
          {secondPass?<FaEye/>:<FaEyeSlash/>}
        </InputGroup.Text>
       </div>

      </Form.Group>
       {errors.newPassword && <small className='text-danger d-block '>{errors.newPassword.message}</small>}
          <Form.Group className="custom-input mb-2" controlId="formBasicPassword">
       <div className='password-wrapper'>
        <Form.Label className='textHeader  my-1'> Confirm New Password</Form.Label>
         <Form.Control type={thirdPass? "text":"password"} placeholder="Confirm New password"
        {...register("confirmNewPassword",{...PASSWORD_VALIDATION,validate:(value)=>value === passwordValue||"not the same password"})} />

        <InputGroup.Text className="eyeicon text-white bg-transparent"

        onClick={toggleThirdPass}
        >
          {thirdPass? <FaEye/>:<FaEyeSlash/>}
        </InputGroup.Text>
       </div>

      </Form.Group>
       {errors.confirmNewPassword && <small className='text-danger d-block '>{errors.confirmNewPassword.message}</small>}





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

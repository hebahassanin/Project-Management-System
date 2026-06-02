import Button from 'react-bootstrap/Button';
import AuthHeader from '../../../Shared/components/AuthHeader/AuthHeader';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { EMAIL_VALIDATION } from '../../../../services/validation';
import { baseURL, USER_URLS } from '../../../../services/api/apiURLs';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../services/api';

export default function Verify() {

  const colProps = { md: 8, lg: 6, xl: 5 };
  const navigate = useNavigate();

  const{register, formState:{errors, isSubmitting}, handleSubmit}= useForm();


  const onSubmit=async(data)=>{
    try {
    let response= await axios.put(`${baseURL}${USER_URLS.VERIFY}`,data,
          {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`

          },
        });
    // let response = await axiosInstance.put(USER_URLS.VERIFY, data);

    console.log(response);
    toast.success(response?.data?.message || 'Account verified successfully', 
      {autoClose: 3000});
    navigate('/login');

    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed. Please try again.',
        {autoClose: 3000});

    }
  }
  return (
    <>
      <Col {...colProps} className=" p-3 rounded-3 formBg text-white">

        <Form onSubmit={handleSubmit(onSubmit)} className='mx-5 my-3'>
          <AuthHeader subtitle={'welcome to PMS'} title={'Verify Account'}/>

          <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='textHeader'>E-mail</Form.Label>

            <Form.Control type="email" placeholder="Enter your E-mail"
             {...register('email',EMAIL_VALIDATION)} />
            {errors.email && <small className='text-danger d-block mt-1'>{errors.email.message}</small>}
          </Form.Group>

          <Form.Group className="custom-input mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className='textHeader'>OTP Verification</Form.Label>

            <Form.Control type="text" placeholder="Enter Verification"
              {...register('code',{required:"code is required"})} />
            {errors.code && <small className='text-danger d-block mt-1'>{errors.code.message}</small>}
          </Form.Group>

          <Button disabled={isSubmitting}  type='submit' className='w-100 mt-4 Auth-btn'>
            {isSubmitting ?(
            <>
              Save
              <span className="spinner-border spinner-border-sm ms-2" role="status" aria-hidden="true"></span>
            </>)
            : " Save" }
          </Button>
          </Form>
       </Col>
    </>
  )
}

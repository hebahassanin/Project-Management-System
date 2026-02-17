import React, { useContext, useEffect } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../../../services/api';
import { PROJECT_URLS } from '../../../../services/api/apiURLs';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../../../../context/AuthContext';


export default function ProjectData() {
 const {register,handleSubmit,formState:{errors,isSubmitting},setValue} =useForm();
 const [loading,setLoading]=useState(false);
 const{userData}=useContext(AuthContext);
 const{id}=useParams();
 const navigate=useNavigate();
//  Add project
 const onSubmit=async(data)=>{
  if(id){

    try {

  const response=await axiosInstance.put(PROJECT_URLS.UPDATE_PROJECT(id),data);
  console.log(response);
  navigate("/dashboard/projects");
  toast.success("update success");
    } catch (error) {
     toast.error(error.response?.data?.message ||  "sorry i can't update  project");


    }



  }
  else{

try {
  let response=await axiosInstance.post(PROJECT_URLS.CREATE_PROJECT,data);
console.log(response);
toast.success("project added");
navigate("/dashboard/projects")


} catch (error) {
   toast.error(error.response?.data?.message );

}



 }}
//  End ADD project
// get detais fpr projectId
const getProjectDetails=async()=>{
setLoading(true);
try {
    const {data}= await axiosInstance.get(PROJECT_URLS.GET_PROJECT(id));
  console.log(data);
   setValue("title",data?.title);
 setValue("description",data?.description);

}
 catch (error) {
  console.log(error.response?.data?.message);
  toast.error(error.response?.data?.message || "sorry! cann't load projects details")

}
finally{
  setLoading(false)
}

}
// end details projectId





useEffect(()=>{
  if(userData?.userGroup=="Employee"){
    navigate("/dashboard");
  }

if(id){
  getProjectDetails();
}
},[userData]);

 if(loading) return<div className=' d-flex align-items-center justify-content-center vh-100'>
   <BeatLoader size={20} color='#288131' />
 </div>

  return (
    <>
        <header className='bgOverlayDark container-fluid m-0 p-3'>
        <div className="container">
          <Link to="/dashboard/projects" className='headerLink'>
            <MdKeyboardArrowLeft />
            View All projects
          </Link>
          <h1 className='title my-3'> {id? "updata Project":"Add a New Project"} </h1>
        </div>

      </header>

<Container>
  <Row className='d-flex justify-content-center aligns-items-center'>
<Col lg={8} md={10}>
      <Form onSubmit={handleSubmit(onSubmit)} className='form-admin shadow-sm p-3 my-3 rounded rounded-2 form-admin '>
          <Form.Group className="form-group mb-4">
          <Form.Label htmlFor="title">Title</Form.Label>
          <Form.Control placeholder="Name" type="text" id="title" className='form-control' {...register("title",{required:"Title is required"})} />
          {errors.title && <small className='text-danger d-block mt-1'>{errors.title.message}</small>}
        </Form.Group>
         <Form.Group className="form-group mb-4">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control as="textarea" placeholder="Description" id="description" className='form-control' {...register("description",{required:"Description is required"})} />
          {errors.description && <small className='text-danger d-block mt-1'>{errors.description.message}</small>}
        </Form.Group>
            <div className='d-flex justify-content-between my-4'>
          <Button type="button" className=' cancelBtn w-25 mt-4 ' onClick={()=>navigate(`/dashboard/projects`)}>cancel</Button>
           <Button disabled={isSubmitting} type='submit' className='w-25 mt-4 Auth-btn'>


                

        {isSubmitting ?(
                <>
                {id? "update":"save"}
                <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
                </>
            ):  id? "update":"save"}

          

        </Button>
        </div>

      </Form>
      </Col>
      </Row>
</Container>




    </>
  )
}

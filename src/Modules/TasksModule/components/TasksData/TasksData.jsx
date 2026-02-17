import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, FormLabel } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import useTasks from '../../../../hooks/useTasks';
import useProjects from '../../../../hooks/useProject';
import useUsers from '../../../../hooks/useUsers';
import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../../../../context/AuthContext';

export default function TasksData() {
  const [validated, setValidated] = useState(false);
  let{projects,loading,error,fetchProjects} = useProjects();
  let{users,loadingUsers,errorUsers,fetchUsers} = useUsers();
  let navigate = useNavigate();
  let {addTask,singleTask,fetchOneTaskById,updateTask}= useTasks()
  let {register,handleSubmit,formState:{errors,isSubmitting},reset} = useForm();

  
    const {id} = useParams()
    const {userData} = useContext(AuthContext)

     let role =  userData?.userGroup;
     console.log(role,"role")

    useEffect(() => {
      console.log(id,"idddddddddddddddd")
      if (id) {
        fetchOneTaskById(id);
      }
    }, [id]);

  useEffect(() => {
    console.log(singleTask,"single tassssssssk")
  if (singleTask) {
    console.log(singleTask.employeeId,"employeeId")
    reset({
      title: singleTask.title,
      description: singleTask.description,
      employeeId:Number(singleTask.employee.id),
      projectId: Number(singleTask.project.id),
    });
  }
}, [singleTask, reset]);

  //  reset({
  //       title: singleTask?.title || "",
  //       description: singleTask?.description || "",
  //       employeeId: singleTask?.employeeId || "",
  //       projectId: singleTask?.projectId || "",


  //     })
  let onSubmit = async (data) => {
    console.log(data);
    console.log("ana hena to add or update")
    if(id)
    {
       await updateTask(id,data)
        
    }
    else{
      console.log("1")
      await addTask(data);
    }
    
  }
  useEffect(()=>{
      console.log(role,"rooooole")
    if(role === "Employee") {
      console.log("el mafrood home")
         navigate("/dashboard/home")
    }
    else{
      fetchProjects();
      fetchUsers();
    }
    
  },[role])



    if(loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div> 

  return (
    <>
      <header className='bgOverlayDark container-fluid m-0 p-3'>
        <div className="container">
          <Link to="/dashboard/tasks" className='headerLink'>
            <MdKeyboardArrowLeft />
            View All Tasks
          </Link>
          <h1 className='title my-3'>{id?"Update":"Add a New "}  Task</h1>
        </div>      
      </header>
      <Container fluid>
      <Row className='d-flex justify-content-center align-items-center'>
        <Col md={10} lg={8} sm={12} xs={12} >
       
          <Form onSubmit={handleSubmit(onSubmit)} className='form-admin ' >
            <Form.Group className="form-group mb-4">
              <Form.Label htmlFor="title">Title</Form.Label>
              <Form.Control placeholder="Name" type="text" id="title" className='form-control' {...register("title",{required:"Title is required"})} />   
              {errors.title && <small className='text-danger d-block mt-1'>{errors.title.message}</small>}
            </Form.Group>
            <Form.Group className="form-group mb-4">  
              <Form.Label htmlFor="description">Description</Form.Label>
              <Form.Control as="textarea" placeholder="Description" id="description" className='form-control' {...register("description",{required:"Description is required"})} ></Form.Control>  
              {errors.description && <small className='text-danger d-block mt-1'>{errors.description.message}</small>}    
            </Form.Group>
            <Form.Group >
              <Row >
              <Col >
                <Form.Group className="form-group mb-4">
                    <Form.Label htmlFor="employeeId">User</Form.Label>
                    <Form.Select id="employeeId" className='form-control ' {...register("employeeId",{required:"User is required"})} >
                      <option value="">Select user</option> 
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))  }
                    </Form.Select>
                    {errors.employeeId && <small className='text-danger d-block mt-1'>{errors.employeeId.message}</small>}
                </Form.Group>
              </Col>
             <Col>
              <Form.Group className="form-group" >
                <Form.Label htmlFor="projectId">Project</Form.Label>
                <Form.Select id="projectId" disabled={id} className='form-control' {...register("projectId",{required:"Project is required"})} >
                  <option value="">Select project</option> 
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </Form.Select>
                {errors.projectId && <small className='text-danger d-block mt-1'>{errors.projectId.message}</small>}
              </Form.Group>
              </Col>
              </Row>
            </Form.Group>
            <Form.Group className='d-flex justify-content-between my-4'>
              <Button type="button" className=' cancelBtn w-25 mt-4 ' onClick={()=>navigate("/dashboard/tasks"  )}>cancel</Button>
               <Button disabled={isSubmitting} type='submit' className='w-25 mt-4 Auth-btn'>
                {isSubmitting ?(
                    <>
                    {id? "update":"Save"}
                    <span className='spinner-border spinner-border-sm ms-2' role='status' aria-hidden='true'/>
                    </>
                  ):id? "update":"save"}
            </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
        
      </Container>
      
    </>
  )
}


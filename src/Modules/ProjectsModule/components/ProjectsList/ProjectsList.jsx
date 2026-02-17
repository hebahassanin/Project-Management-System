import React, { useContext, useEffect, useState } from 'react'
import { Form, Navigate, useNavigate } from 'react-router-dom'
import axiosInstance from '../../../../services/api';
import { PROJECT_URLS, TASKS_URLS } from '../../../../services/api/apiURLs';
import { HiDotsVertical } from 'react-icons/hi';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PiHandEye } from 'react-icons/pi';
import { ModalHeader, Table } from 'react-bootstrap';
import ConfirmationDelete from '../../../Shared/components/ConfirmationDelete/ConfirmationDelete';
import { toast } from 'react-toastify';

import { LuChevronsUpDown } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../../../../context/AuthContext';
import DataTable from 'react-data-table-component';





export default function ProjectsList() {
  const{userData}=useContext(AuthContext);
  const [projectList,setProjectList]=useState([]);
   const [projectId,setProjectId]=useState(0);
    const [projectName,setProjectName]=useState('');

     const navigate= useNavigate();
     ///////search filteration
  const [search,setSearch]=useState('');
  const [loading,setLoading]=useState(false);
  // view modal
  const [title,setTitle]=useState("");
  const[tasksNum,setTasksNum]=useState("");
  const [showView, setShowView] = useState(false);

  // server pagination 
  const [page, setPage] = useState(1);
const [pageSize, setPageSize] = useState(10);
const [total, setTotal] = useState(0);
  // end server pagination
  const handleCloseView = () => setShowView(false);


  const handleShowView = (project) =>{

  setTitle( project?.title);
  setTasksNum(project?.task?.length);




     setShowView(true);
  }
  // end view
    const handelChange=(e)=>{
      setSearch(e.target.value);
    }
    const filterProjects=projectList.filter((project)=>
    project.title.toLowerCase().includes(search.toLowerCase())
    )
//////////////////end filteration
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (project) =>{
    setProjectId(project.id);
    setProjectName(project.title);

     setShow(true);
  }


  console.log("userData",userData);


 const getAllProjectManager=async()=>{

setLoading(true);
  try {
    let response =await axiosInstance.get(PROJECT_URLS.PROJECTS_MANGER,{
       params: {
      pageSize:pageSize,
      pageNumber:page,
    },
    });
    console.log(response.data.data);
    setProjectList(response.data.data);
    setTotal(response?.data?.totalNumberOfRecords)

  }
  catch (error) {
     toast.error(error.response?.data?.message ||  "sorry i cant get any project");

  }
finally{
  setLoading(false);
}

 }
  const getAllProjectEmployee=async()=>{

setLoading(true);
  try {
    let response =await axiosInstance.get(PROJECT_URLS.PROJECTS_EMPLOYEE);
    console.log(response.data.data);
    setProjectList(response.data.data);
    
  }
  catch (error) {
    toast.error(error.response?.data?.message ||  "sorry i cant get any project");

  }
finally{
  setLoading(false);
}


 }



 const deleteProject=async()=>{
  try
  {
       const response=await axiosInstance.delete(PROJECT_URLS.DELETE_PROJECT(projectId));
      console.log(response);
      handleClose();
      toast.success('delete success');
      getAllProjectManager();
  }
  catch(error){
    toast.error(error?.response?.data?.message || "sorry can't  delete this project ")
  }
 


 }


 useEffect(()=>{

  if(!userData?.userGroup)return;
  if(userData?.userGroup=== "Employee"){
    getAllProjectEmployee();
  }else
    {
        getAllProjectManager();
    }

 },[userData,page, pageSize])

  const columns = [
  {
    name: (<># <LuChevronsUpDown /></>),

    selector: row => row.id,
     sortable: true,
  },
  
   {
    name: (<>Title <LuChevronsUpDown /></>),

    selector: row =>row.title,
     sortable: true,
  },
   {
    name: (<>Status <LuChevronsUpDown /></>),

    cell: () => (
      
        <div className='status_style px-2 m-2  rounded rounded-3 text-center'>
            public
        </div>
    )

    ,
    
     sortable: true,
  },
 ...(userData?.userGroup === "Employee"
  ? [{
      name: (<>Modification Date<LuChevronsUpDown /></>),

      selector: row => row.modificationDate ? new Date(row.modificationDate).toLocaleDateString() : '-',
      sortable: true,
    }]
  : []
),


  {
   ...(userData?.userGroup !== "Employee"
    ? [
        {
          name: (<>Num Users<LuChevronsUpDown /></>),

          selector: row => 5,
          sortable: true,
        },
      ]
    : [])
    },
    {
    
     name: (<>Num Tasks<LuChevronsUpDown /></>),

    selector: row => row.task?.length,
     sortable: true,
  },
    {
     name: (<>Date Created<LuChevronsUpDown /></>),

    
    selector: row => row.creationDate ?new Date(row.creationDate).toLocaleDateString('en-GB') : '/',
     sortable: true,
  },
   {
   name: 'Action',
   cell: (row) => (
        <div className="dropdown">
      <span
        data-bs-toggle="dropdown"
        style={{ cursor: "pointer", fontSize: "20px" }}
      >
      <HiDotsVertical  className='icon-color'/>
      </span>

      <ul className="dropdown-menu ">
        <li className="dropdown-item" onClick={()=>handleShowView(row)}> <FaEye  className='icon-color mx-2'/> View</li>
       {userData?.userGroup !="Employee"? <li className="dropdown-item" onClick={()=>navigate(`/dashboard/project-data/${row.id}`)}> <FaRegEdit  className='icon-color mx-2'/>Edit</li>:""}
         {userData?.userGroup !="Employee"?<li className="dropdown-item " onClick={()=>handleShow(row)} > <FaRegTrashAlt  className='icon-color mx-2 text-danger'/>Delete</li>:""}
      </ul>
    </div>
    
   ),
 
 }
 
 ];

 if(loading) return<div className=' d-flex align-items-center justify-content-center vh-100 '>
   <BeatLoader size={20} color='#288131'  />
 </div>
  return (
    <>

    {/* Modal */}
       <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
       <ConfirmationDelete deleteItem={'project '} name={projectName}/>
        <Modal.Footer>
          <Button variant="danger"  onClick={deleteProject}>
            delete
          </Button>

        </Modal.Footer>
      </Modal>
    {/* end modal */}
  <header className='header'>
    <h1 className='title'> Projects</h1>
    {userData?.userGroup !="Employee"?
    <button className='Auth-btn' onClick={()=>navigate('/dashboard/project-data/new_project')}>
    + Add New Project
    </button>:""}
  </header>

{/* /////search */}
<div className='input-group w-25 my-3    border   rounded-5   border_color  overflow-hidden'>
  <span className='input-group-text bg-white border-0'><CiSearch /> </span>
    <input type="text"
placeholder='search by title'
className='form-control  '
value={search}
onChange={handelChange}/>

</div>
{/* /////////////end search */}



  {/* <table className="table table-striped  table-responsive">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title <LuChevronsUpDown /> </th>
      <th scope="col">Statues <LuChevronsUpDown /></th>
      {userData?.userGroup!="Employee"?
      <th scope="col">Num Users <LuChevronsUpDown /></th>
      :""}
           {userData?.userGroup =="Employee"?
<th>modificationDate</th>
  :""}
      <th scope="col">Num Tasks <LuChevronsUpDown /></th>
       <th scope="col">Date Created <LuChevronsUpDown /></th>
        <th scope="col">Action </th>
    </tr>
  </thead>
  <tbody>

    {filterProjects?.map((project)=>(
       <tr key={project.id}>
        <td>{project?.id}</td>
      <td >{project?.title}</td>

      <td>
      {project?.task.map((task)=>(
        // 'status_style px-2 m-2  rounded rounded-3 text-center'
<p className=" status_style px-2 m-2  rounded rounded-3 text-center"

>
  {task.status}
  </p>
      ))}
        </td>
      {userData?.userGroup!="Employee"?
      <td>5</td>:""}
            {userData?.userGroup=="Employee"?
      <td>{project?.modificationDate}</td>:""}
      <td>{project?.task?.length}</td>


      <td>{project.creationDate}</td>
      <td>
                 <div className="dropdown">
      <span
        data-bs-toggle="dropdown"
        style={{ cursor: "pointer", fontSize: "20px" }}
      >
      <HiDotsVertical  className='icon-color'/>
      </span>

      <ul className="dropdown-menu ">
        <li className="dropdown-item" onClick={()=>handleShowView(project)}> <FaEye  className='icon-color mx-2'/> View</li>
       {userData?.userGroup !="Employee"? <li className="dropdown-item" onClick={()=>navigate(`/dashboard/project-data/${project.id}`)}> <FaRegEdit  className='icon-color mx-2'/>Edit</li>:""}
         {userData?.userGroup !="Employee"?<li className="dropdown-item " onClick={()=>handleShow(project)} > <FaRegTrashAlt  className='icon-color mx-2 text-danger'/>Delete</li>:""}
      </ul>
    </div>
      </td>




    </tr>
    ))}




  </tbody>
</table> */}

 <DataTable
            columns={columns}
            data={filterProjects}
             pagination
          paginationServer

          paginationTotalRows={total}

          paginationDefaultPage={page}
          paginationPerPage={pageSize}

          onChangePage={(page) => setPage(page)}
          onChangeRowsPerPage={(size) => {
            setPageSize(size);
            setPage(page); }}
              customStyles={{
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "400",
        
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        fontWeight: "400",
      },
    },
  }}
            
          /> 



<Modal show={showView} onHide={handleCloseView} className='view_modal'>
        <Modal.Header closeButton>
          <Modal.Title  className='model_style'>Project Details</Modal.Title>
        </Modal.Header>
            <h6 className='p-2'>project title: {title}</h6>
            <h6 className='p-2'>tasksNum: {tasksNum}</h6>
            <h6 className='p-2'>Status:   {'public'}</h6>
        <Modal.Footer>


        </Modal.Footer>
</Modal>


    </>
  )
}

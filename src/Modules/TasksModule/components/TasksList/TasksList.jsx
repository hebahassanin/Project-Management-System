import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { LuChevronsUpDown } from "react-icons/lu";
import { FaEdit, FaEye } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { DndContext } from "@dnd-kit/core";

import useTasks from '../../../../hooks/useTasks';
import DropdownButton from '../../../../components/DropdownButton/DropdownButton';
import Confirmation from '../../../../components/Confirmation/Confirmation';
import Search from '../../../../components/Search/Search';
import DataTable from 'react-data-table-component';
import { BeatLoader } from 'react-spinners';

import { AuthContext } from '../../../../context/AuthContext';
import TaskColumn from "../TaskColumn/TaskColumn";
import styles from "./TasksList.module.css";

export default function TasksList() {
  const navigate = useNavigate();
  const { tasks,changeStatus, loading, page, setPage, total, pageSize, setPageSize,
     fetchTasks, fetchUserTasks, deleteTask, updateTask, searchTerm, setSearchTerm,
     initialLoading, tableLoading } = useTasks();
  const { userData } = useContext(AuthContext);

  // State for delete confirmation modal
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);

  // State for view task
  const [showView, setShowView] = useState(false);
  const [viewTask, setViewTask] = useState(null);

  // State for storing tasks in board view
  const [boardTasks, setBoardTasks] = useState([]);

  const column = [
    
        { name: <>Title<LuChevronsUpDown /></>, selector: row => row.title, sortable: true },
        {
        name: <>Status <LuChevronsUpDown /></>,
        cell: row => (
        <span
        className={`badge ${
          row.status === "ToDo"
            ? "bg-notActive"
            : row.status === "InProgress"
            ? "bg-progress"
            : "bg-active"
        } text-white px-3 py-2 fsize`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
        { name: <>User<LuChevronsUpDown /></>, selector: row => row.employee.userName, sortable: true },
        { name: <>Project<LuChevronsUpDown /></>, selector: row => row.project.title, sortable: true },
        { name: <>Date<LuChevronsUpDown /></>, selector: row => row.creationDate ? new Date(row.creationDate).toLocaleDateString() : '-', sortable: true },
        {
          name: 'Action',
          cell: row => (
            <DropdownButton
              actions={{
                view: { label: "View", icon: <FaEye color="#009247" />, onClick: () => handleView(row) },
                edit: { label: "Edit", icon: <FaEdit color="#ef9b28" />, onClick: () => navigate(`/dashboard/tasks-data/${row.id}`) },
                delete: { label: "Delete", icon: <RiDeleteBin6Line color="red" />, onClick: () => openConfirmationModal(row.id, row.title), class: "text-danger" }
              }}
            />
          ),
        }
      ]


  const STATUS_ORDER = ["ToDo", "InProgress", "Done"];
  const role = userData?.userGroup;

  useEffect(() => {
    const loadTasks = async()=>{
         if (!role) return;
          if (role === "Manager")await fetchTasks();
          else await fetchUserTasks();
    }
   loadTasks()
  }, [role, page, pageSize]);

  // in server to avoid too many request when user write in search input
  useEffect(() => {
  const delay = setTimeout(() => {
    setPage(1);
    fetchTasks();
  }, 500);

  return () => clearTimeout(delay);
}, [searchTerm]);

 
  useEffect(() => {
    if (role !=="Manager") setBoardTasks(tasks);

  }, [tasks]);

  // Model to confirm delete task
  const openConfirmationModal = (id, name) => {
    setSelectedId(id);
    setSelectedName(name);
    setShowModal(true);
  };
  const closeDeleteModal = () => {
    setShowModal(false);
    setSelectedId(null);
    setSelectedName(null);
  };

  // Model to view task details
  const handleView = (task) => {
    setViewTask(task);
    setShowView(true);
  };
  const handleCloseView = () => setShowView(false);


 const groupedTasks = boardTasks.reduce((acc, task) => {
    const status = task.status;
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});
 const handleDragEnd = async (event) => {
  const { active, over } = event;
  if (!over) return;

  const taskId = active.id;
  const newStatus = over.id;

  // Optimistic UI
  setBoardTasks(prev =>
    prev.map(task =>
      task.id === taskId
        ? { ...task, status: newStatus }
        : task
    )
  );

  try {
    await changeStatus(taskId, { status: newStatus });
  } catch (err) {
    console.error(err);
  }
};

//search 
// const filteredTasks = searchTerm
//   ? tasks.filter(task =>
//       task.title.toLowerCase().includes(searchTerm.toLowerCase())
     
//     )
//   : tasks;



  if (initialLoading) return <div className='d-flex align-items-center justify-content-center vh-100'><BeatLoader size={30} color='#288131' margin={10} /></div>;

  return (
    <>
      <header className='bgOverlayDark container-fluid m-0 px-2 py-3'>
        <div className="container d-flex justify-content-between align-items-center">
          {role === "Manager" ?
            <>
              <h1 className='title'>Tasks</h1>
              <button className='Auth-btn' onClick={() => navigate("/dashboard/tasks-data")}>+ Add New Task</button>
            </> :
            <h1 className='title'>Tasks Board</h1>
          }
        </div>
      </header>

      {role === "Manager" ? (
        <>
          <Search placeholder='search tasks by title' onSearch={(value)=>
          {
            setSearchTerm(value);
            setPage(1);
          }} />
          <DataTable
            columns={column}
            data={tasks}
            pagination
            paginationServer
            paginationTotalRows={total}
            paginationDefaultPage={page}
            paginationPerPage={pageSize}
            onChangePage={setPage}
            onChangeRowsPerPage={(size) => { setPageSize(size); setPage(page); }}
            progressPending={tableLoading}
            progressComponent={
            <div className='py-5'><BeatLoader size={30} color='#288131' margin={10} /></div>}
          />
        </>
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <Container>
            <Row className='g-5 my-2'>
              {STATUS_ORDER.map(status => (
                <TaskColumn key={status} status={status} tasks={groupedTasks[status] || []} />
              ))}
            </Row>
          </Container>
        </DndContext>
      )}

      <Confirmation
        show={showModal}
        title={'Task'}
        message={`Are you sure you want to delete the task ${selectedName} ?`}
        onClose={() => setShowModal(false)}
        onConfirm={() => { 
          deleteTask(selectedId); 
          closeDeleteModal(); 
        }}
      />

      <Modal show={showView} onHide={handleCloseView} className='view_modal' centered>
        <Modal.Header closeButton>
          <Modal.Title className='model_style'>Task Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className='p-2'><span className='fw-bold'>Task Title:</span> {viewTask?.title}</h6>
          <h6 className='px-2'> <span className='fw-bold'>Task Status:</span> 
            <span  className={`p-2 d-inline-block rounded-3 text-white mx-2 ${
                viewTask?.status === "ToDo"
                  ? "bg-notActive"
                  : viewTask?.status === "InProgress"
                  ? "bg-progress"
                  : "bg-active"
              }`}>
                {viewTask?.status}
            </span>
             
          </h6>
          <h6 className='p-2'><span className='fw-bold'>Task User:</span> {viewTask?.employee.userName}</h6>
          <h6 className='p-2'><span className='fw-bold'>Task Project:</span> {viewTask?.project.title}</h6>
        </Modal.Body>
      </Modal>
     

    </>
  );
}

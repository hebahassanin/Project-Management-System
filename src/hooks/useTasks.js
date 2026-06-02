import React, {  useContext, useState } from 'react'
import axiosInstance from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TASKS_URLS } from '../services/api/apiURLs';


const useTasks = () => {
    console.log("useTasks Hook Initialized");
    const [tasks,setTasks] = useState([]);
    // const [organicTasks,setOrganicTasks] = useState([]);

    const[singleTask,setSingleTask]=useState()
    const [loading,setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(false);
    const [error,setError] = useState(null);
    const[taskById,setTaskById]=useState(null)

    //  start server pagination 
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    //  end server pagination 
   
    let navigate = useNavigate();

    // State for search
   const [searchTerm, setSearchTerm] = useState('');

    // get all tasks assigned to employees for manager(display tasks to manager)
    const fetchTasks = async () => {
        console.log("fetchTasks")
        if (initialLoading) {
            setInitialLoading(true);
            } else {
            setTableLoading(true);
        }
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_ALL_MY_TASKS_FOR_MANAGER,
            {params:{
                pageSize:pageSize,
                pageNumber:page,
                title:searchTerm
            }});
            console.log(response?.data?.data);
            setTasks(response?.data?.data);

            setTotal(response?.data?.totalNumberOfRecords);
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't  loaded tasks now")
        } finally {
            setTableLoading(false);
            setInitialLoading(false);
        }
    }

    // get all tasks assigned to employees from manager (display tasks to employee)
    const fetchUserTasks = async () => {
        setLoading(true);
        try {
            console.log("hena el moshkela")
            const response = await axiosInstance.get(TASKS_URLS.GET_ALL_MY_ASIGGNED_TASK);
           console.log("hena el moshkela")
            console.log(response?.data?.data);
            setTasks(response?.data?.data);
            // setOrganicTasks(response?.data?.data)
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't  loaded tasks now")
        } finally {
            setLoading(false);
        }
    }

    // get task by id
     const fetchOneTaskById = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(TASKS_URLS.GET_TASK_BY_ID(id));
            console.log(response?.data);
            setSingleTask(response?.data);
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't get this task")
        } finally {
            setLoading(false);
        }
    }

    // delete task
     const deleteTask = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`${TASKS_URLS.DELETE_TASK(id)}`);
            console.log("task deleted");

            // remove the deleted task from the tasks state instead of refetching all tasks
            setTasks(tasks.filter(task => task.id !== id));
            setTotal(total-1)
            toast.success("Task deleted successfully",{ autoClose: 3000 });
        
        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't delete this task");
        } finally {
            setLoading(false);
        }
    }
    const getErrorMessage = (err, fallback) =>
   toast.error(err?.response?.data?.message || fallback);

    // add task
    const addTask = async (data) => {
        setLoading(true);
        
        try {
        let response =  await axiosInstance.post(TASKS_URLS.CREATE_TASK,data);
        console.log(response,"resssss")
        await fetchTasks(); 
        toast.success("Task added successfully",{ autoClose: 3000 });
        navigate("/dashboard/tasks");
    } catch (err) {
        setError(err);
        getErrorMessage(err, "sorry! can't add this task");
        toast.error("Failed to add task", { autoClose: 3000 });
    } finally {
        setLoading(false);
    }
    };

    // update task
     const updateTask = async (id,data) => {
        // setLoading(true);
        console.log(data,"update test")
        try {
            const response = await axiosInstance.put(`${TASKS_URLS.UPDATE_TASK(id)}`,data);
            console.log("task updated");

            setTasks(prevTasks =>
                    prevTasks.map(task =>
                        task.id === id ? response.data : task
                    )
              );
             navigate("/dashboard/tasks");

            toast.success("Task updated successfully",{ autoClose: 3000 });

        } catch (err) {
            setError(err);
            getErrorMessage(err,"sorry! can't update this task");
            toast.error("Failed to update task", { autoClose: 3000 });

        } finally {
            setLoading(false);
        }
    }

    const changeStatus = async (id,status) =>{
        try {
            await axiosInstance.put(`${TASKS_URLS.CHANGE_STATUS(id)}`,status)

        } catch (error) {
            getErrorMessage(error,"sorry! can't update this task status now")

        }
    }

   
   

  
   return {tasks,total,searchTerm,setSearchTerm,changeStatus,setTotal,
    setTasks,page,setPage,pageSize,setPageSize,loading,error,fetchTasks,
    deleteTask,addTask,taskById,fetchOneTaskById,singleTask,updateTask,
    fetchUserTasks, initialLoading, tableLoading};
}

export default useTasks;

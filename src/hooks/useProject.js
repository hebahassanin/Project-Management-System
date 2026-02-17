
import React, {  useState } from 'react'
import { PROJECT_URLS, TASKS_URLS } from '../services/api/apiURLs';
import axiosInstance from '../services/api';

const useProjects = () => {
    console.log("useProjects Hook Initialized");
    const [projects,setProjects] = useState([]);      
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const fetchProjects = async () => {
        console.log("fetchProjects Called");
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${PROJECT_URLS.PROJECTS_MANGER}`);
            console.log(response?.data?.data);
            setProjects(response?.data?.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }   
    }
    return {projects,loading,error,fetchProjects};
}
export default useProjects;

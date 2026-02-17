export const baseURL=`https://upskilling-egypt.com:3003/api/v1`;
export const imgBaseURL='https://upskilling-egypt.com:3003';


export const USER_URLS={
     LOGIN:`/Users/Login`,
     REGISTER:`/Users/Register`,
     RESET_REQUEST:`/Users/Reset/Request`,
     CHANGE_PASSWORD:`/Users/ChangePassword`,
     VERIFY:`/Users/verify`,
     RESET:`/Users/Reset`,
     GET_CURRENT_USER:`/Users/currentUser`,
     CREATE_AN_MANAGER:`/Users/Create`,
     GET_USER_BYID:(userId)=>`/Users/${userId}`,
     TOGGLE_ACTIVATED_EMPLOYEE:(userId)=>`/Users/${userId}`,
     GET_USERS_COUNT_BY_MANAGER:`/Users/count`,
     GET_USERS_BY_MANAGER:`/Users/Manager`,
     GET_FILTER_USERS_LOGGED_IN_USER:`/Users/`,
     UPDATE_MY_CURRENT_PROFILE:`/Users/`,
     GET_CURRENT_USER:`/Users/currentUser`,
     // GET_ALLUSERS_Users:`/Users/Manager`,
      TOGGLE_USER:`/Users`,
     // GET_USER_BY_ID: "/Users",
     // GET_USER_COINT:`/Users/count`


}
export const PROJECT_URLS={
    GET_ALL_PROJECTS:`/project/`,
    CREATE_PROJECT:`/project`,
   GET_PROJECT:(projectId)=>`/Project/${projectId}`,
   UPDATE_PROJECT: (projectId)=>`/Project/${projectId}`,
   DELETE_PROJECT: (projectId)=>`/Project/${projectId}`,
   PROJECTS_MANGER:`/Project/manager`,
   PROJECTS_EMPLOYEE:`/Project/employee`,


}
export const TASKS_URLS={

     CREATE_TASK:`/Task`,
     GET_ALL_MY_ASIGGNED_TASK:`/Task`,
     GET_ALL_MY_TASKS_FOR_MANAGER:`/Task/manager`,
     GET_TASK_BY_ID:(taskId)=>`/Task/${taskId}`,
     UPDATE_TASK: (taskId)=>`/Task/${taskId}`,
     DELETE_TASK: (taskId)=>`/Task/${taskId}`,
     CONUT_TASKS_FOR_MANAGER_EMPLOYEE:`/Task/count`,
     CHANGE_STATUS:(taskId)=>`/Task/${taskId}/change-status`,
     GET_ALLTASKS_IN_PROJECT:(projectId)=>`/Task/project/${projectId}`

}


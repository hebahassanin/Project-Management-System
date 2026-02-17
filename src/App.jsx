
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from './Modules/Shared/components/AuthLayout/AuthLayout';
import NotFound from './Modules/Shared/components/NotFound/NotFound';
import Login from './Modules/AuthModule/Components/Login/Login';
import Register from './Modules/AuthModule/Components/Register/Register';
import ForgetPassword from './Modules/AuthModule/Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Modules/AuthModule/Components/ResetPassword/ResetPassword';
import ChangePassword from './Modules/AuthModule/Components/ChangePassword/ChangePassword';
import Verify from './Modules/AuthModule/Components/Verify/Verify';
import { ToastContainer } from 'react-toastify';
import MasterLayout from './Modules/Shared/components/MasterLayout/MasterLayout';
import Dashboard from './Modules/DashboardModule/components/Dashboard/Dashboard';
import ProtectedRoute from './Modules/Shared/components/ProtectedRoute/ProtectedRoute';
import UsersList from './Modules/UsersModule/components/UsersList/UsersList';
import TasksData from './Modules/TasksModule/components/TasksData/TasksData';
import TasksList from './Modules/TasksModule/components/TasksList/TasksList';
import ProjectData from './Modules/ProjectsModule/components/ProjectData/ProjectData';
import ProjectsList from './Modules/ProjectsModule/components/ProjectsList/ProjectsList';
import Profile from './Modules/Shared/components/Pofile/Profile';
// import {DndContext} from '@dnd-kit/core';

// import {Droppable} from './Droppable';
// import {Draggable} from './Draggable';

function App() {

  const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-pass",element:<ForgetPassword/>},
          {path:"reset-pass",element:<ResetPassword/>},
          {path:"verify-account",element:<Verify/>},
          {path:"change-pass",element:<ChangePassword/>}
        ]
      },
      {
        path:"dashboard",
        element:<ProtectedRoute><MasterLayout/></ProtectedRoute>,
        errorElement:<NotFound/>,
        children:[
          {index:true, element:<Dashboard/>},
          {path:"home", element:<Dashboard/>},
          {path:"projects", element:<ProjectsList/>},
          {path:"project-data/new_project", element:<ProjectData/>},
           {path:"project-data/:id?",element:<ProjectData/>},
          {path:"tasks", element:<TasksList/>},
          {path:"tasks-data/:id?", element:<TasksData/>},
          {path:"users", element:<UsersList/>},
          {path:"profile", element:<Profile/>}
        ]
      },


    ]
  )
  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    <ToastContainer/>
     
    </>
  )
}

export default App

import React from 'react'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ImUsers } from "react-icons/im";
import { RiQrCodeFill } from "react-icons/ri";
import { FaListCheck } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import useLogout from '../../../../hooks/useLogout';
import { FaUnlockAlt } from "react-icons/fa";

export default function SideBar({collapsed, setCollapsed}) {
  const{logoutUser, userData}=useContext(AuthContext);
 
  // use logout hook to logout from your account
  const logout = useLogout();

  // add active to sidebar links
  const {pathname}=useLocation();

  return (
    <>
     <div className={`sidebar-container ${collapsed ? 'collapsed' : 'expanded'}`}>
       
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
        <Sidebar collapsed={collapsed}>
          <Menu>
            <MenuItem component={<Link to="/dashboard"/>} icon={<MdHome size={20}/>} className={`${pathname==='/dashboard'? 'active':null}`}>Home</MenuItem>

            {userData?.userGroup != "Employee" ?(
              <MenuItem component={<Link to="/dashboard/users"/>} 
              icon={<ImUsers size={20}/>}  
              className={`${pathname==='/dashboard/users'? 'active':null}`}>
                Users
                </MenuItem>

            ) : ""}
            
            <MenuItem component={<Link to="/dashboard/projects"/>} icon={<RiQrCodeFill size={20}/>}  className={`${pathname==='/dashboard/projects'? 'active':null}`}>Projects</MenuItem>
            <MenuItem component={<Link to="/dashboard/tasks"/>} icon={<FaListCheck size={20}/>}  className={`${pathname==='/dashboard/tasks'? 'active':null}`}>Tasks</MenuItem>
            <MenuItem component={<Link to="/change-pass"/>} icon={<FaUnlockAlt />}  className={`${pathname==='/change-pass'? 'active':null}`}>Change Password</MenuItem>
            <MenuItem onClick={logout}  icon={<BiLogOut size="23"/>} >LogOut</MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </>
  )
}

import React from 'react'
import logo from '../../../../assets/images/Navbar/logoNavbar.png';
import { FaBell } from "react-icons/fa";
import profileImg from '../../../../assets/images/Profile/profilePhoto.png';
import { useContext } from 'react';
import {AuthContext} from '../../../../context/AuthContext';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { RiProfileFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLogout from '../../../../hooks/useLogout';
import styles from './NavBar.module.css';
import { ThemeContext } from '../../../../context/ThemeContext';
import { FaMoon, FaSun } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar({setCollapsed, collapsed}) {
  const {userData}= useContext(AuthContext);
  const{theme, toggleTheme} = useContext(ThemeContext);

  const [menuOpen, setMenuOpen] = useState(false);

  // use logout hook to logout from your account
  const logout = useLogout();
  
  return (
    <div className={`${styles.navbarNormal} navbar-normal bgNavbar d-flex justify-content-between p-2`}>

    <button 
      className={`${styles.mobileMenuBtn} me-2`}
      onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <FiMenu size={24}/> : <FiX size={24}/>}
    </button>
      <div>
        <img src={logo} alt="img"/>
      </div>

      <div className='d-flex align-items-center ps-3'>
        <button onClick={toggleTheme} className='theme-btn'>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        <FaBell className='textHeader me-3' size={20}/>
        <div className= {`${styles.headerDivider} px-3`}>
          <button className={`${styles.userMenuBtn} btn d-flex align-items-center p-0 `} 
            data-bs-toggle="dropdown" aria-expanded="false" onClick={()=> setMenuOpen(!menuOpen)}>
            <img src={profileImg} style={{width:"50px"}} alt="profileimg" className='me-2'/>
            <div className='d-flex flex-column text-start textDark'>
             <span className='fw-bold me-2 t'>{userData?.userName}</span>
             <span className='me-2'>{userData?.userEmail}</span>
            </div>
            
            {menuOpen ? <BsChevronUp /> : <BsChevronDown />}
          </button>
          <ul className="dropdown-menu dropdown-menu-end mt-2 p-2">
            <li>
              <Link className="dropdown-item" to="/dashboard/profile">
               <RiProfileFill  color='#ef9b28' size="23"/> Profile
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <button className="dropdown-item" onClick={logout}>
              <BiLogOut  color='#ef9b28' size="23"/> Logout
              </button>
            </li>
          </ul>
        </div>
       </div>
      
    </div>
  )
}

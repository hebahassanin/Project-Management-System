import React, { useState } from 'react'
import { Outlet} from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../NavBar/NavBar';
import SideBar from '../../../Shared/components/SideBar/SideBar';
import useIsMobile from '../../../../hooks/useIsMobile';
import { useEffect } from 'react';


export default function MasterLayout() {
  const [collapsed, setCollapsed]= useState(false);

  const isMobile = useIsMobile();

 // in case mobile: sidebar closed
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  return (

    <>
      {/* Navbar */}
       <NavBar setCollapsed={setCollapsed} collapsed={collapsed}/>
      {/* Sidebar */}
        <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
       
       {/* Main Content */}
      <div className={`main-content ${collapsed ? 'collapsed' :""}`}>
       <Outlet/>
       </div>
     
    </>

  )
}
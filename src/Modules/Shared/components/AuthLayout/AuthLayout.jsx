import React from 'react'
import { Outlet, useLocation } from "react-router-dom";
import loginImg1 from "../../../../assets/images/login-1.png";
import loginImg2 from "../../../../assets/images/login-2.png";
import forgetImg1 from "../../../../assets/images/forget-1.png";
import forgetImg2 from "../../../../assets/images/forget-2.png";
import resetImg1 from "../../../../assets/images/reset-1.png";
import resetImg2 from "../../../../assets/images/reset-2.png";
import changeImg1 from "../../../../assets/images/change-1.png";
import changeImg2 from "../../../../assets/images/change-2.png";
import logo from "../../../../assets/images/logo.png";
import styles from "./AuthLayout.module.css";
import { Container, Row ,Col} from 'react-bootstrap';

export default function AuthLayout() {
   const { pathname } = useLocation();

   const imagesMap = {
      login: { img1: loginImg1, img2: loginImg2 },
      forget: { img1: forgetImg1, img2: forgetImg2 },
      reset: { img1: resetImg1, img2: resetImg2 },
      change: { img1: changeImg1, img2: changeImg2 },
   };

   const page =
      pathname.includes("forget")
         ? "forget"
         : pathname.includes("reset") || pathname.includes("register")
         ? "reset"
         : pathname.includes("change") || pathname.includes("verify")
         ? "change"
         : "login";

   const images = imagesMap[page];


   return (
     <Container fluid className={`${styles.authLayout} authOverlay `}>
      {/* الصور الخلفية */}
      <img src={images.img1} alt="auth visual 1" className={styles.position_img1_authLayout} />
       <img src={images.img2} alt="auth visual 2" className={styles.position_img2_authLayout} />

      {/* wrapper content */}

      <Row className={` ${styles.content_authLayout} d-flex  justify-content-center align-items-center flex-column `}>
         <img src={logo} alt="" className='w-25 mb-3' />
          <Outlet />

      </Row>
    </Container>
   )
}

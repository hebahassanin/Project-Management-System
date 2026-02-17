import React, { useContext } from 'react'
import profileImg from '../../../../assets/images/Profile/profilePhoto.png'
import { AuthContext } from '../../../../context/AuthContext';

export default function Profile() {
    const{userData} =useContext(AuthContext);
  return (
    <>
        <div className='d-flex justify-content-center my-3'>
            <div className='bgOverlayDark profile  px-4 py-5 col-12 col-sm-10 col-md-8 col-lg-8'>
                <div className='textDark d-flex flex-column justify-content-center align-items-center mb-3'>
                    <img src={profileImg} className="imgPorfile" alt="profileImage"/>
                    <h4 className='mt-4 fw-bold'>{userData?.userName}</h4>
                    <h4 className='profile-role'>{userData?.userGroup}</h4>
                </div>

                <p className='mb-2 textDark'><strong>Email:</strong> {userData?.userEmail}</p>
                <p className='mb-2 textDark'><strong>User Group:</strong> {userData?.userGroup}</p>
                <p className='textDark'><strong>User ID:</strong> {userData?.userId}</p>
            </div>
        </div>  
    </>
  )
}

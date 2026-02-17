import React from 'react'
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useLogout() {
    const {logoutUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of your account.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef9b28',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            logoutUser();
           

            toast.success("You have been successfully logged out!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: ()=> navigate('/login')
              });
           
          }
        });
    };
  
    return logout;
}

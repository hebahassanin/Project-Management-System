import React from 'react'
import Swal from 'sweetalert2';

export default function Confirmation(
    {
  show,
  onConfirm,
  task ,
}

) 

{
      if (!show){
        return null
      } 
      else{
        
                Swal.fire({
            title: `Do you want to delete this  ${task }</span>`,
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: "#d33",
            denyButtonText: `Cancel`
            }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
                Swal.fire("Deleted!", "", "success");
                show = false;
                

            //   } else if (result.isDenied) {
            //     Swal.fire("Changes are not saved", "", "info");
            }
            });

      }
  

  return (
    <>
       
      
    </>
  )
}

import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function ConfirmationDelete({deleteItem,name}) {

  return (
    <>
 <div className=' p-4'>
      {/* <img src={confirmImg} className="w-25 h-25"/> */}
         <h3 className='my-2'>Delete This {deleteItem} {name} ?</h3>
          <p>are you sure you want to delete this  ? </p>
    </div>
    </>
  )
}

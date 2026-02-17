import React from 'react'

export default function TaskCard({task}) {
  return (
    <>
       <div className="task-card">
            <h5>{task.title}</h5>
            <p className=''>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
    </div>
    </>
  )
}


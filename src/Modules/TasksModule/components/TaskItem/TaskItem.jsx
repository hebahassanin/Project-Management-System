import React from 'react'
import { useDraggable } from "@dnd-kit/core";
// import styles from "./Tasks.module.css";

const TaskItem = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });
    const style = {
        transform : transform ? 
       
    `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    }
    return (
    <div
      ref={setNodeRef}
      className="taskElement"
      style={style}
      {...listeners}
      {...attributes}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;
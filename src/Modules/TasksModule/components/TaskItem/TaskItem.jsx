import React from 'react'
import { useDraggable } from "@dnd-kit/core";
// import styles from "./Tasks.module.css";

// TaskItem component represents an individual task that can be dragged and dropped between columns
// this component is to drag items from one column to another.
// here we are use drag and in taskColumn we are use drop .
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
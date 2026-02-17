import React from 'react';
import { useDroppable } from "@dnd-kit/core";
import TaskItem from "../TaskItem/TaskItem";
import {Col} from 'react-bootstrap';

// import styles from "./Tasks.module.css";

const TaskColumn = ({ status, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  
  return (
    <Col lg={4} md={6} sm={12} className="g-4 my-3">
    <div className="columnContainer" >
      <h3 className="boxHeader">{status}</h3>
      <div
        ref={setNodeRef}
        className="boxTasks"
        // style={{ background: isOver ? "#e3f2fd" : "#f4f4f4", minHeight: 400, padding: 10, borderRadius: 8 }}
      >
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
    </Col>
  );
};

export default TaskColumn;

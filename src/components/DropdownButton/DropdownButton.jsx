import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DropdownButton({ actions }) {
  return (
    <Dropdown align="end" className="dropdown">
      <Dropdown.Toggle
        as="span"
        // className="d-inline-block  "
        style={{ cursor: "pointer", fontSize: "20px" }}
         
      >
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <div className="arrow"></div>
        {Object.entries(actions).map(([key, action]) => (
          <Dropdown.Item
            key={key}
            className={`dropdown-item ${action.className || ""}`}
            onClick={action.onClick}
          >
            {action.icon}
            <span className="ms-2">{action.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

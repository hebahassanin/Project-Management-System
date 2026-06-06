# Project Management System

A role-based Project Management System that enables managers to manage projects, assign tasks, monitor employees, and track progress through interactive dashboards. Employees can organize their assigned tasks using a drag-and-drop Kanban board with real-time status updates and workflow management.

## Live Demo
🔗 Live Demo: https://project-management-system-omega-five.vercel.app/

## Repository
🔗 GitHub Repository: https://github.com/hebahassanin/Project-Management-System

## Features
### Authentication & Authorization
 - Complete Authentication Flow including Login, Registration, Email Verification, Forget/Reset Password,
   and Change Password.
 - Form handling and validation using React Hook Form with API integration.
 - Protected Routes for secure navigation and access control.
 - Role-Based Access Control (Manager & Employee)

### Manager Features
 - Full CRUD operations for Projects and Tasks (Create, Read, Update, Delete).
 - Assign and manage tasks for employees.
 - View and manage users assigned to the manager only.
 - Update user status (Active / Inactive).
 - Block / Unblock users (UI-based functionality).
 - Dashboard analytics showing:
   - Tasks distribution (To Do / In Progress / Done).
   - Users status distribution (Active / Inactive).
 - Visual charts using Doughnut charts for tasks and users statistics.

### Employee Features
 - View assigned projects and tasks.
 - Manage tasks using a Kanban board.
 - Drag & drop tasks between To Do, In Progress, and Done.
 - Real-time task status updates.

### UI & UX
 - Responsive design for desktop, tablet, and mobile devices.
 - Light / Dark mode using Context API.
 - Reusable components for better maintainability.
 - Custom hooks for reusable logic.
 - Responsive Sidebar & Navbar navigation.
 - Profile page.
 - Logout confirmation using SweetAlert2.

## Technologies Used
 - React.js
 - React Router DOM
 - React Hook Form
 - Context API
 - Axios
 - REST APIs
 - JWT Decode
 - React Bootstrap
 - React Pro Sidebar
 - DnD Kit
 - React Chartjs 2
 - Chart.js
 - React Toastify
 - SweetAlert2
 - React Icons
 - React Spinners

## Demo Credentials
### Manager Account
Email: hebahassanin20@gmail.com
Password: @123Demo

### Employee Account
Create a new account using the registration page.

## My Contributions
As a Frontend Developer in this team project, I contributed to:

### Sprint 1
 - Developed Login functionality using React Hook Form.
 - Implemented form validation and authentication API integration.
 - Configured application routing using React Router DOM.
 - Created Protected Routes.
 - Managed authentication state using Context API.
 - Built reusable authentication components including AuthHeader and form inputs.

### Sprint 2
 - Developed responsive Sidebar and Navbar components.
 - Built Profile page functionality.
 - Implemented Logout functionality using SweetAlert2.
 - Created custom hooks for reusable logic.
 - Implemented responsive sidebar behavior using React Pro Sidebar.

### Sprint 3
 - Implemented Light / Dark Mode using Context API.
 - Managed global theme state across the application.
 - Customized Employee Sidebar visibility based on user roles and permissions.

## Installation
 - git clone https://github.com/hebahassanin/Project-Management-System.git
 - npm install
 - npm run dev

## Team Project
This project was developed as part of a team collaboration using Agile methodology and sprint-based development.


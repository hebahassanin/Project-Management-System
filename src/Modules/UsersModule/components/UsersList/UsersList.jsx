import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import axiosInstance from '../../../../services/api';
import { AuthContext } from '../../../../context/AuthContext';
import { baseURL, USER_URLS } from '../../../../services/api/apiURLs';
import NoData from '../../../Shared/components/NoData/NoData';
import { LuChevronsUpDown  } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Search from '../../../../components/Search/Search';
import DataTable from 'react-data-table-component';
import { BeatLoader } from 'react-spinners';
import { IoMdArrowDropup } from 'react-icons/io';


export default function UsersList() {
  const [usersList, setUsersList] = useState([])
  const { userData } = useContext(AuthContext);

  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUser, setShowUser] = useState(false);

  const [blockedUIUsers, setBlockedUIUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // server pagination 
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [total, setTotal] = useState(0);
  // end server pagination

const[loading,setLoading]=useState(false);

// get all users for manager
const getAllUsers = async () => {
  setLoading(true)
    try {
      let response = await axiosInstance.get(USER_URLS.GET_USERS_BY_MANAGER,{
         params: {
          pageSize:pageSize,
          pageNumber:page,
    },
      })
      console.log(response?.data?.data);
      setUsersList(response?.data?.data);
      setTotal(response?.data?.totalNumberOfRecords);

    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching users", 
        { autoClose: 3000 });
    }
    finally{
      setLoading(false)
    }

  }


//   const toggleUserStatus = async (id) => {
//   try {
//     await axiosInstance.put(
//       `${USER_URLS.TOGGLE_USER}/${id}`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     toast.success("User status updated successfully");

//   } catch (error) {
//     toast.error(error.response?.data?.message || "Error updating status",
//       { autoClose: 3000 }
//     );
//   }
// };

const toggleUserStatus = async (id) => {
  // 1️⃣ update UI immediately
  setUsersList(prev =>
    prev.map(user =>
      user.id === id
        ? { ...user, isActivated: !user.isActivated }
        : user
    )
  );

  try {
    await axiosInstance.put(
      `${USER_URLS.TOGGLE_USER}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success("User status updated successfully", { autoClose: 3000 });

  } catch (error) {
    // 2️⃣ rollback لو فشل
    // return ui to previous state because the backend update failed
    setUsersList(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, isActivated: !user.isActivated }
          : user
      )
    );

    toast.error(error.response?.data?.message || "Error updating status");
  }
};

// view user details 
const viewUser = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `${USER_URLS.GET_USER_BYID(userId)}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setSelectedUser(response?.data);
    setShowUser(true);
  } catch (error) {
    toast.error("Failed to load user data", { autoClose: 3000 });
  }
};

// toggle block/unblock user in UI without affecting backend status
const toggleBlockUI = (id) => {
  const isBlocked = blockedUIUsers.includes(id);
  setBlockedUIUsers(prev =>
    isBlocked
      ? prev.filter(userId => userId !== id)
      : [...prev, id]
  );

  toast.success(
    isBlocked
    ? "User unblocked successfully"
    : "User blocked successfully",
    { autoClose: 3000 }
  );
};

 useEffect(() => {
 if (userData?.userGroup== "Manager"){
 getAllUsers();
 }

}, [userData,page, pageSize]);

const filteredUsers = searchTerm
  ? usersList.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
     
    )
  : usersList;


  const columns = [
    {
      name: (<>User Name <LuChevronsUpDown /></>),
      selector: row => row.userName,
      sortable: true,
    },
    {
     name: (<>Status <LuChevronsUpDown /></>),
    selector: row => row.status,  
    cell: (row) => (
     <button
      className={`status text-white px-4 py-2 ${
      blockedUIUsers.includes(row.id)
      ? "inactive"
      : row.isActivated
      ? "active"
      : "inactive"
  }`}
    disabled={blockedUIUsers.includes(row.id)}
    onClick={() => {
    if (!blockedUIUsers.includes(row.id)) {
      toggleUserStatus(row.id); 
    }
  }}>
   {blockedUIUsers.includes(row.id)
    ? "Blocked"
    : row.isActivated
    ? "Active"
    : "Not Active"}
  </button>
    ),
    sortable: true,
  },
  
    {
      name: (<>Phone Number <LuChevronsUpDown /></>),
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: (<>Email<LuChevronsUpDown /></>),
      selector: row => row.email,
      sortable: true,
    },
      {
      name: (<>Date Created <LuChevronsUpDown /></>),
      selector: row => row.task[0].creationDate ?  new Date(row.task[0].creationDate).toLocaleDateString() : '-',
      sortable: true,
    },
    {
    name: 'Action',
    cell: (row) => (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        className="border-0 shadow-none p-0"
        style={{ background: "transparent" }}>
        <HiOutlineDotsVertical size={22} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="py-1">
        <Dropdown.Item
          className="d-flex align-items-center"
          onClick={() => toggleBlockUI(row.id)}>
          {blockedUIUsers.includes(row.id) ? "Unblock" : "Block"}
        </Dropdown.Item>

        <Dropdown.Item className="d-flex align-items-center"  onClick={() => viewUser(row.id)}>
          <FiEye className="me-2" />
          View
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
     
    ),
  
  }
  
  ];
       if(loading) return <div className='d-flex  align-items-center justify-content-center vh-100'> <BeatLoader size={30} color='#288131' margin={10}  /></div>

  return (
    
    <div>
     <Search placeholder='Search by user name' onSearch={setSearchTerm}/>
      
   <DataTable
			columns={columns}
			data={filteredUsers}
      pagination
      paginationServer
      paginationTotalRows={total}
      paginationDefaultPage={page}
      paginationPerPage={pageSize}
      onChangePage={(page) => setPage(page)}
      onChangeRowsPerPage={(size) => {
        setPageSize(size);
        setPage(page);
      } 
          }
      customStyles={{
        headCells: {
          style: {
            fontSize: "14px",
            fontWeight: "400",
            
          },
        },
        cells: {
          style: {
            fontSize: "16px",
            fontWeight: "400",
          },
        },
  }}
    
          
		/>   
<Modal
  show={showUser}
  onHide={() => setShowUser(false)}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>User Details</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    {selectedUser && (
      <>
        <p><b>Name:</b> {selectedUser.userName}</p>
        <p><b>Email:</b> {selectedUser.email}</p>
        <p><b>Phone:</b> {selectedUser.phoneNumber}</p>
        <p><b>Country:</b> {selectedUser.country}</p>
        <p>
          <b>Status:</b>{" "}
          <span
           className={`px-3 py-1 rounded-pill fw-bold ${
    selectedUser.isActivated
      ? "bg-success text-white"
      : "bg-danger text-white"
  }`}
          >
            {selectedUser.isActivated ? "Active" : "Not Active"}
          </span>
        </p>
        <p><b>Group:</b> {selectedUser.group?.name}</p>
      </>
    )}
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowUser(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  )
}


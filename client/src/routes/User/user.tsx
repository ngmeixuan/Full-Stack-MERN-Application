import React, { useState, useEffect } from "react";
import axios from "axios";
import { ObjectId } from "mongodb";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Slider,
  Space,
  Spin,
  Switch,
  Table,
  TablePaginationConfig,
  TreeSelect,
  Upload,
} from "antd";
import type { ColumnsType } from "antd/es/table";

const { Search } = Input;

interface User {
  _id: ObjectId;
  name: string;
  age: number;
  gender: string;
  email: string;
}

const User: React.FC = () => {
  const baseUrl = "http://localhost:5000/user/";
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const calculateAge = (dob: Date) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Calculate the age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birth month has not occurred yet this year, substract one year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const fetchData = () => {
    // Fetch the list of users
    axios
      .get("http://localhost:5000/user/list")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  };

  const handleSearchInputChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEditUser = (userId: ObjectId) => {
    navigate(`/user/${userId}`);
  };

  const handleDeleteUser = (userId: ObjectId) => {
    // Display a confirmation modal before deleting the user
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure to delete this user?",
      onOk() {
        // Send a DELETE request to delete the user
        axios
          .delete(`http://localhost:5000/user/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              message.success("User deleted successfully");
              // After successful deletion, refresh the user list
              fetchData();
            } else {
              message.error("Failed to delete user");
            }
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            message.error("Failed to delete user");
          });
      },
      onCancel() {
        message.info("Deletion canceled");
      },
    });
  };

  const confirm = () => {
    message.success("Click on Yes");
  };

  const cancel = () => {
    message.error("Click on No");
  };

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "dob",
      key: "age",
      render: (dob: Date) => calculateAge(dob),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button type="primary" onClick={() => handleEditUser(record._id)}>
            Edit
          </Button>

          {/* <Popconfirm
            title="Delete the user"
            description="Are you sure to delete this user?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          > */}
          <Button
            type="primary"
            onClick={() => handleDeleteUser(record._id)}
            danger
          >
            Delete
          </Button>
          {/* </Popconfirm> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    // Display a loading indicator while fetching data
    return <Spin></Spin>;
  }

  return (
    <>
      <div>
        <h2>User List</h2>
      </div>
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          {/* Search input */}
          <Search
            placeholder="Search by name"
            allowClear
            value={searchQuery}
            onChange={handleSearchInputChange}
            onSearch={handleSearch}
          />

          <Button
            type="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              navigate("/user");
            }}
          >
            New User
          </Button>
        </div>
        <div>
          {/* User list */}
          <Table
            dataSource={filteredUsers}
            rowKey="_id"
            columns={columns}
            pagination={{
              pageSize: 5,
              hideOnSinglePage: true,
            }}
          ></Table>
        </div>
      </>
    </>
  );
};

export default User;

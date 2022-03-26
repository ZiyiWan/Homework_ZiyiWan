import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Space } from "antd";

function StudentList() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  useEffect(() => {
    getStudents(1);
  }, []);

  const getStudents = (page: any) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get(
        `http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students?page=${page}&limit=10`,
        config
      )
      .then((res) => {
        setDataSource(res.data.data.students);
        setTotalPages(res.data.data.total);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Area",
      dataIndex: "country",
      key: "area",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Selected Curriculum",
      dataIndex: "courses",
      key: "courses",
      render: (courses: any) => (
        <span>
          {courses.map((course: any) => {
            return <div>{course.name}</div>;
          })}
        </span>
      ),
    },
    {
      title: "Student Type",
      dataIndex: "type",
      key: "type",
      render: (type: any) => <span>{type?.name}</span>,
    },
    {
      title: "Join Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: any) => <span>{typeof createdAt}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="signup">List</h1>
      <Space>
        <Button type="primary" onClick={getStudents}>
          Add
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 10,
          total: totalPages,
          onChange: (page) => {
            getStudents(page);
          },
        }}
      ></Table>
    </>
  );
}

export default StudentList;

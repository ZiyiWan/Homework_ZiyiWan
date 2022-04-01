import React, { useEffect, useState } from "react";
import { Button, Table, Space, Popconfirm, message } from "antd";
import { formatDistanceToNow } from "date-fns";
import { deleteStudent, getStudents } from "../apiService/withToken";

function StudentList() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getStudents(1, token).then(function (res) {
      console.log(res.data.students);
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
  }, []);

  function confirm(record: any) {
    console.log(typeof record.id);
    const token = localStorage.getItem("token");
    deleteStudent(record.id, token);
    getStudents(currentPage, token).then(function (res) {
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
    message.success("Deleted");
  }

  function cancel() {
    message.error("Cancel");
  }

  function onPageChange(page: number): void {
    const token = localStorage.getItem("token");
    getStudents(page, token).then(function (res) {
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
  }

  const columns = [
    {
      title: "ID",
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
      render: (createdAt: any) => {
        const date = Date.parse(createdAt);
        const result = formatDistanceToNow(date, { addSuffix: true });
        return <span>{result}</span>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a>Edit</a>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              confirm(record);
            }}
            onCancel={cancel}
            okText="Confirm"
            cancelText="Cancel"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h1 className="signup">List</h1>
      <Space>
        <Button type="primary">Add</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          defaultPageSize: 10,
          total: totalPages,
          onChange: (page) => {
            onPageChange(page);
            setCurrentPage(page);
          },
        }}
      ></Table>
    </>
  );
}

export default StudentList;

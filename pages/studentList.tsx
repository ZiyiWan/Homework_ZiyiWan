import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
  Input,
} from "antd";
import { formatDistanceToNow } from "date-fns";
import { deleteStudent, getStudents } from "../apiService/withToken";
import { collectionCreateFormProps } from "../dataModel/dataModel";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

function StudentList() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getStudents(1, token).then(function (res) {
      console.log(res.data.students);
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
  }, []);
  const { Option } = Select;

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

  const CollectionCreateForm: React.FC<collectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="Add Student"
        okText="Add"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} name="form_in_modal">
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input placeholder="Student Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Please input email" />
          </Form.Item>

          <Form.Item name="area" label="Area" rules={[{ required: true }]}>
            <Select>
              <Option value="China">China</Option>
              <Option value="Oman">Oman</Option>
              <Option value="Liberia">Liberia</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="stuType"
            label="Student Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="1">developer</Option>
              <Option value="2">tester</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

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
        <div>
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            Add
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
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

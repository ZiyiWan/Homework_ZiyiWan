import React, { useEffect, useState } from "react";
import Link from "next/link";
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
  Row,
  Col,
} from "antd";
import { formatDistanceToNow } from "date-fns";
import {
  addStudent,
  deleteStudent,
  getStudents,
  getStudentsByName,
} from "../apiService/withToken";
import { collectionCreateFormProps } from "../dataModel/dataModel";
import { PlusOutlined } from "@ant-design/icons";

function StudentList() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleOfAddStu, setVisibleOfAddStu] = useState(false);
  const [visibleOfEditStu, setVisibleOfEditStu] = useState(false);
  const { Option } = Select;
  const { Search } = Input;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getStudents(1, token).then(function (res) {
      console.log(res.data.students);
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
  }, []);

  function confirmDelete(record: any) {
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

  const onSearch = (value: any) => {
    console.log(value);
    const token = localStorage.getItem("token");
    console.log(token);
    getStudentsByName(value, currentPage, token).then(function (res) {
      setDataSource(res.data.students);
      setTotalPages(res.data.total);
    });
  };

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
    onEdit,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        width={500}
        mask={true}
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
        <Form
          form={form}
          name="form_in_modal"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
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
              <Option value={1}>tester</Option>
              <Option value={2}>developer</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    const name: string = values.name;
    const country: string = values.area;
    const email: string = values.email;
    const type: number = values.stuType;

    const stuInfo = {
      name,
      country,
      email,
      type,
    };
    console.log("stuInfo:", stuInfo);

    const token = localStorage.getItem("token");
    addStudent(stuInfo, token);
    setVisibleOfAddStu(false);
  };

  const onEidt = (values: any) => {
    console.log("Received values of form: ", values);
    const name: string = values.name;
    const country: string = values.area;
    const email: string = values.email;
    const type: number = values.stuType;

    const stuInfo = {
      name,
      country,
      email,
      type,
    };
    console.log("stuInfo:", stuInfo);

    const token = localStorage.getItem("token");
    addStudent(stuInfo, token);
    setVisibleOfAddStu(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      key: "name",
      render: (record: any) => (
        <Link as={`/student/${record.id}`} href="/studentDetail">
          <a>{record.name}</a>
        </Link>
      ),
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
          <div>
            <Button
              type="link"
              onClick={() => {
                setVisibleOfEditStu(true);
              }}
            >
              Edit
            </Button>
          </div>

          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              confirmDelete(record);
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
      <Row>
        <Col span={8}>
          <Space>
            <div>
              <Button
                icon={<PlusOutlined />}
                type="primary"
                onClick={() => {
                  setVisibleOfAddStu(true);
                }}
              >
                Add
              </Button>
              <CollectionCreateForm
                visible={visibleOfAddStu}
                onCreate={onCreate}
                onCancel={() => {
                  setVisibleOfAddStu(false);
                }}
              />
              <CollectionCreateForm
                visible={visibleOfEditStu}
                onCreate={onCreate}
                onCancel={() => {
                  setVisibleOfEditStu(false);
                }}
                onEdit={onEidt}
              />
            </div>
          </Space>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Col>
      </Row>

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

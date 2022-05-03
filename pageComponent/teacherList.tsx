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
  Slider,
} from "antd";
import {
  addStudent,
  addTeacher,
  deleteTeacher,
  getStudents,
  getStudentsByName,
  getTeachers,
} from "../apiService/withToken";
import { collectionCreateFormProps } from "../dataModel/dataModel";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

function TeachersList() {
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
    getTeachers(1, token).then(function (res) {
      console.log(res.data);
      setDataSource(res.data.teachers);
      setTotalPages(res.data.total);
    });
  }, []);

  function confirmDelete(record: any) {
    console.log(typeof record.id);
    const token = localStorage.getItem("token");
    deleteTeacher(record.id, token);
    getTeachers(currentPage, token).then(function (res) {
      setDataSource(res.data.teachers);
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
    getTeachers(page, token).then(function (res) {
      setDataSource(res.data.teachers);
      setTotalPages(res.data.total);
    });
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle required={true}>
      <Select style={{ width: 70 }} defaultValue="+86">
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="61">+61</Option>
      </Select>
    </Form.Item>
  );

  const CollectionCreateForm: React.FC<collectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        width={500}
        mask={true}
        title="Add Teacher"
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
          prefix="86"
        >
          <Form.Item name={"name"} label="Name" rules={[{ required: true }]}>
            <Input placeholder="Teacher Name" />
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

          <Form.Item name="area" label="Country" rules={[{ required: true }]}>
            <Select>
              <Option value="China">China</Option>
              <Option value="Oman">Oman</Option>
              <Option value="Liberia">Liberia</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              placeholder="mobile phone"
            />
          </Form.Item>
          <Form.Item label="Skills">
            <Form.List name="skills">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <Row>
                        <Col span={10}>
                          <Form.Item
                            {...restField}
                            name={[name, "name"]}
                            rules={[
                              { required: true, message: "Missing skill name" },
                            ]}
                          >
                            <Input placeholder="Skill Name" />
                          </Form.Item>
                        </Col>
                        <Col span={2}> </Col>
                        <Col span={12}>
                          <Form.Item
                            {...restField}
                            name={[name, "level"]}
                            rules={[
                              {
                                required: true,
                                message: "Missing skill rating",
                              },
                            ]}
                          >
                            <Slider
                              min={0}
                              max={5}
                              style={{ width: "135px" }}
                              defaultValue={1}
                            />
                          </Form.Item>
                        </Col>
                      </Row>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Skill
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
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
    const phone: string = "+" + values.prefix + values.phone;
    const skills: [] = values.skills;

    const teaInfo = {
      name,
      country,
      phone,
      skills,
      email,
    };
    console.log("teaInfo:", teaInfo);

    const token = localStorage.getItem("token");
    addTeacher(teaInfo, token);
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
        <Link as={`/teacher/${record.id}`} href="/teacherDetailPage">
          <a>{record.name}</a>
        </Link>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "area",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skill",
      dataIndex: "skills",
      key: "skills",
      render: (skills: any) => (
        <span>
          {skills.map((skill: any) => {
            return <div>{skill.name}</div>;
          })}
        </span>
      ),
    },
    {
      title: "Course Amount",
      dataIndex: "courseAmount",
      key: "courseAmount",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
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
        style={{ marginTop: "13px" }}
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

export default TeachersList;

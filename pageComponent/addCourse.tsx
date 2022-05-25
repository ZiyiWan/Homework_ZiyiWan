import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getStudentsById } from "../apiService/withToken";
import { studentInfo } from "../dataModel/dataModel";
import {
  Row,
  Col,
  Descriptions,
  Tabs,
  Avatar,
  Tag,
  Divider,
  Table,
  Steps,
  Button,
  message,
  Form,
  Input,
  Checkbox,
  DatePicker,
} from "antd";
import { v4 as uuidv4 } from "uuid";

export default function AddCourse() {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const onFinish = (values: any) => {
    console.log("Success:", values);
    setCurrent(current + 1);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const next = (values: any) => {
    setCurrent(current + 1);
    console.log("Success: next", values);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "Course Detail",
      content: (
        <>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="inline"
            colon={false}
          >
            <Form.Item
              label="Course Name"
              name="coursename"
              rules={[
                { required: true, message: "Please input the course name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Teacher"
              name="teacher"
              rules={[
                { required: true, message: "Please input the teacher name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[
                { required: true, message: "Please input the course type" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Course Code" name="coursecode" required initialValue={uuidv4()}>
              <Input disabled defaultValue={uuidv4()} />
            </Form.Item>
            <Form.Item label="Start Date" name="startdate">
              <DatePicker />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    },
    {
      title: "Course Schedule",
      content: "Second-content",
    },
    {
      title: "Success",
      content: "Last-content",
    },
  ];

  return (
    <>
      <div style={{ background: "white", height: "100vh" }}>
        <Steps
          current={current}
          type="navigation"
          style={{ paddingLeft: "30px" }}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div
          className="steps-content"
          style={{ paddingLeft: "30px", marginTop: "20px" }}
        >
          {steps[current].content}
        </div>
      </div>
    </>
  );
}

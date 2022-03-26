import { Form, Input, Row, Col, Radio, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";

export default function SignUpPage() {
  const [form] = Form.useForm();
  interface SignUpResponse {
    code: number;
    data: SignUpRequest;
    msg: string;
  }

  interface SignUpRequest {
    email: string;
    password: string;
    role: string;
  }

  //check my code here
  interface SignUpInfo {
    role: string;
    email: string;
    password: string;
  }

  const onFinish = (values: SignUpInfo) => {
    console.log("success", values.role);
    const url =
      "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/signup";
    const email = values.email;
    const password = values.password;
    const role = values.role;

    const request: SignUpRequest = {
      email,
      password,
      role,
    };

    axios
      .post<SignUpResponse>(url, request, {
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      })
      .then(function (res) {
        console.log(res.data.data);
        alert("success");
      })
      .catch(function (err) {
        console.log(err);
        alert("error");
      });
  };
  const onFinishFailed = (errInfo: any) => {
    console.log("Failed", errInfo);
  };

  return (
    <>
      <h1 className="signup">SIGN UP YOUR ACCOUNT</h1>
      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            name="signup"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="role" label="Role" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="student">Student</Radio>
                <Radio value="teacher">Teacher</Radio>
                <Radio value="manager">Manager</Radio>
              </Radio.Group>
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
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Please input email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder="Please input password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Please tap password again" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <Space>
            <span>Already have an account?</span>
            <Link href="/login">
              <a>Sign in</a>
            </Link>
            <Link href="/studentList">
              <a>List</a>
            </Link>
          </Space>
        </Col>
      </Row>
    </>
  );
}

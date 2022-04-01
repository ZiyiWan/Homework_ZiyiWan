import { Form, Input, Row, Col, Radio, Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signUpService } from "../apiService/withoutToken";
import { signUpInfo, signUpRequest } from "../dataModel/dataModel";

export default function SignUpPage() {
  const [form] = Form.useForm();
  
  const onFinish = (values: signUpInfo) => {
    console.log("success");
    const email = values.email;
    const password = values.password;
    const role = values.role;

    const request: signUpRequest = {
      email,
      password,
      role,
    };

    signUpService(request);
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

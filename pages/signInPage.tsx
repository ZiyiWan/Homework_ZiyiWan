import { Form, Input, Button, Checkbox, Row, Col, Space, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { AES } from "crypto-js";
import { loginRequest } from "../dataModel/dataModel";
import { loginService } from "../apiService/withoutToken";

export default function SignInPage() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const data: loginRequest = {
      email: values.username,
      password: AES.encrypt(values.password, "cms").toString(),
      role: values.role,
    };

    loginService(data);
  };

  return (
    <>
      <h1 className="signup">COURSE MANAGEMENT ASSISTANT</h1>
      <Row justify="center">
        <Col md={8} sm={24}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item name="role" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio.Button value="student">Student</Radio.Button>
                <Radio.Button value="teacher">Teacher</Radio.Button>
                <Radio.Button value="manager">Manager</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="username"
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
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Please input password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                block
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Space>
            <span>No account?</span>
            <Link href="/">
              <a>Sign up</a>
            </Link>
            <Link href="/studentListPage">
              <a>List</a>
            </Link>
          </Space>
        </Col>
      </Row>
    </>
  );
}

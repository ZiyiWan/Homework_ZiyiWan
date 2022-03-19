import { Form, Input, Button, Checkbox, Row, Col, Space, Radio } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import axios from "axios";
import { AES } from "crypto-js";

export default function SignInPage() {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    const data = {
      email: values.username,
      password: AES.encrypt(values.password, "cms").toString(),
      role: values.role,
    };
    const url =
      "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/login";

    axios.post(url, data).then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.data.token);
      console.log(localStorage.getItem('token'))
    });
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
            <Link href="/studentList">
              <a>List</a>
            </Link>
          </Space>
        </Col>
      </Row>
    </>
  );
}

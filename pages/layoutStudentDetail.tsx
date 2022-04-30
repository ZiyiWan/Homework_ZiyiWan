import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button, Menu } from "antd";
import { useRouter } from "next/router";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  MessageOutlined,
  DeploymentUnitOutlined,
  ReadOutlined,
  ProfileOutlined,
  FileAddOutlined,
  EditOutlined,
} from "@ant-design/icons";
import StudentDetail from "./studentDetail";

function layoutPage() {
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  function onCollapse() {
    setCollapsed(!collapsed);
  }

  function toggle() {
    setCollapsed(!collapsed);
  }

  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Button
            type="text"
            onClick={toggle}
            style={{
              marginBottom: 16,
              color: "rgb(228, 232, 238)",
              marginLeft: 25,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
              }
            )}
          </Button>
        </Header>
        <Layout style={{ height: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={["sub1"]} mode="inline" defaultOpenKeys={["sub1"]}>
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
                <Menu.Item
                  key="2"
                  icon={<TeamOutlined />}
                  onClick={() => {
                    router.push("/layoutPage");
                  }}
                >
                  Student List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<DeploymentUnitOutlined />}
                title="Teacher"
              >
                <Menu.Item
                  key="3"
                  icon={<TeamOutlined />}
                  onClick={() => {
                    router.push("/teacherList");
                  }}
                >
                  Teacher List
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                <Menu.Item key="4" icon={<ProfileOutlined />}>
                  Course List
                </Menu.Item>
                <Menu.Item key="5" icon={<FileAddOutlined />}>
                  Add Course
                </Menu.Item>
                <Menu.Item key="6" icon={<EditOutlined />}>
                  Edit Course
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="7" icon={<MessageOutlined />}>
                Message
              </Menu.Item>
            </Menu>
          </Sider>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
              <Breadcrumb.Item>Student</Breadcrumb.Item>
              <Breadcrumb.Item
                
                onClick={() => {
                  router.push("/layoutPage");
                }}
              >
                <a>Student List</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Student Detail</Breadcrumb.Item>
            </Breadcrumb>
            <StudentDetail />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default layoutPage;

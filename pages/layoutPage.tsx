import React, { useEffect, useState } from "react";
import { Layout, Breadcrumb, Button, Menu } from "antd";
import StudentList from "./studentList";
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
} from "@ant-design/icons";

function layoutPage() {
  const { Header, Sider, Content } = Layout;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

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
        <Layout>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
                <Menu.Item key="2" icon={<TeamOutlined />}>
                  Student List
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<DeploymentUnitOutlined />}
                title="Teacher"
              >
                <Menu.Item key="3" icon={<TeamOutlined />}>
                  Teacher List
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                <Menu.Item key="4" icon={<ProfileOutlined />}>
                  Course List
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="5" icon={<MessageOutlined />}>
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
              <Breadcrumb.Item>Student List</Breadcrumb.Item>
            </Breadcrumb>
            <StudentList />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default layoutPage;

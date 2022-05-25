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
  EditOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

function PageLayout(props: any) {
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

  function setDefaultSelectedKeys() {
    let defaultSelectedKey: string = "1";
    switch (props?.type) {
      case "StudentList": {
        defaultSelectedKey = "2";
        break;
      }
      case "StudentDetail": {
        defaultSelectedKey = "2";
        break;
      }
      case "TeacherList": {
        defaultSelectedKey = "3";
        break;
      }
      case "TeacherDetail": {
        defaultSelectedKey = "3";
        break;
      }
      case "CourseList": {
        defaultSelectedKey = "4";
        break;
      }
      case "AddCourse": {
        defaultSelectedKey = "5";
        break;
      }
      default:
        break;
    }
    return defaultSelectedKey;
  }
  function setDefaultOpenKeys() {
    let defaultOpenKey: string = "";
    switch (props?.type) {
      case "StudentList": {
        defaultOpenKey = "sub1";
        break;
      }
      case "StudentDetail": {
        defaultOpenKey = "sub1";
        break;
      }
      case "TeacherList": {
        defaultOpenKey = "sub2";
        break;
      }
      case "TeacherDetail": {
        defaultOpenKey = "sub2";
        break;
      }
      case "CourseList": {
        defaultOpenKey = "sub3";
        break;
      }
      case "AddCourse": {
        defaultOpenKey = "sub3";
        break;
      }
      default:
        break;
    }
    return defaultOpenKey;
  }

  function setBreadcrumb() {
    let breadcrumb: any;
    switch (props?.type) {
      case "StudentDetail": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Student</Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                router.push("/studentListPage");
              }}
            >
              <a>Student List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Student Detail</Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "StudentList": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Student</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>Student List</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "TeacherDetail": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Teacher</Breadcrumb.Item>
            <Breadcrumb.Item
              onClick={() => {
                router.push("/teacherListPage");
              }}
            >
              <a>Teacher List</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Teacher Detail</Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "TeacherList": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Teacher</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>Teacher List</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "CourseList": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Course</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>All Courses</a>
            </Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "CourseDetail": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Course</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => {
                router.push("/coursesListPage");
              }}>
              <a>All Courses</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Detail</Breadcrumb.Item>
          </Breadcrumb>
        );
        break;
      }
      case "AddCourse": {
        breadcrumb = (
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>CMS MANAGER SYSTEM</Breadcrumb.Item>
            <Breadcrumb.Item>Course</Breadcrumb.Item>
            <Breadcrumb.Item >
              <a>Add Course</a>
            </Breadcrumb.Item>
            
          </Breadcrumb>
        );
        break;
      }
      default:
        break;
    }
    return breadcrumb;
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
            <Menu
              theme="dark"
              defaultSelectedKeys={[setDefaultSelectedKeys()]}
              mode="inline"
              defaultOpenKeys={[setDefaultOpenKeys()]}
            >
              <Menu.Item key="1" icon={<DashboardOutlined />}>
                Overview
              </Menu.Item>
              <SubMenu key="sub1" icon={<UserOutlined />} title="Student">
                <Menu.Item
                  key="2"
                  icon={<TeamOutlined />}
                  onClick={() => {
                    router.push("/studentListPage");
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
                    router.push("/teacherListPage");
                  }}
                >
                  Teacher List
                </Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<ReadOutlined />} title="Course">
                <Menu.Item
                  key="4"
                  icon={<ProfileOutlined />}
                  onClick={() => {
                    router.push("/coursesListPage");
                  }}
                >
                  All Courses
                </Menu.Item>
                <Menu.Item key="5" icon={<FileAddOutlined />} onClick={() => {
                    router.push("/addCoursePage");
                  }}>
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
            {setBreadcrumb()}
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default PageLayout;

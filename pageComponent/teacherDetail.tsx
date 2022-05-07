import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getStudentsById, getTeacherById } from "../apiService/withToken";
import { studentInfo, teacherInfo } from "../dataModel/dataModel";
import {
  Row,
  Col,
  Descriptions,
  Tabs,
  Avatar,
  Tag,
  Divider,
  Table,
  Rate,
} from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function TeacherDetail() {
  const router = useRouter();
  const teaId: number = parseInt(router.asPath.slice(9));
  const [teacher, setTeacher] = useState<teacherInfo>();
  const [gender, setGender] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const { TabPane } = Tabs;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getTeacherById(teaId, token).then(function (res) {
      console.log(res.data);
      const data = res.data;
      const teaGender = data.profile.gender;
      // const courses = data.courses;
      // const coursesData: any = courses.map((course: any) => {
      //   return {
      //     courseId: course.createdAt,
      //     name: course.name,
      //     type: course.type?.map((type:any)=> type.name).join(","),
      //     updatedAt: course.updatedAt,
      //   };
      // });
      // console.log(courses);
      // setDataSource(coursesData);
      setTeacher(data);
      if (teaGender === 1) {
        setGender("Male");
      } else if (teaGender === 2) {
        setGender("Female");
      }
    });
  }, []);
  const columns = [
    {
      title: "No.",
      dataIndex: "courseId",
      key: "name",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Join Time",
      dataIndex: "updatedAt",
      key: "jtime",
    },
  ];
  return (
    <>
      <Row style={{ background: "white", height: "80vh" }}>
        <Col span={8}>
          <div
            style={{
              padding: "15px",
              border: "1px solid rgba(0,0,0,.06)",
              margin: "15px",
            }}
          >
            {" "}
            <div className="avatar" style={{ textAlign: "center" }}>
              <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <Divider></Divider>
            <div className="info">
              <Descriptions layout="vertical" column={2} colon={false}>
                <Descriptions.Item
                  label="Name"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {teacher?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Country"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {teacher?.country}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Email"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {teacher?.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Phone"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {teacher?.phone}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Address"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {teacher?.profile.address}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </div>
        </Col>
        <Col span={1}></Col>
        <Col span={15}>
          <div
            style={{
              padding: "15px",
              border: "1px solid rgba(0,0,0,.06)",
              margin: "15px",
            }}
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="About" key="1">
                <span
                  style={{
                    color: "purple",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Information
                </span>
                <Descriptions column={1} style={{ marginTop: "20px" }}>
                  <Descriptions.Item
                    label="Birthday"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {teacher?.profile.birthday}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Gender"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {gender}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Create Time"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {teacher?.createdAt}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Update Time"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {teacher?.updatedAt}
                  </Descriptions.Item>
                </Descriptions>
                <span
                  style={{
                    color: "purple",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Skills
                </span>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  {teacher?.skills.map((item) => {
                    return (
                      <>
                        <Row>
                          <Col span={8}>
                            <Tag color="magenta">{item.name}</Tag>
                          </Col>
                          <Col span={8}>
                            <Rate disabled defaultValue={item.level} />
                          </Col>
                        </Row>
                      </>
                    );
                  })}
                </div>
                <span
                  style={{
                    color: "purple",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Description
                </span>
                <div style={{ marginTop: "20px" }}>
                  {teacher?.profile.description}
                </div>
              </TabPane>
              <TabPane tab="Courses" key="2">
                <Table dataSource={dataSource} columns={columns}></Table>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
}

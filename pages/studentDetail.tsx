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
} from "antd";
import { UserOutlined } from "@ant-design/icons";

export default function StudentDetail() {
  const router = useRouter();
  const stuId: number = parseInt(router.asPath.slice(9));
  const [stu, setStu] = useState<studentInfo>();
  const [gender, setGender] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const { TabPane } = Tabs;
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getStudentsById(stuId, token).then(function (res) {
      console.log(res.data);
      const data = res.data;
      const stuGender = data.gender;
      const courses = data.courses;
      const coursesData: any = courses.map((course: any) => {
        [
          {
            courseId: course.createdAt,
            name: course.name,
            type: course.type,
            updatedAt: course.updatedAt,
          },
        ];
      });
      console.log(courses);
      setDataSource(res.data.courses);
      setStu(data);
      if (stuGender === 1) {
        setGender("Male");
      } else if (stuGender === 2) {
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
                  {stu?.name}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Age"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {stu?.age}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Email"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {stu?.email}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Phone"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {stu?.phone}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Address"
                  labelStyle={{ fontWeight: "bolder" }}
                >
                  {stu?.address}
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
                    label="Education"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.education}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Area"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.country}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Gender"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {gender}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Member Period"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.memberStartAt} - {stu?.memberEndAt}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Type"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.type?.name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Create Time"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.createdAt}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label="Update Time"
                    labelStyle={{ fontWeight: "bolder" }}
                  >
                    {stu?.updatedAt}
                  </Descriptions.Item>
                </Descriptions>
                <span
                  style={{
                    color: "purple",
                    fontSize: "20px",
                    fontWeight: "bolder",
                  }}
                >
                  Interesting
                </span>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  {stu?.interest.map((item) => {
                    return <Tag color="magenta">{item}</Tag>;
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
                <div style={{ marginTop: "20px" }}>{stu?.description}</div>
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

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCourseById } from "../apiService/withToken";
import { courseDetail } from "../dataModel/dataModel";
import {
  Row,
  Col,
  Card,
  Divider,
  Steps,
  Descriptions,
  Tag,
  Collapse,
} from "antd";
import { HeartTwoTone, UserOutlined } from "@ant-design/icons";

export default function CourseDetail() {
  const router = useRouter();
  const { Step } = Steps;
  const { Panel } = Collapse;
  const courseId: number = parseInt(router.asPath.slice(8));
  const [course, setCourse] = useState<courseDetail>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    console.log(courseId);
    getCourseById(courseId, token).then(function (res) {
      console.log(res.data);
      setCourse(res.data);
    });
  }, []);
  return (
    <>
      <Row style={{ background: "white" }}>
        <Col>
          <div
            style={{
              margin: "15px",
            }}
          >
            <Card
              style={{ width: 390 }}
              cover={
                <img
                  style={{ border: "1px solid rgba(0,0,0,.06)" }}
                  alt="example"
                  src="https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png"
                />
              }
            >
              <div>
                <p>
                  <strong>{course?.name}</strong>
                </p>
                <div style={{ margin: "3px" }}>
                  <Row>
                    <Col span={12}>{course?.startTime}</Col>
                    <Col span={2} offset={10}>
                      <HeartTwoTone twoToneColor="#eb2f96" /> {course?.star}
                    </Col>
                  </Row>
                </div>
              </div>
              <Divider style={{ margin: "0px" }}></Divider>
              <Row justify="space-between" style={{ margin: "3px" }}>
                <Col>Durantion:</Col>
                <Col>
                  <strong>{course?.duration} years</strong>
                </Col>
              </Row>
              <Divider style={{ margin: "0px" }}></Divider>
              <Row justify="space-between" style={{ margin: "3px" }}>
                <Col>Teacher:</Col>
                <Col>
                  <strong>
                    <a>{course?.teacherName}</a>
                  </strong>
                </Col>
              </Row>
              <Divider style={{ margin: "0px" }}></Divider>
              <Row justify="space-between" style={{ margin: "3px" }}>
                <Col>
                  <UserOutlined style={{ color: "blue" }} /> Student Limit:
                </Col>
                <Col>
                  <strong>{course?.maxStudents}</strong>
                </Col>
              </Row>
              <Row
                justify="space-between"
                style={{ border: "1px solid rgba(0,0,0,.06)" }}
              >
                <Col
                  span={6}
                  style={{ borderRight: "1px solid rgba(0,0,0,.06)" }}
                >
                  <h2 style={{ color: "purple" }}>{course?.price}</h2>Price
                </Col>
                <Col
                  span={6}
                  style={{ borderRight: "1px solid rgba(0,0,0,.06)" }}
                >
                  <h2 style={{ color: "purple" }}>{course?.sales.batches}</h2>
                  Batches
                </Col>
                <Col
                  span={6}
                  style={{ borderRight: "1px solid rgba(0,0,0,.06)" }}
                >
                  <h2 style={{ color: "purple" }}>
                    {course?.sales.studentAmount}
                  </h2>
                  Students
                </Col>
                <Col span={6}>
                  <h2 style={{ color: "purple" }}>{course?.sales.earnings}</h2>
                  Earnings
                </Col>
              </Row>
            </Card>
          </div>
        </Col>
        <Col span={15}>
          <div
            style={{
              padding: "15px",
              border: "1px solid rgba(0,0,0,.06)",
              margin: "15px",
            }}
          >
            <span
              style={{
                color: "purple",
                fontSize: "20px",
                fontWeight: "bolder",
              }}
            >
              Course Detail
            </span>
            <h3 style={{ marginTop: "20px" }}>Create Time</h3>
            {course?.createdAt}
            <h3 style={{ marginTop: "15px" }}>Start Time</h3>
            {course?.startTime}
            <h3 style={{ marginTop: "15px" }}>Status</h3>
            <Steps
              current={course?.schedule.current}
              status="process"
              size="small"
            >
              {course?.schedule.chapters.map((chapter) => {
                return <Step title={chapter.name} />;
              })}
            </Steps>
            <h3 style={{ marginTop: "15px" }}>Course Code</h3>
            {course?.uid}
            <h3 style={{ marginTop: "15px" }}>Class Time</h3>
            <Descriptions layout="vertical" bordered column={7}>
              <Descriptions.Item label="Sunday">N/A</Descriptions.Item>
              <Descriptions.Item label="Monday">10:00:00</Descriptions.Item>
              <Descriptions.Item label="Tuesday">13:00:00</Descriptions.Item>
              <Descriptions.Item label="Wednesday">N/A</Descriptions.Item>
              <Descriptions.Item label="Thursday">N/A</Descriptions.Item>
              <Descriptions.Item label="Friday">N/A</Descriptions.Item>
              <Descriptions.Item label="Saturday">N/A</Descriptions.Item>
            </Descriptions>
            <h3 style={{ marginTop: "15px" }}>Category</h3>
            {course?.type.map((item) => {
              return <Tag color="blue">{item.name}</Tag>;
            })}
            <h3 style={{ marginTop: "15px" }}>Description</h3>
            <Collapse accordion defaultActiveKey={[course?.schedule.status]}>
              {course?.schedule.chapters.map((chapter) => {
                return (
                  <Panel header={chapter.name} key={chapter.id}>
                    <p>{chapter.content}</p>
                  </Panel>
                );
              })}
            </Collapse>
          </div>
        </Col>
      </Row>
    </>
  );
}

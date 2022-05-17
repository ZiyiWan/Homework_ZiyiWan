import { HeartTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import React from "react";
import { course } from "../dataModel/dataModel";

function CourseCard({ info }: course) {
  return (
    <>
      <div style={{margin:"5px"}}>
        <Col span={6}>
          <Card
            style={{ width: 390 }}
            cover={
              <img
                alt="example"
                src="https://cdn.elearningindustry.com/wp-content/uploads/2020/08/5-ways-to-improve-your-course-cover-design-1024x575.png"
              />
            }
          >
            <div>
              <p>
                <strong>{info.name}</strong>
              </p>
              <div style={{ margin: "3px" }}>
                <Row>
                  <Col span={12}>{info.startTime}</Col>
                  <Col span={2} offset={10}>
                    <HeartTwoTone twoToneColor="#eb2f96" /> {info.star}
                  </Col>
                </Row>
              </div>
            </div>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row justify="space-between" style={{ margin: "3px" }}>
              <Col>Durantion:</Col>
              <Col>
                <strong>{info.duration} years</strong>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row justify="space-between" style={{ margin: "3px" }}>
              <Col>Teacher:</Col>
              <Col>
                <strong>
                  <a>{info.teacherName}</a>
                </strong>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row justify="space-between" style={{ margin: "3px" }}>
              <Col>
                <UserOutlined style={{ color: "blue" }} /> Student Limit:
              </Col>
              <Col>
                <strong>{info.maxStudents}</strong>
              </Col>
            </Row>
            <Button type="primary" onClick={()=>{}}>Read More</Button>
          </Card>
        </Col>
      </div>
    </>
  );
}

export default CourseCard;

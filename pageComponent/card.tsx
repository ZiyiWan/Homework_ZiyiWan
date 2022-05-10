import { HeartTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import React from "react";
import { course } from "../dataModel/dataModel";


function CourseCard({info}: course) {
  return (
    <>
      <Row>
        <Col span={6}>
          <Card
            style={{ width: 390 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <div>
              <p>
                <strong>{info.name}</strong>
              </p>
              <div>
                <Row>
                  <Col span={12}>{info.startTime}</Col>
                  <Col span={2} offset={10}>
                    <HeartTwoTone twoToneColor="#eb2f96" /> {info.star}
                  </Col>
                </Row>
              </div>
            </div>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={12}>Durantion:</Col>
              <Col span={4} offset={8}>
                <strong>{info.duration} years</strong>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={14}>Teacher:</Col>
              <Col>
                <strong>
                  <a>{info.teacherName}</a>
                </strong>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={12}>
                <UserOutlined style={{ color: "blue" }} /> Student Limit:
              </Col>
              <Col span={2} offset={10}>
                <strong>{info.maxStudents}</strong>
              </Col>
            </Row>
            <Button type="primary">Read More</Button>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CourseCard;

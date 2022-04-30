import { HeartTwoTone, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Row } from "antd";
import React from "react";

function CourseCard() {
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
                <strong>Anjali Hodkiewicz</strong>
              </p>
              <div>
                <Row>
                  <Col span={12}>2005-11-12 12:00:00</Col>
                  <Col span={2} offset={10}>
                    <p>
                      <HeartTwoTone twoToneColor="#eb2f96" /> 5
                    </p>
                  </Col>
                </Row>
              </div>
            </div>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={12}>Durantion:</Col>
              <Col span={4} offset={8}>
                <p>
                  <strong>5 years</strong>
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={12}>Teacher:</Col>
              <Col span={4} offset={8}>
                <p>
                  <strong>
                    <a>Jun Hua</a>
                  </strong>
                </p>
              </Col>
            </Row>
            <Divider style={{ margin: "0px" }}></Divider>
            <Row>
              <Col span={12}>
                <UserOutlined style={{color:"blue"}}/> Student Limit:
              </Col>
              <Col span={2} offset={10}>
                <p>
                  <strong>1</strong>
                </p>
              </Col>
            </Row>
            <Button type="primary">Read More</Button>
          </Card>
        </Col>
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
            <p>Card content</p>
            <Divider></Divider>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
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
            <p>Card content</p>
            <Divider></Divider>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
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
            <p>Card content</p>
            <Divider></Divider>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CourseCard;

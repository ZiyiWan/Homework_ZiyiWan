import React from "react";
import axios from "axios";
import { Button } from "antd";

function StudentList() {
  const getStudents = (e: any) => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };
    axios
      .get(
        "http://ec2-13-239-60-161.ap-southeast-2.compute.amazonaws.com:3001/api/students",
        config
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1 className="signup">List</h1>
      <Button type="primary" onClick={getStudents}>
        Get List
      </Button>
    </>
  );
}

export default StudentList;

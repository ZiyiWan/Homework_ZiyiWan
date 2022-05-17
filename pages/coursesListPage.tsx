import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getCourses } from "../apiService/withToken";
import PageLayout from "../pageComponent/layout";
import { Row } from "antd";
import CourseCard from "../pageComponent/card";

function CoursesListPage() {
  const [coursesList, setCoursesList] = useState([]);
  const [currentLimit, setCurrentLimit] = useState(8);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    getCourses(currentLimit, token).then(function (res) {
      console.log(res.data.courses);
      setCoursesList(res.data.courses);
    });
  }, []);

  const getMoreCourses = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const limit = currentLimit + 8;
    await getCourses(limit, token).then(function (res) {
      console.log(res.data.courses);
      const newCourses = res.data.courses;
      setCoursesList(newCourses);
    });
    setCurrentLimit(limit);
  };
  return (
    <>
      <PageLayout type="CourseList">
        <InfiniteScroll
          dataLength={coursesList.length}
          next={getMoreCourses}
          hasMore={hasMore}
          loader={<h3>Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <Row>
            {coursesList.map((course) => {
              return <CourseCard info={course} />;
            })}{" "}
          </Row>
        </InfiniteScroll>
      </PageLayout>
    </>
  );
}

export default CoursesListPage;

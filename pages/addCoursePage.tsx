import React from "react";
import AddCourse from "../pageComponent/addCourse";
import CourseDetail from "../pageComponent/courseDetail";
import PageLayout from "../pageComponent/layout";

function CourseDetailPage() {
  return (
    <>
      <PageLayout type="AddCourse">
        <AddCourse/>
      </PageLayout>
    </>
  );
}

export default CourseDetailPage;
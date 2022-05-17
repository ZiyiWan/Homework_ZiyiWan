import React from "react";
import CourseDetail from "../pageComponent/courseDetail";
import PageLayout from "../pageComponent/layout";

function CourseDetailPage() {
  return (
    <>
      <PageLayout type="CourseDetail">
        <CourseDetail/>
      </PageLayout>
    </>
  );
}

export default CourseDetailPage;
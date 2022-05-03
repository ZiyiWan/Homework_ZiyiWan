import React from "react";
import PageLayout from "../pageComponent/layout";
import TeacherDetail from "../pageComponent/teacherDetail";

function TeacherDetailPage() {
  return (
    <>
      <PageLayout type="TeacherDetail">
        <TeacherDetail/>
      </PageLayout>
    </>
  );
}

export default TeacherDetailPage;
